import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero4 = ({ t }) => {
  return (
    <section id="home" className="min-h-screen grid lg:grid-cols-2 items-stretch">
      <div className="flex items-center justify-center p-8 bg-black/20">
        <div className="max-w-md text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t.hero.title} <span className="text-gradient">{t.hero.highlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/70 mb-8"
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
      <div className="relative hidden lg:block">
        <img class="w-full h-full object-cover" alt="Futuristic city skyline at night" src="https://images.unsplash.com/photo-1617213861681-30a2a883c9b7" />
      </div>
    </section>
  );
};

export default Hero4;