import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ activeSection, onNavClick, theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-warm-beige/80 backdrop-blur-md border-b border-nav-border py-3' 
          : 'bg-warm-beige/0 py-5'
      }`}
      id="navbar-header"
    >
      <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
        {/* Logo / Initials */}
        <button
          onClick={() => onNavClick('hero')}
          className="font-serif italic text-xl font-semibold tracking-tight hover:opacity-75 transition-opacity flex items-center gap-1.5 cursor-pointer text-polish-dark"
          id="logo-button"
        >
         
        </button>

        {/* Desktop Navigation Group */}
        <div className="hidden md:flex items-center gap-3" id="desktop-nav-group">
          <nav className="flex items-center gap-1" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`relative px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-gray-950 dark:text-white font-bold' : 'text-gray-500 hover:text-gray-950 dark:hover:text-white'
                  }`}
                  id={`nav-${item.id}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-warm-border/60 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-warm-card border border-warm-border/80 transition-all duration-200 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
            id="theme-toggle-desktop"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2" id="mobile-controls">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-warm-card border border-warm-border/80 transition-all duration-200 text-gray-500 dark:text-gray-400 cursor-pointer"
            id="theme-toggle-mobile"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full bg-warm-card border-b border-warm-border/90 overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="max-w-[800px] mx-auto px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsOpen(false);
                      onNavClick(item.id);
                    }}
                    className={`flex items-center justify-between py-2 text-sm font-medium tracking-wide uppercase border-b border-warm-border/30 last:border-0 ${
                      isActive ? 'text-gray-900 dark:text-white pl-2' : 'text-gray-500 dark:text-neutral-400'
                    } transition-all duration-200`}
                    id={`mobile-nav-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                    )}
                  </button>
                );
              })}
              
              <a
                href="https://github.com/guru340"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white border-t border-warm-border/50 mt-2"
                id="mobile-nav-github"
              >
                <span>GitHub Profiles</span>
                <ArrowUpRight className="w-4 h-4 opacity-75" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
