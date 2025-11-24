import { useEffect, useCallback } from "react";
import { useNotificationStore } from "@/lib/notifications";
import { errorLogger } from "@/lib/errorLogger";

export function useWebSocketNotifications() {
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    // WebSocket connection would go here
    // For now, demo with periodic notifications
    const wsUrl = import.meta.env.VITE_WS_URL;

    if (!wsUrl) {
      // Demo mode: simulate notifications
      const interval = setInterval(() => {
        const notifications = [
          { title: "New Booking", message: "You have a new booking request" },
          { title: "Payment Received", message: "Payment for your service has been processed" },
          { title: "Profile Review", message: "Someone left a 5-star review" },
        ];
        const random = notifications[Math.floor(Math.random() * notifications.length)];
        // Uncomment to enable demo notifications:
        // addNotification({ ...random, type: "success" });
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }

    let ws: WebSocket;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log("WebSocket connected");
          addNotification({
            title: "Connected",
            message: "Real-time notifications enabled",
            type: "success",
          });
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            addNotification({
              title: data.title || "Notification",
              message: data.message,
              type: data.type || "info",
              actionUrl: data.actionUrl,
            });
          } catch (error) {
            errorLogger.error("Failed to parse WebSocket message", error as unknown as Error);
          }
        };

        ws.onerror = (error) => {
          errorLogger.error("WebSocket error", error as unknown as Error);
          addNotification({
            title: "Connection Error",
            message: "Failed to connect to notification service",
            type: "error",
          });
        };

        ws.onclose = () => {
          console.log("WebSocket disconnected");
          // Attempt reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        };
      } catch (error) {
        errorLogger.error("WebSocket connection failed", error as unknown as Error);
      }
    };

    connectWebSocket();

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [addNotification]);
}
