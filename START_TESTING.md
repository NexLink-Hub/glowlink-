# 🎬 Testing Instructions - Start Here

## Your Development Server is Running!

**Access at:** `http://localhost:5173`

---

## 📋 Quick Start (Choose One)

### Option A: Visual Testing (Easiest)
1. Open browser to http://localhost:5173
2. Navigate to different pages
3. Check for features (see checklist below)

### Option B: Console Testing (Recommended)
1. Open DevTools (F12 or Right-click → Inspect)
2. Go to Console tab
3. Copy code from TEST_SCRIPT.js
4. Paste and run in console

### Option C: Full Testing
1. Follow both options above
2. Complete all checklists
3. Check documentation for details

---

## 🎯 What to Test

### 1. Notification Bell (Top-Right Header)
**Visual Checklist:**
```
[ ] Bell icon visible
[ ] Shows number badge
[ ] Click opens dropdown
[ ] Notifications appear in list
[ ] Buttons work (mark read, remove, clear all)
[ ] Updates persist on page refresh
```

**How to Add Test Notifications:**
Open Console (F12) and run:
```javascript
const n = {
  id: "test-" + Date.now(),
  title: "Hello from Console!",
  message: "This is a test notification",
  type: "success",
  timestamp: Date.now(),
  read: false
};
let arr = [];
const e = localStorage.getItem('glowlink-notifications');
if(e) arr = JSON.parse(e);
arr.unshift(n);
localStorage.setItem('glowlink-notifications', JSON.stringify(arr));
location.reload();
```

---

### 2. Reviews Section (On Artist Profiles)
**Where to Find:**
1. Click "Find Artists" button
2. Click any artist card
3. Scroll to "Reviews & Ratings" section

**Visual Checklist:**
```
[ ] Section title appears
[ ] Star rating visible
[ ] Rating distribution shown
[ ] "Write a Review" form present
[ ] Form fields interactive (stars, text)
[ ] Submit button exists
[ ] Review list below form
[ ] Sorting dropdown works
```

---

### 3. Admin Dashboard
**Where to Access:**
- Direct: http://localhost:5173/admin
- OR: After login, look for admin link

**Note:** May require login

**Visual Checklist:**
```
[ ] Page loads without error
[ ] Overview tab shows stat cards
[ ] Cards display numbers
[ ] Tab switching works smoothly
[ ] All 6 tabs present (Overview, Users, Artists, Bookings, Analytics, Settings)
[ ] Tables display data
[ ] Forms have input fields
[ ] Buttons are clickable
```

---

### 4. Payment Processing
**Code-Level Test:**
```
[ ] No console errors mentioning Stripe
[ ] Stripe library loaded
[ ] Environment variables recognized
```

Check in console:
```javascript
// Look for Stripe in network tab (F12 → Network)
// Search for "stripe" in all requests
```

---

## 🔧 Console Utilities

After running TEST_SCRIPT.js, use these commands:

```javascript
// Add a notification
glowlinkTestUtils.addNotification("Title", "Message", "success");

// Clear all notifications
glowlinkTestUtils.clearAllNotifications();

// List all notifications
glowlinkTestUtils.listNotifications();

// View stats
glowlinkTestUtils.viewStats();
```

---

## ✅ Expected Results

### Should See:
✅ No red errors in console  
✅ Bell icon in header  
✅ Reviews on artist profiles  
✅ Admin dashboard loads  
✅ All buttons interactive  
✅ Forms accept input  

### Should NOT See:
❌ 404 errors  
❌ 401/403 auth errors  
❌ TypeScript errors  
❌ Broken components  

---

## 📸 Screenshots Guide

### Notification Bell
```
Location: Top-right header
Icon: Bell symbol
Badge: Red circle with number
Interaction: Clickable, dropdown appears
```

### Reviews Section
```
Location: Bottom of artist profile page
Title: "Client Reviews"
Elements: Stars, form, list of reviews
```

### Admin Dashboard
```
Location: /admin route
Layout: Tabs at top, content below
Elements: Stat cards, tables, forms
```

---

## 🆘 Troubleshooting

### Problem: Bell icon not showing
**Solution:**
1. Hard refresh (Ctrl+Shift+R)
2. Check console for errors
3. Restart dev server

### Problem: Reviews not loading
**Solution:**
1. Make sure you're on artist profile (/profile/:id)
2. Check console for errors
3. Try different artist

### Problem: Admin page shows error
**Solution:**
1. Login first if not logged in
2. Hard refresh page
3. Check console for errors

### Problem: Any console errors
**Solution:**
1. Screenshot the error
2. Copy full error text
3. Check TESTING_GUIDE.md for help
4. Restart server if needed

---

## 📁 Testing Resources

**In this folder, see:**
- `TESTING_GUIDE.md` - Detailed testing steps
- `TEST_SCRIPT.js` - Browser console automation
- `QUICK_TEST.md` - Quick reference
- `QUICK_START.md` - Feature usage examples

---

## ⏱️ Time Estimate

- Quick Test (Notifications only): **5 minutes**
- Full Features Test: **15 minutes**
- Complete Testing: **30 minutes**

---

## 🎓 Learning Path

1. **Start:** Test Notifications (simplest)
2. **Next:** Test Reviews (on profile)
3. **Then:** Test Admin (requires login)
4. **Finally:** Check console for errors

---

## 📞 Need Help?

1. Check error in console (F12)
2. Look in TESTING_GUIDE.md for that feature
3. See QUICK_START.md for code examples
4. Review feature files in src/

---

## ✨ Ready?

**Option A (Visual):**
```
1. Go to http://localhost:5173
2. Look for bell icon
3. Navigate to Find Artists → click artist
4. Go to /admin (if logged in)
```

**Option B (Console):**
```
1. Press F12
2. Go to Console tab
3. Copy TEST_SCRIPT.js code
4. Paste and run
```

---

**Let's Test! 🚀**
