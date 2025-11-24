import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "R0",
      period: "Free Forever",
      description: "Perfect for getting started",
      features: [
        "Profile listing",
        "Up to 5 portfolio images",
        "Basic calendar management",
        "Client messaging",
        "5% platform fee per booking",
      ],
      cta: "Get Started",
      featured: false,
    },
    {
      name: "Professional",
      price: "R299",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Everything in Basic",
        "Unlimited portfolio images",
        "Advanced booking system",
        "Priority customer support",
        "Custom availability settings",
        "Analytics dashboard",
        "3% platform fee per booking",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Premium",
      price: "R599",
      period: "per month",
      description: "For established professionals",
      features: [
        "Everything in Professional",
        "Featured profile placement",
        "Social media integration",
        "Marketing tools",
        "Dedicated account manager",
        "Advanced analytics",
        "Client CRM",
        "1% platform fee per booking",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Simple, Transparent <span className="text-pink-500">Pricing</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto site-wide-padding">
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto site-wide-padding">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.featured ? "featured" : ""}`}
              >
                {plan.featured && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-pink-500">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-center mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    // Free plan: register flow
                    if (plan.price && plan.price.startsWith("R0")) {
                      navigate("/register-artist");
                      return;
                    }

                    // Paid plans: if authenticated -> payment, else -> login
                    if (isAuthenticated()) {
                      navigate("/payment", { state: { plan } });
                    } else {
                      // Pass desired redirect and plan via location state so login can forward
                      navigate("/login", { state: { redirectTo: "/payment", plan } });
                    }
                  }}
                  className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg"
                      : "bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl site-wide-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and EFT payments.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees, ever. You only pay the monthly subscription for your chosen plan.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Cancel anytime with no penalties. Your subscription remains active until the end of your billing period.",
              },
            ].map((faq, index) => (
              <div key={index} className="glass-panel p-6 faq-item">
                <h3 className="font-semibold mb-2 text-gray-800">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-12 text-center rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto site-wide-padding">
              Join thousands of beauty professionals already growing with GlowLink.
            </p>
            <button
              onClick={() => navigate("/register-artist")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Pricing;
