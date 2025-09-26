// server.js
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

// server.js (extracto)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const {
      amount, currency = 'usd',
      customerEmail, customerName, address, phone
    } = req.body;

    let customer;
    if (customerEmail) {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
      customer = existing.data[0] || await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        phone,
        address, // {line1, city, state, postal_code, country}
      });
      // si ya existe, actualiza datos faltantes
      if (existing.data[0]) {
        await stripe.customers.update(existing.data[0].id, {
          ...(customerName ? { name: customerName } : {}),
          ...(phone ? { phone } : {}),
          ...(address ? { address } : {}),
        });
      }
    }

    const pi = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer?.id,
      automatic_payment_methods: { enabled: true },
      // ✅ para guardar la tarjeta y que quede “forma de pago” en el Customer:
      setup_future_usage: 'off_session',
      receipt_email: customerEmail || undefined,
      metadata: { app: 'mateo-landing' },
    });

    res.json({ clientSecret: pi.client_secret });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/api/create-subscription', async (req, res) => {
  try {
    const { priceId, customerEmail, customerName, address, phone } = req.body;
    if (!priceId || !customerEmail) throw new Error('priceId y customerEmail son requeridos');

    const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
    const customer = existing.data[0] || await stripe.customers.create({
      email: customerEmail,
      name: customerName,
      phone,
      address,
    });
    if (existing.data[0]) {
      await stripe.customers.update(existing.data[0].id, {
        ...(customerName ? { name: customerName } : {}),
        ...(phone ? { phone } : {}),
        ...(address ? { address } : {}),
      });
    }

    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      collection_method: 'charge_automatically',
      metadata: { app: 'mateo-landing' },
    });

    const clientSecret = sub.latest_invoice.payment_intent.client_secret;
    res.json({ clientSecret, subscriptionId: sub.id, customerId: customer.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


app.listen(4242, () => console.log('Stripe backend en http://localhost:4242'));
