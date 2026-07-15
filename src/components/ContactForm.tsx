import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare, Tag, User, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Track messages sent during this session to display in the UI "Outbox"
  const [sessionOutbox, setSessionOutbox] = useState<any[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    // Basic Validation
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all mandatory fields (Name, Email, and Message).");
      setLoading(false);
      return;
    }

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
        
        // Add to local outbox log to prove physical delivery to backend API
        setSessionOutbox(prev => [
          {
            id: Date.now().toString(),
            ...form,
            timestamp: new Date().toLocaleTimeString()
          },
          ...prev
        ]);

        // Reset form inputs
        setForm({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setErrorMsg(data.error || "Something went wrong on the server. Please try again.");
      }
    } catch (err: any) {
      console.error("API submission error:", err);
      setErrorMsg("Unable to reach the backend service. Make sure the server is online.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-neutral-50/40 dark:bg-neutral-900/10 border-t border-neutral-100 dark:border-neutral-950 transition-colors duration-300 no-print">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mt-1">
            Let's Collaborate
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Column (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark shadow-sm">
              <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-4">
                Direct Contact Lines
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                If you are a recruiter, startup founder, or engineering leader seeking highly automated workflows and reliable web architectures, reach out directly.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300">
                  <Mail className="h-4 w-4 text-brand-accent" />
                  <span>meghagusain03@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300">
                  <User className="h-4 w-4 text-brand-teal" />
                  <span>+91 98884 27804</span>
                </div>
              </div>
            </div>

            {/* Live Outbox Monitor Card */}
            {sessionOutbox.length > 0 && (
              <div className="p-6 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-100/40 dark:bg-neutral-950/20 shadow-inner">
                <h4 className="font-mono text-[10px] font-bold text-brand-teal uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-teal" />
                  <span>Backend Inbox Outbox Log</span>
                </h4>
                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {sessionOutbox.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800 bg-white dark:bg-brand-card-dark font-mono text-[10px] space-y-1"
                    >
                      <div className="flex justify-between items-center text-[9px] text-neutral-400">
                        <span className="font-bold text-neutral-600 dark:text-neutral-300">{msg.name}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="text-neutral-500 dark:text-neutral-400 line-clamp-1">{msg.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields Column (col-span-7) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark shadow-sm space-y-5"
          >
            {/* Success and Error Indicators */}
            {successMsg && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{errorMsg}</span>
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
                    placeholder="Jane Doe"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-white dark:focus:bg-brand-card-dark transition-all text-neutral-800 dark:text-neutral-200"
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
                    placeholder="jane@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-white dark:focus:bg-brand-card-dark transition-all text-neutral-800 dark:text-neutral-200"
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-white dark:focus:bg-brand-card-dark transition-all text-neutral-800 dark:text-neutral-200"
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-sm focus:outline-none focus:border-brand-accent focus:bg-white dark:focus:bg-brand-card-dark transition-all text-neutral-800 dark:text-neutral-200"
                />
              </div>
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-brand-accent hover:bg-brand-accent/90 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 text-white transition-all shadow-md shadow-brand-accent/15 cursor-pointer"
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

        </div>

      </div>
    </section>
  );
}
