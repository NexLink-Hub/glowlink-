import React, { useCallback, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createBookingIntent, confirmPaymentWithCard } from "../lib/payments";

type Props = {
  customerId: string;
  totalAmount: number; // decimal like 100.00
  connectedAccountId: string;
  bookingId?: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (err: Error | string) => void;
};

// Inner form that uses Stripe Elements
function DepositFormInner({ customerId, totalAmount, connectedAccountId, bookingId, onSuccess, onError }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const resp = await createBookingIntent({
          customerId,
          totalAmount,
          connectedAccountId,
          metadata: bookingId ? { bookingId } : {},
        });

        // Confirm the payment with Stripe.js
        const result = await confirmPaymentWithCard(stripe, elements, resp.clientSecret);

        if (result.error) {
          setError(result.error.message || "Payment failed");
          onError?.(result.error.message || "Payment failed");
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
          onSuccess?.(resp.paymentIntentId);
        } else {
          // PaymentIntent may require additional actions
          setError("Payment processing: unexpected status");
          onError?.("Payment processing: unexpected status");
        }
      } catch (err: any) {
        const msg = err?.message || String(err);
        setError(msg);
        onError?.(msg);
      } finally {
        setLoading(false);
      }
    },
    [stripe, elements, customerId, totalAmount, connectedAccountId, bookingId, onSuccess, onError]
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-[520px]">
      <div className="mb-3">
        <strong>Deposit amount:</strong> {Number(totalAmount * 0.2).toFixed(2)}
      </div>

      <div className="p-3 border border-gray-200 rounded-md mb-3">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <button type="submit" disabled={!stripe || loading} className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60">
        {loading ? "Processing…" : `Pay ${Number(totalAmount * 0.2).toFixed(2)}`}
      </button>
    </form>
  );
}

export default function BookingDepositForm(props: Props) {
  const publishableKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string) || "";

  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  if (!publishableKey) {
    return <div>Please set `VITE_STRIPE_PUBLISHABLE_KEY` in your environment to use payments.</div>;
  }

  return (
    <Elements stripe={stripePromise!}>
      <DepositFormInner {...props} />
    </Elements>
  );
}
