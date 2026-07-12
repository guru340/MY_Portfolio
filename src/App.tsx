import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'light';
  });

  // Keep theme class updated and save preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Track scroll position to update active navbar link automatically
  useEffect(() => {
    const sections = ['about', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for headers

      // Find the current active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler when navbar item is clicked
  const handleNavClick = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] // Custom smooth bezier curve for premium editorial feel
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="min-h-screen bg-warm-beige relative overflow-hidden bg-dotted-grid pb-24" id="portfolio-app-root">
      {/* Editorial aesthetic top accent border line */}
      <div className="w-full h-1 bg-gray-900 dark:bg-white transition-colors" id="top-accent-line" />

      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Container Column */}
      <main className="max-w-[800px] mx-auto px-6 pt-6 flex flex-col gap-4" id="main-content-column">
        {/* Hero Banner Area */}
        <Hero />

        {/* Section Blocks with smooth scroll animations */}
        <motion.div {...sectionAnimation}>
          <About />
        </motion.div>

        <motion.div {...sectionAnimation}>
          <Projects />
        </motion.div>

        <motion.div {...sectionAnimation}>
          <Contact />
        </motion.div>

        {/* Brand Footer */}
        <Footer />
      </main>
      <BackToTop />
       <Analytics />
    </div>
    
  );
}
