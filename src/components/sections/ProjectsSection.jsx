import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Portfolio Website',
    description:
      'A modern developer portfolio website designed to showcase projects, skills, and experience with smooth animations and responsive UI.',
    features: [
      'Animated UI with modern design',
      'Fully responsive layout',
      'Project showcase section',
      'Resume download functionality',
    ],
    tech: 'React JS • JavaScript • CSS • Netlify',
  },
  {
    title: 'E-commerce UI',
    description:
      'A responsive e-commerce user interface built using React JS with product listing, filtering, and cart functionality.',
    features: [
      'Product listing and filtering',
      'Dynamic cart updates',
      'Responsive design for all devices',
    ],
    tech: 'React JS • JavaScript • Bootstrap • CSS',
  },
  {
    title: 'Weather App',
    description:
      'A real-time weather application that fetches weather data using REST API and displays dynamic weather information.',
    features: [
      'City search functionality',
      'Real-time weather updates',
      'API error handling',
    ],
    tech: 'JavaScript • REST API • HTML • CSS',
  },
];

const ProjectsSection = () => {
  return (
    <motion.section
      id="projects"
      className="relative z-10 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto glass p-10 rounded-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="space-y-12">
          {projects.map((proj, idx) => (
            <div key={idx} className="">
              <h3 className="text-2xl font-semibold text-white mb-2">
                {proj.title}
              </h3>
              <p className="text-white/80 mb-2">{proj.description}</p>
              <ul className="list-disc list-inside mb-2 text-white/70">
                {proj.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <p className="text-sm text-blue-300">Technologies: {proj.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
