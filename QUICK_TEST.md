# Quick Testing Checklist

## 🚀 Start Here

Your app is running at: **http://localhost:5173**

### Quick Test (5 minutes)

**Step 1: Add Test Notifications**
1. Open DevTools (F12)
2. Go to Console tab
3. Copy and run this code:
```javascript
const n = {id: "test-"+(Date.now()), title: "Test!", message: "Works!", type: "success", timestamp: Date.now(), read: false};
let arr = [];
const e = localStorage.getItem('glowlink-notifications');
if(e) arr = JSON.parse(e);
arr.unshift(n);
localStorage.setItem('glowlink-notifications', JSON.stringify(arr));
location.reload();
```

**Step 2: Check Bell Icon**
- Look at Header (top-right)
- See 🔔 bell icon
- Should show badge with "1"

**Step 3: Test Notification Dropdown**
- Click bell icon
- Notification appears in dropdown
- Try "Mark as Read" button
- Try "Remove" button
- Badge count updates

---

## Feature Checklists

### ✅ Feature 1: Notifications
- [ ] Bell icon visible
- [ ] Badge shows count
- [ ] Dropdown opens/closes
- [ ] Notifications list shows
- [ ] Mark as read works
- [ ] Remove button works
- [ ] Clear all button works

### ✅ Feature 2: Reviews (Test on Artist Profile)
**To navigate:**
1. Click "Find Artists" or go to Search
2. Click any artist card
3. Scroll down to "Reviews & Ratings"

- [ ] Reviews section appears
- [ ] Rating summary visible
- [ ] Star distribution chart visible
- [ ] "Write a Review" form present
- [ ] Star picker interactive
- [ ] Form fields accept input
- [ ] Submit button works

### ✅ Feature 3: Admin Dashboard (Test if logged in)
**To navigate:**
1. Make sure you're logged in
2. Go to: http://localhost:5173/admin

- [ ] Dashboard loads (no 401 error)
- [ ] Overview tab shows stats
- [ ] Tab switching works
- [ ] Stat cards display
- [ ] Table shows data
- [ ] Buttons clickable

### ✅ Feature 4: Payments
- [ ] No console errors
- [ ] App builds and runs

---

## 🧪 Full Testing Guide

See **TESTING_GUIDE.md** for detailed feature testing

## 📝 Test Script

See **TEST_SCRIPT.js** for browser console test automation

---

## ✨ What Should Work

✅ Production build successful  
✅ All tests passing  
✅ Notification bell in header  
✅ Reviews on artist profiles  
✅ Admin dashboard at /admin  
✅ No console errors  

---

## 🐛 If Something Breaks

1. **Check Browser Console** (F12)
   - Look for red errors
   - Copy error message

2. **Hard Refresh** (Ctrl+Shift+R)
   - Clears cache

3. **Restart Dev Server**
   - Stop: Ctrl+C in terminal
   - Start: `npm run dev`

4. **Check Terminal**
   - Look for build errors
   - Any red messages?

---

## Quick Commands

**Restart Server:**
```bash
Ctrl+C  (in terminal)
npm run dev
```

**Run Tests:**
```bash
npm run test:run
```

**Build Check:**
```bash
npm run build
```

---

**Happy Testing! 🎉**
