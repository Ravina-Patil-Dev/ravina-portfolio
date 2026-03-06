import React from 'react';
import { motion } from 'framer-motion';

const data = [
  {
    title: 'AI Resume Analyzer',
    description:
      'An AI powered system that analyzes resumes and improves ATS score using machine learning.',
    tech: 'React JS, Node JS, AI',
    year: '2025',
  },
  {
    title: 'Cyber Security Threat Detection',
    description:
      'Detecting malicious network activity using machine learning algorithms.',
    tech: 'Python, Machine Learning',
    year: '2024',
  },
  {
    title: 'Smart Portfolio Analytics',
    description:
      'Research on tracking user interactions in developer portfolio websites.',
    tech: 'React, Analytics',
    year: '2024',
  },
];

const ResearchSection = () => {
  return (
    <section
      id="research"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      {/* subtle gradient overlay for continuity with Hero */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 opacity-20 pointer-events-none" />

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-12 z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Research
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 w-full max-w-6xl">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_0_25px_rgba(82,39,255,0.6)] transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="glass bg-black/30 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 mb-4">{item.description}</p>
              </div>
              <div className="mt-4">
                <span className="block text-sm text-blue-200">
                  Tech: {item.tech}
                </span>
                <span className="block text-sm text-blue-200">
                  Year: {item.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ResearchSection;
