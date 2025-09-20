import React from 'react';
import { motion } from 'framer-motion';

const Gallery2 = ({ t }) => {
  const images = [
    "AI dashboard with real-time analytics and machine learning insights",
    "Modern chatbot interface with natural language processing",
    "Automated workflow system with n8n integration",
    "CRM integration dashboard showing customer data and AI predictions",
    "Smart landing page with AI-powered conversion optimization",
    "Sales assistant AI interface with lead qualification system"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery2;