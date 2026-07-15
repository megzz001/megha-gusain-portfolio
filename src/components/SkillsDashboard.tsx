import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code2, Database, Library, Settings, Bot } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

export default function SkillsDashboard() {
  const [activeTab, setActiveTab] = useState("Languages");
  const [searchQuery, setSearchQuery] = useState("");

  // Map category names to helpful icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 className="h-4 w-4" />;
      case "Technologies & Frameworks":
        return <Library className="h-4 w-4" />;
      case "AI & Automation":
        return <Bot className="h-4 w-4" />;
      case "Databases & Tools":
        return <Database className="h-4 w-4" />;
      case "Core CS Fundamentals":
        return <Settings className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  // Level classification helper
  const getLevelLabel = (level: number) => {
    if (level >= 90) return "Expert / Fluent";
    if (level >= 85) return "Advanced";
    return "Competent";
  };

  // Find category list matching active search or category tab
  const categoriesToRender = SKILL_CATEGORIES.map(category => {
    if (searchQuery.trim() === "") {
      return category.category === activeTab ? category : null;
    } else {
      const filteredItems = category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredItems.length > 0 ? { ...category, items: filteredItems } : null;
    }
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="skills" className="py-24 px-4 bg-white dark:bg-brand-bg-dark border-t border-neutral-100 dark:border-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
              Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mt-1">
              Technical Arsenal
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-brand-border-dark rounded-xl text-sm bg-neutral-50/50 dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>

        {/* Categories Tab Navigation (Only visible when not searching) */}
        {searchQuery.trim() === "" && (
          <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-100 dark:border-neutral-900 pb-4 overflow-x-auto no-scrollbar">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.category;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(cat.category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-brand-accent text-white shadow-md shadow-brand-accent/10"
                      : "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {getCategoryIcon(cat.category)}
                  <span>{cat.category}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Skills Presentation Area */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={searchQuery ? "search" : activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {categoriesToRender.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 dark:text-neutral-500 font-mono text-sm">
                  No skills matching "{searchQuery}" found in our database.
                </div>
              ) : (
                categoriesToRender.map((catGroup) => (
                  <div key={catGroup.category} className="space-y-4">
                    {searchQuery.trim() !== "" && (
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
                        {getCategoryIcon(catGroup.category)}
                        <span>{catGroup.category}</span>
                      </h3>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catGroup.items.map((skill) => (
                        <div
                          key={skill.name}
                          className="group relative p-5 rounded-xl border border-neutral-200/60 dark:border-brand-border-dark bg-white dark:bg-brand-card-dark hover:border-brand-accent/30 dark:hover:border-brand-accent/30 shadow-sm transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-semibold text-neutral-800 dark:text-white text-sm group-hover:text-brand-accent transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                              {getLevelLabel(skill.level)}
                            </span>
                          </div>

                          {/* Interactive skill slider bar */}
                          <div className="relative w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-accent to-brand-teal rounded-full"
                            />
                          </div>

                          <div className="flex justify-between items-center mt-2.5">
                            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                              Skill Index
                            </span>
                            <span className="text-[11px] font-mono font-semibold text-brand-accent dark:text-brand-teal">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
