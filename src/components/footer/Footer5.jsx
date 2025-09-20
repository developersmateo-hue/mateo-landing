import React from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const Footer5 = ({ t }) => {
  const showToast = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This will be available soon!",
      duration: 3000,
    });
  };

  return (
    <footer className="bg-black/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 text-center sm:text-left">
            {t.footer.copyright}
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-white">TechAI</span>
          </div>
          <nav className="flex gap-4">
            <button onClick={showToast} className="text-sm text-white/60 hover:text-white">Términos</button>
            <button onClick={showToast} className="text-sm text-white/60 hover:text-white">Privacidad</button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer5;