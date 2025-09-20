import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users } from 'lucide-react';

const AISolutions4 = ({ t }) => {
  const icons = [TrendingUp, Zap, Users];

  return (
    <section id="solutions" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.solutions.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.solutions.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1">
          {t.solutions.items.map((solution, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 bg-slate-800/50 hover:bg-slate-800 transition-colors group overflow-hidden text-center"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
                <Icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">{solution.title}</h3>
                <p className="text-white/70">{solution.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AISolutions4;