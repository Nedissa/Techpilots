# Solutions

## Customer Registration Implementation

**Problem:** Customers couldn't register on the frontend. Registrations weren't being saved to the Medusa database.

**Solution:** Implemented Medusa's official three-step customer registration process:

1. **Get Registration Token** - POST `/auth/customer/emailpass/register` with email and password to receive a registration token
2. **Register Customer** - POST `/store/customers` with the token and customer details (first_name, last_name, email)
3. **Authenticate Customer** - POST `/auth/customer/emailpass` with email and password to log the user in

**Key Fix:** Used correct Medusa API endpoints and headers:
- `x-publishable-api-key` header with publishable key
- `Authorization: Bearer {token}` for authenticated requests

**Result:** Customers can now register via the frontend, and accounts are automatically created in the Medusa database on the VPS.

---

## Server-Side URL Resolution

**Problem:** Frontend couldn't fetch products during server-side rendering. Relative URLs like `/api/products` failed on the server.

**Solution:** Used `VERCEL_URL` environment variable during build time:
- On Vercel: Uses `https://{VERCEL_URL}` 
- Locally: Falls back to `NEXT_PUBLIC_APP_URL` or `http://localhost:3000`
- Client-side: Uses relative URLs (empty string)

**Result:** Server-side rendering works on both local dev and Vercel production.

---

## Aside Animation

**Problem:** Open/close animations for the shopping cart sidebar weren't identical - closing was too fast.

**Solution:** Updated both panel and overlay transitions to use the same 300ms duration with `cubic-bezier(0.4, 0, 0.2, 1)` easing function for smooth, natural motion.

**Result:** Consistent smooth slide animation when opening and closing the cart sidebar.

---

## Environment Variables Setup

**Problem:** Hardcoded URLs and keys scattered throughout the codebase. Backend URL changed from localhost to VPS but code still used old values.

**Solution:** Centralized all configuration in `.env.local`:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - VPS backend (194.14.207.94:9000)
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - For Store API calls
- `MEDUSA_ADMIN_KEY` - For admin operations
- `NEXT_PUBLIC_MEDUSA_REGION_ID` - Default Medusa region
- `NEXT_PUBLIC_APP_URL` - Frontend URL for server-side fetches

All API routes now use these env vars instead of hardcoded values.

**Result:** Easy to switch between local dev and production - just change `.env.local`.

---

## Cart Icon Sync with Header

**Problem:** Cart icon in header (showing total amount and item count) wasn't updating dynamically when cart was modified or cleared in the aside sidebar.

**Solution:** 

1. **CartAside** - Added `cartUpdated` and `cartCleared` event dispatches with `setTimeout` when:
   - Updating item quantity
   - Removing item
   - Clearing entire cart

2. **HeaderWrapper** - Added three listeners:
   - `cartUpdated` event - Updates cart display
   - `cartCleared` event - Clears cart display
   - `storage` event - Listens for direct localStorage changes to catch all updates immediately

**Key Fix:** Storage event listener catches when localStorage is directly modified, triggering instant UI updates without waiting for custom events.

**Result:** Cart icon in header stays perfectly in sync with cart sidebar in real-time. Updates instantly when items are added, quantity changed, removed, or cart is emptied.
