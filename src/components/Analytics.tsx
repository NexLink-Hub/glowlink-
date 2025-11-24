import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";

const Analytics = () => {
  const [timeRange] = useState("monthly");

  // Mock data for revenue
  const revenueData = [
    { name: "Week 1", revenue: 1200 },
    { name: "Week 2", revenue: 1900 },
    { name: "Week 3", revenue: 1600 },
    { name: "Week 4", revenue: 2400 },
  ];

  // Mock data for bookings
  const bookingData = [
    { name: "Mon", bookings: 8 },
    { name: "Tue", bookings: 12 },
    { name: "Wed", bookings: 10 },
    { name: "Thu", bookings: 14 },
    { name: "Fri", bookings: 16 },
    { name: "Sat", bookings: 18 },
    { name: "Sun", bookings: 6 },
  ];

  // Mock data for service breakdown
  const serviceData = [
    { name: "Hair Cut", value: 35 },
    { name: "Styling", value: 25 },
    { name: "Coloring", value: 20 },
    { name: "Treatment", value: 20 },
  ];

  const colors = ["#ec4899", "#f472b6", "#fbcfe8", "#fce7f3"];

  // Key metrics
  const metrics = [
    {
      title: "Total Revenue",
      value: "$7,100",
      change: "+12%",
      icon: DollarSign,
      color: "pink",
    },
    {
      title: "Total Bookings",
      value: "84",
      change: "+8%",
      icon: Calendar,
      color: "purple",
    },
    {
      title: "Regular Clients",
      value: "32",
      change: "+5%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Avg Rating",
      value: "4.8/5",
      change: "+0.3",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-green-600 text-sm font-semibold mt-2">
                    {metric.change}
                  </p>
                </div>
                <div className={`bg-${metric.color}-100 p-3 rounded-lg`}>
                  <Icon className={`text-${metric.color}-500`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            Weekly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Chart */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            Bookings by Day
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: "#ec4899", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            Service Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Metrics */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Busiest Day</p>
                <p className="text-lg font-semibold text-gray-900">Saturday</p>
              </div>
              <span className="text-2xl font-bold text-pink-500">18</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Most Popular Service</p>
                <p className="text-lg font-semibold text-gray-900">Hair Cut</p>
              </div>
              <span className="text-2xl font-bold text-purple-500">35%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Client Retention Rate</p>
                <p className="text-lg font-semibold text-gray-900">78%</p>
              </div>
              <span className="text-2xl font-bold text-blue-500">↑ 5%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Average Session Price</p>
                <p className="text-lg font-semibold text-gray-900">$85</p>
              </div>
              <span className="text-2xl font-bold text-orange-500">↑ 12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
