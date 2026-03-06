import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ events = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="timeline relative max-w-4xl mx-auto py-8">
      {/* Timeline line */}
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative flex items-start ml-8"
            variants={itemVariants}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute -left-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
              }}
            />

            {/* Content */}
            <div className="ml-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <motion.h3
                  className="text-xl font-bold text-white mb-1 md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  {event.title}
                </motion.h3>
                <motion.span
                  className="text-sm text-blue-300 font-medium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {event.date}
                </motion.span>
              </div>

              {event.subtitle && (
                <motion.p
                  className="text-blue-200 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  {event.subtitle}
                </motion.p>
              )}

              <motion.p
                className="text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {event.description}
              </motion.p>

              {event.tags && event.tags.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  {event.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: index * 0.2 + 0.6 + tagIndex * 0.1,
                        type: 'spring',
                        stiffness: 300,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
