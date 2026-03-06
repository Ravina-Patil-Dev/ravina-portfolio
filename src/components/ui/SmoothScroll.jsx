import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children, options = {} }) => {
  const lenisRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    // Animation frame loop
    const animate = (time) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
    };
  }, [options]);

  return (
    <div ref={containerRef} className="smooth-scroll">
      {children}
    </div>
  );
};

export default SmoothScroll;
