import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Bot, Zap, Users, Globe, Database, CheckCircle2 } from 'lucide-react';

const Services3 = ({ t }) => {
  const icons = useMemo(() => [Code, Bot, Zap, Users, Globe, Database], []);
  const title = t?.services?.title ?? 'Servicios';
  const subtitle = t?.services?.subtitle ?? 'Impulsamos tu negocio con IA, automatización e integraciones a medida.';
  const items = Array.isArray(t?.services?.items) && t.services.items.length
    ? t.services.items
    : [
        { title: 'IA Predictiva', description: 'Modelos que aprenden y anticipan decisiones.' },
        { title: 'Automatización', description: 'Workflows sin fricción con n8n.' },
        { title: 'Chatbots', description: 'Atención 24/7 con tono humano.' },
        { title: 'Integraciones', description: 'Conecta tus sistemas y datos.' },
        { title: 'Data & ETL', description: 'Pipelines robustos y confiables.' },
        { title: 'Adopción & Soporte', description: 'Training, monitoreo y mejora continua.' },
      ];

  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // Atajos de teclado para navegar (← →)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length]);

  const Feature = ({ children }) => (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400" />
      <span className="text-white/85">{children}</span>
    </li>
  );

  return (
    <section id="services" className="section-padding relative">
      {/* Fondo sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 380px at 15% 20%, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 60%), radial-gradient(700px 320px at 85% 30%, rgba(168,85,247,0.10) 0%, rgba(168,85,247,0) 60%), radial-gradient(800px 380px at 50% 90%, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0) 60%)'
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">{title}</h2>
          <p className="mt-3 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Layout: índice (izquierda) + panel (derecha). En mobile, carrusel horizontal */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Índice / Selector (sticky en desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              {/* Píldoras scrollables en mobile */}
              <div
                ref={listRef}
                className="flex lg:block gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0"
              >
                {items.map((s, i) => {
                  const Icon = icons[i % icons.length];
                  const activeState = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`shrink-0 lg:shrink lg:w-full text-left rounded-xl border transition p-3 lg:p-4
                        ${activeState ? 'bg-white/15 border-white/20' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg grid place-items-center
                          ${activeState ? 'bg-gradient-to-br from-emerald-500 to-blue-500' : 'bg-white/10'}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate">{s.title}</div>
                          <div className="text-xs text-white/60 truncate">{s.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Ayuda de navegación */}
              <div className="mt-3 text-xs text-white/50">
                Usa ← → para explorar • Tap en una tarjeta para ver detalles
              </div>
            </div>
          </div>

          {/* Panel de detalle (conmutado) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30">
              <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                  >
                    {/* Cabecera del panel */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 grid place-items-center shadow-lg shadow-blue-900/20">
                          {React.createElement(icons[active % icons.length], { className: 'w-6 h-6 text-white' })}
                        </div>
                        <span className="pointer-events-none absolute -inset-1 rounded-xl blur-lg bg-blue-500/20" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{items[active].title}</h3>
                        <p className="mt-1 text-white/75 max-w-2xl">{items[active].description}</p>
                      </div>
                    </div>

                    {/* Matriz de valor (3 columnas compactas) */}
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-wide text-white/60 mb-2">Resultados</div>
                        <ul className="space-y-2 text-sm">
                          <Feature>Tiempo de respuesta más rápido</Feature>
                          <Feature>KPIs monitoreados en tiempo real</Feature>
                          <Feature>Iteraciones quincenales</Feature>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-wide text-white/60 mb-2">Entregables</div>
                        <ul className="space-y-2 text-sm">
                          <Feature>Playbooks & documentación</Feature>
                          <Feature>Dashboards y alertas</Feature>
                          <Feature>Entrenamiento del equipo</Feature>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-wide text-white/60 mb-2">Stack</div>
                        <ul className="space-y-2 text-sm">
                          <Feature>Modelos IA + n8n</Feature>
                          <Feature>Integraciones vía API</Feature>
                          <Feature>Infra segura & escalable</Feature>
                        </ul>
                      </div>
                    </div>

                    {/* CTA + Pagers */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-base font-semibold shadow-lg shadow-emerald-900/20"
                      >
                        {t?.services?.cta ?? 'Solicitar propuesta'}
                      </button>
                      <div className="flex items-center gap-2 text-white/70">
                        <button
                          onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
                          className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10"
                        >
                          Anterior
                        </button>
                        <button
                          onClick={() => setActive((i) => (i + 1) % items.length)}
                          className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10"
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Indicadores de posición (dots) */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === active ? 'bg-emerald-400' : 'bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Ir a ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services3;
