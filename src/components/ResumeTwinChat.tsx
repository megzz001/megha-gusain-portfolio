import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowUpRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface ResumeTwinChatProps {
  isInitiallyOpen?: boolean;
}

export default function ResumeTwinChat({ isInitiallyOpen = false }: ResumeTwinChatProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: "Hello! I am Megha's AI twin. I have full knowledge of her resume, engineering skill set, and projects. Ask me anything about her experience, education, or technical competencies!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const suggestionPrompts = [
    "Tell me about her AI projects.",
    "Does she know Java or React?",
    "What is her CGPA & education?",
    "How does she use n8n?",
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Package up full chat history for Gemini context
      const chatHistory = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply || "I apologize, I wasn't able to compile a clear reply.",
            timestamp: new Date()
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.error || "The AI model encountered a temporary difficulty. Please verify connection.",
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I am unable to reach the server. Please verify if the server is running correctly on port 3000.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print" id="ai-chat-twin">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 px-4.5 py-3.5 rounded-full bg-brand-accent text-white shadow-xl hover:bg-brand-accent/95 transition-all shadow-brand-accent/20 cursor-pointer"
        >
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="font-display font-bold text-sm">Chat with Megha's AI Twin</span>
        </motion.button>
      )}

      {/* Expanded Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-80 sm:w-96 h-[500px] rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between p-4 bg-brand-accent text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded bg-white/10">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm">Megha's AI Twin</h3>
                  <span className="text-[10px] text-white/70 font-mono">Gemini 3.5 Flash &middot; Professional Agent</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-50/50 dark:bg-neutral-950/20">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                        isAi
                          ? 'bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none font-normal leading-relaxed shadow-sm'
                          : 'bg-brand-accent text-white rounded-tr-none font-medium'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`text-[9px] font-mono block mt-1.5 text-right ${
                          isAi ? 'text-neutral-400' : 'text-white/60'
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* simulated loading bubble */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 text-neutral-400 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs">
                    <Loader2 className="h-4.5 w-4.5 animate-spin text-brand-accent" />
                    <span className="font-mono">Drafting response...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Prompts Segment (Scrollable horizontally) */}
            <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-brand-card-dark overflow-x-auto flex gap-2 no-scrollbar scroll-smooth">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 hover:text-brand-accent dark:hover:text-white hover:border-brand-accent dark:hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <span>{prompt}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              ))}
            </div>

            {/* Input Segment */}
            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-brand-card-dark flex gap-2">
              <input
                type="text"
                placeholder="Ask about her skills, experience..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) handleSend(input);
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-brand-accent placeholder-neutral-400 transition-colors"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-brand-accent text-white hover:bg-brand-accent/90 disabled:bg-neutral-100 dark:disabled:bg-neutral-900 disabled:text-neutral-400 transition-colors cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
