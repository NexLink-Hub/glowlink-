// GlowLink Advanced Features - Browser Console Test Script
// Copy and paste this entire script into your browser console (F12)

console.log("🚀 Starting GlowLink Advanced Features Test...\n");

// Test 1: Check Notification Store
console.log("📌 TEST 1: Notification Store");
try {
  const notificationsJson = localStorage.getItem('glowlink-notifications');
  if (notificationsJson) {
    const notifications = JSON.parse(notificationsJson);
    console.log(`✅ Notification store found with ${notifications.length} notifications`);
    console.table(notifications);
  } else {
    console.log("ℹ️  Notification store is empty (expected on first load)");
  }
} catch (e) {
  console.error("❌ Error reading notification store:", e.message);
}

// Test 2: Add Test Notification
console.log("\n📌 TEST 2: Adding Test Notification");
try {
  const testNotification = {
    id: "test-" + Date.now(),
    title: "Test Notification",
    message: "This notification was added via console test!",
    type: "success",
    timestamp: Date.now(),
    read: false,
    actionUrl: "/"
  };
  
  let notifications = [];
  const existing = localStorage.getItem('glowlink-notifications');
  if (existing) {
    notifications = JSON.parse(existing);
  }
  
  notifications.unshift(testNotification);
  // Keep only last 50
  if (notifications.length > 50) {
    notifications = notifications.slice(0, 50);
  }
  
  localStorage.setItem('glowlink-notifications', JSON.stringify(notifications));
  console.log("✅ Test notification added!");
  console.log("💡 Check the bell icon in the header - it should now show 1 unread notification");
} catch (e) {
  console.error("❌ Error adding notification:", e.message);
}

// Test 3: Check DOM Elements
console.log("\n📌 TEST 3: Checking DOM Elements");
try {
  const bellIcon = document.querySelector('button[class*="notification"], svg[class*="bell"]');
  console.log(bellIcon ? "✅ Bell icon found in DOM" : "⚠️  Bell icon not found (may load after app initializes)");
  
  const reviewsSection = document.querySelector('[class*="review"]');
  console.log(reviewsSection ? "✅ Reviews section found" : "ℹ️  Reviews section not found (only on artist profiles)");
  
  const adminDashboard = document.querySelector('[class*="admin"], [class*="dashboard"]');
  console.log(adminDashboard ? "✅ Admin dashboard found" : "ℹ️  Admin dashboard not found (only on /admin route)");
} catch (e) {
  console.error("❌ Error checking DOM:", e.message);
}

// Test 4: Check Auth Token
console.log("\n📌 TEST 4: Checking Authentication");
try {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  if (token) {
    console.log("✅ Auth token found");
    console.log("💡 You can access /admin route");
  } else {
    console.log("ℹ️  No auth token found - login to test admin features");
  }
} catch (e) {
  console.error("❌ Error checking auth:", e.message);
}

// Test 5: Environment Variables Check
console.log("\n📌 TEST 5: Environment Configuration");
try {
  console.log("Current environment variables:");
  console.log(`VITE_WS_URL: ${import.meta?.env?.VITE_WS_URL || "Not set (demo mode active)"}`);
  console.log(`VITE_STRIPE_API_URL: ${import.meta?.env?.VITE_STRIPE_API_URL || "Not set"}`);
  console.log(`VITE_ADMIN_API_URL: ${import.meta?.env?.VITE_ADMIN_API_URL || "Not set"}`);
} catch (e) {
  console.log("ℹ️  Environment variables not directly accessible from console");
}

// Test 6: Console Output for Debugging
console.log("\n📌 TEST 6: Checking for Errors");
try {
  const errors = console.error.toString();
  console.log("ℹ️  Check browser console for any red errors (they appear above)");
} catch (e) {
  console.log("ℹ️  No specific errors detected");
}

