import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer3 = ({ t }) => {
  const showToast = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This will be available soon!",
      duration: 3000,
    });
  };

  return (
    <footer className="bg-black/60">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ¿Listo para transformar tu negocio?
        </motion.h2>
        <motion.p 
          className="text-lg text-white/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Hablemos de cómo nuestras soluciones de IA pueden ayudarte a alcanzar tus objetivos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary px-8 py-4 text-lg font-semibold rounded-full group">
            Contáctanos
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 text-sm text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>{t.footer.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer3;