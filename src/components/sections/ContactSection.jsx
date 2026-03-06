import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
  return (
    <motion.section
      id="contact"
      className="relative z-10 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto glass p-10 rounded-xl text-center">
        <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="flex items-center gap-4">
            <MapPin className="text-blue-400" />
            <span>Pune, India</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-green-400" />
            <span>+91 9022867619</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-red-400" />
            <span>ravinapatil20012951@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Github className="text-white" />
            <a href="https://github.com/Ravina-Patil-Dev" className="underline">github.com/Ravina-Patil-Dev</a>
          </div>
          <div className="flex items-center gap-4">
            <Linkedin className="text-blue-600" />
            <a href="https://linkedin.com/in/ravina-patil-a29212286" className="underline">linkedin.com/in/ravina-patil-a29212286</a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
