import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Junior React Developer',
    company: 'Stepron Technologies Pvt Ltd — Pune',
    period: 'Jan 2025 – Feb 2026',
    bullets: [
      'Developed core modules like Timesheet, Resume Builder, and Job Posting using React JS.',
      'Implemented CRUD operations, filtering systems, and multi-step workflows.',
      'Integrated REST APIs for dynamic and real-time data updates.',
      'Created reusable UI components improving development speed and maintainability.',
      'Ensured responsive design across desktop, tablet, and mobile devices.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'Stepron Technologies Pvt Ltd — Pune',
    period: 'Jul 2024 – Jan 2025',
    bullets: [
      'Built responsive UI using HTML, CSS, Bootstrap, and React JS.',
      'Worked on API integration and dynamic data rendering.',
      'Implemented basic state management and debugging techniques.',
      'Used Git & GitHub for version control and collaboration.',
    ],
  },
];

const ExperienceSection = () => {
  return (
    <motion.section
      id="experience"
      className="relative z-10 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto glass p-10 rounded-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Work Experience</h2>
        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-2xl font-semibold text-white">{exp.title}</h3>
            <p className="text-blue-300 mb-1">{exp.company}</p>
            <p className="text-sm text-white/70 mb-3">{exp.period}</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-white/80">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
