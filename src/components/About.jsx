import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Award, Users, Headphones as HeadphonesIcon } from 'lucide-react';

const AnimatedStat = ({ number, label, icon: Icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const parsedNumber = parseFloat(number.replace('+', ''));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="flex justify-center mb-3">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <div className="text-3xl font-bold text-gradient mb-2">
        {inView && <CountUp end={parsedNumber} duration={2.5} suffix={number.includes('+') ? '+' : ''} />}
      </div>
      <div className="text-white/70 text-sm">
        {label}
      </div>
    </motion.div>
  );
};

const About = ({ t }) => {
  const statIcons = [Award, Award, Users, HeadphonesIcon];

  return (
    <section id="about" className="section-padding bg-black/20">
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
            <p className="text-lg text-white/80 mb-12 leading-relaxed">
              {t.about.mission}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {t.about.stats.map((stat, index) => (
                <AnimatedStat 
                  key={index}
                  number={stat.number}
                  label={stat.label}
                  icon={statIcons[index]}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                className="w-full h-auto rounded-2xl shadow-2xl" 
                alt="Team of AI developers working"
               src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d" />
            </div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;