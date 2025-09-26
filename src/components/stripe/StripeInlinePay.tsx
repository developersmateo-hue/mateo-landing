import React, { useEffect, useMemo, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

type Mode = 'one_time' | 'subscription';

interface Props {
  publishableKey: string;            // pk_live / pk_test
  mode: Mode;                        // 'one_time' o 'subscription'
  amountInCents?: number;            // requerido si mode='one_time'
  priceId?: string;                  // requerido si mode='subscription'
  customerEmail?: string;            // recomendado para recibos y asociación
  appearanceTheme?: 'stripe' | 'flat' | 'night' | 'none';
  onSuccess?: (payload: any) => void;
  onError?: (message: string) => void;
}

const stripePromiseCache: Record<string, Promise<any>> = {};

function getStripe(pk: string) {
  if (!stripePromiseCache[pk]) {
    stripePromiseCache[pk] = loadStripe(pk);
  }
  return stripePromiseCache[pk];
}

const InnerForm: React.FC<{
  clientSecret: string;
  mode: Mode;
  onSuccess?: (payload: any) => void;
  onError?: (msg: string) => void;
  setOpen: (v: boolean) => void;
}> = ({ clientSecret, mode, onSuccess, onError, setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    // confirmPayment funciona tanto para PaymentIntent (one_time)
    // como para el PaymentIntent del invoice de la Subscription.
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // si quisieras redirigir luego de 3DS: return_url
      },
      redirect: 'if_required', // evita redirigir; 3DS se maneja en overlay
    });

    setLoading(false);

    if (error) {
      const msg = error.message || 'Ocurrió un error al procesar el pago.';
      setMessage(msg);
      onError?.(msg);
      return;
    }

    if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
      onSuccess?.({ mode, status: paymentIntent.status, id: paymentIntent.id });
      setOpen(false);
    } else {
      // requires_action, requires_payment_method, etc.
      setMessage(`Estado del pago: ${paymentIntent?.status ?? 'desconocido'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, width: '100%' }}>
      <PaymentElement />
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        style={{
          height: 44,
          borderRadius: 10,
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Procesando…' : (mode === 'subscription' ? 'Iniciar suscripción' : 'Pagar ahora')}
      </button>
      {message && <div style={{ color: 'crimson', fontSize: 14 }}>{message}</div>}
    </form>
  );
};

export const StripeInlinePay: React.FC<Props> = ({
  publishableKey,
  mode,
  amountInCents,
  priceId,
  customerEmail,
  appearanceTheme = 'stripe',
  onSuccess,
  onError,
}) => {
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const stripePromise = useMemo(() => getStripe(publishableKey), [publishableKey]);

  const options: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance:
          appearanceTheme === 'none'
            ? {}
            : { theme: appearanceTheme },
      }
    : undefined;

  const createIntentOrSubscription = async () => {
    try {
      const endpoint =
        mode === 'subscription' ? 'http://localhost:4242/api/create-subscription' : 'http://localhost:4242/api/create-payment-intent';

      const body =
        mode === 'subscription'
          ? { priceId, customerEmail }
          : { amount: amountInCents, currency: 'usd', customerEmail };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo crear la intención de pago.');

      setClientSecret(data.clientSecret);
      setOpen(true);
    } catch (err: any) {
      onError?.(err.message);
    }
  };

  useEffect(() => {
    // Limpia el clientSecret al cerrar
    if (!open) setClientSecret(null);
  }, [open]);

  return (
    <>
      <button
        onClick={createIntentOrSubscription}
        style={{
          height: 44,
          padding: '0 16px',
          borderRadius: 10,
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {mode === 'subscription' ? 'Suscribirme' : 'Pagar'}
      </button>

      {/* Modal simple inline */}
      {open && clientSecret && options && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(560px, 92vw)',
              background: '#fff',
              borderRadius: 16,
              padding: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>
              {mode === 'subscription' ? 'Confirmar suscripción' : 'Confirmar pago'}
            </h3>
            <Elements stripe={stripePromise} options={options}>
              <InnerForm
                clientSecret={clientSecret}
                mode={mode}
                onSuccess={onSuccess}
                onError={onError}
                setOpen={setOpen}
              />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
};
