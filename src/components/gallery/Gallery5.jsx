import React from 'react';
import { motion } from 'framer-motion';

const Gallery5 = ({ t }) => {
  const images = [
    "AI dashboard with real-time analytics and machine learning insights",
    "Modern chatbot interface with natural language processing",
    "Automated workflow system with n8n integration",
  ];

  return (
    <section id="gallery" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.gallery.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                <img class="w-full h-full object-cover" alt={image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery5;