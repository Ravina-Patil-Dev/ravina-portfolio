import React from 'react';
import { motion } from 'framer-motion';

const CertificatesSection = () => {
  const certs = [
    'Salesforce Admin & Developer – Victorious Digital',
    'Frontend Development Training – React JS',
  ];
  return (
    <motion.section
      id="certificates"
      className="relative z-10 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto glass p-10 rounded-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Certificates</h2>
        <ul className="list-disc list-inside space-y-2 text-white">
          {certs.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default CertificatesSection;
