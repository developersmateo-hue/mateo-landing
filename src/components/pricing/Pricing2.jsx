import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Pricing2 = ({ t }) => {
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

        <div className="grid lg:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-lg p-8 flex flex-col ${plan.popular ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700'}`}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">{plan.name}</h3>
              <p className="text-white/60 mb-6 flex-grow">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.currency}{plan.price}</span>
                <span className="text-white/60">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full mt-auto ${plan.popular ? 'btn-primary' : 'bg-slate-700 hover:bg-slate-600'}`}
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

export default Pricing2;