import React, { useState } from "react";
import { useNotificationStore } from "@/lib/notifications";
import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, removeNotification, markAllAsRead } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
        title="Notifications"
        aria-label="Open notifications"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-xs text-pink-500 hover:text-pink-600 font-medium"
                aria-label="Mark all notifications as read"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell size={32} className="mx-auto mb-2 opacity-30" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100" role="list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  role="listitem"
                  tabIndex={0}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!notification.read) markAsRead(notification.id);
                      if (notification.actionUrl) window.location.href = notification.actionUrl;
                    }
                  }}
                  aria-label={`${notification.title}: ${notification.message}`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-gray-900">{notification.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Dismiss notification"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
