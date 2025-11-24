import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Search, Calendar, Star, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Find Your Artist",
      description:
        "Browse through our curated selection of verified beauty professionals. Filter by service, location, and reviews to find your perfect match.",
    },
    {
      icon: Calendar,
      title: "2. Book Instantly",
      description:
        "View real-time availability and book your appointment in seconds. No phone calls, no waiting—just instant confirmation.",
    },
    {
      icon: Sparkles,
      title: "3. Get Glam",
      description:
        "Show up and let the magic happen! Our professionals bring their A-game to every appointment.",
    },
    {
      icon: Star,
      title: "4. Share Your Experience",
      description:
        "Leave a review to help others discover great artists and help professionals grow their business.",
    },
  ];

  const forArtists = [
    {
      title: "Create Your Profile",
      description:
        "Showcase your skills with a stunning portfolio, service menu, and pricing.",
    },
    {
      title: "Manage Bookings",
      description:
        "Take control of your schedule with our intuitive calendar and booking system.",
    },
    {
      title: "Get Paid Instantly",
      description:
        "Receive payments directly after each service. No waiting, no hassle.",
    },
    {
      title: "Grow Your Business",
      description:
        "Access analytics, marketing tools, and a growing client base to scale your services.",
    },
  ];

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How <span className="text-pink-500">GlowLink</span> Works
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto site-wide-padding">
            Connecting you with top beauty professionals has never been easier.
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Clients</h2>
            <p className="text-gray-600">Your journey to beauty in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="glass-panel p-8 text-center">
                <div className="glass-icon-lg mx-auto mb-6">
                  <step.icon className="text-pink-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Visual Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-12 rounded-3xl text-center">
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-gray-400">
                <Sparkles size={64} className="mx-auto mb-4 text-pink-400" />
                <p className="text-lg font-medium">Platform Demo Video</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">See GlowLink in Action</h3>
            <p className="text-gray-600 max-w-4xl mx-auto site-wide-padding">
              Watch how easy it is to find, book, and connect with beauty professionals on our
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* For Artists */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Beauty Professionals</h2>
            <p className="text-gray-600">Build and grow your beauty business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto site-wide-padding">
            {forArtists.map((item, index) => (
              <div key={index} className="glass-panel p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto site-wide-padding">
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Why Choose GlowLink?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="text-yellow-400 fill-current mr-2 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Verified professionals only</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-yellow-400 fill-current mr-2 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Secure payments</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-yellow-400 fill-current mr-2 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Real reviews from real clients</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-yellow-400 fill-current mr-2 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-yellow-400 fill-current mr-2 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Satisfaction guaranteed</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-500">Safety First</h3>
              <p className="text-gray-700 mb-4">
                Your safety and satisfaction are our top priorities. All professionals on GlowLink
                are:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Identity verified</li>
                <li>✓ Qualification checked</li>
                <li>✓ Background screened</li>
                <li>✓ Insured and licensed</li>
                <li>✓ Regularly reviewed by clients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-12 text-center rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto site-wide-padding">
              Join thousands of happy clients and professionals using GlowLink every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all">
                Find an Artist
              </button>
              <button className="bg-white hover:bg-gray-50 text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full text-lg font-medium transition-all">
                Join as Professional
              </button>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default HowItWorks;
