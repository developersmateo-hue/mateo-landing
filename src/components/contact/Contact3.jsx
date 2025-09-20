import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact3 = ({ t }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <img class="w-full h-full object-cover" alt="World map background" src="https://images.unsplash.com/photo-1564042121243-9357733a64a2" />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t.contact.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t.contact.subtitle}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><Mail className="w-6 h-6 text-blue-400" /> <span className="text-white/80">{t.contact.email.address}</span></div>
              <div className="flex items-center gap-4"><Phone className="w-6 h-6 text-blue-400" /> <span className="text-white/80">{t.contact.phone.number}</span></div>
              <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-blue-400" /> <span className="text-white/80">{t.contact.address.location}</span></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder={t.contact.form.name} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder={t.contact.form.email} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea rows="4" placeholder={t.contact.form.message} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              <Button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
                {t.contact.form.submit}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact3;