
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalVideo1 = ({ t }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden" aria-label="Video promocional">
      <video
        ref={videoRef}
        src="https://cdn.pixabay.com/video/2024/05/23/211863-944342059_large.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {t.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl max-w-2xl"
        >
          {t.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute bottom-8"
        >
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalVideo1;
  