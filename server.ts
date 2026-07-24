import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const HMR_PORT = Number(process.env.HMR_PORT || 24678);
const MESSAGES_FILE = path.join(process.cwd(), "messages.json");
const CONTACT_RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "meghagusain03@gmail.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Portfolio Contact Form <onboarding@resend.dev>";

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

      // Format messages into contents format for Gemini
      // Map 'user' to 'user' and 'ai' to 'model'
      const contents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      // If last message isn't user, return bad request
      if (contents.length === 0 || contents[contents.length - 1].role !== "user") {
        return res.status(400).json({ error: "Last message must be from user." });
      }

      // Check if API key is present
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "Hi there! I am Megha's AI Assistant. Currently, her Gemini API key is not configured in the Secrets panel, but I can tell you that she is an extremely talented full-stack engineer and AI automation specialist! Feel free to review her education, certifications, and projects on this page. If you'd like to test this chat fully, please configure the GEMINI_API_KEY in Settings > Secrets.",
        });
      }

      const ai = getGeminiClient();

      const systemInstruction = `You are the AI Twin and Professional Representative of Megha Gusain, a Computer Science Engineering student at Chandigarh University who specializes in Full-Stack Web Development, APIs, and AI-powered automation systems.

Your objective is to answer questions about Megha's projects, experience, educational qualifications, technical skill-sets, and career interests. Always respond in a polite, highly professional, intelligent, confident, and warm tone. Speak as if you are Megha herself or her direct agent, keeping the conversation engaging.

Megha's Core Background Data:
- Name: Megha Gusain
- Current Role: Full-Stack Developer & AI Automation Specialist (B.E. Student at Chandigarh University, Graduating May 2026, Current CGPA: 7.59).
- Contact: meghagusain03@gmail.com | +91 98884 27804
- Portfolios & Socials:
  * GitHub: github.com/megzz001
  * LinkedIn: linkedin.com/in/megha-gusain-27438437a
  * LeetCode: leetcode.com/u/Megz_001
- Technical Skills:
  * Languages: Java, JavaScript, Python, SQL
  * Core CS: Data Structures & Algorithms, OOP (Object-Oriented Programming), DBMS, OS (Operating Systems), Computer Networks, Software Engineering
  * Web Technologies: React.js, Next.js, Node.js, Express.js, RESTful APIs, MERN Stack
  * Databases: MySQL, MongoDB, Redis, PostgreSQL
  * Tools: GitHub, Postman, MongoDB Atlas, Vercel, Render
  * AI & Automation: LLMs, Prompt Engineering, LangChain, n8n Workflows, Agentic AI Systems
- Key Highlighted Projects:
  1. Gen AI Interview Preparation System (2026): A Node.js/Express/MongoDB platform that parses resumes & job descriptions to identify skill gaps, generate customized study plans, and provide simulated mock questions. Uses JWT & prompt engineering.
  2. Real Estate Marketplace (MERN Stack - Aug 2025 to Present): A complete property trading hub with user auth, listing publishing, multi-parameter search/filtering, and optimized database queries.
  3. Full Stack AI Blog Platform (Next.js/MongoDB/n8n - May 2025 to Jul 2025): An autonomous content writer system reducing human editorial effort by 80% via n8n automated flows, LangChain content builders, and Next.js ISR.
- Certifications:
  * IBM (Coursera) – Java Full Stack Developer Professional Certificate
  * NPTEL (IIT Kanpur) – Cloud Computing
  * Metacrafter – Blockchain Technology (Ethereum & Polygon)
- Core Strengths & Interests: Financial technology (FinTech), scalable cloud-native architectures, data-driven systems, collaborative agile delivery, and end-to-end automation.

Conversational Rules:
1. Answer concisely. Do not write extremely long paragraphs unless detail is specifically requested. Use formatting (bullet points, bold text) to keep answers scannable.
2. If asked about something unrelated to Megha's professional life (e.g. food, sports scores, generic history), gently and politely redirect the user back to asking about Megha's software engineering background and how she can add value to their team.
3. Be enthusiastic about opportunities! If someone asks about hiring her, encourage them to use the contact form on the portfolio or send her an email at meghagusain03@gmail.com.`;

      // Use gemini-3.5-flash as the default Basic Text model
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ reply: response.text || "I apologize, I could not formulate a reply. Please try asking again." });
    } catch (error: any) {
      console.error("Error in AI Twin Chat API:", error);
      return res.status(500).json({ error: "AI assistant service is currently unavailable. Please try again later." });
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
