import React from 'react';
import { motion } from 'framer-motion';

const HireMeSection = () => (
  <motion.section
    id="hire"
    className="relative z-10 py-20"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-4xl mx-auto glass p-10 rounded-xl text-center">
      <h2 className="text-4xl font-bold mb-4">Interested in Working Together?</h2>
      <p className="text-lg mb-6">
        I’m always excited to work on new ideas and build modern web applications. If you are looking for a passionate React Frontend Developer, feel free to contact me.
      </p>
      <ul className="list-disc list-inside text-left mb-6 max-w-md mx-auto">
        <li>Frontend Developer Jobs</li>
        <li>React Developer Roles</li>
        <li>Freelance Projects</li>
        <li>Internship Opportunities</li>
      </ul>
      <a
        href="#contact"
        className="btn-primary inline-block mt-4 px-6 py-2 text-base"
      >
        Get In Touch
      </a>
    </div>
  </motion.section>
);

export default HireMeSection;
