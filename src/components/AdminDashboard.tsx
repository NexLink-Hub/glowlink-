import { useState } from "react";
import { Users, BarChart3, BookOpen, TrendingUp } from "lucide-react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "artists" | "bookings" | "analytics" | "settings">("overview");

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { label: "Total Artists", value: "87", icon: BookOpen, change: "+3%" },
    { label: "Total Bookings", value: "2,456", icon: BarChart3, change: "+23%" },
    { label: "Revenue", value: "R125,400", icon: TrendingUp, change: "+18%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage platform, users, and analytics</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "users", label: "Users" },
              { id: "artists", label: "Artists" },
              { id: "bookings", label: "Bookings" },
              { id: "analytics", label: "Analytics" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 font-medium mt-2">{stat.change} from last month</p>
                    </div>
                    <stat.icon className="w-12 h-12 text-pink-500 opacity-20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Client</th>
                      <th className="text-left py-3 px-4 font-semibold">Artist</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">Client {i}</td>
                        <td className="py-3 px-4">Artist {i}</td>
                        <td className="py-3 px-4">2025-01-{15 + i}</td>
                        <td className="py-3 px-4 font-medium">R{1000 * i}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold">User {i}</h4>
                    <p className="text-sm text-gray-600">user{i}@example.com</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                      View
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "artists" && (
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Artist Management</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Artist {i}</h4>
                    <p className="text-sm text-gray-600">artist{i}@example.com</p>
                    <p className="text-xs text-pink-600 mt-1">★ 4.{8 - i} ({50 + i * 10} reviews)</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                      Profile
                    </button>
                    <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium hover:bg-yellow-200">
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Platform Settings</h3>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label htmlFor="commission-rate" className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                <input id="commission-rate" type="number" defaultValue="10" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label htmlFor="min-booking" className="block text-sm font-medium mb-2">Minimum Booking Amount (R)</label>
                <input id="min-booking" type="number" defaultValue="500" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label htmlFor="support-email" className="block text-sm font-medium mb-2">Support Email</label>
                <input id="support-email" type="email" defaultValue="support@glowlink.co.za" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-600">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
