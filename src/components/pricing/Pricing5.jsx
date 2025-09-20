import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Pricing5 = ({ t }) => {
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

        <div className="grid lg:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 text-center flex flex-col card-hover ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'glass-effect'}`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">{plan.currency}{plan.price}</span>
                <span className="text-white/70">/{plan.period}</span>
              </div>
              <p className="text-white/80 mb-8 flex-grow">{plan.description}</p>
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full mt-auto py-3 font-semibold ${plan.popular ? 'bg-white text-blue-600 hover:bg-slate-200' : 'bg-white/20 hover:bg-white/30 text-white'}`}
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

export default Pricing5;