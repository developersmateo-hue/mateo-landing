import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero2 = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-slate-900 via-black to-slate-900">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-extrabold text-white mb-6"
        >
          {t.hero.title} <span className="text-gradient">{t.hero.highlight}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="btn-primary text-lg px-10 py-6 rounded-lg">
            {t.hero.cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;