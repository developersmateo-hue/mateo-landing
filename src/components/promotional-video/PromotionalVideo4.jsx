import React from 'react';
import { motion } from 'framer-motion';

const PromotionalVideo4 = ({ t }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative aspect-video max-w-5xl mx-auto">
          <motion.div
            initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <video
              src="https://cdn.pixabay.com/video/2024/05/23/211863-944342059_large.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold"
            >
              {t.headline}
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalVideo4;