// Test 7: Add Multiple Notifications
console.log("\n📌 TEST 7: Adding Multiple Test Notifications");
function addMultipleNotifications() {
  try {
    let notifications = [];
    const existing = localStorage.getItem('glowlink-notifications');
    if (existing) {
      notifications = JSON.parse(existing);
    }
    
    const types = ["success", "error", "warning", "info"];
    const messages = [
      { title: "Booking Confirmed", message: "Your booking with Sarah has been confirmed" },
      { title: "New Review", message: "You received a 5-star review!" },
      { title: "Payment Processed", message: "$150.00 payment successful" },
      { title: "Admin Alert", message: "New artist verification request" }
    ];
    
    for (let i = 0; i < 4; i++) {
      notifications.unshift({
        id: "multi-" + i + "-" + Date.now(),
        title: messages[i].title,
        message: messages[i].message,
        type: types[i],
        timestamp: Date.now() - (i * 60000), // Stagger timestamps
        read: false
      });
    }
    
    if (notifications.length > 50) {
      notifications = notifications.slice(0, 50);
    }
    
    localStorage.setItem('glowlink-notifications', JSON.stringify(notifications));
    console.log("✅ Added 4 test notifications of different types!");
    console.log("💡 Refresh the page to see all notifications in the bell dropdown");
  } catch (e) {
    console.error("❌ Error adding multiple notifications:", e.message);
  }
}

// Test 8: Clear All Notifications
console.log("\n📌 TEST 8: Utility Functions");
window.glowlinkTestUtils = {
  addNotification: function(title, message, type = "info") {
    try {
      const notification = {
        id: "util-" + Date.now(),
        title,
        message,
        type,
        timestamp: Date.now(),
        read: false
      };
      
      let notifications = [];
      const existing = localStorage.getItem('glowlink-notifications');
      if (existing) {
        notifications = JSON.parse(existing);
      }
      notifications.unshift(notification);
      localStorage.setItem('glowlink-notifications', JSON.stringify(notifications));
      console.log(`✅ Added notification: "${title}"`);
      location.reload();
    } catch (e) {
      console.error("Error:", e.message);
    }
  },
  
  clearAllNotifications: function() {
    try {
      localStorage.removeItem('glowlink-notifications');
      console.log("✅ All notifications cleared");
      location.reload();
    } catch (e) {
      console.error("Error:", e.message);
    }
  },
  
  listNotifications: function() {
    try {
      const notifications = JSON.parse(localStorage.getItem('glowlink-notifications') || "[]");
      console.table(notifications);
    } catch (e) {
      console.error("Error:", e.message);
    }
  },
  
  viewStats: function() {
    try {
      const notifications = JSON.parse(localStorage.getItem('glowlink-notifications') || "[]");
      const unread = notifications.filter(n => !n.read).length;
      console.log(`Total Notifications: ${notifications.length}`);
      console.log(`Unread: ${unread}`);
      console.log(`Read: ${notifications.length - unread}`);
    } catch (e) {
      console.error("Error:", e.message);
    }
  }
};

console.log("✅ Utility functions available!");
console.log("💡 Use these commands:");
console.log("   glowlinkTestUtils.addNotification(title, message, type)");
console.log("   glowlinkTestUtils.clearAllNotifications()");
console.log("   glowlinkTestUtils.listNotifications()");
console.log("   glowlinkTestUtils.viewStats()");

// Run the multiple notifications test
addMultipleNotifications();

// Final Summary
console.log("\n" + "=".repeat(60));
console.log("🎉 TEST COMPLETE!");
console.log("=".repeat(60));
console.log("\n📋 NEXT STEPS:");
console.log("1. Reload the page to see test notifications in the bell icon");
console.log("2. Click the bell icon to open the notification dropdown");
console.log("3. Test the 'Mark as Read', 'Remove', and 'Clear All' buttons");
console.log("4. Navigate to an artist profile to test Reviews section");
console.log("5. Go to /admin to test the Admin Dashboard");
console.log("\n📖 For more details, see TESTING_GUIDE.md in the project");
console.log("\n");
