
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header3 from '@/components/header/Header3';
import Hero1 from '@/components/hero/Hero1';
import Services1 from '@/components/services/Services1';
import PromotionalVideo1 from '@/components/promotional-video/PromotionalVideo1';
import About3 from '@/components/about/About3';
import AISolutions1 from '@/components/ai-solutions/AISolutions1';
import Testimonials1 from '@/components/testimonials/Testimonials1';
import Pricing1 from '@/components/pricing/Pricing1';
import Gallery1 from '@/components/gallery/Gallery1';
import Contact1 from '@/components/contact/Contact1';
import Footer2 from '@/components/footer/Footer2';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { translations } from '@/lib/translations';

function App() {
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('blue');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = language;
  }, [theme, language]);

  const t = translations[language];


  const floatingWhatsAppTranslations = {
    es: {
      messages: [
        "¿Tienes alguna duda? ¡Escríbeme ya!",
        "🚀 ¡Contrata nuestros servicios hoy mismo!",
        "📞 Atención 24h – ¡Pregunta ya!"
      ],
      chat: {
        title: "Asistente Virtual",
        welcome: "¡Hola! 👋 ¿Cómo puedo ayudarte hoy?",
        placeholder: "Escribe tu mensaje...",
        send: "Enviar",
        autoResponse: "Gracias por tu mensaje. Un especialista se pondrá en contacto contigo pronto.",
        imageUpload: "Imagen subida. Analizándola...",
        imageError: "Error al subir la imagen. Intenta de nuevo."
      }
    },
    en: {
      messages: [
        "Have any questions? Write to me now!",
        "🚀 Hire our services today!",
        "📞 24h support – Ask now!"
      ],
      chat: {
        title: "Virtual Assistant",
        welcome: "Hello! 👋 How can I help you today?",
        placeholder: "Type your message...",
        send: "Send",
        autoResponse: "Thanks for your message. A specialist will contact you shortly.",
        imageUpload: "Image uploaded. Analyzing...",
        imageError: "Error uploading image. Please try again."
      }
    },
    pt: {
      messages: [
        "Tem alguma dúvida? Escreva para mim agora!",
        "🚀 Contrate nossos serviços hoje mesmo!",
        "📞 Atendimento 24h – Pergunte já!"
      ],
      chat: {
        title: "Assistente Virtual",
        welcome: "Olá! 👋 Como posso te ajudar hoje?",
        placeholder: "Digite sua mensagem...",
        send: "Enviar",
        autoResponse: "Obrigado pela sua mensagem. Um especialista entrará em contato com você em breve.",
        imageUpload: "Imagem enviada. Analisando...",
        imageError: "Erro ao enviar a imagem. Tente novamente."
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.pixabay.com" />
      </Helmet>
      
      <div className="min-h-screen gradient-bg">
         <Header3 
          language={language} 
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          t={t}
        /> 
        
        <main>
          {/* <AISolutions1 t={t} /> */}
          <Services1 t={t} />
          <About3 t={t} />
          
          {/* <Pricing1 t={t} /> */}
          <Contact1 t={t} />
        </main>
        
        <Footer2 t={t} />
        <FloatingWhatsApp t={floatingWhatsAppTranslations[language]} />
        <Toaster />
      </div>
    </>
  );
}

export default App;
  