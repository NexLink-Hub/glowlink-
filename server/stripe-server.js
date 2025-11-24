import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.STRIPE_PORT || 4242;
const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY not set. The server will still start but Stripe calls will fail.");
}

const stripe = new Stripe(stripeSecret || "", { apiVersion: "2022-11-15" });

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { plan, successUrl, cancelUrl } = req.body;
    if (!plan || !plan.price) {
      return res.status(400).json({ error: "Plan information required" });
    }

    // parse price like "R299" -> 29900 cents
    const raw = String(plan.price || "").replace(/[^0-9]/g, "");
    const amount = parseInt(raw || "0", 10) * 100;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid plan price" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: { name: `${plan.name} Plan` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || "http://localhost:8081/dashboard",
      cancel_url: cancelUrl || "http://localhost:8081/pricing",
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe create-checkout-session error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Create a PaymentIntent for the booking deposit (20% of total).
app.post("/payment/booking-intent", async (req, res) => {
  try {
    const { customerId, totalAmount, currency = "zar", connectedAccountId, metadata = {} } = req.body;
    if (!customerId || !totalAmount || !connectedAccountId) {
      return res.status(400).json({ error: "customerId, totalAmount and connectedAccountId are required" });
    }

    const totalCents = Math.round(Number(totalAmount) * 100);
    const depositCents = Math.round(totalCents * 0.2);

    const intent = await stripe.paymentIntents.create({
      amount: depositCents,
      currency,
      customer: customerId,
      payment_method_types: ["card"],
      transfer_data: {
        destination: connectedAccountId,
      },
      metadata: { stage: "booking_deposit", ...metadata },
    });

    return res.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id, amount: depositCents });
  } catch (err) {
    console.error("booking-intent error:", err);
    return res.status(500).json({ error: "Failed to create booking payment intent" });
  }
});

// Create a PaymentIntent for the remaining completion payment (remaining 80%).
// The platform application fee (5% of the FULL total) is applied on this charge.
app.post("/payment/completion-intent", async (req, res) => {
  try {
    const { customerId, totalAmount, currency = "zar", connectedAccountId, metadata = {} } = req.body;
    if (!customerId || !totalAmount || !connectedAccountId) {
      return res.status(400).json({ error: "customerId, totalAmount and connectedAccountId are required" });
    }

    const totalCents = Math.round(Number(totalAmount) * 100);
    const depositCents = Math.round(totalCents * 0.2);
    const remainingCents = totalCents - depositCents;

    // Application fee is 5% of the FULL total (per requirements)
    const applicationFeeCents = Math.round(totalCents * 0.05);

    const intent = await stripe.paymentIntents.create({
      amount: remainingCents,
      currency,
      customer: customerId,
      payment_method_types: ["card"],
      transfer_data: {
        destination: connectedAccountId,
      },
      application_fee_amount: applicationFeeCents,
      metadata: { stage: "completion", application_fee: applicationFeeCents, ...metadata },
    });

    return res.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id, amount: remainingCents, applicationFee: applicationFeeCents });
  } catch (err) {
    console.error("completion-intent error:", err);
    return res.status(500).json({ error: "Failed to create completion payment intent" });
  }
});

// Create a PaymentIntent for cancellation fee (30% of total) and apply 5% commission on that amount.
app.post("/payment/cancellation-intent", async (req, res) => {
  try {
    const { customerId, totalAmount, currency = "zar", connectedAccountId, metadata = {} } = req.body;
    if (!customerId || !totalAmount || !connectedAccountId) {
      return res.status(400).json({ error: "customerId, totalAmount and connectedAccountId are required" });
    }

    const totalCents = Math.round(Number(totalAmount) * 100);
    const cancellationCents = Math.round(totalCents * 0.3);
    const applicationFeeCents = Math.round(cancellationCents * 0.05);

    const intent = await stripe.paymentIntents.create({
      amount: cancellationCents,
      currency,
      customer: customerId,
      payment_method_types: ["card"],
      transfer_data: {
        destination: connectedAccountId,
      },
      application_fee_amount: applicationFeeCents,
      metadata: { stage: "cancellation", application_fee: applicationFeeCents, ...metadata },
    });

    return res.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id, amount: cancellationCents, applicationFee: applicationFeeCents });
  } catch (err) {
    console.error("cancellation-intent error:", err);
    return res.status(500).json({ error: "Failed to create cancellation payment intent" });
  }
});

// Webhook endpoint: configure STRIPE_WEBHOOK_SECRET and set the webhook in Stripe dashboard to point here.
// This route expects the raw request body for signature verification.
import bodyParser from "body-parser";
const rawBodyParser = bodyParser.raw({ type: "application/json" });

app.post("/webhook", rawBodyParser, (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("STRIPE_WEBHOOK_SECRET not set — skipping signature verification (NOT recommended in production)");
  }

  let event = null;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // If no webhook secret configured, parse body directly (useful for local testing)
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event types you care about
  switch (event.type) {
    case "payment_intent.succeeded":
      const pi = event.data.object;
      console.log(`PaymentIntent succeeded: ${pi.id}, metadata:`, pi.metadata);
      // TODO: update booking records in DB: mark deposit/completion/cancellation paid
      break;
    case "payment_intent.payment_failed":
      console.log("Payment failed", event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(port, () => {
  console.log(`Stripe server listening on http://localhost:${port}`);
});
