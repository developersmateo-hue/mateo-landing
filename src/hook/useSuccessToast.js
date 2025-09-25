import { useState, useCallback } from 'react';

export const useSuccessToast = () => {
  const [visible, setVisible] = useState(false);
  const [toastProps, setToastProps] = useState({ title: '', message: '' });

  const showToast = useCallback(({ title, message, duration = 6000 }) => {
    setToastProps({ title, message, duration });
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    toastProps,
    showToast,
    hideToast,
  };
};
