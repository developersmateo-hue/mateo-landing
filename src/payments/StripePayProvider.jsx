import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePayCtx = createContext(null);

/* ---------- UI helpers ---------- */
function PeriodSelector({ options, selected, onSelect, disabled }) {
  if (!options?.length) return null;
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
      {options.map((opt) => (
        <button
          key={opt.priceId}
          onClick={() => !disabled && onSelect(opt)}
          disabled={disabled}
          style={{
            padding: '8px 12px',
            borderRadius: 999,
            border: selected?.priceId === opt.priceId ? '2px solid #10b981' : '1px solid #e5e7eb',
            background: selected?.priceId === opt.priceId ? 'rgba(16,185,129,.1)' : '#fff',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function HeaderBrand({ ui, planTitle, priceHuman }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      {ui?.brand?.logoUrl && (
        <img
          src={ui.brand.logoUrl}
          alt="logo"
          width={40}
          height={40}
        />
      )}
      {/* Sólo el título del plan/periodo, sin repetir el nombre de la marca */}
      {planTitle && (
        <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>
          {planTitle}
        </div>
      )}
      {/* Precio grande y en negrita */}
      {priceHuman && (
        <div style={{ fontWeight: 800, fontSize: 18, marginTop: 2 }}>
          {priceHuman}
        </div>
      )}
    </div>
  );
}


function TrustBlock({ ui }) {
  // construimos la fila de enlaces que existan
  const links = [
    ui?.support?.email   ? { label: 'Soporte',   href: `mailto:${ui.support.email}` } : null,
    ui?.support?.whatsapp? { label: 'WhatsApp',  href: ui.support.whatsapp } : null,
    ui?.legal?.termsUrl  ? { label: 'Términos',  href: ui.legal.termsUrl } : null,
    ui?.legal?.privacyUrl? { label: 'Privacidad',href: ui.legal.privacyUrl } : null,
    ui?.legal?.refundUrl ? { label: 'Reembolsos',href: ui.legal.refundUrl } : null,
  ].filter(Boolean);

  return (
    <div style={{ marginTop: 12, borderTop: '1px solid #eef2f7', paddingTop: 12, textAlign: 'center' }}>
      {/* línea de confianza centrada */}
      <div style={{ fontSize: 12, color: '#6b7280' }}>
        Pago seguro con <strong>Stripe</strong> · Datos cifrados (TLS) · No almacenamos tu tarjeta
      </div>

      {/* enlaces centrados con separadores */}
      {links.length > 0 && (
        <div style={{ marginTop: 6, fontSize: 12 }}>
          {links.map((l, i) => (
            <React.Fragment key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>
                {l.label}
              </a>
              {i < links.length - 1 && <span style={{ margin: '0 8px', color: '#9ca3af' }}>•</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* powered by centrado */}
      <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6 }}>
        Powered by Stripe
      </div>
    </div>
  );
}



/* ---------- Form que usa PaymentElement (solo con clientSecret) ---------- */
function PaymentForm({ prefill, onSuccess, onError, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true); setMsg(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: prefill?.email,
        payment_method_data: prefill ? {
          billing_details: {
            name: prefill.name, email: prefill.email, phone: prefill.phone, address: prefill.address
          }
        } : undefined,
      },
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      const m = error.message || 'Error al procesar el pago.';
      setMsg(m); onError?.(new Error(m)); return;
    }

    onSuccess?.({ status: paymentIntent?.status, id: paymentIntent?.id });
    onClose?.();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe || !elements}
        style={{ height: 44, borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer', background:'#10b981', color:'#fff' }}>
        {loading ? 'Procesando…' : 'Pagar ahora'}
      </button>
      {msg && <div style={{ color: '#b91c1c', fontSize: 14 }}>{msg}</div>}
    </form>
  );
}

/* ---------- Overlay con selector SIEMPRE visible ---------- */
function PaymentOverlay({
  open, close, ui, mode,
  subscriptionOptions, selectedOption, onSelectSubscription,
  stripePromise, clientSecret, appearance, locale, prefill,
  onSuccess, onError, clearClientSecret, isFetchingSecret
}) {
  if (!open) return null;

  const showLoader = isFetchingSecret || (mode === 'subscription' && !clientSecret);

  return (
    <div onClick={close} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
      display: 'grid', placeItems: 'center', zIndex: 9999
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 'min(620px, 94vw)', background: '#0b1320', borderRadius: 18, padding: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,.25)', color: '#e5e7eb'
      }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, color: '#0b1320' }}>
          <HeaderBrand
            ui={ui}
            planTitle={mode === 'subscription' ? (selectedOption?.label || 'Suscripción') : 'Pago único'}
            priceHuman={selectedOption?.priceHuman}
          />

          {/* Selector SIEMPRE visible */}
          {mode === 'subscription' && subscriptionOptions?.length > 0 && (
            <>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>
                Elige el período de tu suscripción:
              </div>
              <PeriodSelector
                options={subscriptionOptions}
                selected={selectedOption}
                onSelect={onSelectSubscription}
                disabled={isFetchingSecret}
              />
            </>
          )}

         {/* Loader mientras pedimos/actualizamos clientSecret */}
{showLoader && (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 0',
      color: '#6b7280',
      fontSize: 14,
    }}
    aria-live="polite"
  >
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>Preparando pago...</span>
      {/* espacio exacto de 2 caracteres */}
      <span style={{ display: 'inline-block', width: '2ch' }} />
      {/* Spinner azul fuerte */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-label="Cargando"
        role="status"
      >
        <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="3" fill="none" opacity="0.25" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
  </div>
)}

          {/* PaymentElement solo con clientSecret */}
          {!showLoader && clientSecret && stripePromise && (
            <Elements
              key={clientSecret}
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance,
                locale,
                defaultValues: prefill ? { billingDetails: prefill } : undefined,
              }}
            >
              <PaymentForm
                prefill={prefill}
                onSuccess={onSuccess}
                onError={onError}
                onClose={() => { close(); clearClientSecret(); }}
              />
            </Elements>
          )}

          <TrustBlock ui={ui} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Provider + Hook ---------- */
export function StripePayProvider({ publishableKey, children, appearanceTheme = 'flat' }) {
  const pk = (publishableKey || import.meta.env.VITE_STRIPE_PK || '').trim();
  const stripePromise = useMemo(() => /^pk_(test|live)_/.test(pk) ? loadStripe(pk) : null, [pk]);

  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [prefill, setPrefill] = useState(null);
  const [resolver, setResolver] = useState({ resolve: null, reject: null });
  const [ui, setUi] = useState(null);
  const [mode, setMode] = useState('one_time');

  const [subscriptionOptions, setSubscriptionOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFetchingSecret, setIsFetchingSecret] = useState(false);

  const fetchClientSecret = useCallback(async (opts) => {
    setIsFetchingSecret(true);
    try {
      const endpoint = opts.mode === 'subscription' ? '/api/create-subscription' : '/api/create-payment-intent';
      const body = opts.mode === 'subscription'
        ? {
            priceId: opts.priceId,
            customerEmail: opts.prefill?.email,
            customerName: opts.prefill?.name,
            address: opts.prefill?.address,
            phone: opts.prefill?.phone,
            currency: opts.currency || 'usd',
            metadata: opts.metadata,
          }
        : {
            amount: opts.amountInCents,
            currency: opts.currency || 'usd',
            customerEmail: opts.prefill?.email,
            customerName: opts.prefill?.name,
            address: opts.prefill?.address,
            phone: opts.prefill?.phone,
            metadata: opts.metadata,
          };

      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const text = await res.text(); throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`); }
      const data = await res.json();
      if (!data?.clientSecret) throw new Error('Respuesta sin clientSecret');
      setClientSecret(data.clientSecret);
    } finally {
      setIsFetchingSecret(false);
    }
  }, []);

  const onSelectSubscription = useCallback(async (opt) => {
    setSelectedOption(opt);
    // crea/actualiza el intent según la opción elegida
    await fetchClientSecret({
      mode: 'subscription',
      priceId: opt.priceId,
      prefill,
      currency: opt.currency || 'usd',
      metadata: opt.metadata,
    });
  }, [fetchClientSecret, prefill]);

  const openPay = useCallback(async (opts) => {
    // opts: { mode, amountInCents?, priceId?, currency?, prefill?, metadata?, ui?, locale?, appearance?, subscriptionOptions?, defaultPriceId? }
    if (!opts?.mode) throw new Error('Debes indicar mode: "one_time" o "subscription"');
    if (opts.mode === 'one_time' && !opts.amountInCents) throw new Error('Falta amountInCents en pago único.');
    if (opts.mode === 'subscription' && !opts.priceId && !opts.subscriptionOptions) throw new Error('Pasa priceId o subscriptionOptions.');

    setUi(opts.ui || null);
    setPrefill(opts.prefill || null);
    setMode(opts.mode);
    setOpen(true);

    if (opts.mode === 'subscription' && opts.subscriptionOptions?.length) {
      setSubscriptionOptions(opts.subscriptionOptions);

      // Selección por defecto (ej.: 12 meses)
      if (opts.defaultPriceId) {
        const def = opts.subscriptionOptions.find(o => o.priceId === opts.defaultPriceId) || opts.subscriptionOptions[0];
        setSelectedOption(def);
        await fetchClientSecret({
          mode: 'subscription',
          priceId: def.priceId,
          prefill: opts.prefill,
          currency: def.currency || 'usd',
          metadata: def.metadata,
        });
      } else if (!opts.priceId) {
        // Si no hay default y tampoco priceId, aún no hay clientSecret:
        setSelectedOption(null);
        setClientSecret(null);
      }
    } else {
      // Crear inmediatamente (pago único o subs con priceId directo)
      setSubscriptionOptions(null);
      setSelectedOption(null);
      await fetchClientSecret(opts);
    }

    return new Promise((resolve, reject) => setResolver({ resolve, reject }));
  }, [fetchClientSecret]);

  const close = useCallback(() => setOpen(false), []);
  const clearClientSecret = useCallback(() => setClientSecret(null), []);

  const ctxValue = useMemo(() => ({ openPay }), [openPay]);

  const appearance = useMemo(() => ({
    theme: appearanceTheme,
    variables: {
      colorPrimary: '#10b981',
      colorBackground: '#ffffff',
      colorText: '#0b1320',
      borderRadius: '12px',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    }
  }), [appearanceTheme]);

  const locale = ui?.locale || 'auto';

  return (
    <StripePayCtx.Provider value={ctxValue}>
      {children}

      {open && (
        <PaymentOverlay
          open={open}
          close={close}
          ui={ui}
          mode={mode}
          subscriptionOptions={subscriptionOptions}
          selectedOption={selectedOption}
          onSelectSubscription={onSelectSubscription}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          appearance={appearance}
          locale={locale}
          prefill={prefill}
          onSuccess={resolver.resolve}
          onError={resolver.reject}
          clearClientSecret={clearClientSecret}
          isFetchingSecret={isFetchingSecret}
        />
      )}
    </StripePayCtx.Provider>
  );
}

export function useStripePay() {
  const ctx = useContext(StripePayCtx);
  if (!ctx) throw new Error('useStripePay debe usarse dentro de <StripePayProvider>');
  return ctx;
}
