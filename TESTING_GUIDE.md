# Testing Guide: Advanced Features

## 🧪 How to Test Each Feature

The application is running at `http://localhost:5173`

---

## Feature 1: Real-time Notifications ⏱️

### Test 1: View Notification Bell
**Steps:**
1. Navigate to home page
2. Look at the top-right of the Header
3. You should see a **bell icon** with a badge counter

**What to check:**
- ✅ Bell icon visible next to "Sign In" button
- ✅ Badge shows "0" initially (no notifications)

### Test 2: Add a Notification (Browser Console)
**Steps:**
1. Open Browser DevTools (F12)
2. Go to "Console" tab
3. Copy and paste this code:

```javascript
// Import and use the notification store
import('http://localhost:5173/src/lib/notifications.ts').then(module => {
  const store = window.__notificationStore;
  if (store) {
    store.addNotification({
      id: Date.now().toString(),
      title: "Test Notification",
      message: "This is a test notification!",
      type: "success",
      timestamp: Date.now(),
      read: false
    });
  }
});
```

**Alternative (Direct Test):**
Execute this in console:
```javascript
// Add to localStorage directly
const notification = {
  id: Date.now().toString(),
  title: "Welcome!",
  message: "Notifications are working!",
  type: "success",
  timestamp: Date.now(),
  read: false
};
localStorage.setItem('glowlink-notifications', JSON.stringify([notification]));
location.reload();
```

**What to check:**
- ✅ Bell badge updates to "1"
- ✅ Click bell to open dropdown
- ✅ Notification appears in list
- ✅ See "Mark as read" and "Remove" buttons
- ✅ Notifications persist after page reload

### Test 3: Notification Actions
**Steps:**
1. Click the bell icon to open dropdown
2. Hover over a notification
3. Test each button:
   - **Mark as Read**: Changes read status, reduces badge
   - **Remove**: Deletes notification
   - **Mark All Read**: At bottom, marks all as read

**What to check:**
- ✅ Badge count decreases
- ✅ Notifications remove from list
- ✅ Actions happen instantly

### Test 4: Multiple Notifications
**Steps:**
1. Add 5 notifications using console code above
2. Check badge shows "5"
3. Scroll in dropdown
4. Test mark all as read

**What to check:**
- ✅ Badge displays correct count
- ✅ Dropdown scrolls properly
- ✅ All notifications visible

---

## Feature 2: Payment Processing 💳

### Test 1: View Payment Hooks (Code Level)
**Steps:**
1. Open file: `src/lib/stripe.ts`
2. Review the functions:
   - `createPaymentIntent()`
   - `confirmPayment()`
   - `completeBookingPayment()`

**What to check:**
- ✅ Functions are properly typed
- ✅ React Query hooks exist
- ✅ Environment variables referenced

### Test 2: Verify Environment Variables
**Steps:**
1. Check `.env` or `.env.local` file
2. Look for Stripe variables:
   - `VITE_STRIPE_API_URL`
   - `VITE_STRIPE_PUBLIC_KEY`

**What to check:**
- ✅ Variables are defined (or not, for development)
- ✅ No errors in console about missing env vars

### Test 3: Mock Payment Flow (Future)
**Note:** Full payment testing requires:
- Stripe backend API
- Valid payment intent endpoint
- Stripe publishable key

For now, verify the hooks are imported in Dashboard:
```bash
grep -r "useProcessPayment\|useConfirmPayment" src/
```

---

## Feature 3: Reviews & Ratings ⭐

### Test 1: Navigate to Profile
**Steps:**
1. Go to home page
2. Click on "Find Artists" or "Search"
3. Click on any artist profile
4. Scroll down to "Reviews & Ratings" section

**What to check:**
- ✅ ReviewsSection component appears
- ✅ Title shows "Client Reviews"
- ✅ No errors in console

### Test 2: View Review Statistics
**Steps:**
1. Look at the ReviewsSection component
2. You should see:
   - Star rating display
   - "Write a Review" form
   - List of reviews below

**What to check:**
- ✅ Rating summary visible
- ✅ Star distribution chart appears
- ✅ Statistics load (or show placeholder)

### Test 3: Write a Review (Mock Data)
**Steps:**
1. Scroll to "Write a Review" form
2. Fill in the form:
   - Click stars to set rating (1-5)
   - Enter title: "Great artist!"
   - Enter comment: "Amazing service, highly recommended!"
3. Click "Submit Review"

**What to check:**
- ✅ Form accepts input
- ✅ Star picker works (changes color when clicked)
- ✅ Submit button is clickable
- ✅ Check console for API call attempts

### Test 4: Review List Features
**Steps:**
1. Look at existing reviews in list
2. Test features:
   - Hover over reviews
   - Check for "Helpful" button
   - Check for delete button
   - Check for timestamps
   - Check for verified badges

**What to check:**
- ✅ Reviews display properly
- ✅ Buttons are interactive
- ✅ Sorting dropdown works (Recent/Helpful/Rating)

### Test 5: Sorting Reviews
**Steps:**
1. Find the sorting dropdown
2. Change sort order:
   - "Recent"
   - "Helpful"
   - "Highest Rating"

**What to check:**
- ✅ Dropdown changes value
- ✅ Reviews reorder (if backend connected)
- ✅ No console errors

---

## Feature 4: Admin Dashboard 👨‍💼

### Test 1: Navigate to Admin Panel
**Steps:**
1. Login or ensure you have auth token
2. Navigate to: `http://localhost:5173/admin`
3. You should see the Admin Dashboard

