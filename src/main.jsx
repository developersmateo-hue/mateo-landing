import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { HelmetProvider } from 'react-helmet-async';
import { StripePayProvider } from './payments/StripePayProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <StripePayProvider publishableKey={import.meta.env.VITE_STRIPE_PK}>
    <App />
    </StripePayProvider>
    </HelmetProvider>
  </React.StrictMode>
);