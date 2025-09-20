import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users } from 'lucide-react';

const AISolutions1 = ({ t }) => {
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl text-center card-hover"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {solution.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AISolutions1;