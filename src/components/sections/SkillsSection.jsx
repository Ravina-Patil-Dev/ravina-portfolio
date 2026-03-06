import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = () => (
  <motion.section
    id="skills"
    className="relative z-10 py-20"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-5xl mx-auto glass p-10 rounded-xl">
      <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Frontend Development</h3>
          <p className="text-white/80">React JS • JavaScript (ES6+) • HTML5 • CSS3 • Bootstrap</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">React Ecosystem</h3>
          <p className="text-white/80">React Hooks • Functional Components • Context API • React Router</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">State Management</h3>
          <p className="text-white/80">Redux (Basics)</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">API Integration</h3>
          <p className="text-white/80">REST API • Axios • Fetch</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Tools</h3>
          <p className="text-white/80">Git • GitHub • VS Code</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Concepts</h3>
          <p className="text-white/80">Responsive Design • Debugging • Performance Optimization</p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default SkillsSection;
