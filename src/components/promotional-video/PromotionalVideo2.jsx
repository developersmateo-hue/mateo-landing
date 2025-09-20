import React from 'react';
import { motion } from 'framer-motion';

const PromotionalVideo2 = ({ t }) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-video rounded-2xl overflow-hidden shadow-2xl"
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
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">{t.headline}</h2>
            <p className="text-lg text-white/80">{t.subheadline}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalVideo2;