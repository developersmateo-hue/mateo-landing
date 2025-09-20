import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header4 = ({ t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  const navItems = [
    { href: '#home', label: t?.nav?.home ?? 'Inicio' },
    { href: '#services', label: t?.nav?.services ?? 'Servicios' },
    { href: '#solutions', label: t?.nav?.solutions ?? 'Soluciones' },
    { href: '#pricing', label: t?.nav?.pricing ?? 'Precios' },
    { href: '#contact', label: t?.nav?.contact ?? 'Contacto' }
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const images = [
    {
      alt: 'AI dashboard with real-time analytics',
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
    },
    {
      alt: 'Modern chatbot interface',
      src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop'
    },
    {
      alt: 'Automated workflow canvas',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop'
    }
  ];

  return (
    <header
      ref={headerRef}
      className="relative min-h-[520px] h-[70vh] bg-slate-950 overflow-hidden"
      aria-label="Sección de encabezado compacta con menú"
    >
      {/* Fondo decorativo sutil */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(1200px 500px at 10% 20%, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 60%), radial-gradient(800px 400px at 85% 30%, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0) 60%), radial-gradient(900px 500px at 50% 90%, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0) 60%)'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '34px 34px'
        }}
      />

      {/* NAV: barra superior compacta (glass) */}
      <div
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-slate-900/70 shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo compacto */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-2 group"
              aria-label="Ir al inicio"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 grid place-items-center shadow-lg shadow-blue-900/20">
                <span className="text-white font-extrabold">AΙ</span>
              </div>
              <span className="text-white/90 font-semibold tracking-wide group-hover:text-white transition-colors">
                TechAI Studio
              </span>
            </button>

            {/* Links desktop */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-white/70 hover:text-white transition-colors font-medium"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA + menú móvil */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex rounded-lg px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-semibold shadow-lg shadow-emerald-900/20"
              >
                {t?.hero?.cta ?? 'Hablemos'}
              </Button>
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú"
                className="md:hidden p-2 rounded-lg text-white/90 hover:bg-white/10 transition"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 overflow-hidden"
              >
                <div className="p-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left px-3 py-3 rounded-lg text-white/85 hover:bg-white/10 transition"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="p-2">
                    <Button
                      onClick={() => scrollToSection('#contact')}
                      className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-semibold"
                    >
                      {t?.hero?.cta ?? 'Hablemos'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Contenido principal compacto */}
      <div className="relative container mx-auto px-4 h-full pt-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center h-full">
          {/* Texto */}
          <div className="text-white py-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-sm"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t?.hero?.badge ?? 'Automations • AI • Growth'}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
            >
              {t?.hero?.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-400">
                {t?.hero?.highlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl"
            >
              {t?.hero?.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-7 flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-base md:text-lg font-semibold shadow-lg shadow-emerald-900/20"
              >
                {t?.hero?.cta ?? 'Contáctanos'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('#services')}
                className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-base md:text-lg"
              >
                {t?.hero?.secondaryCta ?? 'Ver servicios'}
              </Button>
            </motion.div>
          </div>

          {/* Lado visual: mosaico de tarjetas “app preview” */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow de fondo */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 blur-2xl" />
              <div className="relative grid grid-cols-3 gap-4 -rotate-2">
                {images.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, rotate: 4 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.12 }}
                    className="col-span-1"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                      {/* Barra pseudo-navegador */}
                      <div className="flex items-center gap-2 h-8 px-3 bg-slate-900/60 border-b border-white/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        <span className="ml-3 text-xs text-white/60 truncate">
                          {item.alt}
                        </span>
                      </div>
                      <img
                        className="w-full h-48 object-cover"
                        alt={item.alt}
                        src={item.src}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sombras laterales sutiles para profundidad */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
    </header>
  );
};

export default Header4;
