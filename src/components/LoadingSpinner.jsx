import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="relative">
        <motion.div
          className="w-20 h-20 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-2 bg-slate-900 rounded-full" />
        <motion.div
          className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <motion.p
        className="absolute mt-32 text-white text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Portfolio...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
