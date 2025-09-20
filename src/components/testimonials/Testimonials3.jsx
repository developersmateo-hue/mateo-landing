import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Testimonials3 = ({ t }) => {
  const [index, setIndex] = useState(0);
  const testimonial = t.testimonials.items[index];

  const next = () => setIndex((prev) => (prev + 1) % t.testimonials.items.length);
  const prev = () => setIndex((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-2xl text-white/90 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                  <p className="text-white/60">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <Button onClick={prev} variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button onClick={next} variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials3;