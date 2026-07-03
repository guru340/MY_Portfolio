import React, { useEffect } from 'react';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  useEffect(() => {
    // Dynamically load Cal.com embed script
    (function (C, A, L, i, t, y) {
      if ((C as any).Cal) return; // Already loaded
      (C as any).Cal = (C as any).Cal || function () {
        let q = (C as any).Cal.q || [];
        q.push(arguments);
        (C as any).Cal.q = q;
      };
      t = A.createElement(L) as HTMLScriptElement;
      t.async = true;
      t.src = i;
      y = A.getElementsByTagName(L)[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      }
    })(window, document, 'script', 'https://assets.cal.com/embed/embed.js');

    // Initialize Cal.com when script is loaded or already exists
    const initCal = () => {
      const cal = (window as any).Cal;
      if (cal) {
        cal("init", { origin: "https://cal.com" });
        cal("ui", {
          "styles": {
            "branding": {
              "brandColor": "#000000"
            }
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      }
    };

    if ((window as any).Cal) {
      initCal();
    } else {
      const timer = setInterval(() => {
        if ((window as any).Cal) {
          initCal();
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  const calUsername = PERSONAx`L_INFO.socials.calcom || "gurusangwani06";

  return (
    <section className="py-12 border-b border-warm-border/60 scroll-mt-20" id="contact">
      <div className="flex flex-col gap-8" id="contact-container">
        {/* Section Header */}
        <div className="flex items-center justify-between" id="contact-header">
          <div className="flex items-center gap-3">
            
            
          </div>
         
        </div>

        {/* Freelance & Collaboration section */}
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center animate-fade-in" id="freelance-collaboration-cta">
          {/* Centered black badge */}
          <span className="inline-flex items-center justify-center px-4 py-1.5 bg-black dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-full tracking-wide uppercase shadow-xs">
            Freelance & Collaboration
          </span>
          
          {/* Huge heading */}
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-6 max-w-[650px] leading-tight">
            Ready to Build Something Great?
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-gray-500 dark:text-neutral-400 font-sans text-sm sm:text-base leading-relaxed max-w-[620px] mt-6">
            I'm available for freelance projects, internships, and professional collaborations. I build scalable full-stack applications using Java, Spring Boot, React, MySQL, and REST APIs, with experience in Docker, Kubernetes, CI/CD, and cloud deployment. I also develop AI-powered solutions using RAG (Retrieval-Augmented Generation) and modern backend architectures to deliver intelligent, production-ready applications that solve real-world problems.
'
          </p>
          
          {/* Centered Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto" id="cta-buttons-row">
            <a
              href={`https://cal.com/${calUsername}`}
              data-cal-link={calUsername}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#111111] hover:bg-black dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 text-xs font-mono uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-center select-none shadow-md hover:scale-[1.01] inline-flex items-center justify-center"
              id="cta-book-btn"
            >
              Book a Free Consultation
            </a>
            <a
              href={PERSONAL_INFO.socials.email}
              className="w-full sm:w-auto bg-warm-card hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-neutral-200 border border-warm-border hover:border-gray-300 dark:border-neutral-700 text-xs font-mono uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-center select-none shadow-xs hover:scale-[1.01] inline-flex items-center justify-center"
              id="cta-email-btn"
            >
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
