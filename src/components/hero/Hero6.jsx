import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero6 = ({ t }) => {
  const containerRef = useRef(null);

  // Parallax reactivo al mouse (suave con spring)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const bgX = useTransform(sx, [-50, 50], [-8, 8]);
  const bgY = useTransform(sy, [-50, 50], [-8, 8]);
  const layerX = useTransform(sx, [-50, 50], [-12, 12]);
  const layerY = useTransform(sy, [-50, 50], [-12, 12]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(px - 50); // -50 .. 50
      my.set(py - 50);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [mx, my]);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={containerRef}
      className="relative h-screen min-h-[640px] text-white overflow-hidden select-none"
      aria-label="Hero principal"
    >
      {/* Capa: Imagen de fondo con parallax suave */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1544198365-3c76c86bd1a0?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Capa: Overlay dinámico (gradient animado + oscurecedor) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Gradiente animado */}
        <div
          className="absolute -inset-[20%] animate-[gradientShift_14s_ease-in-out_infinite] opacity-60 mix-blend-screen"
          style={{
            background:
              'radial-gradient(35% 40% at 25% 30%, rgba(59,130,246,0.45) 0%, rgba(59,130,246,0) 60%), ' +
              'radial-gradient(30% 35% at 75% 20%, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0) 60%), ' +
              'radial-gradient(30% 35% at 50% 80%, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0) 60%)',
          }}
        />
        {/* Noise sutil */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
            backgroundSize: '300px 300px',
          }}
        />
      </div>

      {/* Capa: Grid técnico sutil */}
      <div
        className="absolute inset-0 z-[1] opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.06))
          `,
          backgroundSize: '36px 36px, 100% 100%',
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Capa: Partículas/Orbes sutiles con parallax (decor) */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ x: layerX, y: layerY }}
        aria-hidden="true"
      >
        <div
          className="absolute top-[12%] left-[10%] w-24 h-24 rounded-full blur-2xl opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(96,165,250,0.6), rgba(96,165,250,0))',
          }}
        />
        <div
          className="absolute top-[65%] left-[20%] w-16 h-16 rounded-full blur-xl opacity-50 animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(52,211,153,0.6), rgba(52,211,153,0))',
          }}
        />
        <div
          className="absolute top-[25%] right-[12%] w-28 h-28 rounded-full blur-2xl opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(192,132,252,0.55), rgba(192,132,252,0))',
          }}
        />
      </motion.div>

      {/* Contenido */}
      <div className="relative z-[3] h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-sm md:text-base"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {t.hero.badge ?? 'AI • Automation • Growth'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-5xl text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
          style={{
            textShadow: '0 1px 18px rgba(0,0,0,0.35)',
          }}
        >
          {t.hero.title}{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-400">
              {t.hero.highlight}
            </span>
            {/* Brillo animado */}
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 max-w-2xl text-lg md:text-xl text-white/85"
          style={{ textShadow: '0 1px 14px rgba(0,0,0,0.35)' }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3 text-base md:text-lg font-semibold shadow-lg shadow-emerald-900/20
                       bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400
                       transition-all duration-300 rounded-xl group"
          >
            {t.hero.cta}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => scrollToSection('#services')}
            className="px-8 py-3 text-base md:text-lg rounded-xl border border-white/20 hover:bg-white/10"
          >
            {t.hero.secondaryCta ?? 'Ver servicios'}
          </Button>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.button
        aria-label="Desplazarse hacia el contenido"
        onClick={() => scrollToSection('#services')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.9, y: [0, 4, 0] }}
        transition={{ duration: 1.6, delay: 1.2, repeat: Infinity }}
        className="z-[3] absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 text-white/80 hover:text-white"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* Sombras laterales para dar profundidad */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent z-[2]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent z-[2]" />

      {/* Keyframes locales */}
      <style>{`
        @keyframes gradientShift {
          0%   { transform: translate3d(-6%, -4%, 0) scale(1.0); }
          50%  { transform: translate3d(6%, 5%, 0)   scale(1.05); }
          100% { transform: translate3d(-6%, -4%, 0) scale(1.0); }
        }
      `}</style>
    </header>
  );
};

export default Hero6;
