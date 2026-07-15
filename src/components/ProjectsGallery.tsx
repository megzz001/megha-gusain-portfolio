import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, BookOpen, X, Code2, ShieldAlert } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            <rect width="400" height="240" fill="currentColor" fillOpacity="0.03" />
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
      case "real-estate":
        return (
          <svg className="w-full h-full text-brand-teal" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" fill="currentColor" fillOpacity="0.03" />
            {/* Grid layout mock */}
            <rect x="25" y="25" width="165" height="110" rx="12" fill="currentColor" fillOpacity="0.06" />
            <rect x="35" y="35" width="145" height="60" rx="8" fill="currentColor" fillOpacity="0.1" />
            <rect x="35" y="105" width="110" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
            <rect x="35" y="117" width="60" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />

            <rect x="210" y="25" width="165" height="110" rx="12" fill="currentColor" fillOpacity="0.06" />
            <rect x="220" y="35" width="145" height="60" rx="8" fill="currentColor" fillOpacity="0.1" />
            <rect x="220" y="105" width="110" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
            <rect x="220" y="117" width="60" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />

            {/* Map sidebar or search */}
            <rect x="25" y="155" width="350" height="60" rx="14" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" />
            <circle cx="60" cy="185" r="14" fill="currentColor" fillOpacity="0.1" />
            <rect x="88" y="181" width="140" height="8" rx="4" fill="currentColor" fillOpacity="0.25" />
            <rect x="280" y="173" width="75" height="24" rx="8" fill="currentColor" fillOpacity="0.15" />
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
    <section id="projects" className="py-24 px-4 bg-neutral-50/40 dark:bg-neutral-900/10 border-t border-neutral-100 dark:border-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Title block */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Featured Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mt-1">
            Software & Automations
          </h2>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="flex flex-col h-full rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
            >
              {/* Visual SVG top segment */}
              <div className="relative w-full aspect-[1.6] bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center border-b border-neutral-200/50 dark:border-neutral-800/50">
                {renderProjectVisual(project.id)}
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-all pointer-events-none" />
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
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read Case Study</span>
                    </button>
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
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-brand-card-dark">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
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
