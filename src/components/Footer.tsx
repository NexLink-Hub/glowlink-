import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-panel py-12 px-6 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-pink-600 flex items-center mb-4">
              <Heart className="mr-2" fill="currentColor" /> GlowLink
            </Link>
            <p className="text-gray-600">
              Connecting beauty with excellence across South Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pink-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-pink-600 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-pink-600 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pink-600 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">For Professionals</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register-artist" className="text-gray-600 hover:text-pink-600 transition">
                  Join as Artist
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-pink-600 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-gray-600">
          <p>&copy; 2025 GlowLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
