import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, X, LogOut } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { isAuthenticated, logout } from "../lib/auth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    // Listen for auth changes
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Find Artists" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="glass-nav py-4 px-6 backdrop-blur-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600 flex items-center">
          <Heart className="mr-2" fill="currentColor" /> GlowLink
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`transition ${
                    isActive(link.path)
                      ? "text-pink-600 font-medium"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <NotificationCenter />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all"
            >
              <LogOut size={16} className="mr-1" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-all"
            >
              Sign In
            </Link>
          )}
          <button
            id="mobile-menu-btn"
            className="md:hidden text-gray-600 hover:text-pink-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle mobile menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden mt-4 glass-panel rounded-2xl p-4 animate-slideDown"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-2 transition ${
                    isActive(link.path)
                      ? "text-pink-600 font-medium"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all flex items-center justify-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-center transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
          <button
            id="close-menu-btn"
            className="mt-4 w-full text-center text-gray-600 hover:text-pink-600 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="mr-2" /> Close Menu
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
