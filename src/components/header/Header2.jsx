import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Palette, Home, Settings, Image, Quote, Tag, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header2 = ({ language, setLanguage, theme, setTheme, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  const navItems = useMemo(() => ([
    { href: '#home',         label: t?.nav?.home ?? 'Inicio',        icon: Home },
    { href: '#services',     label: t?.nav?.services ?? 'Servicios', icon: Settings },
    { href: '#solutions',    label: t?.nav?.solutions ?? 'Soluciones', icon: Tag },
    { href: '#gallery',      label: t?.nav?.gallery ?? 'Galería',    icon: Image }, // <- corregido
    { href: '#testimonials', label: t?.nav?.testimonials ?? 'Opiniones', icon: Quote },
    { href: '#pricing',      label: t?.nav?.pricing ?? 'Precios',    icon: Users },
    { href: '#contact',      label: t?.nav?.contact ?? 'Contacto',   icon: Phone },
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

  // Scroll state
  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = navItems.map(n => n.href);
    const els = ids.map(id => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [navItems]);

  // Command palette hotkey (⌘K / Ctrl+K)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* APP BAR ULTRACOMPACTO */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`h-11 flex items-center transition-all ${isScrolled ? 'backdrop-blur-md bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
          <nav className="container mx-auto px-3 sm:px-4 w-full flex items-center justify-between">
            {/* Logo mini */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-2" aria-label="Inicio">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 grid place-items-center">
                <span className="text-white font-extrabold text-[10px]">AI</span>
              </div>
              <span className="text-white/90 font-semibold tracking-wide hidden sm:inline">TechAI</span>
            </button>

            {/* Centro: botón de búsqueda / command palette */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-2 text-white/70 hover:text-white bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm backdrop-blur-md"
              aria-label="Abrir buscador"
            >
              <Search className="w-4 h-4" />
              <span className="opacity-80">{t?.searchPlaceholder ?? 'Buscar secciones (Ctrl/⌘ + K)'}</span>
              <kbd className="ml-2 hidden lg:inline-flex px-1.5 rounded bg-white/10 text-[10px] tracking-wider">⌘K</kbd>
            </button>

            {/* Acciones a la derecha */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Idioma */}
              <div className="relative">
                <button
                  onClick={() => { setShowLang(v => !v); setShowTheme(false); }}
                  className="p-2 rounded-md text-white/90 hover:bg-white/10"
                  aria-haspopup="menu"
                  aria-expanded={showLang}
                >
                  <Globe className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showLang && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 min-w-[160px] rounded-lg bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLanguage(l.code); setShowLang(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 flex items-center gap-2 ${
                            language === l.code ? 'bg-white/10 text-white' : 'text-white/85'
                          }`}
                        >
                          <span>{l.flag}</span><span>{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tema */}
              <div className="relative">
                <button
                  onClick={() => { setShowTheme(v => !v); setShowLang(false); }}
                  className="p-2 rounded-md text-white/90 hover:bg-white/10"
                  aria-haspopup="menu"
                  aria-expanded={showTheme}
                >
                  <Palette className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showTheme && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 min-w-[180px] rounded-lg bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden"
                    >
                      {themes.map(th => (
                        <button
                          key={th.code}
                          onClick={() => { setTheme(th.code); setShowTheme(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 flex items-center ${
                            theme === th.code ? 'bg-white/10 text-white' : 'text-white/85'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full mr-2 ${th.swatch}`} />
                          <span>{th.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* DOCK FLOTANTE INFERIOR */}
      <div className="fixed left-0 right-0 bottom-4 z-50 pointer-events-none">
        <div className="flex justify-center">
          <div className="pointer-events-auto bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-1 shadow-2xl">
            <ul className="flex items-end gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="group relative flex flex-col items-center"
                      aria-label={item.label}
                      title={item.label}
                    >
                      <motion.div
                        whileHover={{ scale: 1.12, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className={`grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition ${
                          active ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <motion.span
                        layout
                        className={`mt-1 h-1 rounded-full ${active ? 'bg-emerald-400 w-5' : 'bg-transparent w-0'} `}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* COMMAND PALETTE */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="container max-w-xl mx-auto mt-24 rounded-2xl overflow-hidden border border-white/10 bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <Search className="w-4 h-4 text-white/60" />
                <input
                  autoFocus
                  placeholder={t?.searchPlaceholder ?? 'Escribe para filtrar…'}
                  className="w-full bg-transparent outline-none text-white placeholder-white/40"
                  onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    document.querySelectorAll('[data-cmd-item]').forEach(el => {
                      const txt = el.getAttribute('data-label')?.toLowerCase() || '';
                      el.style.display = txt.includes(q) ? '' : 'none';
                    });
                  }}
                  onKeyDown={(e) => { if (e.key === 'Escape') setCommandOpen(false); }}
                />
              </div>
              <div className="max-h-80 overflow-auto py-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      data-cmd-item
                      data-label={item.label}
                      onClick={() => { scrollTo(item.href); setCommandOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 text-white/90"
                    >
                      <Icon className="w-4 h-4 text-white/70" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-xs text-white/40">{item.href}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header2;
