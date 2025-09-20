import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Pricing4 = ({ t }) => {
  const handlePlanSelect = (planName) => {
    toast({
      title: `Selected ${planName}`,
      description: "This feature is not yet implemented.",
    });
  };

  return (
    <section id="pricing" className="section-padding">
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

        <div className="max-w-4xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-lg mb-4 ${plan.popular ? 'bg-blue-900/30' : 'bg-slate-800/50'}`}
            >
              <div className="mb-4 md:mb-0 md:w-1/3">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-white/60">{plan.description}</p>
              </div>
              <div className="mb-4 md:mb-0 md:w-1/3 text-center">
                <span className="text-3xl font-bold text-gradient">{plan.currency}{plan.price}</span>
                <span className="text-white/60">/{plan.period}</span>
              </div>
              <div className="w-full md:w-auto">
                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full ${plan.popular ? 'btn-primary' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {t.pricing.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing4;