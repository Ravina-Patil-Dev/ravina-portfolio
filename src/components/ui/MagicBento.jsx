import React from 'react';
import { motion } from 'framer-motion';

const MagicBento = ({ items = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const getGridClass = (index) => {
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
    ];
    return patterns[index % patterns.length];
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-4 auto-rows-fr"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`relative ${getGridClass(index)} bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 overflow-hidden group cursor-pointer`}
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              className="mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.2,
                type: 'spring',
                stiffness: 300,
              }}
            >
              {item.icon && (
                <div className="text-3xl mb-2">{item.icon}</div>
              )}
            </motion.div>

            <motion.h3
              className="text-lg font-bold text-white mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.title}
            </motion.h3>

            <motion.p
              className="text-white/70 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {item.description}
            </motion.p>
          </div>

          {/* Hover effect border */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-400/50"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MagicBento;
