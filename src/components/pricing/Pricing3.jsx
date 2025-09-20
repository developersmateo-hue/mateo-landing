import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Pricing3 = ({ t }) => {
  const handlePlanSelect = (planName) => {
    toast({
      title: `Selected ${planName}`,
      description: "This feature is not yet implemented.",
    });
  };

  return (
    <section id="pricing" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-0">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`w-full lg:w-1/3 p-8 text-center glass-effect ${plan.popular ? 'scale-105 z-10 rounded-2xl' : 'rounded-l-2xl rounded-r-2xl lg:rounded-r-none lg:rounded-l-2xl'}`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/60 mb-6 h-12">{plan.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gradient">{plan.currency}{plan.price}</span>
                <span className="text-white/60">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full py-3 ${plan.popular ? 'btn-primary' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {t.pricing.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing3;