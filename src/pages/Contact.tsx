import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get in <span className="text-pink-500">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto site-wide-padding">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon
            as possible.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Cards */}
            <div className="glass-panel p-6 text-center">
              <div className="glass-icon mx-auto mb-4">
                <Mail className="text-pink-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">support@glowlink.co.za</p>
            </div>

            <div className="glass-panel p-6 text-center">
              <div className="glass-icon mx-auto mb-4">
                <Phone className="text-pink-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">+27 11 234 5678</p>
            </div>

            <div className="glass-panel p-6 text-center">
              <div className="glass-icon mx-auto mb-4">
                <MapPin className="text-pink-500" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">Johannesburg, South Africa</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-5xl mx-auto site-wide-padding">
            <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                    placeholder="+27 11 234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                    aria-label="Contact subject"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="artist">Artist Registration</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500 resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl site-wide-padding">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How quickly do you respond to inquiries?",
                a: "We typically respond within 24 hours during business days.",
              },
              {
                q: "Can I contact you on weekends?",
                a: "Yes! While our response time may be slightly longer, we monitor messages 7 days a week.",
              },
              {
                q: "Do you offer phone support?",
                a: "Yes, our phone support is available Monday-Friday, 9 AM - 5 PM SAST.",
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

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Contact;
