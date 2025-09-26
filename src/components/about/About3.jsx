import React from 'react';
import { motion } from 'framer-motion';

const About3 = ({ t }) => {
  return (
    <section id="about" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.about.title}
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-64 md:h-96 md:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img className="w-full h-full object-cover" alt="Team brainstorming session" src="https://images.unsplash.com/photo-1585913161203-695a3ac93b33" />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-64 md:h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <img className="w-full h-full object-cover" alt="Developer coding on a laptop" src="https://images.unsplash.com/photo-1618335829737-2228915674e0" />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-white/90">
            {t.about.subtitle}
          </h3>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t.about.mission}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About3;