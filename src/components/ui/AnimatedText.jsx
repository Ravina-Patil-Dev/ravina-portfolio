import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  className = '',
  type = 'fadeIn',
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
  direction = 'up'
}) => {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          staggerChildren: stagger,
        },
      },
    };

    switch (type) {
      case 'fadeIn':
        return baseVariants;

      case 'slideIn':
        if (direction === 'up') {
          baseVariants.hidden.y = 20;
          baseVariants.visible.y = 0;
        } else if (direction === 'down') {
          baseVariants.hidden.y = -20;
          baseVariants.visible.y = 0;
        } else if (direction === 'left') {
          baseVariants.hidden.x = 20;
          baseVariants.visible.x = 0;
        } else if (direction === 'right') {
          baseVariants.hidden.x = -20;
          baseVariants.visible.x = 0;
        }
        return baseVariants;

      case 'scaleIn':
        baseVariants.hidden.scale = 0.8;
        baseVariants.visible.scale = 1;
        return baseVariants;

      case 'bounceIn':
        baseVariants.hidden.y = 20;
        baseVariants.hidden.scale = 0.8;
        baseVariants.visible.y = 0;
        baseVariants.visible.scale = 1;
        baseVariants.visible.transition = {
          ...baseVariants.visible.transition,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        };
        return baseVariants;

      default:
        return baseVariants;
    }
  };

  const containerVariants = getVariants();

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Split text into words or characters
  const textArray = text.split(' ');

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
