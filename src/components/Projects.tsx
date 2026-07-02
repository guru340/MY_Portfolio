import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { Github, Globe, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

  return (
    <section className="py-12 border-b border-warm-border/60 scroll-mt-20" id="projects">
      <div className="flex flex-col gap-8" id="projects-container">
        {/* Section Header */}
        <div className="flex items-center justify-between" id="projects-header">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-extrabold text-gray-900 dark:text-white tracking-wider uppercase">Projects</span>
            <div className="h-px w-24 bg-warm-border/60" />
          </div>
          <span className="font-sans text-[10px] font-extrabold text-gray-900 dark:text-white tracking-wider uppercase">Selected Works</span>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="featured-projects-list">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-[#0B0B0B] border border-warm-border dark:border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 h-full"
              id={`featured-card-${project.id}`}
            >
              {/* Project Image Frame with Hover Zoom */}
              <div className="relative aspect-[16/10] w-full bg-warm-beige dark:bg-[#161616] overflow-hidden border-b border-warm-border dark:border-neutral-800" id={`img-container-${project.id}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter brightness-[95%] transition-transform duration-700 ease-out group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-4 flex-grow justify-between" id={`body-container-${project.id}`}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0.5" id={`title-row-${project.id}`}>
                    <h3 className="font-sans text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <span className="font-sans text-sm text-gray-400 dark:text-neutral-500 font-medium">
                      {project.year || "2025"}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-neutral-400 text-xs font-medium leading-relaxed font-sans mt-1" id={`desc-${project.id}`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Chips Full list */}
                  <div className="flex flex-wrap gap-1.5 pt-2" id={`chips-list-${project.id}`}>
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-sans font-bold text-gray-600 dark:text-neutral-300 bg-gray-100 dark:bg-neutral-800/80 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-3" id={`actions-${project.id}`}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-warm-border dark:border-neutral-700 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm font-sans"
                      id={`live-link-${project.id}`}
                    >
                      <Globe className="w-3.5 h-3.5 text-gray-700 dark:text-neutral-300" />
                      <span>Website</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-warm-border dark:border-neutral-700 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm font-sans"
                      id={`github-link-${project.id}`}
                    >
                      <Github className="w-3.5 h-3.5 text-gray-700 dark:text-neutral-300" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Other Projects List */}
        {otherProjects.length > 0 && (
          <div className="flex flex-col items-center mt-4" id="other-projects-wrapper">
            {/* Show More toggle button */}
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-5 py-3 bg-warm-card border border-warm-border hover:border-gray-400 dark:hover:border-neutral-700 hover:bg-warm-beige/25 dark:hover:bg-neutral-800 rounded-full text-xs font-mono tracking-wider uppercase text-gray-700 dark:text-neutral-300 transition-all duration-300 shadow-sm cursor-pointer"
              id="toggle-projects-btn"
            >
              <span>{showAll ? "Compress Project Index" : "View Secondary Project Index"}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>

            {/* Expanded List with smooth enter animation */}
            <AnimatePresence>
              {showAll && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
                  id="other-projects-grid"
                >
                  {otherProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-5 bg-white dark:bg-[#0B0B0B] border border-warm-border dark:border-neutral-800 rounded-3xl flex flex-col justify-between gap-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-200"
                      id={`other-card-${project.id}`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-sans text-lg font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-sans text-gray-400 dark:text-neutral-500 font-medium">
                            {project.year || "2025"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed font-sans">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[9px] font-sans font-bold text-gray-600 dark:text-neutral-300 bg-gray-100 dark:bg-neutral-800/80 rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Repo actions */}
                        <div className="flex items-center justify-between border-t border-warm-border/50 dark:border-neutral-800 pt-2 text-[10px]">
                          <div className="flex items-center gap-2">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-warm-border dark:border-neutral-700 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm font-sans"
                              >
                                <Github className="w-3.5 h-3.5 text-gray-700 dark:text-neutral-300" />
                                <span>Source</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-warm-border dark:border-neutral-700 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm font-sans"
                              >
                                <Globe className="w-3.5 h-3.5 text-gray-700 dark:text-neutral-300" />
                                <span>Website</span>
                              </a>
                            )}
                          </div>
                          <span className="text-gray-400 dark:text-neutral-500 font-mono">Microservice</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
