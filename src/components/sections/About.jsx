import React from 'react';
import { motion } from 'framer-motion';

// simple particles background for floating dots
const ParticlesBackground = () => {
  const count = 25;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * 100;
        const size = 2 + Math.random() * 4;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 8;
        return (
          <motion.div
            key={i}
            className="bg-white/40 rounded-full absolute"
            style={{ width: size, height: size, left: `${startX}%` }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.6, 0] }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear'
            }}
          />
        );
      })}
    </div>
  );
};

// import profile image from assets so Vite handles bundling
import profilePic from '../../assets/images/RavinaN.png';

const About = () => {
  // contact information could be pulled from props or context
  const email = 'ravinapatil20012951@gmail.com';
  const phone = '+91 9022867619';
  const birthDate = '25 November 2001';
  const resumeUrl = '/resume.pdf';

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center"
    >
      <ParticlesBackground />

      <motion.div
        className="relative z-10 w-full max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* left profile card */}
          <motion.div
            // use aspect ratio instead of a fixed height so the container stays portrait/square
            className="relative w-full max-w-sm aspect-square lg:aspect-[3/4] flex justify-center lg:justify-start lg:ml-8"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-xl border-4 border-transparent animate-glow overflow-hidden shadow-2xl flex items-center justify-center">
              <img
                src={profilePic}
                alt="Ravina Patil - Student"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x500";
                }}
              />
            </div>
          </motion.div>

          {/* right content */}
          <motion.div
            className="flex-1 space-y-6 text-white text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold underline underline-offset-8 decoration-blue-500">
              About Me
            </h2>
            <p className="text-lg leading-relaxed max-w-prose">
              I am a Frontend Developer specializing in React JS, currently pursuing a Master of Computer Applications. With over a year of experience building modern React apps, I’ve worked as a Junior React Developer and Software Developer Intern building responsive UIs, reusable components and integrating REST APIs. My toolset includes React JS, JavaScript, HTML5, CSS3, Bootstrap, and best practices for scalable, modular frontend architecture.
            </p>

            {/* core skills line */}
            <p className="text-sm text-gray-300 mt-2">
              React JS • JavaScript • HTML • CSS • Bootstrap • REST APIs • Responsive UI
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold"
              >
                Frontend Web Development
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-400 rounded-full font-semibold"
              >
                React JS Application Development
              </motion.button>
            </div>

            {/* info cards: experience, education, location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Experience</h4>
                <p className="text-sm">1+ Years React Development</p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Education</h4>
                <p className="text-sm">MCA (Pursuing)</p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Location</h4>
                <p className="text-sm">Pune, India</p>
              </motion.div>
            </div>

            {/* contact cards: email, phone, birthdate */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Email</h4>
                <p className="text-sm truncate">{email}</p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Phone</h4>
                <p className="text-sm truncate">{phone}</p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-medium">Born</h4>
                <p className="text-sm">{birthDate}</p>
              </motion.div>
            </div>

            <motion.a
              href="/Ravina_Patil_CV.pdf"
              target="_blank"
              className="inline-block px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* custom styles for glow and gradient animation */}
      <style>{`
        @keyframes glow {
          0%,100% { box-shadow: 0 0 8px 2px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 20px 8px rgba(255,255,255,0.6); }
        }
        .animate-glow { animation: glow 2s infinite; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </section>
  );
};

export default About;