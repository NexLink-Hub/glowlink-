import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { MapPin, Star, Calendar, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useArtist, useServices, useCreateBooking } from "@/hooks/useApi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReviewsSection } from "@/components/ReviewsSection";

const Profile = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const [selectedService, setSelectedService] = useState("");

  // Fetch artist and services data
  const { data: artist, isLoading: artistLoading, error: artistError } = useArtist(id);
  const { data: services = [], isLoading: servicesLoading } = useServices(id);
  const { mutate: createBooking } = useCreateBooking();

  const portfolio = [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595475038607-33cf50fa5c8c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560869713-571ebd71be4e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
  ];

  const handleBooking = () => {
    if (!selectedService) {
      toast.error("Please select a service");
      return;
    }

    // Create booking
    createBooking(
      {
        artistId: id,
        serviceId: selectedService,
        date: new Date().toISOString(),
        totalPrice: 1000,
      },
      {
        onSuccess: () => {
          toast.success("Booking request sent! Artist will confirm shortly.");
          setSelectedService("");
        },
        onError: () => {
          toast.error("Failed to create booking. Please try again.");
        },
      }
    );
  };

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          {/* Profile Header */}
          <div className="glass-panel p-8 rounded-3xl mb-8">
            {artistError ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">Failed to load artist profile.</AlertDescription>
              </Alert>
            ) : artistLoading ? (
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
            ) : artist ? (
              <>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-gradient-to-tr from-indigo-500 to-purple-600"
                    ></div>
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                    <p className="text-pink-500 text-lg mb-3 capitalize">{artist.specialty} Artist</p>
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-1" />
                        <span>{artist.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current mr-1" size={18} />
                        <span className="font-semibold">{artist.rating}</span>
                        <span className="text-gray-600 ml-1">({artist.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{artist.bio}</p>
                    <div className="flex gap-3">
                      <a
                        href={`https://instagram.com/${artist.instagram}`}
                        title="Instagram"
                        className="text-pink-500 hover:text-pink-600"
                      >
                        <Instagram size={24} />
                      </a>
                      <a href="#" title="Facebook" className="text-pink-500 hover:text-pink-600">
                        <Facebook size={24} />
                      </a>
                      <a href="#" title="Twitter" className="text-pink-500 hover:text-pink-600">
                        <Twitter size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel p-6 rounded-3xl">
                <h2 className="text-2xl font-bold mb-6">Services & Pricing</h2>
                {servicesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : services.length > 0 ? (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`service-item p-4 cursor-pointer border-2 rounded-lg transition-all ${
                          selectedService === service.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-pink-300"
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{service.name}</h3>
                            <p className="text-gray-600 text-sm">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-pink-500">{service.currency}{service.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No services available</p>
                )}
              </div>

              {/* Portfolio */}
              <div className="glass-panel p-6 rounded-3xl">
                <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolio.map((image, index) => (
                    <OptimizedImage
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>

              {/* Reviews & Ratings */}
              <ReviewsSection artistId={id} />
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-3xl sticky top-24">
                <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="select-service" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service
                    </label>
                    <select
                      id="select-service"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      aria-label="Select service"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferred-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      id="preferred-date"
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
                      aria-label="Preferred date"
                    />
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-medium transition-all flex items-center justify-center"
                  >
                    <Calendar className="mr-2" size={20} />
                    Request Booking
                  </button>

                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <a
                      href="tel:+27123456789"
                      className="flex items-center text-gray-600 hover:text-pink-500 transition"
                    >
                      <Phone size={18} className="mr-2" />
                      +27 11 234 5678
                    </a>
                    <a
                      href="mailto:thandi@example.com"
                      className="flex items-center text-gray-600 hover:text-pink-500 transition"
                    >
                      <Mail size={18} className="mr-2" />
                      thandi@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Profile;
