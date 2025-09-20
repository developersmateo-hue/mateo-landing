import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const About4 = ({ t }) => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t.about.title}
            </h2>
            <h3 className="text-2xl font-semibold mb-6 text-white/90">
              {t.about.subtitle}
            </h3>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t.about.description}
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              {t.about.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden group"
          >
            <video
              src="https://cdn.pixabay.com/video/2021/09/29/88991-618350521_large.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About4;