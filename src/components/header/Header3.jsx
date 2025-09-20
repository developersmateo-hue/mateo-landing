import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Cpu, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '../../assets/logo.png';

const Header3 = ({ t }) => {
  // App bar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Slider state
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = useMemo(() => ([
    {
      key: 'ai',
      image: 'https://cndl.org.br/varejosa/wp-content/uploads/2024/04/Oportunidade-para-startups-programa-do-Sebrae-capacita-empresas-para-captarem-investimentos.jpg',
      title: t?.hero?.title ?? 'Inteligencia Artificial',
      highlight: t?.hero?.highlight ?? 'Avanzada',
      subtitle: 'Modelos que aprenden, predicen y optimizan decisiones críticas.',
      points: [
        { icon: 'cpu', text: 'Análisis predictivo en tiempo real' },
        { icon: 'sparkles', text: 'Personalización a escala' },
        { icon: 'check', text: 'Integración con tus datos' },
      ],
    },
    {
      key: 'automation',
      image: 'https://s2-epocanegocios.glbimg.com/Ux_9jKsUebeuisNBK6jZVnzd0BU=/0x0:2120x1414/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e536e40f1baf4c1a8bf1ed12d20577fd/internal_photos/bs/2024/s/s/rrbfGkR7AKY7iSTiqhMg/gettyimages-1939992781.jpg',
      title: 'Automatización',
      highlight: 'Inteligente',
      subtitle: 'Reduce tiempos, elimina cuellos de botella y crece sin fricción.',
      points: [
        { icon: 'zap', text: 'Workflows sin código (n8n)' },
        { icon: 'bot', text: 'Bots que ejecutan tareas' },
        { icon: 'check', text: 'Ahorro operativo inmediato' },
      ],
    },
    {
      key: 'assistants',
      image: 'https://s2-epocanegocios.glbimg.com/7w6M9QTqavDejcr48faaDe0xEdU=/0x0:2269x1322/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e536e40f1baf4c1a8bf1ed12d20577fd/internal_photos/bs/2024/6/E/4iYhADQAqZQjWgSAAlHQ/gettyimages-1481133084.jpg',
      title: 'Asistentes Virtuales',
      highlight: '24/7',
      subtitle: 'Atención al cliente constante con tono humano y métricas claras.',
      points: [
        { icon: 'sparkles', text: 'Respuesta natural multilenguaje' },
        { icon: 'check', text: 'Escalado sin contratar más personal' },
        { icon: 'cpu', text: 'Entrenados con tu documentación' },
      ],
    },
  ]), [t]);

  const icons = { check: CheckCircle2, sparkles: Sparkles, cpu: Cpu, bot: Bot, zap: Zap };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Scroll styles
  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const navItems = useMemo(() => ([
    { href: '#home',         label: t?.nav?.home ?? 'Inicio' },
    { href: '#services',     label: t?.nav?.services ?? 'Servicios' },
    { href: '#solutions',    label: t?.nav?.solutions ?? 'Soluciones' },
    { href: '#pricing',      label: t?.nav?.pricing ?? 'Precios' },
    { href: '#contact',      label: t?.nav?.contact ?? 'Contacto' },
  ]), [t]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <header className="relative h-[80vh] min-h-[560px] overflow-hidden text-white">
      {/* App bar compacto, llamativo */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'backdrop-blur-md bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-3 sm:px-4">
          <div className="h-14 flex items-center justify-between">
         

          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2" aria-label="Inicio">
  <img
    src={logo}
    alt="Logo"
    className="shrink-0 w-auto h-8 sm:h-9 md:h-10 lg:h-12 object-contain"
    loading="lazy"
  />
</button>


            {/* Menú desktop: píldora central */}
            <div className="hidden md:flex items-center">
              <div className="rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-2 py-1 flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="px-3 py-1.5 text-sm rounded-full text-white/75 hover:text-white hover:bg-white/10 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA + menú móvil */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => scrollTo('#contact')}
                className="hidden sm:inline-flex h-9 px-3 rounded-md text-sm bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-semibold"
              >
                {t?.hero?.cta ?? 'Contacto'}
              </Button>
              <button
                onClick={() => setIsMenuOpen(v => !v)}
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
                      onClick={() => scrollTo(item.href)}
                      className="w-full text-left px-2 py-3 rounded-md text-white/85 hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="px-2 pb-3">
                    <Button
                      onClick={() => scrollTo('#contact')}
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

      {/* Slider de fondo */}
      <div
        className="absolute inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].key}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              className="w-full h-full object-cover"
              alt={slides[index].title}
              src={slides[index].image}
            />
            <div className="absolute inset-0 bg-black/55" />
            {/* Gradiente sutil para lectura */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenido del hero (gancho de valor) */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 h-full pt-16">
          <div className="h-full grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 max-w-3xl">
              <motion.div
                key={`${slides[index].key}-badge`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t?.hero?.badge ?? 'AI • Automation • Growth'}
              </motion.div>

              <motion.h1
                key={`${slides[index].key}-h1`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
              >
                {slides[index].title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-400">
                  {slides[index].highlight}
                </span>
              </motion.h1>

              <motion.p
                key={`${slides[index].key}-p`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-3 text-base md:text-lg text-white/85"
              >
                {slides[index].subtitle}
              </motion.p>

              {/* Bullets de valor con iconos */}
              <motion.ul
                key={`${slides[index].key}-ul`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-5 grid sm:grid-cols-2 gap-2"
              >
                {slides[index].points.map((p, i) => {
                  const Icon = icons[p.icon] || CheckCircle2;
                  return (
                    <li key={`${slides[index].key}-pt-${i}`} className="flex items-start gap-2">
                      <Icon className="w-5 h-5 mt-0.5 text-emerald-400" />
                      <span className="text-white/90">{p.text}</span>
                    </li>
                  );
                })}
              </motion.ul>

              {/* CTAs */}
              <motion.div
                key={`${slides[index].key}-cta`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-6 flex flex-col sm:flex-row items-center gap-3"
              >
                <Button
                  onClick={() => scrollTo('#contact')}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-base font-semibold shadow-lg shadow-emerald-900/20"
                >
                  {t?.hero?.cta ?? 'Hablemos'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollTo('#services')}
                  className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-base"
                >
                  {t?.hero?.secondaryCta ?? 'Ver servicios'}
                </Button>
              </motion.div>
            </div>

            {/* Panel derecho: controles y “pagers” descriptivos */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Anterior"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Siguiente"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Pagers con títulos (clicables) */}
              <div className="mt-4 grid sm:grid-cols-3 gap-2">
                {slides.map((s, i) => (
                  <button
                    key={`pager-${s.key}`}
                    onClick={() => setIndex(i)}
                    className={`text-left rounded-xl p-3 border transition ${
                      i === index
                        ? 'bg-white/15 border-white/20'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide text-white/70">{s.title}</div>
                    <div className="text-sm font-semibold text-white">{s.highlight}</div>
                  </button>
                ))}
              </div>

              {/* Barra de progreso del slide actual */}
              <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  key={`progress-${slides[index].key}-${isPaused ? 'paused' : 'run'}`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Padding inferior para no chocar con el siguiente bloque */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-slate-950/60" />
    </header>
  );
};

export default Header3;
