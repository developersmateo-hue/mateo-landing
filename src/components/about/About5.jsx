import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap } from 'lucide-react';

const About5 = ({ t }) => {
  const timelineItems = [
    {
      icon: Rocket,
      title: "Nuestra Fundación",
      description: "Fundada en 2020 con la misión de democratizar la IA para empresas de todos los tamaños.",
      image: "Vintage photo of a small office with founders",
    },
    {
      icon: Target,
      title: "Primer Gran Proyecto",
      description: "Lanzamos nuestro primer agente de IA para un cliente de e-commerce, aumentando sus ventas en un 40%.",
      image: "Screenshot of an early AI agent dashboard",
    },
    {
      icon: Zap,
      title: "Expansión y Futuro",
      description: "Hoy, servimos a clientes en todo el mundo, innovando constantemente con nuevas soluciones de IA.",
      image: "Modern office with a large, diverse team",
    },
  ];

  return (
    <section id="about" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Nuestra Trayectoria
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-white/10 rounded-full"></div>
          
          {timelineItems.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-10 mb-16 items-center">
              <motion.div 
                className={`relative ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="glass-effect p-8 rounded-2xl">
                  <item.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
              <motion.div 
                className={`relative ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img class="w-full h-64 object-cover rounded-2xl shadow-lg" alt={item.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About5;