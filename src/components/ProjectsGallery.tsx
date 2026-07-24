import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, BookOpen, X, Code2, ShieldAlert } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewBlocked, setPreviewBlocked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Pin the section and scrub the track horizontally as the user scrolls vertically (desktop only)
  useEffect(() => {
    setPreviewBlocked(false);
  }, [selectedProject?.id]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollDistance = track.scrollWidth - track.clientWidth;
      if (scrollDistance <= 0) return;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top+=88',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, { x: () => -scrollDistance, ease: 'none' }),
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  // Keyboard accessibility: ESC key to close modal
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedProject(null);
    }
  };

  // Helper to render abstract SVG visual blueprints based on project IDs
  const renderProjectVisual = (id: string) => {
    switch (id) {
      case "interview-prep":
        return (
          <svg className="w-full h-full text-brand-accent" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="currentColor" fillOpacity="0.03" />
            {/* Mock Chat bubbles */}
            <rect x="30" y="30" width="220" height="40" rx="12" fill="currentColor" fillOpacity="0.08" />
            <circle cx="55" cy="50" r="10" fill="currentColor" fillOpacity="0.15" />
            <rect x="75" y="44" width="150" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
            <rect x="75" y="54" width="100" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />

            <rect x="150" y="85" width="220" height="40" rx="12" fill="currentColor" fillOpacity="0.12" />
            <circle cx="345" cy="105" r="10" fill="currentColor" fillOpacity="0.25" />
            <rect x="175" y="99" width="150" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
            <rect x="225" y="109" width="100" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />

            {/* AI analysis badge */}
            <rect x="30" y="150" width="340" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" />
            <path d="M50 180h300" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.15" />
            <circle cx="120" cy="180" r="12" fill="#6366f1" />
            <path d="M117 180l2-2 2 2 1-1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="280" cy="180" r="12" fill="#14b8a6" />
            <rect x="142" y="177" width="110" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
          </svg>
        );
      case "cloudware":
        return (
          <svg className="w-full h-full text-brand-teal" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" fill="currentColor" fillOpacity="0.03" />
            {/* Cloud storage layout mock */}
            <rect x="35" y="45" width="330" height="150" rx="16" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.12" />
            <rect x="60" y="72" width="120" height="70" rx="10" fill="currentColor" fillOpacity="0.1" />
            <rect x="195" y="72" width="145" height="18" rx="6" fill="currentColor" fillOpacity="0.18" />
            <rect x="195" y="100" width="110" height="10" rx="5" fill="currentColor" fillOpacity="0.12" />
            <rect x="195" y="118" width="85" height="10" rx="5" fill="currentColor" fillOpacity="0.1" />
            <path d="M90 110c10-25 42-35 60-15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.22" />
            <circle cx="315" cy="145" r="28" fill="currentColor" fillOpacity="0.14" />
            <path d="M300 145h30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.25" />
            <path d="M315 130v30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.25" />
          </svg>
        );
      case "ai-blog":
        return (
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" fill="currentColor" fillOpacity="0.03" />
            {/* Automation flow graphs */}
            <circle cx="70" cy="120" r="24" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
            <circle cx="200" cy="70" r="24" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
            <circle cx="200" cy="170" r="24" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
            <circle cx="330" cy="120" r="24" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />

            {/* Connecting arrows */}
            <path d="M94 110l82-30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.4" />
            <path d="M94 130l82 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.4" />
            <path d="M224 80l82 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.4" />
            <path d="M224 160l82-30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.4" />

            {/* Inner tiny indicators */}
            <circle cx="70" cy="120" r="4" fill="#6366f1" />
            <circle cx="200" cy="70" r="4" fill="#14b8a6" />
            <circle cx="200" cy="170" r="4" fill="#3b82f6" />
            <circle cx="330" cy="120" r="4" fill="#10b981" />

            {/* Flow trigger labels */}
            <rect x="40" y="55" width="60" height="16" rx="4" fill="currentColor" fillOpacity="0.08" />
            <rect x="50" y="61" width="40" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />
            <rect x="300" y="165" width="60" height="16" rx="4" fill="currentColor" fillOpacity="0.08" />
            <rect x="310" y="171" width="40" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center px-4 bg-neutral-900/10 border-t border-neutral-950 transition-colors duration-300 overflow-visible">
      <div className="max-w-7xl mx-auto w-full">

        {/* Title block */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Featured Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Software & Automations
          </h2>
        </div>

        {/* Horizontal-scroll track on desktop, swipeable row on mobile/tablet */}
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto lg:overflow-visible pb-6 lg:pb-8 snap-x snap-mandatory lg:snap-none no-scrollbar lg:pl-1 lg:pr-6"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="flex flex-col h-full min-h-[520px] w-[85vw] sm:w-[420px] lg:w-[400px] shrink-0 snap-center rounded-2xl border border-brand-border-dark glass shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
            >
              {/* Visual screenshot or SVG top segment */}
              <div className="relative w-full aspect-[1.6] bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center border-b border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden">
                {project.screenshotUrl ? (
                  <img
                    src={project.screenshotUrl}
                    alt={`${project.title} screenshot`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  renderProjectVisual(project.id)
                )}
                <div className="absolute inset-0 bg-neutral-950/16 group-hover:bg-neutral-950/0 transition-all pointer-events-none" />
              </div>

              {/* Main content body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    <span>{project.period}</span>
                    <span>&middot;</span>
                    <span className="text-brand-accent">{project.role}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  {/* Tech stack items */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/40 dark:border-neutral-700/30 text-[10px] font-mono text-neutral-600 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Trigger buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read Case Study</span>
                    </button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
                        aria-label="View source repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Interactive Case Study Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto no-print"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-modal="true"
              role="dialog"
            >
              {/* Clicking outside closes the modal */}
              <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
                      Case Study &middot; {selectedProject.period}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close Case Study"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-1">

                  {/* Screenshot preview */}
                  {selectedProject.screenshotUrl && (
                    <div className="overflow-hidden rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-950">
                      <img
                        src={selectedProject.screenshotUrl}
                        alt={`${selectedProject.title} preview screenshot`}
                        className="w-full max-h-[280px] object-cover"
                      />
                    </div>
                  )}

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 font-mono text-xs">
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Role</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedProject.role || "Developer"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Period</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedProject.period}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-neutral-400 block mb-0.5">Focus Tech</span>
                      <span className="font-semibold text-brand-teal">{selectedProject.tech[0]} &amp; {selectedProject.tech[1]}</span>
                    </div>
                  </div>

                  {selectedProject.demoUrl && (
                    <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 overflow-hidden bg-neutral-950/95 shadow-inner">
                      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-800/80">
                        <div>
                          <h4 className="text-[11px] font-mono uppercase tracking-wider text-brand-accent">Live Preview</h4>
                          <p className="text-xs text-neutral-400">See the deployed experience directly in the browser.</p>
                        </div>
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-3 py-2 text-xs font-semibold text-brand-accent hover:bg-brand-accent/20 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Open Demo</span>
                        </a>
                      </div>
                      <div className="relative aspect-video bg-neutral-900">
                        {previewBlocked ? (
                          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-sm text-neutral-400">
                            <p>This demo may block direct embedding on its hosting platform.</p>
                            <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-accent">
                              Open it in a new tab instead
                            </a>
                          </div>
                        ) : (
                          <iframe
                            src={selectedProject.demoUrl}
                            title={`${selectedProject.title} preview`}
                            loading="lazy"
                            className="h-full w-full"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                            onLoad={(event) => {
                              try {
                                const href = event.currentTarget.contentWindow?.location.href;
                                if (!href || href === 'about:blank') {
                                  setPreviewBlocked(true);
                                } else {
                                  setPreviewBlocked(false);
                                }
                              } catch {
                                setPreviewBlocked(true);
                              }
                            }}
                            onError={() => setPreviewBlocked(true)}
                          />
                        )}                        $env:PORT=3001; npm run dev                        $env:PORT=3001; npm run dev
                      </div>
                    </div>
                  )}

                  {/* Problem & Solution block */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono uppercase tracking-wider text-brand-accent flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      <span>Project Context &amp; Objectives</span>
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                      {selectedProject.description}
                    </p>
                    <ul className="space-y-2.5">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                          <span className="text-brand-accent flex-shrink-0 mt-1">&middot;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Highlights (Resume points) */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                    <h4 className="text-sm font-mono uppercase tracking-wider text-brand-teal flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Key Technical Accomplishments</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-3.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/40 dark:bg-neutral-900/40 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="text-emerald-500 font-bold">&#10003;</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Tech Stack Pills */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Detailed Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/40 dark:border-neutral-700/30 text-xs font-mono text-neutral-600 dark:text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Section */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-brand-card-dark">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open Live Demo</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>View Codebase</span>
                    </a>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
