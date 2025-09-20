import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer4 = ({ t }) => {
  const showToast = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This will be available soon!",
      duration: 3000,
    });
  };

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-black/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-white">TechAI</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 md:mb-0">
            <a href="#about" className="text-white/70 hover:text-white">Sobre Nosotros</a>
            <a href="#services" className="text-white/70 hover:text-white">Servicios</a>
            <a href="#pricing" className="text-white/70 hover:text-white">Precios</a>
            <a href="#contact" className="text-white/70 hover:text-white">Contacto</a>
          </nav>
          <div className="flex space-x-4">
            <button onClick={showToast} className="text-white/70 hover:text-white"><Facebook /></button>
            <button onClick={showToast} className="text-white/70 hover:text-white"><Twitter /></button>
            <button onClick={showToast} className="text-white/70 hover:text-white"><Linkedin /></button>
            <button onClick={showToast} className="text-white/70 hover:text-white"><Instagram /></button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-white/50">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer4;