import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer2 = ({ t }) => {
  const showToast = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This will be available soon!",
      duration: 3000,
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-white">TechAI</span>
            </div>
            <p className="text-sm">{t.footer.description}</p>
          </div>
          <div>
            <span className="font-semibold text-white block mb-4">Contacto</span>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /><span>contact@techai.com</span></li>
              <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /><span>+1 (555) 123-4567</span></li>
              <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /><span>Silicon Valley, CA</span></li>
            </ul>
          </div>
          <div>
            <span className="font-semibold text-white block mb-4">Enlaces Rápidos</span>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">Sobre Nosotros</a></li>
              <li><a href="#services" className="hover:text-white">Servicios</a></li>
              <li><a href="#pricing" className="hover:text-white">Precios</a></li>
            </ul>
          </div>
          <div>
            <span className="font-semibold text-white block mb-4">Síguenos</span>
            <div className="flex space-x-4">
              <button onClick={showToast} className="text-slate-400 hover:text-white"><Facebook /></button>
              <button onClick={showToast} className="text-slate-400 hover:text-white"><Twitter /></button>
              <button onClick={showToast} className="text-slate-400 hover:text-white"><Linkedin /></button>
              <button onClick={showToast} className="text-slate-400 hover:text-white"><Instagram /></button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;