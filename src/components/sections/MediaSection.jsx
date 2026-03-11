import React from "react";
import { motion } from "framer-motion";

const mediaItems = [
  {
    title: "Weather App (API Based)",
    description:
      "Real-time weather application using API. Search any city and view temperature, humidity and weather conditions.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
    link: "https://ravina-weather.netlify.app",
    tech: "HTML • CSS • JavaScript • Weather API"
  },
  {
    title: "Ecommerce Website",
    description:
      "Modern Ecommerce website built using React and Tailwind with responsive UI.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c",
    link: "https://ravina-ecommerce.netlify.app/",
    tech: "React • Tailwind"
  },
  {
    title: "Portfolio Website",
    description:
      "Personal developer portfolio showcasing projects, skills and experience.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766",
    link: "#",
    tech: "React • Tailwind • Framer Motion"
  }
];

const MediaSection = () => {
  return (
    <section
      id="media"
      className="min-h-screen px-6 py-20 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-14 text-center"
        >
          Media & Projects
        </motion.h2>

        {/* Media Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg shadow-xl hover:border-blue-500/40 transition"
            >

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-white/70 text-sm mb-3">
                  {item.description}
                </p>

                {/* Tech Stack */}
                <p className="text-blue-400 text-xs mb-4">
                  {item.tech}
                </p>

                {/* Button */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  Live Demo →
                </a>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default MediaSection;