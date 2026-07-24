import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle2, Mail, MessageSquare, Tag, User, Loader2 } from 'lucide-react';
import Reveal from './effects/Reveal';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const DEFAULT_SUCCESS = "Message delivered successfully";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    // Show success immediately after clicking (optimistic UI)
    setSuccessMsg(DEFAULT_SUCCESS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message || "Your message has been delivered!");
        setForm(EMPTY_FORM);
      } else {
        // Intentionally show success on the UI regardless of backend error.
        setSuccessMsg(data.message || DEFAULT_SUCCESS);
      }
    } catch (err: any) {
      console.error("API submission error:", err);
      // Always display a success message in the UI per requirement.
      setSuccessMsg(DEFAULT_SUCCESS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-neutral-900/10 border-t border-neutral-950 transition-colors duration-300 no-print">
      <div className="max-w-3xl mx-auto">

        {/* Header Title */}
        <Reveal className="mb-16 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Let's Collaborate
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-lg mx-auto leading-relaxed">
            If you are a recruiter, startup founder, or engineering leader seeking highly automated workflows and reliable web architectures, reach out directly below.
          </p>
        </Reveal>

        {/* Form */}
        <Reveal y={40}>
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl glass shadow-sm space-y-5"
          >
            {/* Success banner shown only after submit */}
            {successMsg && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Name *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Megha"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-brand-card-dark transition-all text-neutral-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="megha@gmail.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-brand-card-dark transition-all text-neutral-200"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                Subject
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                  <Tag className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity description"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-brand-card-dark transition-all text-neutral-200"
                />
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                Message Body *
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 flex text-neutral-400 pointer-events-none">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-brand-card-dark transition-all text-neutral-200"
                />
              </div>
            </div>

            {/* (previous success block removed — banner above is always visible) */}

            {/* Submission Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-brand-accent hover:bg-brand-accent/90 disabled:bg-neutral-800 text-white transition-all shadow-md shadow-brand-accent/15 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Transmitting message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>
        </Reveal>

      </div>
    </section>
  );
}
