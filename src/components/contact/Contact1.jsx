
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact1 = ({ t }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
      duration: 5000,
    });
  };

  const contactData = t?.contact || {
    title: "Contacto",
    subtitle: "¿Listo para transformar tu negocio? Hablemos",
    form: {
      name: "Nombre completo",
      email: "Email",
      company: "Empresa",
      message: "Mensaje",
      send: "Enviar Mensaje"
    },
    info: {
        title: "Información de Contacto",
        phone: "+1 (555) 123-4567",
        email: "info@techaisolutions.com",
        address: "123 Tech Street, Silicon Valley, CA 94000, USA"
    }
  };

  const formTitle = t?.contact?.form?.send ? "Envíanos un mensaje" : "Send us a message";

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {contactData.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              {formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder={contactData.form.name}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={contactData.form.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder={contactData.form.email}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={contactData.form.email}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.company}</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder={contactData.form.company}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={contactData.form.company}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder={contactData.form.message}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={contactData.form.message}
                ></textarea>
              </div>
              <Button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
                {contactData.form.send}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              {contactData.info.title || 'Información de Contacto'}
            </h3>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Email</h4>
                <a href={`mailto:${contactData.info.email}`} className="text-white/70 hover:text-white transition-colors">{contactData.info.email}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Teléfono</h4>
                <a href={`tel:${contactData.info.phone.replace(/\s/g, '')}`} className="text-white/70 hover:text-white transition-colors">{contactData.info.phone}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Dirección</h4>
                <p className="text-white/70">{contactData.info.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
  