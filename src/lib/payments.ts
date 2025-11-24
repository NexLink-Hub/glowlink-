/*
 * Frontend helper functions for interacting with the Stripe endpoints
 * implemented in `server/stripe-server.js`.
 *
 * Usage:
 * - Install Stripe.js in the frontend: `npm install @stripe/stripe-js`
 * - Use `createBookingIntent` to create the 20% deposit PaymentIntent.
 * - Use `createCompletionIntent` to create the remaining 80% PaymentIntent (platform application fee applied on full amount).
 * - Use `createCancellationIntent` to create a cancellation PaymentIntent (30% of total).
 * - Use Stripe.js to confirm the PaymentIntent client secret returned by these endpoints.
 */

import type { Stripe, StripeElements, PaymentIntentResult } from "@stripe/stripe-js";

const API_BASE = (import.meta.env.VITE_STRIPE_API_URL as string) || "http://localhost:4242";

export interface CreateIntentParams {
  customerId: string;
  totalAmount: number; // full total in decimal (e.g. 100.00)
  connectedAccountId: string; // provider's Stripe Connect account id
  currency?: string;
  metadata?: Record<string, string>;
}

export interface IntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number; // cents
  applicationFee?: number; // cents if present
}

async function postJson(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function createBookingIntent(params: CreateIntentParams): Promise<IntentResponse> {
  return postJson("/payment/booking-intent", params);
}

export async function createCompletionIntent(params: CreateIntentParams): Promise<IntentResponse> {
  return postJson("/payment/completion-intent", params);
}

export async function createCancellationIntent(params: CreateIntentParams): Promise<IntentResponse> {
  return postJson("/payment/cancellation-intent", params);
}

// Confirm a payment using Stripe.js and a Card Element
// - `stripe` is the Stripe object from `loadStripe(...)`
// - `cardElement` is the card Element from `elements.getElement(CardElement)`
export async function confirmPaymentWithCard(
  stripe: Stripe | null,
  elements: StripeElements | null,
  clientSecret: string
): Promise<PaymentIntentResult> {
  if (!stripe || !elements) throw new Error("Stripe.js not initialized");

  const card = elements.getElement("card");
  if (!card) throw new Error("Card element not found");

  // This returns a PaymentIntent result object; handle errors accordingly
  return stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card,
    },
  });
}

// Example usage (React):
// const { clientSecret } = await createBookingIntent({ customerId, totalAmount: 100, connectedAccountId });
// const result = await confirmPaymentWithCard(stripe, elements, clientSecret);
// if (result.error) { /* handle card error */ } else { /* success - webhook will confirm */ }

export default {
  createBookingIntent,
  createCompletionIntent,
  createCancellationIntent,
  confirmPaymentWithCard,
};
