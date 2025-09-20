
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header1 = ({ language, setLanguage, theme, setTheme, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const themes = [
    { code: 'blue', name: 'Azul Tech', color: 'bg-blue-500' },
    { code: 'green', name: 'Verde Tech', color: 'bg-green-500' },
    { code: 'purple', name: 'Púrpura Tech', color: 'bg-purple-500' },
    { code: 'orange', name: 'Naranja Tech', color: 'bg-orange-500' }
  ];

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#solutions', label: t.nav.solutions },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            aria-label="Volver al inicio"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-gradient">TechAI</span>
          </motion.a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Cambiar idioma"
              >
                <Globe className="w-4 h-4 mr-2" />
                {languages.find(l => l.code === language)?.flag}
              </Button>
              <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px]" role="menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      language === lang.code ? 'bg-white/20' : ''
                    }`}
                    role="menuitem"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Cambiar tema de color"
              >
                <Palette className="w-4 h-4" />
              </Button>
              <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px]" role="menu">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.code}
                    onClick={() => setTheme(themeOption.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center ${
                      theme === themeOption.code ? 'bg-white/20' : ''
                    }`}
                    role="menuitem"
                  >
                    <div className={`w-4 h-4 rounded-full mr-3 ${themeOption.color}`}></div>
                    {themeOption.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 glass-effect rounded-lg p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 text-white/80 hover:text-white transition-colors border-b border-white/10 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header1;
  