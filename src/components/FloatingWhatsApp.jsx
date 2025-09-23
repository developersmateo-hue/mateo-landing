import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WEBHOOK_URL =
  import.meta.env?.VITE_N8N_WEBHOOK_URL ||
  'https://n8n-n8n.mwsycw.easypanel.host/webhook/e0c5f767-d7d5-4356-96-mateo-landing-page';

const FloatingWhatsApp = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sessionIdRef = useRef(Math.random().toString(36).slice(2));
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mensajes hover/bubble fuera del chat
  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      if (!isOpen) {
        setShowBubble(true);
        setTimeout(() => {
          setShowBubble(false);
          setBubbleIndex((prev) => (prev + 1) % t.messages.length);
        }, 5000);
      }
    }, 12000);
    return () => clearInterval(bubbleInterval);
  }, [t.messages.length, isOpen]);

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: t.chat.welcome, sender: 'bot' }]);
    }
  }, [isOpen, t.chat.welcome, messages.length]);

  // Autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const lang = useMemo(() => document.documentElement.lang || 'es', []);

  // ---- Helper: llamar al webhook con timeout y manejo de JSON/text ----
  const callWebhook = async (payload) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json,text/plain;q=0.9' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      // Respuesta puede ser JSON o texto
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        const errText = await (contentType.includes('application/json') ? res.json().then(JSON.stringify).catch(()=>'') : res.text());
        throw new Error(`HTTP ${res.status}: ${errText || 'Webhook error'}`);
      }

      let replyText = '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        // Intenta varios campos comunes
        replyText = data.reply || data.message || data.text || JSON.stringify(data);
      } else {
        replyText = await res.text();
      }
      return replyText?.toString() || '';
    } finally {
      clearTimeout(timer);
    }
  };

const sendMessageToWebhook = async (userText, typingId, extra = {}) => {
  const MIN_TYPING_DELAY_MS = 400; // mínimo 1s
  const TYPING_TIME_PER_CHAR_MS = 30; // 50ms por caracter

  try {
    setIsSending(true);
    const payload = {
      message: userText,
      lang,
      source: 'floating-whatsapp',
      sessionId: sessionIdRef.current,
      timestamp: Date.now(),
      ...extra,
    };

    const reply = await callWebhook(payload);

    let parsedParts = [];

    try {
      const parsed = JSON.parse(reply);
      if (parsed.response && typeof parsed.response === 'object') {
        parsedParts = Object.values(parsed.response).filter((part) => typeof part === 'string' && part.trim() !== '');
      }
    } catch (err) {
      parsedParts = [reply];
    }

    // Eliminar el placeholder de typing original
    setMessages((prev) => prev.filter((m) => m.id !== typingId));

    for (let i = 0; i < parsedParts.length; i++) {
      const part = parsedParts[i];
      const id = Date.now() + i;

      if (i === 0) {
        // Primer mensaje: mostrar inmediatamente
        setMessages((prev) => [
          ...prev,
          { id, text: part, sender: 'bot' },
        ]);
      } else {
        // Mensajes posteriores: simular typing + delay
        setMessages((prev) => [
          ...prev,
          { id, sender: 'bot', typing: true },
        ]);

        const delayMs = Math.max(
          MIN_TYPING_DELAY_MS,
          part.length * TYPING_TIME_PER_CHAR_MS
        );

        await new Promise((res) => setTimeout(res, delayMs));

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id
              ? { ...msg, typing: false, text: part }
              : msg
          )
        );
      }
    }
  } catch (err) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === typingId
          ? {
              ...m,
              typing: false,
              text:
                t.chat.imageError ||
                'Oops, hubo un problema al conectar con nuestro asistente. Intenta de nuevo en unos segundos.',
            }
          : m
      )
    );
  } finally {
    setIsSending(false);
  }
};





  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    // Agrega mensaje del usuario
    const userId = Date.now();
    setMessages((prev) => [...prev, { id: userId, text, sender: 'user' }]);
    setInputValue('');

    // Placeholder de typing del bot
    const typingId = userId + 1;
    setMessages((prev) => [
      ...prev,
      { id: typingId, text: t.chat.autoResponse, sender: 'bot', typing: true },
    ]);

    // Llama al webhook
    await sendMessageToWebhook(text, typingId);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || isSending) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result;
      const userId = Date.now();

      // Muestra imagen enviada por el usuario
      setMessages((prev) => [
        ...prev,
        { id: userId, text: file.name, sender: 'user', image: dataUrl },
      ]);

      // Placeholder de typing
      const typingId = userId + 1;
      setMessages((prev) => [
        ...prev,
        { id: typingId, text: t.chat.imageUpload, sender: 'bot', typing: true },
      ]);

      // Envía al webhook (si tu flujo soporta imágenes, procesará "image")
      await sendMessageToWebhook(`Imagen: ${file.name}`, typingId, {
        image: { name: file.name, dataUrl },
      });
    };
    reader.onerror = () => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: t.chat.imageError || 'Error al leer la imagen.', sender: 'bot' },
      ]);
    };
    reader.readAsDataURL(file);
    // Limpia input para permitir re-subir mismo archivo
    event.target.value = '';
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {!isOpen && showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-full right-0 mb-4 p-3 bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-br-lg shadow-lg w-auto max-w-xs"
              role="alert"
            >
              <p className="font-medium text-sm">{t.messages[bubbleIndex]}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl"
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat de WhatsApp'}
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col glass-effect shadow-2xl rounded-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            <header className="p-4 bg-white/10 flex items-center justify-between">
              <div>
                <h3 id="chat-title" className="font-bold text-white">{t.chat.title}</h3>
                <span className="text-sm text-green-300">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />}
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-700 text-white rounded-bl-none'
                    }`}
                  >
                    {msg.image ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-12 h-12 mb-2 text-white/70" />
                        <img
                          src={msg.image}
                          alt={msg.text}
                          className="max-w-full h-auto rounded-lg mb-2"
                          loading="lazy"
                        />
                        <span>{msg.text}</span>
                      </div>
                    ) : msg.typing ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="typing-dot" /> <span className="typing-dot" />{' '}
                        <span className="typing-dot" />
                      </span>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex items-center bg-white/10 rounded-full p-1">
                <label htmlFor="chat-input" className="sr-only">
                  {t.chat.placeholder}
                </label>
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-white/50"
                  disabled={isSending}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white"
                  disabled={isSending}
                >
                  <label htmlFor="file-upload" className="cursor-pointer" aria-label="Adjuntar imagen">
                    <Paperclip className="w-5 h-5" />
                  </label>
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10 p-0 disabled:opacity-60"
                  aria-label="Enviar mensaje"
                  disabled={isSending}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing dots styles */}
      <style>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.85);
          display: inline-block;
          animation: td-bounce 1.2s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes td-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
