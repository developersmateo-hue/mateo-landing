import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero3 = ({ t }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://cdn.pixabay.com/video/2023/05/23/165022-827334361_large.mp4"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="container mx-auto px-4 relative z-20 text-white">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t.hero.title} <span className="text-gradient">{t.hero.highlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="btn-primary text-lg px-8 py-4">
              {t.hero.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;