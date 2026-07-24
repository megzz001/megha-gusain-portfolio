import { BookOpen, Award, CheckCircle2, Server, TrendingUp, Cpu } from 'lucide-react';
import { ME_INFO } from '../data';
import Reveal from './effects/Reveal';

export default function AboutMe() {
  const coursework = [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Cloud Computing"
  ];

  const highlights = [
    {
      icon: <Server className="h-5 w-5 text-indigo-500" />,
      title: "Full-Stack Development",
      desc: "Robust experience with Node.js, Express, React, and MongoDB (MERN Stack). Skilled in designing relational databases and optimized schema structures."
    },
    {
      icon: <Cpu className="h-5 w-5 text-teal-500" />,
      title: "AI Integration & Workflows",
      desc: "Expertise in integrating LLMs, prompt engineering, and building autonomous agent n8n pipelines that save time and reduce manual workload."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 border-t border-neutral-900 bg-neutral-900/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header Block */}
        <Reveal className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Background & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Engineering for Efficiency
          </h2>
        </Reveal>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Column 1: Objective & Key Pillars (lg:col-span-7) */}
          <Reveal x={-40} className="lg:col-span-7 space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                {ME_INFO.objective}
              </p>
            </div>

            {/* Structured Highlight pillars */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500">
                Core Specialties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 rounded-xl glass shadow-sm hover:border-brand-accent/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-2.5 rounded-lg bg-neutral-800/60 h-11 w-11 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Column 2: Academics & Additional Info (lg:col-span-5) */}
          <Reveal x={40} delay={0.1} className="lg:col-span-5 space-y-8">

            {/* Relevant Coursework Card */}
            <div className="p-6 rounded-2xl glass shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-brand-accent">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-display font-bold text-white">
                  Academic Focus Areas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {coursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800/50 border border-neutral-700/30 text-xs font-mono text-slate-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodology & Additional Info */}
            <div className="p-6 rounded-2xl glass shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-brand-teal">
                <Award className="h-5 w-5" />
                <h3 className="font-display font-bold text-white">
                  Engineering Principles
                </h3>
              </div>
              <ul className="space-y-3.5">
                {ME_INFO.additionalInfo.map((info, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-teal flex-shrink-0" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
}
