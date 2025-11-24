# Dashboard Features - Testing Guide

## Quick Start Testing

### Prerequisites
- Dev server running: `npm run dev` (http://localhost:8081)
- Fresh browser or cleared cookies/localStorage

---

## Test 1: Complete Registration & Login Flow

### Steps
1. **Register New Artist**
   - Go to http://localhost:8081/register-artist
   - Fill out form:
     - Name: "Test Artist"
     - Email: "test@artist.com"
     - Phone: "555-123-4567"
   - Password: "<EXAMPLE_PASSWORD>"
   - Click "Register" on final step
   - Should redirect to Dashboard

2. **Verify Header Shows Sign Out**
   - Check top right of page
   - Should see red "Sign Out" button with logout icon
   - Should NOT see "Sign In" link

3. **Navigate Dashboard**
   - Verify "Welcome, Test Artist!" greeting
   - Check all 4 stats cards visible
   - Check Recent Bookings table (may be empty)
   - Check Quick Actions section with 3 buttons

---

## Test 2: Calendar Manager Feature

### Steps
1. **Open Calendar Manager**
   - Click "Manage Calendar" button in Quick Actions
   - Should see:
     - Month calendar grid (January 2024)
     - Month navigation arrows (< >)
     - "Weekly Availability" section below
     - 7 rows for days Monday-Sunday

2. **Test Calendar Navigation**
   - Click right arrow (>)
   - Month should change to February 2024
   - Click left arrow (<)
   - Month should return to January 2024

3. **Test Availability Toggle**
   - Find "Sunday" row (should show "Not Available")
   - Click checkbox next to Sunday
   - Should toggle to "Available" with time fields appearing
   - Enter "11:00" for start time, "16:00" for end time
   - Click checkbox again to disable
   - Time fields should clear

4. **Test Time Selection**
   - Find "Monday" row (should be available 09:00-17:00)
   - Click start time field
   - Change to "08:00"
   - Click end time field
   - Change to "18:00"
   - Verify times updated

5. **Save Availability**
   - Click "Save Availability" button (pink, bottom)
   - Should see green toast notification: "Availability updated successfully!"
   - Refresh page (F5)
   - Go back to Calendar Manager
   - Verify your changes persisted

6. **Test Back Button**
   - Click "← Back to Dashboard" button
   - Should return to overview
   - Quick Actions should be visible again

---

## Test 3: Analytics Dashboard

### Steps
1. **Open Analytics**
   - Click "View Analytics" button in Quick Actions
   - Should see:
     - 4 metric cards at top (Revenue, Bookings, Clients, Rating)
     - 2 charts in next row (Revenue Bar Chart, Bookings Line Chart)
     - 2 sections below (Service Breakdown Pie, Performance Insights)

2. **Verify Metric Cards**
   - Revenue Card: "$7,100" with "+12%" change
   - Bookings Card: "84" with "+8%" change
   - Clients Card: "32" with "+5%" change
   - Rating Card: "4.8/5" with "+0.3" change
   - Each card should have colored background

3. **Test Revenue Chart**
   - Bar chart showing "Week 1" through "Week 4"
   - Pink bars representing revenue amounts
   - Hover over bars - tooltip should show exact amount

4. **Test Bookings Chart**
   - Line chart showing days Mon-Sun
   - Pink line connecting booking counts
   - Points on line can be hovered for details
   - Saturday should be highest (18)
   - Sunday should be lowest (6)

5. **Test Service Breakdown Chart**
   - Pie chart with 4 colored sections:
     - Hair Cut (35%) - Pink
     - Styling (25%) - Light Pink
     - Coloring (20%) - Very Light Pink
     - Treatment (20%) - Pale Pink
   - Labels and percentages visible

6. **Verify Performance Insights**
   - 4 insight cards showing:
     - Busiest Day: Saturday (18)
     - Most Popular Service: Hair Cut (35%)
     - Client Retention Rate: 78% (↑ 5%)
     - Average Session Price: $85 (↑ 12%)

7. **Test Back Button**
   - Click "← Back to Dashboard" button
   - Return to overview
   - Quick Actions visible again

---

## Test 4: Sign Out Functionality

### Scenario A: Desktop Sign Out
1. **From Dashboard**
   - Click red "Sign Out" button (top right)
   - Should:
     - Flash briefly (loading state)
     - Redirect to home page "/"
     - Page reloads automatically
   
2. **Verify Logged Out**
   - Check Header - should see "Sign In" button
   - Go back to http://localhost:8081/dashboard
   - Should redirect to login page (not allowed)

3. **Login Again**
   - Use same credentials: test@artist.com / <EXAMPLE_PASSWORD>
   - Should redirect back to Dashboard
   - Header shows "Sign Out" again

### Scenario B: Mobile Sign Out
1. **Resize to Mobile**
   - Use Chrome DevTools to resize to mobile (375px width)
   - Or use actual mobile device

2. **Open Mobile Menu**
   - Click hamburger menu icon (top right)
   - Menu should slide down
   - "Sign Out" button visible at bottom

3. **Click Mobile Sign Out**
   - Click "Sign Out" button in menu
   - Menu should close
   - Redirect to home page
   - Should see "Sign In" in mobile menu when reopened

---

## Test 5: Tab Navigation & Switching

### Steps
1. **Overview Tab (Default)**
   - Should show stats and bookings
   - "Manage Calendar", "View Clients", "View Analytics" buttons visible

2. **Switch to Customer Records**
   - Click "Customer Records" tab
   - Should show customer placeholder message

3. **Return to Overview**
   - Click "Overview" tab
   - Should return to stats view

4. **Click "View Clients" Button**
   - From Overview, click middle button "View Clients"
   - Should switch to Customer Records tab

---

## Test 6: Browser Storage Persistence

### Steps
1. **Set Availability**
   - Open Calendar Manager
   - Change availability for Monday to 10:00-16:00
   - Save changes
   - See success notification

2. **Verify localStorage**
   - Open Browser DevTools (F12)
   - Go to Application/Storage > Local Storage
   - Find "artistAvailability" key
   - Should see JSON array with your changes

3. **Hard Refresh**
   - Press Ctrl+Shift+R (hard refresh)
   - Go back to Calendar Manager
   - Availability should still show your changes

4. **Clear Storage Test**
   - In DevTools, delete "artistAvailability" key
   - Refresh page
   - Calendar should show defaults again

---

## Test 7: Error States & Edge Cases

### Steps
1. **Missing User Data**
   - If currentUser not loaded, greeting should show: "Welcome, Beauty Professional!"
   - Stats should still display

2. **Empty Bookings**
   - If no bookings exist, table should show: "No bookings found"

3. **Mobile Responsiveness**
   - Resize browser to various widths
   - All components should stack/adjust properly
   - Mobile menu should work at all sizes

4. **Loading States**
   - Stats cards should show skeleton loaders while loading
   - Bookings table should show placeholder while loading

---

## Test 8: Accessibility

### Keyboard Navigation
1. Tab through page:
   - Should reach Sign Out button
   - Should reach Calendar button
   - Should reach Analytics button
   - Enter key should activate buttons

2. Mobile Menu:
   - Should be closable with Escape key
   - Or by clicking outside (if implemented)

### Screen Reader (if available)
1. Button labels should be clear
2. Chart data should be accessible via table fallback
3. Form fields should have labels

---

## Checklist for Complete Testing

- [ ] Registration works and redirects to Dashboard
- [ ] Header shows "Sign Out" when logged in
- [ ] Header shows "Sign In" when logged out
- [ ] Calendar Manager opens and displays correctly
- [ ] Calendar navigation works (next/previous month)
- [ ] Availability can be toggled
- [ ] Time slots can be edited
- [ ] Changes save to localStorage
- [ ] Changes persist after refresh
- [ ] Analytics dashboard opens
- [ ] All 4 metric cards display
- [ ] All 3 charts render without errors
- [ ] Performance insights display correctly
- [ ] Back button returns to Dashboard
- [ ] Sign Out button logs out user
- [ ] Mobile menu shows Sign Out
- [ ] Mobile Sign Out works
- [ ] Redirect after logout works
- [ ] Cannot access Dashboard without login
- [ ] Responsive design works on mobile

---

## Expected Console Output

After successful build/start:

```
✓ Build: 2330 modules, ~10s
✓ Tests: 31/31 passing
✓ Dev Server: http://localhost:8081
```

---

## Common Issues & Solutions

### Issue: Sign Out doesn't work
**Check**:
- Browser console for errors
- localStorage shows "authToken" before logout
- Page actually reloads

### Issue: Calendar data not saving
**Check**:
- localStorage is enabled in browser
- Toast notification appears
- DevTools shows "artistAvailability" in localStorage

### Issue: Analytics charts don't render
**Check**:
- Recharts is bundled (should be in dist)
- No console errors
- Component has enough space to render

### Issue: Mobile menu not working
**Check**:
- Using responsive mode (Chrome DevTools)
- Menu animation completes
- Buttons are clickable

---

## Performance Baseline

Expected load times (on typical machine):
- Dashboard page: < 2s
- Calendar Manager: < 500ms
- Analytics: < 1s (charts render)
- Sign Out: < 1s (redirect + reload)

If slower, check:
- Network tab for slow asset loading
- Console for warnings/errors
- Browser cache (try hard refresh)

