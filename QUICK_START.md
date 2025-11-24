# Quick Start: Using Advanced Features

## Feature 1: Real-time Notifications

### Show a Notification
```tsx
import { useNotificationStore } from '@/lib/notifications';

function MyComponent() {
  const { addNotification } = useNotificationStore();

  const handleClick = () => {
    addNotification({
      title: "Success!",
      message: "Your booking was confirmed",
      type: "success", // 'success' | 'error' | 'warning' | 'info'
    });
  };

  return <button onClick={handleClick}>Notify Me</button>;
}
```

### Get Notifications State
```tsx
import { useNotificationStore } from '@/lib/notifications';

function NotificationCounter() {
  const { notifications, unreadCount } = useNotificationStore();
  
  return <div>Unread: {unreadCount}</div>;
}
```

### Available Actions
```tsx
const {
  addNotification,      // Add new notification
  removeNotification,   // Remove by ID
  markAsRead,          // Mark single as read
  markAllAsRead,       // Mark all as read
  clearAll,            // Clear all notifications
  notifications,       // Array of all notifications
  unreadCount,         // Count of unread
} = useNotificationStore();
```

---

## Feature 2: Payment Processing

### Process Payment
```tsx
import { useProcessPayment } from '@/lib/stripe';

function BookingPayment() {
  const { mutate: processPayment, isPending } = useProcessPayment();

  const handlePay = (bookingId: string, amount: number) => {
    processPayment({
      bookingId,
      amount, // in cents (e.g., 10000 = $100.00)
      currency: "usd",
    });
  };

  return (
    <button 
      onClick={() => handlePay("booking-123", 10000)}
      disabled={isPending}
    >
      {isPending ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

### Confirm Payment
```tsx
import { useConfirmPayment } from '@/lib/stripe';

function PaymentConfirmation() {
  const { mutate: confirmPayment } = useConfirmPayment();

  const handleConfirm = () => {
    confirmPayment({
      paymentIntentId: "pi_xxx",
      paymentMethodId: "pm_xxx",
    });
  };

  return <button onClick={handleConfirm}>Confirm Payment</button>;
}
```

---

## Feature 3: Reviews & Ratings

### Display Reviews
```tsx
import { ReviewsSection } from '@/components/ReviewsSection';

function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>
      <h1>Artist Profile</h1>
      <ReviewsSection artistId={id} />
    </div>
  );
}
```

### Use Review Hooks Directly
```tsx
import { 
  useArtistReviews, 
  useReviewStats,
  useCreateReview,
  useMarkReviewHelpful 
} from '@/lib/reviews';

function CustomReviewComponent({ artistId }: { artistId: string }) {
  // Get all reviews
  const { data: reviews, isLoading } = useArtistReviews(artistId, "recent");

  // Get statistics
  const { data: stats } = useReviewStats(artistId);

  // Create new review
  const { mutate: createReview } = useCreateReview();
  
  const handleCreateReview = () => {
    createReview({
      artistId,
      rating: 5,
      title: "Amazing service!",
      comment: "Very professional...",
    });
  };

  // Mark review as helpful
  const { mutate: markHelpful } = useMarkReviewHelpful();
  
  const handleMarkHelpful = (reviewId: string) => {
    markHelpful(reviewId);
  };

  return (
    <div>
      <p>Average Rating: {stats?.averageRating}</p>
      <p>Total Reviews: {stats?.totalReviews}</p>
      {reviews?.map(review => (
        <div key={review.id}>
          <div>{review.title}</div>
          <button onClick={() => handleMarkHelpful(review.id)}>
            Helpful ({review.helpfulCount})
          </button>
        </div>
      ))}
      <button onClick={handleCreateReview}>Write Review</button>
    </div>
  );
}
```

---

## Feature 4: Admin Dashboard

### Access Admin Panel
1. Navigate to `/admin` (requires authentication)
2. Verify admin role in JWT token (currently checking auth only)
3. View dashboard with 6 tabs:
   - **Overview**: Key metrics and recent bookings
   - **Users**: User management
   - **Artists**: Artist verification and management
   - **Bookings**: Booking management
   - **Analytics**: Performance metrics
   - **Settings**: Configuration options

### Admin Code Example
```tsx
import { useNavigate } from 'react-router-dom';

