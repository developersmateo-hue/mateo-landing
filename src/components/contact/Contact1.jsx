// Contact1.tsx (tu archivo)
import React, { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuccessToast from '@/components/ui/SuccessToast';
import { useSuccessToast } from '@/hook/useSuccessToast';
import PhoneField from '/src/components/utils/PhoneField.tsx';

const Contact1 = ({ t }) => {
  const {
    visible,
    toastProps,
    showToast,
    hideToast,
  } = useSuccessToast();

  const MAX_MSG = 300; // cámbialo a 250 si prefieres
const normalizeMsg = (s) =>
  s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');

// dentro del componente Contact1
const [message, setMessage] = useState('');

const handleMessageChange = (e) => {
  const raw = e.target.value || '';
  let next = raw.slice(0, MAX_MSG);
  next = normalizeMsg(next);
  setMessage(next);
};

  // Guardamos el último valor válido del teléfono (E.164)
  const phoneRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Aseguramos que el phone es válido antes de enviar
    if (!phoneRef.current?.isValid) {
      showToast({
        title: '📵 Teléfono inválido',
        message: 'Revisa el número según el país seleccionado.',
      });
      return;
    }

    const data = {
      name: form.name.value?.trim(),
      email: form.email.value?.trim(),
      // Enviamos E.164 limpio y validado
      phone: phoneRef.current.e164,
      // (Opcional) si quieres también país/dial
      phone_country: phoneRef.current.country,
      phone_dial: phoneRef.current.dial,

      company: form.company.value?.trim() || '',
      message: form.message.value?.trim() || '',
    };

    try {
      await fetch("https://n8n-n8n.mwsycw.easypanel.host/webhook/7564c55f-1732-451d-b2bc-13dabe9a866f-info-form-landing-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      showToast({
        title: '✅ ¡Mensaje enviado con éxito!',
        message:
          'Gracias por contactarnos. Un asesor te responderá lo antes posible. Si necesitas atención inmediata, usa el chat en la esquina inferior derecha. 💬',
      });

      form.reset();
      phoneRef.current = null;
    } catch (err) {
      showToast({
        title: '❌ Error al enviar el mensaje',
        message: 'Inténtalo nuevamente más tarde.',
      });
    }
  };

  const contactData = t?.contact || {
    title: 'Contacto',
    subtitle: '¿Listo para transformar tu negocio? Hablemos',
    form: {
      name: 'Nombre completo',
      email: 'Email',
      company: 'Empresa',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
    },
    info: {
      title: 'Información de Contacto',
      phone: '+1 (517) 402-7564',
      email: 'contact@mateomi.com',
      address: '123 Tech Street, Silicon Valley, CA 94000, USA',
    },
  };

  const formTitle = t?.contact?.form?.send
    ? 'Envíanos un mensaje'
    : 'Send us a message';

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {contactData.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              {formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.name}</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={contactData.form.name}
                    className="w-full pl-10 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={contactData.form.name}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">👤</span>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.email}</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder={contactData.form.email}
                    className="w-full pl-10 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={contactData.form.email}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">📧</span>
                </div>
              </div>

              {/* Teléfono / WhatsApp con select de país */}
              <PhoneField
                defaultCountryCode="US"
                label="WhatsApp / Teléfono"
                required
                onChange={(val) => { phoneRef.current = val; }}
              />

              {/* Empresa (opcional) */}
              <div className="relative">
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">{contactData.form.company}</label>
                <div className="relative">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder={contactData.form.company}
                    className="w-full pl-10 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={contactData.form.company}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">🏢</span>
                </div>
              </div>

              {/* Mensaje (opcional, con guía y contador) */}
<div className="relative">
  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
    {contactData.form.message}
  </label>

  <div className="relative">
    <textarea
      id="message"
      name="message"
      rows={5}
      value={message}
      onChange={handleMessageChange}
      onBlur={() => setMessage((m) => normalizeMsg(m.trim()))}
      maxLength={MAX_MSG}
      placeholder={
`Cuéntanos brevemente:
• ¿Qué necesita tu empresa? (p. ej., automatizar ventas)
• ¿Qué te llamó la atención de nosotros?
• ¿Qué te gustaría saber antes de empezar?`
      }
      className="w-full pl-10 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-describedby="message-help message-count"
    />
    <span className="absolute left-3 top-4 text-white/60">💬</span>
  </div>

  <div className="mt-2 flex items-center justify-between text-xs">
    <p id="message-help" className="text-white/50">
      Máximo {MAX_MSG} caracteres. Sé concreto para ayudarte mejor.
    </p>
    <p id="message-count" className={`tabular-nums ${message.length >= MAX_MSG ? 'text-red-300' : 'text-white/50'}`}>
      {message.length}/{MAX_MSG}
    </p>
  </div>
</div>


              <Button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
                {contactData.form.send}
              </Button>
            </form>
          </motion.div>

          {/* … tu panel derecho tal como está … */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              {contactData.info.title || 'Información de Contacto'}
            </h3>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Email</h4>
                <a href={`mailto:${contactData.info.email}`} className="text-white/70 hover:text-white transition-colors">{contactData.info.email}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Teléfono</h4>
                <a href={`tel:${contactData.info.phone.replace(/\s/g, '')}`} className="text-white/70 hover:text-white transition-colors">{contactData.info.phone}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Dirección</h4>
                <p className="text-white/70">{contactData.info.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SuccessToast visible={visible} onClose={hideToast} {...toastProps} />
    </section>
  );
};

export default Contact1;
