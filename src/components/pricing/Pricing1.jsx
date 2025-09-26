import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useStripePay } from '@/payments/StripePayProvider';
import { PRICE_IDS } from '@/payments/priceIds';

const parseBRLToCents = (s) => {
  const normalized = String(s).replace(/[^\d,]/g, '').replace(/\./g, '').replace(',', '.');
  const value = Number(normalized || 0);
  return Math.round(value * 100);
};

const Pricing1 = ({ t, user }) => {
  const { openPay } = useStripePay();
  const [loadingPlan, setLoadingPlan] = useState(null); // nombre del plan en carga

  const handlePlanSelect = async (plan) => {
    try {
      setLoadingPlan(plan.name);

      const ids = PRICE_IDS[plan.name];
      const monthlyCents = parseBRLToCents(plan.price);

      if (ids?.month) {
        await openPay({
          mode: 'subscription',
          // siempre mostrar selector
          subscriptionOptions: [
            { label: '1 mes',            priceId: ids.month, currency: 'brl', priceHuman: `${plan.currency}${plan.price}/mes` },
            { label: '12 meses (-20%)',  priceId: ids.year,  currency: 'brl', priceHuman: `${plan.currency}${(monthlyCents*12*0.8/100).toFixed(2)}/año` },
            { label: '24 meses (-35%)',  priceId: ids.bi,    currency: 'brl', priceHuman: `${plan.currency}${(monthlyCents*24*0.65/100).toFixed(2)}/24 meses` },
          ],
          // abrir directo con 12 meses seleccionado
          defaultPriceId: ids.year,
          prefill: {
            name: user?.name || 'Invitado',
            email: user?.email || `test+${Date.now()}@example.com`,
          },
          ui: {
            brand: { name: 'Mateo', logoUrl: '/logo-mateo.png' },
            support: { email: 'contact@mateomi.com', whatsapp: 'https://wa.me/5531998709101' },
            legal: {
              termsUrl: '/terminos', privacyUrl: '/privacidad', refundUrl: '/devoluciones',
              address: 'Av. Paulista 1000, São Paulo - SP', taxId: 'CNPJ 12.345.678/0001-90',
              statement: 'MATEO*SERVICIOS'
            },
            locale: 'es-419',
          },
          metadata: { plan: plan.name },
        });
      } else {
        // fallback: pago único
        await openPay({
          mode: 'one_time',
          amountInCents: monthlyCents,
          currency: 'brl',
          prefill: {
            name: user?.name || 'Invitado',
            email: user?.email || `test+${Date.now()}@example.com`,
          },
          ui: {
            brand: { name: 'Mateo', logoUrl: '/logo-mateo.png' },
            support: { email: 'contact@mateomi.com', whatsapp: 'https://wa.me/5531998709101' },
            legal: { termsUrl: '/terminos', privacyUrl: '/privacidad', statement: 'MATEO*SERVICIOS' },
            locale: 'es-419',
          },
          metadata: { plan: plan.name },
        });
      }

      toast({ title: '✅ Listo', description: `Procesa el plan ${plan.name}` });
    } catch (err) {
      toast({ title: '❌ Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        {/* header igual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{t.pricing.title}</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">{t.pricing.subtitle}</p>
          <div className="inline-flex items-center bg-white/10 rounded-full p-1">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
              {t.pricing.monthly}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }} viewport={{ once: true }}
              className={`relative glass-effect rounded-2xl p-8 card-hover flex flex-col ${plan.popular ? 'ring-2 ring-blue-500 scale-105 lg:scale-110' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Más Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gradient">{plan.currency}{plan.price}</span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/80 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanSelect(plan)}
                disabled={loadingPlan === plan.name}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                  plan.popular ? 'btn-primary' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                aria-label={`Seleccionar el plan ${plan.name}`}
              >
                {loadingPlan === plan.name ? 'Cargando…' : t.pricing.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing1;
