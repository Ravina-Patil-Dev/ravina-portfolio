import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppleHelloEnglishEffect = ({
  speed = 1,
  onAnimationComplete,
  className = ''
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const text = 'Hello';

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, (200 / speed)); // Adjust timing based on speed

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1000); // Wait 1 second after completion
    }
  }, [currentIndex, text, speed, onAnimationComplete, isComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
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
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="typing"
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit="exit"
          >
            {currentText.split('').map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="inline-block text-6xl font-bold text-white"
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="inline-block w-1 h-16 bg-white ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            className="flex"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={letterVariants}
          >
            {text.split('').map((letter, index) => (
              <motion.span
                key={`complete-${letter}-${index}`}
                className="inline-block text-6xl font-bold text-white"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0)',
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 0px rgba(255,255,255,0)',
                  ],
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppleHelloEnglishEffect;
