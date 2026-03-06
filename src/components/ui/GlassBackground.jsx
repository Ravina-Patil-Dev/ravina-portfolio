import React from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
  const count = 50;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 6;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 10;
        return (
          <motion.div
            key={i}
            className="bg-white/20 rounded-full absolute"
            style={{ width: size, height: size, left: `${left}%` }}
            initial={{ y: '120%', opacity: 0 }}
            animate={{ y: '-20%', opacity: [0, 0.4, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
      })}
    </div>
  );
};

const GlassBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* moving gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 animate-bg-rotate" />
      <Particles />
      {/* additional overlay if needed */}

      {/* global animation styles */}
      <style>{`
        @keyframes bg-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bg-rotate {
          background-size: 200% 200%;
          animation: bg-rotate 20s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default GlassBackground;
