import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import BlurText from "../ui/BlurText.jsx";
import LiquidEther from "../ui/LiquidEther.jsx";
import heroImage from "../../assets/images/Ravina.jpeg";

const HeroSection = () => {

  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(greetingTimer);
  }, []);

  const socialLinks = [
    {
      id: "1",
      platform: "GitHub",
      url: "https://github.com/Ravina-Patil-Dev",
    },
    {
      id: "2",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/ravina-patil-a29212286",
    },
    {
      id: "3",
      platform: "Email",
      url: "mailto:ravinapatil20012951@gmail.com",
    },
  ];

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "email":
        return Mail;
      default:
        return Mail;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          autoDemo={true}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >

            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-sm text-white/80">Welcome to my portfolio</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <BlurText
                text="Ravina Patil"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl lg:text-7xl font-bold text-white mb-4"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-blue-200 mb-6"
            >
              Frontend Developer <span className="text-blue-300">&</span> React Developer
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-white/80 mb-8"
            >
              <MapPin size={20} />
              <span>Pune, India</span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/90 mb-6 leading-relaxed"
            >
              Passionate frontend developer with 1+ year of experience building modern React applications. I specialize in responsive UI development, reusable components, and REST API integration.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg italic text-blue-300 mb-8 pl-4 border-l-2 border-blue-400"
            >
              “Creating modern, responsive and scalable web applications using React JS.”
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 mb-10"
            >

              <motion.a
                href="/resume.pdf"
                download="Ravina_Patil_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold flex items-center gap-2"
              >
                Download CV
                <ArrowRight size={18} />
              </motion.a>

              <motion.button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold"
              >
                Contact Me
              </motion.button>

            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white"
                  >
                    <Icon size={22} />
                  </motion.a>
                );
              })}
            </motion.div>

          </motion.div>


          {/* Right Side Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >

            <motion.div
              className="relative w-64 h-64 lg:w-80 lg:h-80"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >

              {/* Glow Background */}
              <div className="absolute -inset-10 -z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40"></div>

              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile Image */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Ravina Patil"
                 className="w-full h-full object-cover object-top scale-105"
                />
              </div>

              {/* Floating Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-white/50" />
      </motion.div>

    </section>
  );
};

export default HeroSection;