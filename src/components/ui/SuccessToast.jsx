import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const toastVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const SuccessToast = ({ visible, onClose, title, message, duration = 6000 }) => {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(onClose, duration);
      return () => clearTimeout(timeout);
    }
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[9999] w-full max-w-sm bg-emerald-600 text-white rounded-xl shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start gap-3 p-4">
            <CheckCircle className="w-6 h-6 mt-1 text-white/90" />
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-sm text-white/90 leading-relaxed">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition ml-2 text-sm"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
