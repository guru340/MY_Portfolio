import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { Github, Linkedin, Mail, Twitter, ChevronRight, Download } from 'lucide-react';
import { generateResumePDF } from '../utils/pdfGenerator';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleDownloadResume = () => {
    setIsResumeOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="pt-4 pb-8" id="hero-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-warm-card rounded-3xl p-8 border border-warm-border shadow-sm flex flex-col items-start gap-6 relative transition-colors"
        id="hero-content-wrapper"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="absolute top-6 right-6 flex items-center" id="availability-badge-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/30 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-700 dark:text-emerald-400 font-bold">
              {PERSONAL_INFO.availability}
            </span>
          </div>
        </motion.div>

        {/* Profile Image & Identification */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-6" id="profile-block">
          <motion.div 
            variants={itemVariants}
            className="relative group shrink-0"
            id="avatar-frame"
          >
            <img
              src={PERSONAL_INFO.socials.avatar}
              alt={PERSONAL_INFO.name}
              className="w-20 h-20 rounded-full object-cover border border-warm-border transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              id="avatar-image"
            />
          </motion.div>

          <div className="flex flex-col" id="title-block">
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl tracking-tight text-polish-dark font-semibold leading-tight"
              id="hero-name"
            >
              {PERSONAL_INFO.name}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 dark:text-neutral-400 text-sm md:text-base font-medium mt-0.5"
              id="role-indicator"
            >
              {PERSONAL_INFO.role}
            </motion.p>
          </div>
        </div>

        {/* Short Editorial Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed max-w-[650px]"
          id="hero-tagline"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* Interactive Social Connections & Actions */}
        <motion.div 
          variants={itemVariants}
          className="w-full flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-warm-border/60"
          id="social-actions-bar"
        >
          <div className="flex items-center gap-3" id="social-links-list">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-950 dark:text-neutral-400 dark:hover:text-white bg-warm-beige/35 hover:bg-warm-border/40 dark:bg-neutral-900/40 border border-warm-border/80 rounded-lg transition-all duration-200 cursor-pointer"
              aria-label="GitHub Profile"
              id="link-github"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-950 dark:text-neutral-400 dark:hover:text-white bg-warm-beige/35 hover:bg-warm-border/40 dark:bg-neutral-900/40 border border-warm-border/80 rounded-lg transition-all duration-200 cursor-pointer"
              aria-label="LinkedIn Profile"
              id="link-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-950 dark:text-neutral-400 dark:hover:text-white bg-warm-beige/35 hover:bg-warm-border/40 dark:bg-neutral-900/40 border border-warm-border/80 rounded-lg transition-all duration-200 cursor-pointer"
              aria-label="X Profile"
              id="link-twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.email}
              className="p-2 text-gray-500 hover:text-gray-950 dark:text-neutral-400 dark:hover:text-white bg-warm-beige/35 hover:bg-warm-border/40 dark:bg-neutral-900/40 border border-warm-border/80 rounded-lg transition-all duration-200 cursor-pointer"
              aria-label="Email Contact"
              id="link-mail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2.5" id="hero-actions-container">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-1.5 px-4 py-2 bg-warm-card hover:bg-gray-50 dark:hover:bg-neutral-800 text-polish-dark border border-warm-border hover:border-gray-300 text-[11.5px] uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              id="hero-resume-button"
            >
              <Download className="w-3.5 h-3.5 opacity-80" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => {
                const contactSec = document.getElementById('contact');
                contactSec?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-1.5 px-4 py-2 bg-polish-dark hover:bg-gray-800 dark:hover:bg-neutral-200 text-warm-card dark:text-warm-beige text-[11.5px] uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs"
              id="hero-cta-button"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
