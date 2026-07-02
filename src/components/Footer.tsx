import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-transparent" id="app-footer">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono" id="footer-inner-layout">
        {/* Logo and Greeting */}
        <div className="flex items-center gap-2.5" id="footer-left-block">
          <span className="font-serif text-sm font-semibold tracking-tight text-gray-700">M.S.</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 font-sans font-medium">Thanks for coming by.</span>
        </div>

        {/* Technical Stamp */}
        <div className="flex flex-col sm:items-end gap-1 text-[10px]" id="footer-right-block">
          <span>© {currentYear} Mayank Sangwani. All rights reserved.</span>
          
        </div>
      </div>
    </footer>
  );
}
