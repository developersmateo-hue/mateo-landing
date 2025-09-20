import React from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, Zap, Users, Globe, Database } from 'lucide-react';

const Services5 = ({ t }) => {
  const icons = [Code, Bot, Zap, Users, Globe, Database];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.services.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 bg-slate-800/50 hover:bg-slate-800 transition-colors group overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-white/70">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services5;