import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, Mail, Phone, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { resumeData } from '../utils/resumeData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" id="resume-modal-overlay">
        {/* Background Click to Close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0c0c0c] border border-warm-border dark:border-neutral-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10"
          id="resume-modal-box"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-warm-border dark:border-neutral-800/80 bg-warm-card dark:bg-neutral-900/40" id="resume-modal-header">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Resume</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => generateResumePDF()}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer hover:translate-y-[-1px]"
                id="resume-modal-download-btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                id="resume-modal-close-btn"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Scrollable Paper Canvas */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-warm-card dark:bg-[#111] flex justify-center" id="resume-canvas-scroll">
            <div className="w-full max-w-3xl bg-white text-gray-950 p-8 md:p-12 rounded-xl shadow-lg border border-warm-border/60 font-serif relative" id="resume-sheet">
              {/* Decorative print border indicator */}
              <div className="absolute top-2 right-4 text-[9px] font-mono text-gray-300 uppercase tracking-widest hidden md:block">A4 Paper Dimensions</div>

              {/* Header */}
              <div className="text-center flex flex-col gap-1.5" id="resume-header-sheet">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase font-serif">{resumeData.name}</h1>
                <p className="text-sm text-gray-600 font-sans tracking-wide uppercase font-semibold">{resumeData.title}</p>
                
                {/* Contact row */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-500 mt-2 font-sans">
                  <a href={`tel:${resumeData.phone}`} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {resumeData.phone}
                  </a>
                  <span>•</span>
                  <a href={`mailto:${resumeData.email}`} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {resumeData.email}
                  </a>
                  <span>•</span>
                  <a href={resumeData.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {resumeData.linkedin}
                  </a>
                  <span>•</span>
                  <a href={resumeData.githubUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    {resumeData.github}
                  </a>
                </div>
              </div>

              {/* Separator line */}
              <div className="h-[1px] w-full bg-gray-200 my-6" />

              {/* Summary Section */}
              <section className="mb-6" id="resume-summary-section">
                <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600 font-sans" />
                  Summary
                </h2>
                <div className="h-[1.5px] w-full bg-gray-300 mb-3" />
                <p className="text-gray-700 text-[13px] leading-relaxed font-serif text-justify">{resumeData.summary}</p>
              </section>

              {/* Education Section */}
              <section className="mb-6" id="resume-education-section">
                <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Education
                </h2>
                <div className="h-[1.5px] w-full bg-gray-300 mb-3" />
                
                <div className="flex justify-between items-start font-serif">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{resumeData.education.institution}</h3>
                    <p className="text-gray-600 italic text-xs mt-0.5">{resumeData.education.degree}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-bold text-gray-900">{resumeData.education.period}</p>
                    <p className="text-gray-500 mt-0.5">{resumeData.education.location}</p>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section className="mb-6" id="resume-projects-section">
                <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-600" />
                  Projects
                </h2>
                <div className="h-[1.5px] w-full bg-gray-300 mb-3" />

                <div className="flex flex-col gap-5">
                  {resumeData.projects.map((project, idx) => (
                    <div key={idx} className="font-serif">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-gray-900 text-sm">{project.title}</h3>
                          <span className="text-gray-400 text-xs font-sans">|</span>
                          <span className="text-gray-600 text-xs font-sans">{project.subtitle}</span>
                        </div>
                        <a 
                          href={project.codeUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline font-sans flex items-center gap-0.5"
                        >
                          {project.hasLive ? "Code/Live" : "Code"}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      {/* Bullets */}
                      <ul className="list-disc pl-5 text-[12.5px] text-gray-700 space-y-1 leading-normal mb-1 text-justify">
                        {project.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Tech Used */}
                      <p className="text-[12px] text-gray-800 mt-1">
                        <strong className="font-sans text-[11px] uppercase text-gray-900 tracking-wider">Technologies Used:</strong>{' '}
                        <span className="italic text-gray-700">{project.technologies.join(', ')}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Skills Section */}
              <section className="mb-6" id="resume-skills-section">
                <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Technical Skills
                </h2>
                <div className="h-[1.5px] w-full bg-gray-300 mb-3" />

                <div className="flex flex-col gap-1.5 text-[12.5px] font-serif text-justify">
                  {resumeData.technicalSkills.map((skill, idx) => (
                    <p key={idx} className="text-gray-800">
                      <strong className="font-sans text-[11px] uppercase text-gray-900 tracking-wider w-36 inline-block shrink-0">{skill.label}:</strong>
                      <span className="text-gray-700">{skill.value}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* Achievements Section */}
              <section id="resume-achievements-section">
                <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Achievements
                </h2>
                <div className="h-[1.5px] w-full bg-gray-300 mb-3" />

                <ul className="list-disc pl-5 text-[12.5px] text-gray-700 space-y-1 leading-normal">
                  {resumeData.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-justify">{achievement}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
