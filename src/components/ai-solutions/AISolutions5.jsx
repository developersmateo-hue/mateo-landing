import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users } from 'lucide-react';

const AISolutions5 = ({ t }) => {
  const icons = [TrendingUp, Zap, Users];

  return (
    <section id="solutions" className="section-padding">
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

        <div className="grid md:grid-cols-3 gap-8">
          {t.solutions.items.map((solution, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-lg overflow-hidden border border-slate-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <Icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-white">{solution.title}</h3>
                  <p className="text-white/70">{solution.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AISolutions5;