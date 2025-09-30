import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { HelmetProvider } from 'react-helmet-async';
import { StripePayProvider } from './payments/StripePayProvider';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <StripePayProvider
          publishableKey={import.meta.env.VITE_STRIPE_PK}
          apiBase={import.meta.env.VITE_API_BASE}
          flowToken={import.meta.env.VITE_FLOW_TOKEN}
        >
          <App />
        </StripePayProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
