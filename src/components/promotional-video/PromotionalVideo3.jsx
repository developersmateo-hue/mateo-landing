import React from 'react';
import { motion } from 'framer-motion';

const PromotionalVideo3 = ({ t }) => {
  return (
    <section className="section-padding bg-black/20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
        >
          {t.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
        >
          {t.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            src="https://cdn.pixabay.com/video/2024/05/23/211863-944342059_large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalVideo3;