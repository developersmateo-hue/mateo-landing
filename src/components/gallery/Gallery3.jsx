import React from 'react';
import { motion } from 'framer-motion';

const Gallery3 = ({ t }) => {
  const images = [
    { src: "AI dashboard with real-time analytics and machine learning insights", span: "col-span-2 row-span-2" },
    { src: "Modern chatbot interface with natural language processing", span: "" },
    { src: "Automated workflow system with n8n integration", span: "" },
    { src: "CRM integration dashboard showing customer data and AI predictions", span: "col-span-2" },
  ];

  return (
    <section id="gallery" className="section-padding bg-black/20">
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
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative rounded-lg overflow-hidden group ${image.span}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={image.src} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery3;