import React from 'react';
import { motion } from 'framer-motion';

const PromotionalVideo5 = ({ t }) => {
  return (
    <section className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">{t.headline}</h2>
            <p className="text-lg text-white/80">{t.subheadline}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 aspect-video rounded-2xl overflow-hidden shadow-2xl"
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
      </div>
    </section>
  );
};

export default PromotionalVideo5;