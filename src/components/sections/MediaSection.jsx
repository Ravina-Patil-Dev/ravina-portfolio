import React from 'react';
import { motion } from 'framer-motion';

const MediaSection = () => {
  return (
    <section id="media" className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Media</h2>
        <p className="text-white/70 text-lg">Media section component pending full conversion from TypeScript.</p>
      </motion.div>
    </section>
  );
};

export default MediaSection;
