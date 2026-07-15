import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sun, Moon, Download, Terminal } from 'lucide-react';
import { ME_INFO } from '../data';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onPrintResume: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode, onPrintResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-brand-border-dark bg-white/70 dark:bg-brand-bg-dark/70 backdrop-blur-md transition-colors duration-300 no-print" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-neutral-900 dark:text-white group">
              <Terminal className="h-5 w-5 text-brand-accent group-hover:rotate-12 transition-transform" />
              <span>
                megha<span className="text-brand-accent">.dev</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-brand-accent dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                id="theme-toggle"
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle visual theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Print / Save Resume Button */}
              <button
                id="download-resume-btn"
                onClick={onPrintResume}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-accent text-white hover:bg-brand-accent/90 transition-all shadow-md shadow-brand-accent/10 hover:shadow-brand-accent/20"
              >
                <Download className="h-4 w-4" />
                <span>Resume / Print</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-brand-bg-dark border-b border-neutral-200 dark:border-brand-border-dark px-2 pt-2 pb-4 space-y-1"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-accent dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-neutral-200 dark:border-neutral-800 px-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onPrintResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-accent text-white hover:bg-brand-accent/90"
            >
              <Download className="h-4 w-4" />
              <span>Resume / PDF</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
