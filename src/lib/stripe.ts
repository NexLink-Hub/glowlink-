import { useMutation } from "@tanstack/react-query";
import { errorLogger } from "@/lib/errorLogger";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "requires_confirmation" | "requires_action" | "processing" | "succeeded" | "requires_capture" | "canceled";
  clientSecret: string;
}

export interface BookingWithPayment {
  bookingId: string;
  artistId: string;
  serviceId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  paymentIntentId?: string;
  email: string;
  name: string;
}

const STRIPE_API_URL = import.meta.env.VITE_STRIPE_API_URL || "http://localhost:3000/api/stripe";

/**
 * Create a payment intent for booking
 */
export async function createPaymentIntent(
  amount: number,
  currency: string = "ZAR",
  metadata?: Record<string, string>
): Promise<PaymentIntent> {
  try {
    const response = await fetch(`${STRIPE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Payment intent creation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorLogger.error("Failed to create payment intent", error as Error);
    throw error;
  }
}

/**
 * Confirm payment with Stripe
 */
export async function confirmPayment(
  clientSecret: string,
  paymentMethodId: string
): Promise<PaymentIntent> {
  try {
    const response = await fetch(`${STRIPE_API_URL}/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientSecret,
        paymentMethodId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Payment confirmation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorLogger.error("Failed to confirm payment", error as Error);
    throw error;
  }
}

/**
 * Complete booking with payment
 */
export async function completeBookingPayment(
  booking: Omit<BookingWithPayment, "paymentIntentId" | "status">,
  paymentIntentId: string
): Promise<{ bookingId: string; status: "completed" | "failed" }> {
  try {
    const response = await fetch(`${STRIPE_API_URL}/complete-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...booking,
        paymentIntentId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Booking completion failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorLogger.error("Failed to complete booking", error as Error);
    throw error;
  }
}

/**
 * React Query hook for payment processing
 */
export function useProcessPayment() {
  return useMutation({
    mutationFn: async ({
      amount,
      currency,
      metadata,
    }: {
      amount: number;
      currency?: string;
      metadata?: Record<string, string>;
    }) => {
      return await createPaymentIntent(amount, currency, metadata);
    },
    onError: (error) => {
      errorLogger.error("Payment processing error", error as Error);
    },
  });
}

/**
 * React Query hook for confirming payment
 */
export function useConfirmPayment() {
  return useMutation({
    mutationFn: async ({
      clientSecret,
      paymentMethodId,
    }: {
      clientSecret: string;
      paymentMethodId: string;
    }) => {
      return await confirmPayment(clientSecret, paymentMethodId);
    },
    onError: (error) => {
      errorLogger.error("Payment confirmation error", error as Error);
    },
  });
}
