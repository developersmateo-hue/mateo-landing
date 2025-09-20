import React, { useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, Bot, Zap, Users, Globe, Database, ShieldCheck, Rocket, Cog } from 'lucide-react';

const Services2 = ({ t }) => {
  const icons = useMemo(() => [Code, Bot, Zap, Users, Globe, Database], []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Fallbacks elegantes si faltan textos
  const title = t?.services?.title ?? 'Servicios';
  const subtitle = t?.services?.subtitle ?? 'Soluciones diseñadas para acelerar tu crecimiento con IA y automatización.';
  const items = Array.isArray(t?.services?.items) ? t.services.items : [
    { title: 'IA Predictiva', description: 'Modelos que aprenden y toman decisiones.' },
    { title: 'Automatización', description: 'Workflows sin fricción con n8n.' },
    { title: 'Chatbots', description: 'Atención 24/7 con tono humano.' },
    { title: 'Integraciones', description: 'Conecta tus sistemas y datos.' },
    { title: 'Data & ETL', description: 'Pipelines robustos y confiables.' },
    { title: 'Adopción & Soporte', description: 'Training, monitoreo y éxito continuo.' },
  ];

  return (
    <section id="services" className="section-padding relative">
      {/* Fondo sutil para profundidad */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 380px at 15% 20%, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0) 60%), radial-gradient(700px 320px at 85% 30%, rgba(168,85,247,0.16) 0%, rgba(168,85,247,0) 60%), radial-gradient(800px 380px at 50% 90%, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0) 60%)'
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/90">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t?.services?.badge ?? 'AI • Automation • Impacto'}
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gradient">{title}</h2>
          <p className="mt-3 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Layout: panel de beneficios (sticky) + grid de cards */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Panel beneficios (sticky) */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-4">{t?.services?.benefitsTitle ?? '¿Qué obtienes?'}</h3>
              <ul className="space-y-3 text-white/85">
                <BenefitItem icon={Rocket} text={t?.services?.benefits?.[0] ?? 'Implementación rápida y guiada'} />
                <BenefitItem icon={ShieldCheck} text={t?.services?.benefits?.[1] ?? 'Seguridad y compliance desde el diseño'} />
                <BenefitItem icon={Cog} text={t?.services?.benefits?.[2] ?? 'Integración con tus herramientas (n8n, APIs, CRM)'} />
              </ul>
              <div className="mt-6">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-semibold shadow-lg shadow-emerald-900/20"
                >
                  {t?.services?.cta ?? 'Solicita una demo'}
                </button>
              </div>
              <p className="mt-3 text-xs text-white/60">
                {t?.services?.note ?? 'Sin compromiso. Te mostramos un caso aplicado a tu negocio.'}
              </p>
            </div>
          </motion.aside>

          {/* Grid de servicios */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((service, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <ServiceCard
                    key={idx}
                    Icon={Icon}
                    title={service.title}
                    description={service.description}
                    onContact={() => scrollTo('#contact')}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/80">
            {t?.services?.customLine ?? '¿No encuentras exactamente lo que necesitas?'}
          </p>
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:bg-white/10 text-white font-semibold"
          >
            {t?.services?.customCta ?? 'Hablemos de una solución a medida'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- Subcomponentes ---------- */

const BenefitItem = ({ icon: Icon, text }) => (
  <li className="flex items-start gap-3">
    <Icon className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
    <span>{text}</span>
  </li>
);

const ServiceCard = ({ Icon, title, description, onContact }) => {
  // Tilt 3D suave
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-50, 50], [8, -8]);
  const rotateY = useTransform(mx, [-50, 50], [-8, 8]);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    mx.set(px - 50);
    my.set(py - 50);
  };
  const handleLeave = () => {
    mx.set(0); my.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30"
    >
      {/* Inner card */}
      <div className="rounded-2xl h-full bg-slate-900/60 backdrop-blur-md border border-white/10 p-6">
        {/* Header card */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 grid place-items-center shadow-lg shadow-blue-900/20">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity blur-lg bg-blue-500/20" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/70">{description}</p>
          </div>
        </div>

        {/* Hover reveal: bullets de valor */}
        <div className="mt-5">
          <ul className="grid grid-cols-1 gap-2">
            <li className="flex items-center gap-2 text-white/85">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Implementación rápida y guiada</span>
            </li>
            <li className="flex items-center gap-2 text-white/85">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Integración con tus herramientas</span>
            </li>
            <li className="flex items-center gap-2 text-white/85">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Resultados medibles desde la primera fase</span>
            </li>
          </ul>
        </div>

        {/* Footer card */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-white/50">Soporte • Métricas • Escalabilidad</span>
          <button
            onClick={onContact}
            className="px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white"
          >
            Solicitar propuesta
          </button>
        </div>
      </div>

      {/* Glow sutil en hover */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-gradient-to-r from-emerald-400/15 via-blue-400/15 to-purple-400/15" />
    </motion.div>
  );
};

export default Services2;
