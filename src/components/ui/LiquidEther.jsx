import React, { useRef, useEffect } from 'react';

const LiquidEther = ({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const autoDemoRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * resolution;
      canvas.height = window.innerHeight * resolution;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient
    const createGradient = (x, y, radius) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      return gradient;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base gradient
      const baseGradient = createGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Handle mouse interaction
      if (mouseRef.current.isActive) {
        const mouseGradient = createGradient(
          mouseRef.current.x * resolution,
          mouseRef.current.y * resolution,
          cursorSize * resolution
        );
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x * resolution,
          mouseRef.current.y * resolution,
          cursorSize * resolution,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      // Handle auto demo
      if (autoDemo && autoDemoRef.current.active) {
        const autoGradient = createGradient(
          autoDemoRef.current.x,
          autoDemoRef.current.y,
          cursorSize * resolution * autoIntensity
        );
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = autoGradient;
        ctx.beginPath();
        ctx.arc(
          autoDemoRef.current.x,
          autoDemoRef.current.y,
          cursorSize * resolution * autoIntensity,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse event handlers
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;

      if (autoDemoRef.current.active) {
        autoDemoRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Auto demo logic
    const startAutoDemo = () => {
      if (!autoDemo) return;

      const moveAutoDemo = () => {
        autoDemoRef.current.x = Math.random() * canvas.width;
        autoDemoRef.current.y = Math.random() * canvas.height;
        autoDemoRef.current.active = true;

        setTimeout(() => {
          autoDemoRef.current.active = false;
          setTimeout(moveAutoDemo, autoResumeDelay);
        }, autoRampDuration * 1000);
      };

      setTimeout(moveAutoDemo, 1000);
    };

    startAutoDemo();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    colors,
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default LiquidEther;