**What to check:**
- ✅ Admin page loads
- ✅ No 401/403 errors
- ✅ Dashboard displays

### Test 2: View Overview Tab
**Steps:**
1. Click "Overview" tab (should be default)
2. Look for:
   - Stat cards (Users, Artists, Bookings, Revenue)
   - Recent Bookings table
   - Trend indicators (% change)

**What to check:**
- ✅ Cards display with numbers
- ✅ Cards show trend direction (up/down)
- ✅ Table shows sample data
- ✅ Layout is responsive

### Test 3: Test Other Tabs
**Steps:**
1. Click each tab:
   - **Users Tab**: See user list with View/Remove buttons
   - **Artists Tab**: See artist list with Profile/Verify buttons
   - **Bookings Tab**: See booking management interface
   - **Analytics Tab**: See analytics placeholder
   - **Settings Tab**: See configuration form

**What to check:**
- ✅ All tabs load without errors
- ✅ Tab content changes
- ✅ Buttons are visible and clickable
- ✅ Forms display properly

### Test 4: Test Interactive Elements
**Steps:**
1. Go to Settings tab
2. Try to:
   - Change commission rate input
   - Change minimum booking amount
   - Change support email
   - Click "Save Settings"

**What to check:**
- ✅ Inputs accept text
- ✅ No errors on click
- ✅ Console may show API call attempts

### Test 5: Test Admin Buttons
**Steps:**
1. Go to Users tab
2. Hover over user rows
3. Click "View" or "Remove" buttons
4. Repeat for Artists tab with "Profile" and "Verify"

**What to check:**
- ✅ Buttons are interactive
- ✅ Buttons respond to hover
- ✅ No JavaScript errors
- ✅ Check console for simulated actions

---

## 🔍 Browser Console Debugging

### Check Notification Store
```javascript
// In browser console:
localStorage.getItem('glowlink-notifications');
```

**Expected Output:**
```json
[
  {
    "id": "1234567890",
    "title": "Notification Title",
    "message": "Notification message",
    "type": "success",
    "timestamp": 1234567890,
    "read": false
  }
]
```

### Check for Errors
```javascript
// Look for any errors related to:
// - "NotificationCenter"
// - "ReviewsSection"
// - "AdminDashboard"
// - Stripe, Payment, Reviews
```

### Test React Components
```javascript
// Check if components are loaded
document.querySelector('[class*="notification"]');  // Should find notification bell
document.querySelector('[class*="review"]');        // Should find reviews section
```

---

## 📊 Expected Results

### Feature 1: Notifications ✅
- [x] Bell icon appears in header
- [x] Badge counter works
- [x] Dropdown opens/closes
- [x] Notifications persist
- [x] Demo mode generates notifications
- [x] All buttons work

### Feature 2: Payments ✅
- [x] Code compiles without errors
- [x] Hooks are available
- [x] No console errors
- [x] Environment variables recognized

### Feature 3: Reviews ✅
- [x] Component appears on profile
- [x] Form is interactive
- [x] Star picker works
- [x] Sorting dropdown works
- [x] Review list displays
- [x] Buttons are clickable

### Feature 4: Admin ✅
- [x] Dashboard loads
- [x] All tabs functional
- [x] Stats display
- [x] Forms interactive
- [x] No errors
- [x] Responsive layout

---

## 🐛 Troubleshooting

### Issue: Bell icon not showing
**Solution:**
1. Check console for errors
2. Verify Header.tsx includes NotificationCenter import
3. Clear browser cache and reload

### Issue: Reviews section missing
**Solution:**
1. Make sure you're on an artist profile
2. Check console for errors
3. Verify ReviewsSection import in Profile.tsx

### Issue: Admin page gives 401 error
**Solution:**
1. Login to the application first
2. Check auth token in localStorage
3. Ensure you're accessing /admin after login

### Issue: Buttons not working
**Solution:**
1. Open browser console
2. Check for JavaScript errors
3. Verify form elements have proper event listeners
4. Try hard refresh (Ctrl+Shift+R)

---

## 📝 Manual Test Checklist

### Notifications
- [ ] Bell icon visible in header
- [ ] Badge shows correct count
- [ ] Dropdown opens when clicked
- [ ] Notification appears in list
- [ ] Mark as read button works
- [ ] Remove button works
- [ ] Clear all button works
- [ ] Notifications persist after reload
- [ ] Demo notifications appear automatically

### Reviews
- [ ] Reviews section appears on artist profile
- [ ] Rating summary displays
- [ ] Star distribution visible
- [ ] Write review form present
- [ ] Star picker interactive
- [ ] Form inputs accept text
- [ ] Submit button clickable
- [ ] Reviews list displays
- [ ] Sorting dropdown works
- [ ] Helpful button clickable
- [ ] Delete button clickable

### Admin
- [ ] /admin route loads
- [ ] Overview tab shows stats
- [ ] All 6 tabs accessible
- [ ] Stat cards display numbers
- [ ] Recent bookings table shows
- [ ] User management section works
- [ ] Artist verification controls present
- [ ] Settings form inputs work
- [ ] No console errors

### Payments
- [ ] No console errors about Stripe
- [ ] Payment hooks available in code
- [ ] Environment variables recognized

---

## 🚀 Next Steps After Testing

If all tests pass:
1. Check `/QUICK_START.md` for code examples
2. Review `/FEATURES_INTEGRATION.md` for architecture
3. Prepare backend API endpoints
4. Configure environment variables
5. Test with real backend

---

**Test Duration:** ~15-20 minutes  
**Difficulty:** Easy (UI-based testing)  
**Coverage:** All 4 features

Happy testing! 🎉

