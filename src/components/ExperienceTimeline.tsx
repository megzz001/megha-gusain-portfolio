import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { EXPERIENCE, CERTIFICATIONS } from '../data';
import { Experience } from '../types';
import Reveal from './effects/Reveal';

function TimelineCard({ exp }: { exp: Experience }) {
  return (
    <div className="glass rounded-2xl p-6 shadow-sm hover:border-brand-accent/30 transition-all duration-300 space-y-3">
      {/* Meta items */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{exp.period}</span>
        </span>
        <span>&middot;</span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{exp.location}</span>
        </span>
      </div>

      {/* Role and Institution */}
      <div>
        <h3 className="text-xl font-display font-bold text-white">{exp.role}</h3>
        <p className="text-sm font-semibold text-brand-teal mt-0.5">{exp.company}</p>
      </div>

      {/* Narrative Description */}
      <p className="text-sm text-slate-400 font-normal leading-relaxed">{exp.description}</p>

      {/* Highlights/Bullets */}
      <div className="pt-2 space-y-2">
        {exp.highlights.map((bullet, bIdx) => (
          <div key={bIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-400">
            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed font-light">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="py-24 px-4 border-t border-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <Reveal className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Experience & Education
          </h2>
        </Reveal>

        {/* Centered alternating timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-slate-700 -translate-x-1/2" />
          {/* Mobile line */}
          <div className="md:hidden absolute left-4 top-2 bottom-2 w-px bg-slate-700" />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = exp.type === 'experience' ? Briefcase : GraduationCap;

              const dot = (
                <span className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full glass border border-brand-accent/40 text-brand-accent z-10">
                  <Icon className="h-4 w-4" />
                </span>
              );

              return (
                <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-12 items-start">
                  {dot}

                  {isLeft ? (
                    <>
                      <Reveal x={-40} className="pl-12 md:pl-0 md:pr-0">
                        <TimelineCard exp={exp} />
                      </Reveal>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <Reveal x={40} className="pl-12 md:pl-0">
                        <TimelineCard exp={exp} />
                      </Reveal>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <Reveal className="mt-20 max-w-xl mx-auto">
          <div className="glass rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-brand-accent">
              <Award className="h-5 w-5" />
              <h3 className="font-display font-bold text-white">Professional Credentials</h3>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:border-brand-accent/30 shadow-sm transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold text-neutral-200 text-sm leading-snug">{cert.title}</h4>
                      <p className="text-xs text-neutral-400 mt-1">Issuer: {cert.issuer}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-brand-accent/10 text-brand-teal text-[10px] font-mono font-bold">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
