import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users } from 'lucide-react';

const AISolutions3 = ({ t }) => {
  const icons = [TrendingUp, Zap, Users];

  return (
    <section id="solutions" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t.solutions.title}
            </h2>
            <p className="text-xl text-white/80">
              {t.solutions.subtitle}
            </p>
          </motion.div>
          <div className="space-y-8">
            {t.solutions.items.map((solution, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{solution.title}</h3>
                    <p className="text-white/70">{solution.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISolutions3;