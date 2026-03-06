import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollStack = ({ items = [] }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {items.map((item, index) => {
        const itemY = useTransform(
          scrollYProgress,
          [0, 0.2 + index * 0.1, 0.8 - index * 0.1, 1],
          [200 + index * 50, 0, 0, -200 - index * 50]
        );

        const opacity = useTransform(
          scrollYProgress,
          [0, 0.1 + index * 0.1, 0.9 - index * 0.1, 1],
          [0, 1, 1, 0]
        );

        const scale = useTransform(
          scrollYProgress,
          [0, 0.2 + index * 0.1, 0.8 - index * 0.1, 1],
          [0.8, 1, 1, 0.8]
        );

        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              y: itemY,
              opacity,
              scale,
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-md mx-auto text-center">
              <motion.h3
                className="text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollStack;
