import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Download, Terminal } from 'lucide-react';

interface NavbarProps {
  onPrintResume: () => void;
}

export default function Navbar({ onPrintResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  // Shrink padding and fade in a translucent dark background as the page scrolls
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let scrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        nav.style.paddingTop = isScrolled ? '1rem' : '1.5rem';
        nav.style.paddingBottom = isScrolled ? '1rem' : '1.5rem';
        nav.style.backgroundColor = isScrolled ? 'rgba(17,24,39,0.7)' : 'rgba(17,24,39,0)';
        nav.style.backdropFilter = isScrolled ? 'blur(10px)' : 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full transition-[padding,background-color] duration-300 no-print"
      style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-white group">
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
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Print / Save Resume Button */}
            <button
              id="download-resume-btn"
              onClick={onPrintResume}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-accent to-brand-teal text-white hover:scale-105 transition-transform shadow-md shadow-brand-accent/20"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-200 hover:bg-white/10"
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
          className="md:hidden glass mx-4 mt-3 rounded-2xl px-2 pt-2 pb-4 space-y-1"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-white/10 px-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onPrintResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-brand-accent to-brand-teal text-white"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
