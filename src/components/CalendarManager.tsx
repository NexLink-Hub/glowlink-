import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Save } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const CalendarManager = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [availability, setAvailability] = useState<TimeSlot[]>([
    { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Thursday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Friday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Saturday", startTime: "10:00", endTime: "15:00", isAvailable: true },
    { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
  ]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleTimeChange = (index: number, field: string, value: string) => {
    const updated = [...availability];
    if (field === "startTime") updated[index].startTime = value;
    if (field === "endTime") updated[index].endTime = value;
    setAvailability(updated);
  };

  const handleAvailabilityToggle = (index: number) => {
    const updated = [...availability];
    updated[index].isAvailable = !updated[index].isAvailable;
    if (!updated[index].isAvailable) {
      updated[index].startTime = "";
      updated[index].endTime = "";
    } else {
      updated[index].startTime = "09:00";
      updated[index].endTime = "17:00";
    }
    setAvailability(updated);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("artistAvailability", JSON.stringify(availability));
      toast.success("Availability updated successfully!");
    } catch (error) {
      toast.error("Failed to save availability");
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">Manage Your Calendar</h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-pink-100 rounded-lg transition"
          aria-label="Previous month"
        >
          <ChevronLeft className="text-pink-500" />
        </button>
        <h3 className="text-xl font-semibold">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-pink-100 rounded-lg transition"
          aria-label="Next month"
        >
          <ChevronRight className="text-pink-500" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {days.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 mb-8 min-h-96">
        {Array.from({ length: 35 }).map((_, index) => {
          const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
          const dateNum = index - firstDay + 1;
          const isCurrentMonth = dateNum > 0 && dateNum <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                isCurrentMonth
                  ? "border-pink-200 bg-white hover:border-pink-400"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              {isCurrentMonth && <span className="font-semibold text-gray-700">{dateNum}</span>}
            </div>
          );
        })}
      </div>

      {/* Availability Settings */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Clock className="mr-2 text-pink-500" size={24} />
          Weekly Availability
        </h3>

        <div className="space-y-4">
          {availability.map((slot, index) => (
            <div key={index} className="glass-panel p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-24 font-semibold">{slot.day}</div>
                <input
                  type="checkbox"
                  checked={slot.isAvailable}
                  onChange={() => handleAvailabilityToggle(index)}
                  className="w-5 h-5 cursor-pointer"
                  aria-label={`Availability for ${slot.day}`}
                />
                <span className="text-sm text-gray-600 ml-2">
                  {slot.isAvailable ? "Available" : "Not Available"}
                </span>
                {slot.isAvailable && (
                  <div className="flex items-center gap-2 ml-auto">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      aria-label={`Start time for ${slot.day}`}
                    />
                    <span className="text-gray-600">to</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      aria-label={`End time for ${slot.day}`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-all"
        >
          <Save className="mr-2" size={20} />
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default CalendarManager;
