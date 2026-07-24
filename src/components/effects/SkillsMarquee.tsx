import { SKILL_CATEGORIES } from '../../data';

const MARQUEE_SKILLS = SKILL_CATEGORIES
  .filter((cat) => cat.category === 'Technologies & Frameworks' || cat.category === 'AI & Automation')
  .flatMap((cat) => cat.items.map((item) => item.name));

export default function SkillsMarquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-neutral-800/60 bg-brand-bg-dark/40 no-print">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex items-center shrink-0" aria-hidden={setIdx === 1}>
            {MARQUEE_SKILLS.map((skill, idx) => (
              <span
                key={`${setIdx}-${skill}-${idx}`}
                className="text-3xl sm:text-4xl font-display font-bold text-slate-500/70 mx-8 flex items-center gap-8"
              >
                {skill}
                <span className="text-brand-accent/50">&bull;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
