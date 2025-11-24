## 🆕 Recent updates — Ratings & Reviews (October 2025)

This release adds a client-side rating and review system, plus UI improvements that let clients leave reviews on artist profiles and discover them from search results.
# GlowLink - Beauty Professionals Platform (2025)

## 📋 Overview
GlowLink is a modern, responsive web platform connecting beauty professionals with clients across South Africa. Built with a stunning glassmorphism design, smooth animations, and optimized for all devices. Service and codebase are owned by Nexlinksolutionsza. Refer to the license section for more info.

## 🎨 Features

### Design & UI
- **Glassmorphism Effects**: Modern glass UI with backdrop blur effects
- **Smooth Animations**: Fade-in, slide, and hover animations throughout
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Color-Coded Categories**: Each service category has its own color theme
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### Pages Included
1. **index.html** - Homepage with hero, categories, and featured artists
2. **login.html** - Sign in/Sign up page with form toggle
3. **pricing.html** - Three-tier pricing plans (R50, R100, R150/month)
4. **contact.html** - Contact form with business information
5. **about.html** - Company story and values
6. **how-it-works.html** - Platform explanation with FAQ
7. **search.html** - Artist search with filters
8. **profile.html** - Artist profile with services and reviews

### Technical Features
- **Mobile-First**: Hamburger menu for mobile devices
- **Form Validation**: Client-side validation for all forms
- **Session Storage**: Category selection persistence
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized loading and animations

## 📁 File Structure

```
glowlink/
├── index.html          # Homepage
├── login.html          # Login/Signup page
├── pricing.html        # Pricing plans
├── contact.html        # Contact form
├── about.html          # About us
├── how-it-works.html   # How it works
├── search.html         # Search artists
├── profile.html        # Artist profile
├── style.css           # Main stylesheet
└── script.js           # JavaScript functionality
```

## 🚀 Getting Started

### Installation
1. Download all files to a folder
2. Ensure all HTML files, CSS, and JS are in the same directory
3. Open `index.html` in a web browser

### No Build Process Required
This project uses:
- Tailwind CSS (CDN)
- Feather Icons (CDN)
- HTML/CSS/JavaScript

## 🎨 Design System

### Colors
- **Primary Pink**: #ec4899 (RGB: 236, 72, 153)
- **Secondary Purple**: #8b5cf6 (RGB: 139, 92, 246)
- **Success Green**: #10b981
- **Info Blue**: #3b82f6
- **Warning Yellow**: #f59e0b

