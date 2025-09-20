import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, Linkedin } from 'lucide-react';

const Contact5 = ({ t }) => {
  const showToast = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This will be available soon!",
    });
  };

  return (
    <section id="contact" className="section-padding bg-black/20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.contact.title}
        </motion.h2>
        <motion.p 
          className="text-xl text-white/80 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t.contact.subtitle}
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button onClick={showToast} variant="outline" className="w-full h-auto p-6 flex flex-col gap-2 border-white/20 text-white hover:bg-white/10">
              <Mail className="w-8 h-8 text-blue-400" />
              <span className="font-semibold">{t.contact.email.title}</span>
              <span className="text-sm text-white/60">{t.contact.email.address}</span>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button onClick={showToast} variant="outline" className="w-full h-auto p-6 flex flex-col gap-2 border-white/20 text-white hover:bg-white/10">
              <Phone className="w-8 h-8 text-blue-400" />
              <span className="font-semibold">{t.contact.phone.title}</span>
              <span className="text-sm text-white/60">{t.contact.phone.number}</span>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button onClick={showToast} variant="outline" className="w-full h-auto p-6 flex flex-col gap-2 border-white/20 text-white hover:bg-white/10">
              <Linkedin className="w-8 h-8 text-blue-400" />
              <span className="font-semibold">LinkedIn</span>
              <span className="text-sm text-white/60">Conecta con nosotros</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact5;