import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Search as SearchIcon, MapPin, Star, Filter } from "lucide-react";
import { useArtists } from "@/hooks/useApi";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    service: searchParams.get("service") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    minRating: "",
    priceRange: "",
  });

  // Fetch artists based on search query
  const { data: artists, isLoading, error } = useArtists(filters.service || undefined);

  // Filter artists based on filters
  const filteredArtists = artists?.filter((artist) => {
    if (filters.minRating && artist.rating < parseFloat(filters.minRating)) {
      return false;
    }
    if (filters.location && !artist.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  }) || [];

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Find Your Beauty Professional</h1>

          {/* Search Bar */}
          <div className="max-w-6xl mx-auto glass-search p-1 rounded-full shadow-lg mb-8 site-wide-padding">
            <div className="flex flex-col md:flex-row bg-white rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Service or artist name..."
                className="flex-grow px-6 py-4 focus:outline-none"
                value={filters.service}
                onChange={(e) => setFilters({ ...filters, service: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="border-t md:border-t-0 md:border-l border-gray-200 px-6 py-4 focus:outline-none md:w-48"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <button className="bg-pink-500 text-white px-8 py-4 hover:bg-pink-600 transition-all flex items-center justify-center">
                <SearchIcon size={20} className="mr-2" /> Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto glass-panel p-4 rounded-2xl mb-8 site-wide-padding">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center text-gray-700 font-medium">
                <Filter size={20} className="mr-2" /> Filters:
              </div>
              <select
                aria-label="Filter by minimum rating"
                className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pink-500 text-sm"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
              </select>
              <select
                aria-label="Filter by price range"
                className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pink-500 text-sm"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="">Any Price</option>
                <option value="budget">Budget Friendly</option>
                <option value="mid">Mid Range</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {/* Error State */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                Failed to load artists. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading ? (
            <>
              <p className="text-gray-600 mb-6">Loading artists...</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">Showing {filteredArtists.length} results</p>
              </div>

              {/* Artist Cards */}
              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredArtists.map((artist) => (
                    <div
                      key={artist.id}
                      className="glass-panel artist-card cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/profile/${artist.id}`)}
                    >
                      <div className="artist-image bg-gradient-to-tr from-indigo-500 to-purple-600"></div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{artist.name}</h3>
                        <p className="text-pink-500 text-sm mb-3 capitalize">{artist.specialty} Artist</p>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Star className="text-yellow-400 fill-current mr-1" size={16} />
                            <span className="font-medium">{artist.rating}</span>
                            <span className="ml-1 text-gray-500">({artist.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No artists found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Search;
