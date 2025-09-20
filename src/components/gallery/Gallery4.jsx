import React from 'react';
import { motion } from 'framer-motion';

const Gallery4 = ({ t }) => {
  const images = [
    "AI dashboard with real-time analytics and machine learning insights",
    "Modern chatbot interface with natural language processing",
    "Automated workflow system with n8n integration",
    "CRM integration dashboard showing customer data and AI predictions",
    "Smart landing page with AI-powered conversion optimization",
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery" className="py-20">
      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <motion.div 
          className="flex gap-4"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {duplicatedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-96 h-64">
              <img class="w-full h-full object-cover rounded-lg" alt={image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery4;