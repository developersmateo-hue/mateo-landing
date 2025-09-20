import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Menu, X, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header5 = ({ language, setLanguage, theme, setTheme, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  const navItems = useMemo(() => ([
    { href: '#home',        label: t?.nav?.home ?? 'Inicio' },
    { href: '#services',    label: t?.nav?.services ?? 'Servicios' },
    { href: '#about',       label: t?.nav?.about ?? 'Nosotros' },
    { href: '#solutions',   label: t?.nav?.solutions ?? 'Soluciones' },
    { href: '#gallery',     label: t?.nav?.gallery ?? 'Galería' },
    { href: '#testimonials',label: t?.nav?.testimonials ?? 'Opiniones' },
    { href: '#pricing',     label: t?.nav?.pricing ?? 'Precios' },
    { href: '#contact',     label: t?.nav?.contact ?? 'Contacto' },
  ]), [t]);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const themes = [
    { code: 'blue',   name: 'Azul Tech',    swatch: 'bg-blue-500' },
    { code: 'green',  name: 'Verde Tech',   swatch: 'bg-green-500' },
    { code: 'purple', name: 'Púrpura Tech', swatch: 'bg-purple-500' },
    { code: 'orange', name: 'Naranja Tech', swatch: 'bg-orange-500' },
  ];

  // App bar compacto y progreso de scroll
  const progressX = useMotionValue(0);
  const springX = useSpring(progressX, { stiffness: 120, damping: 20, mass: 0.7 });
  const scaleX = useTransform(springX, [0, 100], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      progressX.set(pct);
      setIsScrolled(y > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [progressX]);

  // Scroll spy para resaltar sección activa
  useEffect(() => {
    const ids = navItems.map(n => n.href).filter(Boolean);
    const els = ids.map(id => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = `#${visible[0].target.id}`;
          setActiveHref(id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [navItems]);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progreso de scroll ultrafino */}
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
        style={{ scaleX }}
      />

      {/* App bar compacto */}
      <div className={`transition-all ${isScrolled ? 'backdrop-blur-md bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-3 sm:px-4">
          <div className="h-14 flex items-center justify-between gap-2">
            {/* Logo minimal */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-2"
              aria-label="Ir al inicio"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 grid place-items-center shadow-md">
                <span className="text-white font-extrabold text-xs">AI</span>
              </div>
              <span className="text-white/90 font-semibold tracking-wide hidden sm:inline">TechAI</span>
            </button>

            {/* Nav pill centrado (desktop) */}
            <div className="hidden md:flex items-center">
              <div className="relative rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-2 py-1 flex items-center gap-1">
                {navItems.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-3 py-1.5 text-sm rounded-full transition ${
                        active
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* Destello activo */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            layoutId="pill-active"
                            className="absolute inset-0 rounded-full bg-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Acciones: idioma/tema + CTA + menú móvil */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Idioma */}
              <div className="relative">
                <button
                  onClick={() => { setLanguageOpen(v => !v); setThemeOpen(false); }}
                  className="p-2 rounded-md text-white/90 hover:bg-white/10"
                  aria-haspopup="menu"
                  aria-expanded={languageOpen}
                  aria-label="Cambiar idioma"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 min-w-[160px] rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLanguage(l.code); setLanguageOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 flex items-center gap-2 ${
                            language === l.code ? 'bg-white/10 text-white' : 'text-white/85'
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              {/* CTA compacta */}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex h-9 px-3 rounded-md text-sm bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-semibold"
              >
                {t?.hero?.cta ?? 'Contacto'}
              </Button>

              {/* Toggle móvil */}
              <button
                onClick={() => { setIsMenuOpen(v => !v); setLanguageOpen(false); setThemeOpen(false); }}
                aria-label="Abrir menú"
                aria-controls="mobile-nav"
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 rounded-md text-white/90 hover:bg-white/10"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-2 border-t border-white/10">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full text-left px-2 py-3 rounded-md text-white/85 hover:bg-white/10 ${
                        activeHref === item.href ? 'bg-white/10 text-white' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="px-2 pb-3">
                    <Button
                      onClick={() => scrollToSection('#contact')}
                      className="w-full h-10 rounded-md bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-semibold"
                    >
                      {t?.hero?.cta ?? 'Contacto'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header5;
