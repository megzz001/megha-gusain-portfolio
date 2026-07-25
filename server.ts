import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import { SYSTEM_INSTRUCTION } from "./src/resumeKnowledge";

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const HMR_PORT = Number(process.env.HMR_PORT || 24678);
const MESSAGES_FILE = path.join(process.cwd(), "messages.json");
const CONTACT_RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "meghagusain03@gmail.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Portfolio Contact Form <onboarding@resend.dev>";

// Tried in order: if the preferred model is unavailable on the key, fall back to a stable one.
const CHAT_MODELS = [process.env.GEMINI_MODEL || "gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.0-flash"];

// Keep the request payload bounded — the resume dossier is already in the system instruction,
// so only recent turns are needed for conversational context.
const MAX_HISTORY_TURNS = 20;

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Lazy-initialized Resend Client (transactional email for the contact form)
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not configured.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Contact Form Endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp: new Date().toISOString(),
      };

      let existingMessages = [];
      if (fs.existsSync(MESSAGES_FILE)) {
        try {
          const content = fs.readFileSync(MESSAGES_FILE, "utf-8");
          existingMessages = JSON.parse(content || "[]");
        } catch (e) {
          console.error("Error reading messages file, resetting:", e);
        }
      }

      existingMessages.push(newMessage);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existingMessages, null, 2));

      // Deliver the message to Megha's inbox via Resend when the API key is available.
      if (process.env.RESEND_API_KEY) {
        try {
          const resend = getResendClient();
          await resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: CONTACT_RECIPIENT_EMAIL,
            replyTo: email,
            subject: `New portfolio inquiry: ${newMessage.subject}`,
            html: `
              <h2>New message from your portfolio contact form</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${newMessage.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br />")}</p>
            `,
          });
        } catch (emailError: any) {
          console.error("Error sending contact email via Resend:", emailError);
        }
      } else {
        console.warn("RESEND_API_KEY is not configured; email delivery skipped.");
      }

      return res.json({
        success: true,
        message: "Message received successfully! Megha will get back to you soon.",
      });
    } catch (error: any) {
      console.error("Error in contact form:", error);
      return res.status(500).json({ error: "Failed to save message. Please try again." });
    }
  });

  // 2. Chat with Megha's AI Twin Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Format messages into contents format for Gemini.
      // Map 'user' to 'user' and 'ai' to 'model', dropping anything without text.
      const contents = messages
        .filter((m: any) => typeof m?.text === "string" && m.text.trim().length > 0)
        .slice(-MAX_HISTORY_TURNS)
        .map((m: any) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      // Gemini rejects a history that opens with a model turn, so trim the client's
      // canned welcome message (and anything else) before the first real user turn.
      while (contents.length > 0 && contents[0].role !== "user") {
        contents.shift();
      }

      // If last message isn't user, return bad request
      if (contents.length === 0 || contents[contents.length - 1].role !== "user") {
        return res.status(400).json({ error: "Last message must be from user." });
      }

      // Check if API key is present
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error:
            "Megha's AI twin isn't connected right now — the GEMINI_API_KEY is missing from the server's environment. Everything about her experience, projects, and skills is still available on this page.",
        });
      }

      const ai = getGeminiClient();

      let lastError: any = null;
      for (const model of CHAT_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.6,
              maxOutputTokens: 1024,
            },
          });

          const reply = response.text?.trim();
          if (reply) {
            return res.json({ reply, model });
          }
          lastError = new Error(`Model ${model} returned an empty response.`);
        } catch (modelError: any) {
          lastError = modelError;
          console.error(`[chat] Model ${model} failed:`, modelError?.message || modelError);
        }
      }

      throw lastError || new Error("No chat model produced a response.");
    } catch (error: any) {
      console.error("Error in AI Twin Chat API:", error);
      const status = Number(error?.status);
      if (status === 429) {
        return res.status(429).json({
          error: "I'm getting a lot of questions right now and hit a rate limit. Please try again in a moment.",
        });
      }
      return res.status(500).json({
        error: "I couldn't reach the AI service just now. Please try again in a moment — or email Megha directly at meghagusain03@gmail.com.",
      });
    }
  });

  // 3. Vite Server Integration for Assets & Client
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server in development mode...");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { port: HMR_PORT },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up static file serving in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Megha Gusain's Portfolio running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start the Express server:", err);
});
