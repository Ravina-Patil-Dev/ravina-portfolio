import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hop as Home, User, Briefcase, MapPin, Award, GraduationCap, FileText, Newspaper, Users } from 'lucide-react';

const Navigation = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'hire', label: 'Hire Me', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'media', label: 'Media', icon: Newspaper },
    { id: 'contact', label: 'Contact', icon: MapPin },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 lg:hidden bg-black/20 backdrop-blur-sm border border-white/10 rounded-full p-3 text-white"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Desktop Navigation */}
      <motion.nav
        className="hidden lg:flex fixed top-6 left-6 z-40 flex-col gap-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-black/10 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <Icon size={16} />
              <motion.div
                className="absolute left-12 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              >
                {item.label}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 h-full w-72 sm:w-80 bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 sm:p-8"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="mt-16 space-y-3 sm:space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                        activeSection === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon size={18} className="sm:w-5 sm:h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
