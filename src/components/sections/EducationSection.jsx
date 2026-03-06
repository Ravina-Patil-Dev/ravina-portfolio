import React from 'react';
import { motion } from 'framer-motion';

const EducationSection = () => {
  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      inst: 'ICMR Pune',
      period: '2025 – 2027 (Pursuing)',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      inst: 'Arts Commerce & Science College, Kowad',
      period: '2023',
      score: '79.44%',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      score: '60%',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      score: '91%',
    },
  ];

  return (
    <motion.section
      id="education"
      className="relative z-10 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto glass p-10 rounded-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
        <div className="space-y-6">
          {education.map((ed, idx) => (
            <div key={idx} className="text-white">
              <h3 className="text-2xl font-semibold">{ed.degree}</h3>
              {ed.inst && <p className="text-blue-300">{ed.inst}</p>}
              {ed.period && <p className="text-sm text-white/70">{ed.period}</p>}
              {ed.score && <p className="text-sm">Score: {ed.score}</p>}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EducationSection;
