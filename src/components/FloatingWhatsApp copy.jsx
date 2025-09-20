
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingWhatsApp = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: t.chat.welcome, sender: 'bot' }]);
    }
  }, [isOpen, t.chat.welcome, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessages = [...messages, { id: Date.now(), text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: t.chat.autoResponse, sender: 'bot', typing: true }]);
    }, 1000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newMessages = [
        ...messages,
        { id: Date.now(), text: file.name, sender: 'user', image: e.target.result }
      ];
      setMessages(newMessages);
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: t.chat.imageUpload, sender: 'bot', typing: true }]);
    }, 1000);
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
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
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
                  <span className="text-white font-bold text-xl">T</span>
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>}
                  <div className={`max-w-[75%] rounded-2xl p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-700 text-white rounded-bl-none'
                    }`}
                  >
                    {msg.image ? (
                        <div className="flex flex-col items-center">
                            <ImageIcon className="w-12 h-12 mb-2 text-white/70" />
                            <img src={msg.image} alt={msg.text} className="max-w-full h-auto rounded-lg mb-2" loading="lazy" />
                            <span>{msg.text}</span>
                        </div>
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
                <label htmlFor="chat-input" className="sr-only">{t.chat.placeholder}</label>
                <input
                  id="chat-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-white/50"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <label htmlFor="file-upload" className="cursor-pointer" aria-label="Adjuntar imagen">
                    <Paperclip className="w-5 h-5" />
                  </label>
                </Button>
                <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10 p-0" aria-label="Enviar mensaje">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;
  