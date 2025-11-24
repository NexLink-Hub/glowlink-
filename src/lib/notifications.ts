import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        read: false,
      };

      // Store in localStorage for persistence
      const stored = JSON.parse(localStorage.getItem("notifications") || "[]");
      stored.push(newNotification);
      localStorage.setItem("notifications", JSON.stringify(stored.slice(-50))); // Keep last 50

      return {
        notifications: [newNotification, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1,
      };
    }),

  removeNotification: (id: string) =>
    set((state) => {
      const updated = state.notifications.filter((n) => n.id !== id);
      const stored = JSON.parse(localStorage.getItem("notifications") || "[]");
      localStorage.setItem(
        "notifications",
        JSON.stringify(stored.filter((n: Notification) => n.id !== id))
      );

      return {
        notifications: updated,
        unreadCount: state.unreadCount - (state.notifications.find((n) => n.id === id)?.read ? 0 : 1),
      };
    }),

  markAsRead: (id: string) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      if (!notification || notification.read) return state;

      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );

      const stored = JSON.parse(localStorage.getItem("notifications") || "[]");
      localStorage.setItem(
        "notifications",
        JSON.stringify(
          stored.map((n: Notification) =>
            n.id === id ? { ...n, read: true } : n
          )
        )
      );

      return {
        notifications: updated,
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      localStorage.setItem("notifications", JSON.stringify(updated));
      return {
        notifications: updated,
        unreadCount: 0,
      };
    }),

  clearAll: () => {
    localStorage.removeItem("notifications");
    return {
      notifications: [],
      unreadCount: 0,
    };
  },
}));
