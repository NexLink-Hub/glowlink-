import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "sonner";
import { isAuthenticated } from "@/lib/auth";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = (location.state && (location.state as { plan?: { name: string; price: string; period?: string; features?: string[] } }).plan) || null;

  useEffect(() => {
    if (!isAuthenticated()) {
      // If user somehow reached payment without auth, send them to login
      navigate("/login", { state: { redirectTo: "/payment", plan } });
    }
  }, [navigate, plan]);

  const handleProceed = () => {
    // Call server to create a Stripe Checkout session and redirect
    (async () => {
      try {
        const resp = await fetch("http://localhost:4242/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan,
            successUrl: window.location.origin + "/dashboard",
            cancelUrl: window.location.origin + "/pricing",
          }),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          throw new Error(errText || "Failed to create checkout session");
        }

        const { url } = await resp.json();
        if (url) {
          window.location.href = url; // redirect to Stripe Checkout
        } else {
          throw new Error("No session URL returned");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to start payment. Please try again later.");
      }
    })();
  };

  if (!plan) {
    return (
      <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
        <Header />
        <main className="pt-32 px-6">
          <div className="container mx-auto">
            <div className="glass-panel p-12 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
              <p className="text-gray-600 mb-6">Please select a plan from the pricing page first.</p>
              <button
                onClick={() => navigate("/pricing")}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full"
              >
                Back to Pricing
              </button>
            </div>
          </div>
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <main className="pt-32 px-6">
        <div className="container mx-auto max-w-5xl site-wide-padding">
          <div className="glass-panel p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Confirm your purchase</h2>
            <p className="text-gray-600 mb-6">You are purchasing the <strong>{plan.name}</strong> plan for <strong>{plan.price}</strong> {plan.period ? `(${plan.period})` : ''}.</p>

            <div className="mb-8">
              <h4 className="font-semibold mb-2">What's included</h4>
              <ul className="text-left inline-block text-gray-700">
                {plan.features && plan.features.map((f: string, i: number) => (
                  <li key={i} className="mb-1">• {f}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleProceed}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium"
            >
              Proceed to Payment
            </button>
            <div className="mt-4">
              <button
                onClick={() => navigate(-1)}
                className="mt-4 text-sm text-gray-600 underline"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Payment;
