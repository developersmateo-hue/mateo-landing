import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = ({ t }) => {

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = () => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
      duration: 5000,
    });
  };

  const teamMembers = [
    {
      name: "Richard Leyva",
      role: "Ingeniero en Informática",
      description: "Experto en arquitectura de software y desarrollo de soluciones de IA complejas.",
      image: "A portrait of Richard Leyva, a male software engineer with glasses, smiling.",
    },
    {
      name: "Armando Benites",
      role: "Diseñador UX/UI",
      description: "Apasionado por crear interfaces intuitivas y experiencias de usuario memorables.",
      image: "A portrait of Armando Benites, a male UX/UI designer with a creative look.",
    },
  ];

  const blogPosts = [
    {
      title: "El Futuro de los Agentes de IA en Ventas",
      date: "05 de Septiembre, 2025",
      summary: "Descubre cómo la IA está revolucionando el sector de ventas y qué esperar en los próximos años."
    },
    {
      title: "5 Maneras de Automatizar tu Negocio con n8n",
      date: "28 de Agosto, 2025",
      summary: "Guía práctica para empezar a automatizar flujos de trabajo y ahorrar cientos de horas."
    }
  ];

  return (
    <footer className="bg-black/40 border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Empresa */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <span className="text-lg font-semibold text-white mb-6 block">Empresa</span>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection('#about')} className="text-white/70 hover:text-white transition-colors">Sobre Nosotros</button></li>
              <li>
                <span className="text-white/70">Nuestro Equipo</span>
                <div className="mt-4 space-y-4">
                  {teamMembers.map(member => (
                    <div key={member.name} className="flex items-center space-x-3">
                      <img  class="w-12 h-12 rounded-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div>
                        <p className="font-semibold text-sm text-white">{member.name}</p>
                        <p className="text-xs text-white/60">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
              <li><button onClick={showToast} className="text-white/70 hover:text-white transition-colors">Carreras</button></li>
            </ul>
          </motion.div>

          {/* Column 2: Blog */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <span className="text-lg font-semibold text-white mb-6 block">Blog Reciente</span>
            <div className="space-y-5">
              {blogPosts.map(post => (
                <div key={post.title}>
                  <button onClick={showToast} className="text-white/90 hover:text-white font-medium text-left">{post.title}</button>
                  <p className="text-xs text-white/50 mt-1">{post.date}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Servicios */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
            <span className="text-lg font-semibold text-white mb-6 block">Servicios</span>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection('#services')} className="text-white/70 hover:text-white transition-colors text-left">Desarrollo de Software</button></li>
              <li><button onClick={() => scrollToSection('#solutions')} className="text-white/70 hover:text-white transition-colors text-left">Agentes de IA</button></li>
              <li><button onClick={showToast} className="text-white/70 hover:text-white transition-colors text-left">Automatización</button></li>
              <li><button onClick={showToast} className="text-white/70 hover:text-white transition-colors text-left">Consultoría</button></li>
            </ul>
          </motion.div>

          {/* Column 4: Logo & Social */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
             <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-gradient">TechAI</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <button onClick={showToast} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"><Facebook className="w-5 h-5 text-white" /></button>
              <button onClick={showToast} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"><Twitter className="w-5 h-5 text-white" /></button>
              <button onClick={showToast} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"><Linkedin className="w-5 h-5 text-white" /></button>
              <button onClick={showToast} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"><Instagram className="w-5 h-5 text-white" /></button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 text-center"
        >
          <p className="text-white/60">
            {t.footer.copyright}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;