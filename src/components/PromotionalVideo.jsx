import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalVideo = ({ t }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
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
    <section id="promo-video" className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4 text-gradient"
        >
          {t.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl text-white/80"
        >
          {t.subheadline}
        </motion.p>
      </div>
      <div className="absolute bottom-8 right-8 z-10">
        <Button
          onClick={handlePlayPause}
          variant="outline"
          size="icon"
          className="bg-white/20 hover:bg-white/30 text-white rounded-full glass-effect"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
      </div>
    </section>
  );
};

export default PromotionalVideo;