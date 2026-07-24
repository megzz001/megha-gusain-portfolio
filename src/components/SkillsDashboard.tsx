import { motion, type Variants } from 'motion/react';
import { Code2, Users2, Lightbulb, Clock, UserCog, type LucideIcon } from 'lucide-react';
import { SKILL_CATEGORIES, SOFT_SKILLS } from '../data';

const TECHNICAL_SKILLS = SKILL_CATEGORIES
  .filter((cat) => cat.category !== 'Core CS Fundamentals')
  .flatMap((cat) => cat.items.map((item) => item.name));

const SOFT_SKILL_ICONS: Record<string, LucideIcon> = {
  'Problem-Solving': Lightbulb,
  'Project Management': Clock,
  'Leadership': UserCog,
  'Teamwork': Users2,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

export default function SkillsDashboard() {
  return (
    <section id="skills" className="py-24 px-4 bg-white dark:bg-brand-bg-dark border-t border-neutral-100 dark:border-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mt-1">
            Skills &amp; Strengths
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Technical Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg hover:shadow-brand-accent/5 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-brand-accent/10 text-brand-accent"
              >
                <Code2 className="h-4 w-4" />
              </motion.div>
              <h3 className="text-xl font-display font-bold text-foreground">Technical Skills</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2.5"
            >
              {TECHNICAL_SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:border-brand-accent hover:text-brand-accent transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Soft Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg hover:shadow-brand-teal/5 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-brand-teal/10 text-brand-teal"
              >
                <Users2 className="h-4 w-4" />
              </motion.div>
              <h3 className="text-xl font-display font-bold text-foreground">Soft Skills</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3"
            >
              {SOFT_SKILLS.map((skill) => {
                const Icon = SOFT_SKILL_ICONS[skill] ?? Lightbulb;
                return (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-background border border-border hover:border-brand-teal/50 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-brand-teal shrink-0" />
                    <span className="font-medium text-foreground">{skill}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
