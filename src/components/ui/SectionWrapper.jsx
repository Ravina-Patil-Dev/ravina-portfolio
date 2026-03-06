import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id }) => (
  <motion.section
    id={id}
    className="relative z-10 py-20 px-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-glow border border-transparent animate-glow">
      {children}
    </div>
    <style>{`
      @keyframes glow {
        0%,100% { box-shadow: 0 0 8px 2px rgba(255,255,255,0.2); }
        50% { box-shadow: 0 0 20px 8px rgba(255,255,255,0.6); }
      }
      .animate-glow { animation: glow 2s infinite; }
      .shadow-glow { box-shadow: 0 0 12px rgba(255,255,255,0.1); }
    `}</style>
  </motion.section>
);


// extra styles

SectionWrapper.displayName = 'SectionWrapper';

// embed glow css once

export default SectionWrapper;
