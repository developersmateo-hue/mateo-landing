import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, Zap, Users, Globe, Database, ArrowRight } from 'lucide-react';

const Services4 = ({ t }) => {
  const title = t?.services?.title ?? 'Servicios';
  const subtitle = t?.services?.subtitle ?? 'Soluciones de IA y automatización enfocadas en resultados.';
  const items = Array.isArray(t?.services?.items) && t.services.items.length
    ? t.services.items.slice(0, 6)
    : [
        { title: 'IA Predictiva', description: 'Modelos que aprenden y recomiendan.' },
        { title: 'Automatización', description: 'Workflows con n8n y APIs.' },
        { title: 'Chatbots', description: 'Soporte 24/7 con tono humano.' },
        { title: 'Integraciones', description: 'Conecta CRM, ERP y más.' },
        { title: 'Data & ETL', description: 'Pipelines confiables y seguros.' },
        { title: 'Adopción & Soporte', description: 'Training y mejora continua.' },
      ];

  const icons = useMemo(() => [Code, Bot, Zap, Users, Globe, Database], []);

  const scrollTo = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services" className="section-padding relative">
      {/* Fondo sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 380px at 15% 20%, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 60%), radial-gradient(700px 320px at 85% 30%, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0) 60%), radial-gradient(800px 380px at 50% 90%, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0) 60%)'
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient">{title}</h2>
          <p className="mt-3 text-base md:text-xl text-white/80 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Grid mobile-first. En desktop, la primera tarjeta se destaca (col-span-2). */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = icons[i % icons.length];
            const featured = i === 0 && items.length >= 3; // destacar primera en desktop
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -3 }}
                className={`
                  group relative rounded-2xl p-[1px]
                  bg-gradient-to-r from-emerald-400/25 via-blue-400/25 to-purple-400/25
                  ${featured ? 'lg:col-span-2' : ''}
                `}
              >
                <div className="rounded-2xl h-full bg-slate-900/60 backdrop-blur-md border border-white/10 p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-white">{service.title}</h3>
                      <p className="mt-1 text-sm md:text-base text-white/70">{service.description}</p>
                    </div>
                  </div>

                  {/* Línea separadora sutil */}
                  <div className="mt-4 h-px bg-white/10" />

                  {/* Footer minimal: chips breves + CTA flecha */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-[11px] rounded-full bg-white/8 border border-white/10 text-white/70">Rápida</span>
                      <span className="px-2 py-1 text-[11px] rounded-full bg-white/8 border border-white/10 text-white/70">Segura</span>
                      <span className="px-2 py-1 text-[11px] rounded-full bg-white/8 border border-white/10 text-white/70">Escalable</span>
                    </div>
                    <button
                      onClick={scrollTo}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded px-1"
                    >
                      {t?.services?.ctaMini ?? 'Ver demo'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Shine suave en hover (no intrusivo) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-120%] group-hover:animate-[shine_1.1s_ease] bg-[linear-gradient(75deg,transparent,rgba(255,255,255,0.12),transparent)]" />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10" />
      </div>

      {/* Keyframes locales para el shine */}
      <style>{`
        @keyframes shine {
          to { transform: translateX(120%); }
        }
      `}</style>
    </section>
  );
};

export default Services4;
