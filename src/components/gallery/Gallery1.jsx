
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery1 = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "AI dashboard with real-time analytics and machine learning insights",
      description: "Dashboard de IA con análisis en tiempo real y insights de machine learning"
    },
    {
      src: "Modern chatbot interface with natural language processing",
      description: "Interfaz de chatbot moderno con procesamiento de lenguaje natural"
    },
    {
      src: "Automated workflow system with n8n integration",
      description: "Sistema de flujo de trabajo automatizado con integración n8n"
    },
    {
      src: "CRM integration dashboard showing customer data and AI predictions",
      description: "Dashboard de integración CRM mostrando datos de clientes y predicciones de IA"
    },
    {
      src: "Smart landing page with AI-powered conversion optimization",
      description: "Landing page inteligente con optimización de conversión impulsada por IA"
    },
    {
      src: "Sales assistant AI interface with lead qualification system",
      description: "Interfaz de asistente de ventas con IA y sistema de calificación de leads"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="section-padding bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {t.gallery.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mb-8">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden glass-effect">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => openModal(images[currentIndex])}
                onKeyPress={(e) => e.key === 'Enter' && openModal(images[currentIndex])}
                role="button"
                tabIndex="0"
                aria-label={`Ver imagen ampliada: ${images[currentIndex].description}`}
              >
                <img  
                  class="w-full h-full object-cover" 
                  alt={images[currentIndex].description} src="https://images.unsplash.com/photo-1595872018818-97555653a011" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">
                    {images[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : 'hover:scale-105'
              }`}
              onClick={() => setCurrentIndex(index)}
              onKeyPress={(e) => e.key === 'Enter' && setCurrentIndex(index)}
              role="button"
              tabIndex="0"
              aria-label={`Seleccionar imagen ${index + 1}`}
            >
              <img  
                class="w-full h-full object-cover" 
                alt={`Miniatura ${index + 1}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" loading="lazy" />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-description"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={closeModal}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </Button>
                
                <img  
                  class="w-full h-auto max-h-[70vh] object-contain" 
                  alt={selectedImage.description} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                
                <div className="p-6">
                  <p id="modal-description" className="text-white text-lg">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery1;
  