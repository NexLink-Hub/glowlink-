import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Heart, Users, Award, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Beauty",
      description: "We believe in the transformative power of beauty and self-care.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building connections between talented artists and clients who appreciate quality.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We only partner with verified, skilled professionals who deliver exceptional results.",
    },
    {
      icon: Target,
      title: "Accessibility",
      description: "Making professional beauty services accessible to everyone across South Africa.",
    },
  ];

  const stats = [
    { number: "5000+", label: "Beauty Professionals" },
    { number: "50,000+", label: "Happy Clients" },
    { number: "100,000+", label: "Bookings Completed" },
    { number: "9 Cities", label: "Across South Africa" },
  ];

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-pink-500">GlowLink</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to connect South Africa's most talented beauty professionals with
            clients who value quality, convenience, and excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                GlowLink was born from a simple observation: finding reliable, skilled beauty
                professionals shouldn't be a challenge. In 2024, we set out to create a platform
                that would bridge the gap between talented artists and clients seeking quality
                services.
              </p>
              <p>
                Today, we're proud to be South Africa's fastest-growing beauty services
                marketplace, connecting thousands of professionals with clients across major cities.
                Our platform has facilitated over 100,000 bookings, helping both artists grow their
                businesses and clients discover their perfect beauty match.
              </p>
              <p>
                What started as a small team with a big vision has grown into a thriving community
                of beauty enthusiasts, professionals, and innovators—all united by a passion for
                excellence and self-expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-box p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-panel p-6 value-card">
                <div className="glass-icon mb-4 mx-auto">
                  <value.icon className="text-pink-500" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-12 text-center rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our mission of transforming
              the beauty industry in South Africa.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all">
              View Careers
            </button>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default About;
