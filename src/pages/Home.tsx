import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Smile, Scissors, GitMerge, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Home = () => {
  const navigate = useNavigate();
  const [serviceSearch, setServiceSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const categories = [
    { id: "makeup", name: "Makeup", icon: Smile, gradient: "from-[#E73895] to-[#FFB6C1]" },
    { id: "hair-styling", name: "Hair Styling", icon: Scissors, gradient: "from-[#EE1DDC] to-[#4B2752]" },
    { id: "nails", name: "Nails", icon: Scissors, gradient: "from-[#301934] to-[#800080]" },
    { id: "braids", name: "Braids", icon: GitMerge, gradient: "from-[#800080] to-[#1A1A86]" },
    { id: "barbering", name: "Barbering", icon: Scissors, gradient: "from-[#000080] to-[#596AFF]" },
    { id: "skincare", name: "Skincare", icon: Smile, gradient: "from-[#4169E1] to-[#50B0E7]" },
  ];

  const featuredArtists = [
    {
      name: "Thandi Mthembu",
      specialty: "Makeup Artist",
      location: "Johannesburg",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    },
    {
      name: "Lerato Ndlovu",
      specialty: "Hair Stylist",
      location: "Cape Town",
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    },
    {
      name: "Sipho Khumalo",
      specialty: "Barber",
      location: "Durban",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      name: "Nomsa Dlamini",
      specialty: "Nail Technician",
      location: "Pretoria",
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
  ];

  const handleSearch = () => {
    navigate(`/search?service=${serviceSearch}&location=${locationSearch}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?category=${categoryId}`);
  };

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-5");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fadeIn">
            Where <span className="text-pink-500">Beauty</span> Connects
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fadeIn">
            Discover and book top-rated beauty professionals across South Africa. Glow up with ease!
          </p>

          <div className="max-w-3xl mx-auto glass-search p-1 rounded-full shadow-lg animate-fadeIn">
            <div className="flex flex-col md:flex-row bg-white rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="flex-grow px-6 py-4 focus:outline-none"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="border-t md:border-t-0 md:border-l border-gray-200 px-6 py-4 focus:outline-none md:w-48"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-pink-500 text-white px-8 py-4 hover:bg-pink-600 transition-all flex items-center justify-center"
              >
                <Search className="mr-2" size={20} /> Search
              </button>
            </div>
          </div>

          {/* Removed large color block below search */}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card cursor-pointer animate-on-scroll opacity-0 translate-y-5 transition-all duration-600"
                data-category={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-content">
                  <div className="glass-icon">
                    <category.icon className="text-pink-500" size={28} />
                  </div>
                  <h3>{category.name}</h3>
                </div>
                <div className="category-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Beauty Professionals</h2>
            <p className="text-gray-600">Meet our top-rated artists</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <div
                key={index}
                className="glass-panel artist-card cursor-pointer animate-on-scroll opacity-0 translate-y-5 transition-all duration-600"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => navigate("/profile")}
              >
                <div
                  className="artist-image"
                  style={{ backgroundImage: `url(${artist.image})` }}
                ></div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{artist.name}</h3>
                  <p className="text-pink-500 text-sm mb-3">{artist.specialty}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current mr-1" size={16} />
                      <span className="font-medium">{artist.rating}</span>
                      <span className="ml-1">({artist.reviews})</span>
                    </div>
                    <span>{artist.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-panel p-12 text-center rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Are you a Beauty Professional?
            </h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto site-wide-padding">
              Join thousands of artists growing their business with GlowLink. Get discovered by new
              clients every day!
            </p>
            <button
              onClick={() => navigate("/register-artist")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all inline-block"
            >
              Join as an Artist
            </button>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
