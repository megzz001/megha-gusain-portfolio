import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { EXPERIENCE, CERTIFICATIONS } from '../data';

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="py-24 px-4 bg-white dark:bg-brand-bg-dark border-t border-neutral-100 dark:border-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mt-1">
            Experience & Education
          </h2>
        </div>

        {/* Dynamic Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Timeline Section (col-span-7) */}
          <div className="lg:col-span-7 relative border-l border-neutral-200 dark:border-neutral-800 pl-6 sm:pl-8 ml-4 space-y-12">
            {EXPERIENCE.map((exp, idx) => (
              <div key={exp.id} className="relative group">

                {/* Visual Bullet Icon */}
                <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-accent group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300 shadow-sm">
                  {exp.type === 'experience' ? <Briefcase className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                </span>

                <div className="space-y-3">
                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 dark:text-neutral-500">
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
                    <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-brand-teal mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed max-w-xl">
                    {exp.description}
                  </p>

                  {/* Highlights/Bullets */}
                  <div className="pt-2 space-y-2">
                    {exp.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed font-light">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Certifications & Badges (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-neutral-50/40 dark:bg-brand-card-dark shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-brand-accent">
                <Award className="h-5 w-5" />
                <h3 className="font-display font-bold text-neutral-900 dark:text-white">
                  Professional Credentials
                </h3>
              </div>

              <div className="space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-brand-accent/30 dark:hover:border-brand-accent/30 shadow-sm transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Issuer: {cert.issuer}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-brand-accent/5 dark:bg-brand-accent/10 text-brand-accent dark:text-brand-teal text-[10px] font-mono font-bold">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Honor Box */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-brand-border-dark bg-gradient-to-r from-indigo-500/5 to-teal-500/5 shadow-sm text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-accent block mb-1">
                Academic Merit Indicator
              </span>
              <div className="text-3xl font-display font-bold text-neutral-900 dark:text-white">
                CGPA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-teal">7.59</span> / 10
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-mono">
                Chandigarh University B.E. CSE (Aug 2022 - May 2026)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