### Category Colors
- **Makeup**: Rose (#FADADD, #FFC1CC)
- **Nails**: Mint (#C5F5E3, #A8E6CF)
- **Braids**: Lilac (#E3C8F5, #C1A1E3)
- **Barbering**: Sky (#CDE7FF, #A8D8FF)
- **Skincare**: Cream (#FFF2D8, #FFE7BA)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📱 Responsive Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Mobile Features
- Hamburger menu with slide-down animation
- Collapsible navigation
- Touch-optimized buttons and inputs
- Stacked layouts for better readability

## 🔧 Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --rose-primary: #FADADD;
    --rose-accent: #FFC1CC;
    /* Add more custom colors */
}
```

### Adding New Categories
1. Add HTML in `index.html`:
```html
<div class="category-card" data-category="new-category">
    <div class="category-content">
        <div class="glass-icon">
            <i data-feather="icon-name"></i>
        </div>
        <h3>Category Name</h3>
    </div>
    <div class="category-overlay"></div>
</div>
```

2. Add CSS color in `style.css`:
```css
.category-card[data-category="new-category"] .category-overlay {
    background: linear-gradient(135deg, rgba(r, g, b, 0.7), rgba(r, g, b, 0.5));
}
```

### Modifying Pricing Plans
Edit `pricing.html` to change:
- Prices (currently R50, R100, R150)
- Features list
- Plan names and descriptions

## 🌍 South African Localization

### Currency
All prices displayed in South African Rand (R)
- Format: R50, R100, R150
- Thousands separator: R1,500

### Phone Numbers
- Format: +27 (11) 234-5678
- Mobile: +27 81 234 5678

### Locations
Updated to South African cities: (TODO: Add other places as we expand)
- Johannesburg
- Cape Town
- Durban
- Pretoria
- Port Elizabeth

### Business Hours
- SAST (South African Standard Time)
- Monday-Friday: 8am-5pm
- Saturday: 9am-1pm

## 🎯 Key Interactions

### Category Selection
1. Click category card on homepage
2. Color overlay animates upward
3. Redirects to search page with filter applied

### Mobile Menu
1. Hamburger icon appears on mobile
2. Click to reveal sliding menu
3. Click "Close Menu" or outside to collapse

### Contact Form
1. Fill required fields
2. Client-side validation
3. Success message on submit
4. Form resets automatically

### Login/Signup Toggle
1. Default shows login form
2. Click "Sign up" to switch
3. Smooth transition between forms
4. Password visibility toggle

## 📊 Features by Page

### Homepage (index.html)
✅ Responsive hero section
✅ Search bar with location
✅ 5 category cards with hover animations
✅ Featured artists grid (3 columns)
✅ How it works section
✅ Fixed navigation header

### Login Page (login.html)
✅ Toggle between login/signup
✅ Social login buttons (Google, Facebook)
✅ Password visibility toggle
✅ Remember me checkbox
✅ Form validation
✅ Responsive design

### Pricing Page (pricing.html)
✅ 3 pricing tiers (R50, R100, R150/month)
✅ Featured "Professional" plan
✅ Feature comparison lists
✅ FAQ section with accordion
✅ CTA buttons
✅ Glassmorphism cards

### Contact Page (contact.html)
✅ Contact form with validation
✅ Contact information cards
✅ Social media links
✅ Business hours
✅ Quick links section
✅ South African address & phone

## 🔒 Security Notes

**Important**: This is a frontend-only implementation as it is just a mockup. For production:
1. Implement backend API for form submissions
2. Add CSRF protection
3. Use HTTPS for all requests
4. Implement rate limiting
5. Add reCAPTCHA for forms
6. Secure authentication system

## 🐛 Known Limitations

1. **No Backend**: Forms log to console only
2. **Static Data**: Artist data is hardcoded
3. **No Payments**: Payment integration not included
4. **Session Storage**: Data cleared on browser close

## 🎨 Animation List

### Page Load
- Fade-in hero text (0.8s delay)
- Slide-up search bar
- Category cards stagger animation

### Hover Effects
- Category overlay rise (0.5s)
- Card lift with shadow
- Button ripple effect
- Image zoom on artist cards

### Click Interactions
- Mobile menu slide-down
- FAQ accordion expand
- Form field focus glow

## 📞 Support
(Fake info below)
For questions or issues:
- Email: support@glowlink.co.za
- Phone: +27 (11) 234-5678
- Address: 123 Nelson Mandela Square, Sandton, Johannesburg 2196

## 📝 License

© 2025 GlowLink. All rights reserved. Created and owned by NexlinkSolutionsza. Illegal use and coying of this codebase will result in legal charges.

## 🙏 Credits and Team Players
- Matthews Thekiso
- Harry Mofoka
- Katleho Matsabu
- Lehlohonolo Mofokeng
- Tumelo Mawai
  

- **Icons**: Feather Icons
- **CSS Framework**: Tailwind CSS
- **Fonts**: Google Fonts (Poppins)
- **Design**: Custom glassmorphism implementation

---

(TODO: adjust "Last Updated" metadata below if desired)
**Last Updated**: 18/19 October 2025
**Last Updated**: 26 October 2025
**Version**: 1.0.0
**Status**: Production Ready

(TODO: Change the last updated or add new section showing updates)