function AdminLink() {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  const goToAdmin = () => {
    if (token) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return <button onClick={goToAdmin}>Admin Panel</button>;
}
```

---

## Environment Setup

### Development
```env
# .env.local or .env
VITE_WS_URL=ws://localhost:8080
VITE_STRIPE_API_URL=http://localhost:3000/api/stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_ADMIN_API_URL=http://localhost:3000/api/admin
```

### Production
```env
VITE_WS_URL=wss://api.example.com/ws
VITE_STRIPE_API_URL=https://api.example.com/stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_ADMIN_API_URL=https://api.example.com/admin
```

---

## Testing Features

### Test Notifications (Without Backend)
1. The notification system includes a **demo mode**
2. When `VITE_WS_URL` is not set, it simulates notifications
3. Auto-generates mock notifications every 30 seconds
4. Notifications persist to localStorage
5. Great for UI testing and development

### Test Admin Panel
1. Log in with any user account
2. Navigate to `/admin` route
3. View the dashboard interface
4. All UI is interactive (settings can be modified in frontend)
5. Note: Actions won't persist without backend

### Test Reviews Component
1. Navigate to any artist profile
2. See ReviewsSection with:
   - Rating statistics (if backend available)
   - Write review form
   - List of existing reviews
3. Form is interactive; submit requires backend

### Test Payment Forms
1. Dashboard and Profile pages have booking sections
2. Payment buttons available in booking flows
3. Requires Stripe backend for actual payments
4. Error handling in place for failed payments

---

## Debugging

### Enable Debug Mode
```tsx
// In useWebSocketNotifications hook
const isDebug = true; // Change to true for logs
if (isDebug) console.log('WebSocket:', event);
```

### Check Notification Store
```tsx
// In browser console
import { useNotificationStore } from '@/lib/notifications';
const store = useNotificationStore.getState();
console.log('Notifications:', store.notifications);
console.log('Unread Count:', store.unreadCount);
```

### Verify Build
```bash
npm run build  # Check for errors
npm run test:run  # Verify tests pass
npm run dev    # Run development server
```

---

## Common Issues & Solutions

### Notifications not showing
- [ ] Check `VITE_WS_URL` environment variable
- [ ] Verify WebSocket server is running
- [ ] Check browser console for errors
- [ ] Try demo mode by removing `VITE_WS_URL`

### Reviews section empty
- [ ] Verify `artistId` prop is passed correctly
- [ ] Check backend review API is responding
- [ ] View network tab for API errors
- [ ] Verify review data exists in database

### Admin panel not accessible
- [ ] Ensure you're logged in (check auth token)
- [ ] Verify auth token is valid
- [ ] Check if admin role is in JWT token
- [ ] Navigate directly to `/admin` or use admin link

### Payments not working
- [ ] Verify `VITE_STRIPE_API_URL` is correct
- [ ] Check Stripe API keys in environment
- [ ] Verify backend payment endpoint exists
- [ ] Check payment intent creation in console

---

## Component Props

### ReviewsSection
```tsx
interface ReviewsSectionProps {
  artistId: string;  // Required: Artist ID to fetch reviews for
}
```

### NotificationCenter
```tsx
// No props required - uses global Zustand store
// Automatically displays in header
```

### AdminDashboard
```tsx
// No props required - internal component
// Renders full admin interface
```

---

## API Response Types

### Review Type
```tsx
interface Review {
  id: string;
  artistId: string;
  userId: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;
  userHelpful: boolean;
}
```

### ReviewStats Type
```tsx
interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
```

### Notification Type
```tsx
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}
```

---

## Resources & Documentation

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Stripe API Documentation](https://stripe.com/docs/payments)
- [WebSocket MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

