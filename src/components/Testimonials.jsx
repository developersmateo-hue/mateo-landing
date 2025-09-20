import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = ({ t }) => {
  const duplicatedTestimonials = [...t.testimonials.items, ...t.testimonials.items];

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
      </div>

      <div className="w-full overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex">
          <div className="animate-scroll">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`t-${index}`} className="flex-shrink-0 w-80 mx-8">
                <div
                  className="glass-effect p-8 rounded-2xl h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="absolute top-6 right-6 opacity-20">
                      <Quote className="w-12 h-12 text-blue-400" />
                    </div>
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-white/60 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;