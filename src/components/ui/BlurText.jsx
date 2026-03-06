import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BlurText = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete
}) => {
  const [inView, setInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
            setAnimationKey(prev => prev + 1);
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    const element = document.getElementById(`blur-text-${text.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [text, delay, threshold, rootMargin]);

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        filter: 'blur(10px)',
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      },
    };

    if (direction === 'top') {
      baseVariants.hidden.y = 20;
      baseVariants.visible.y = 0;
    } else if (direction === 'bottom') {
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
  };

  const renderAnimatedText = () => {
    if (animateBy === 'words') {
      const words = text.split(' ');
      return words.map((word, index) => (
        <motion.span
          key={`${word}-${index}-${animationKey}`}
          className="inline-block mr-1"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={getAnimationVariants()}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          onAnimationComplete={index === words.length - 1 ? onAnimationComplete : undefined}
        >
          {word}
        </motion.span>
      ));
    } else if (animateBy === 'letters') {
      const letters = text.split('');
      return letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}-${animationKey}`}
          className="inline-block"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={getAnimationVariants()}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: 'easeOut',
          }}
          onAnimationComplete={index === letters.length - 1 ? onAnimationComplete : undefined}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ));
    } else {
      return (
        <motion.span
          key={`text-${animationKey}`}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={getAnimationVariants()}
          onAnimationComplete={onAnimationComplete}
        >
          {text}
        </motion.span>
      );
    }
  };

  return (
    <span
      id={`blur-text-${text.replace(/\s+/g, '-').toLowerCase()}`}
      className={className}
    >
      {renderAnimatedText()}
    </span>
  );
};

export default BlurText;
