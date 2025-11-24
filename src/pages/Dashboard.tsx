import { useState } from "react";
import { Calendar, DollarSign, Users, TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CalendarManager from "@/components/CalendarManager";
import Analytics from "@/components/Analytics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCurrentUser, useBookings } from "@/hooks/useApi";
import { SkeletonLoader, SkeletonCard } from "@/components/SkeletonLoader";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "customers">("overview");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Fetch dashboard data
  const { data: currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const userId = currentUser?.id ?? "";
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useBookings(userId);

  const stats = [
    { icon: Calendar, label: "Upcoming Bookings", value: bookings?.length || "0", color: "text-blue-500" },
    { icon: DollarSign, label: "This Month's Revenue", value: "R18,500", color: "text-green-500" },
    { icon: Users, label: "Total Clients", value: "156", color: "text-purple-500" },
    { icon: TrendingUp, label: "Profile Views", value: "2,340", color: "text-pink-500" },
  ];

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          {/* Error States */}
          {userError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">Failed to load user profile.</AlertDescription>
            </Alert>
          )}
          {bookingsError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">Failed to load bookings.</AlertDescription>
            </Alert>
          )}

          {/* Header */}
          <div className="mb-8">
            {userLoading ? (
              <div className="h-12 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            ) : (
              <h1 className="text-4xl font-bold mb-2">Welcome, {currentUser?.name || "Beauty Professional"}!</h1>
            )}
            <p className="text-gray-600">Manage your bookings and customer records.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "glass-panel hover:shadow-md"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "customers"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "glass-panel hover:shadow-md"
              }`}
            >
              Customer Records
            </button>
          </div>

          {activeTab === "overview" && (
            <>
              {/* Stats */}
              {userLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-box p-6">
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon className={`${stat.color}`} size={32} />
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Recent Bookings */}
              <div className="glass-panel p-6 rounded-3xl mb-8">
                <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
                {bookingsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings && bookings.length > 0 ? (
                          bookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-white/50">
                              <td className="py-3 px-4">{booking.serviceId}</td>
                              <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-semibold">R{booking.totalPrice}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-gray-600">
                              No bookings found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {!showCalendar && !showAnalytics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={() => setShowCalendar(true)}
                    className="glass-panel p-6 text-center cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <Calendar className="mx-auto mb-4 text-pink-500" size={40} />
                    <h3 className="font-semibold mb-2">Manage Calendar</h3>
                    <p className="text-gray-600 text-sm">View and update your availability</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("customers")}
                    className="glass-panel p-6 text-center cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <Users className="mx-auto mb-4 text-purple-500" size={40} />
                    <h3 className="font-semibold mb-2">View Clients</h3>
                    <p className="text-gray-600 text-sm">Manage your client relationships</p>
                  </button>
                  <button 
                    onClick={() => setShowAnalytics(true)}
                    className="glass-panel p-6 text-center cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <TrendingUp className="mx-auto mb-4 text-blue-500" size={40} />
                    <h3 className="font-semibold mb-2">View Analytics</h3>
                    <p className="text-gray-600 text-sm">Track your business performance</p>
                  </button>
                </div>
              )}

              {/* Calendar Manager View */}
              {showCalendar && (
                <div>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="mb-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                  >
                    ← Back to Dashboard
                  </button>
                  <CalendarManager />
                </div>
              )}

              {/* Analytics View */}
              {showAnalytics && (
                <div>
                  <button
                    onClick={() => setShowAnalytics(false)}
                    className="mb-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                  >
                    ← Back to Dashboard
                  </button>
                  <Analytics />
                </div>
              )}
            </>
          )}

          {activeTab === "customers" && (
            <div className="glass-panel p-6 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Customer Records</h2>
                <p className="text-gray-600">Multiple Customers</p>
              </div>
              <p className="text-gray-600 text-center py-8">Customer records coming soon. Connect to your backend API to load customer data.</p>
            </div>
          )}
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Dashboard;
