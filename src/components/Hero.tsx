import { motion, type Variants } from 'motion/react';
import { ArrowDown, ArrowRight, Github, Linkedin, Code, Sparkles } from 'lucide-react';
import { ME_INFO, PROJECTS, CERTIFICATIONS } from '../data';
import FloatingTechIcons from './effects/FloatingTechIcons';
import CircularBadge from './effects/CircularBadge';

interface HeroProps {
  onChatClick: () => void;
}

export default function Hero({ onChatClick }: HeroProps) {
  // Stagger parameters for landing animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden no-print">
      {/* Decorative tech background elements */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-accent/5 dark:bg-brand-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-brand-teal/5 dark:bg-brand-teal/10 blur-3xl pointer-events-none" />

      {/* Floating brand tech icons */}
      <FloatingTechIcons />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text columns */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Indicator */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
                Available for Software Engineering Roles &middot; May 2026 Graduate
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3">
              <motion.span
                variants={itemVariants}
                className="text-sm font-mono font-bold uppercase tracking-widest text-brand-accent"
              >
                Full-Stack Developer & AI Automation Engineer
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-none"
              >
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-teal">{ME_INFO.name}</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl font-normal leading-relaxed"
            >
              I build reliable full-stack applications with beautiful interfaces, design secure and highly performant REST APIs, and engineer autonomous agent workflows that simplify complex challenges.
            </motion.p>

            {/* Social Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={ME_INFO.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-brand-accent dark:hover:text-white hover:border-brand-accent hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-mono text-xs"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={ME_INFO.github}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-brand-accent dark:hover:text-white hover:border-brand-accent hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-mono text-xs"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={ME_INFO.leetcode}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-brand-accent dark:hover:text-white hover:border-brand-accent hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-mono text-xs"
              >
                <Code className="h-4 w-4" />
                <span>LeetCode</span>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-4">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={onChatClick}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-brand-accent/50 hover:border-brand-accent text-neutral-900 dark:text-white bg-brand-accent/5 hover:bg-brand-accent/10 transition-all"
              >
                <Sparkles className="h-4 w-4 text-brand-accent" />
                <span>Chat with Megha's AI Twin</span>
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-md pt-6 mt-2 border-t border-neutral-200 dark:border-neutral-800"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white">7.59</p>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">CGPA</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white">{PROJECTS.length}+</p>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">Projects Shipped</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white">{CERTIFICATIONS.length}</p>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">Certifications</p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Card (asymmetric grid / visual mockup) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-full max-w-sm aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl bg-gradient-to-br from-brand-accent/40 via-neutral-200/40 dark:via-brand-border-dark/40 to-brand-teal/40 p-px shadow-xl hover:shadow-2xl hover:shadow-brand-accent/20 transition-shadow"
            >
              {/* Decorative circular rotating badge, anchored to the card's own corner so it never overlaps its content */}
              <div className="hidden lg:block absolute bottom-25 right-20 translate-x-full translate-y-full z-20">
                <CircularBadge
                  centerText={`${PROJECTS.length}+`}
                  centerLabel="Projects Shipped & Counting"
                  size={130}
                />
              </div>

              <div className="relative h-full w-full rounded-2xl bg-white/60 dark:bg-brand-card-dark/60 backdrop-blur-md p-6">
                {/* Outer visual decor */}
                <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 p-2 bg-brand-teal/10 rounded-full text-brand-teal">
                  <Sparkles className="h-5 w-5" />
                </div>

                {/* Code window mock */}
                <div className="flex flex-col h-full font-mono text-xs">
                  <div className="flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 ml-2">megha.config.json</span>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    <div>
                      <span className="text-indigo-400">const</span> <span className="text-teal-400">engineer</span> = &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-500 dark:text-neutral-400">education:</span> <span className="text-amber-500 dark:text-amber-400">"Chandigarh University"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-500 dark:text-neutral-400">cgpa:</span> <span className="text-indigo-500 dark:text-indigo-300">7.59</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-500 dark:text-neutral-400">coreStack:</span> [
                      <span className="text-amber-500 dark:text-amber-400">"Java"</span>, <span className="text-amber-500 dark:text-amber-400">"React"</span>, <span className="text-amber-500 dark:text-amber-400">"Express"</span>
                      ],
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-500 dark:text-neutral-400">focusAreas:</span> [
                      <span className="text-amber-500 dark:text-amber-400">"Full-Stack APIs"</span>, <span className="text-amber-500 dark:text-amber-400">"AI Agents"</span>
                      ],
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-500 dark:text-neutral-400">passionateAbout:</span> <span className="text-amber-500 dark:text-amber-400">"Scale, Automation & Clean Architecture"</span>
                    </div>
                    <div>&#125;;</div>

                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <div className="text-emerald-600 dark:text-emerald-500 font-bold flex items-center gap-1">
                        <span>&gt;</span>
                        <span className="animate-pulse">n8n run automations --active</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                        [INFO] 3 autonomous workflows listening ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        >
          <a href="#about" aria-label="Scroll down to About section">
            <ArrowDown className="h-5 w-5 text-neutral-400 hover:text-brand-accent transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
