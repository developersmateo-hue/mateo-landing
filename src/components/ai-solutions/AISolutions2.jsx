import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users } from 'lucide-react';

const AISolutions2 = ({ t }) => {
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

        <div className="max-w-4xl mx-auto space-y-8">
          {t.solutions.items.map((solution, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-lg bg-slate-800/50"
              >
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-10 h-10 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{solution.title}</h3>
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

export default AISolutions2;