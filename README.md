# 🌸 Anerii Luxury Storefront (Pehrin-Inspired Custom Design)

A modern, high-converting ethnic & prêt fashion storefront custom-designed for **Anerii** (`anerii.com`), inspired by **Pehrin**'s luxury Pinterest-aesthetic layout.

---

## ✨ Features Implemented

1. **Brand Identity & Color Palette:**
   - Designed around Anerii's logo: **Royal Forest Olive Green (`#313E2F`)**, **Champagne Gold (`#C6A25E`)**, and **Linen Cream (`#FCFBFA`)**.
2. **Hero Video Banner:**
   - Full-bleed autoplaying `Hero section video.mp4` with audio mute/unmute toggle and luxury typography CTA overlay.
3. **Circular Story Categories (Pehrin Style):**
   - All Designs, Co-ord Sets, Kurta Sets, Kurtis & Tops, Noor-e-Neel, Rangrez, and Gulnaaz with smooth filtering.
4. **Interactive Product Cards:**
   - Image switch on hover (primary & lookbook alternate view).
   - Quick size selector pills (`S`, `M`, `L`, `XL`, `XXL`) directly on card.
   - Quick View popup modal with image gallery, detailed descriptions, and size chart guide.
   - Live Wishlist toggle with badge counter.
5. **Video Lookbook / Reels Section ("Anerii • Video Lookbook"):**
   - Immersive auto-advancing reels with play/pause on click.
   - Dynamic Shop Look popup connecting directly into the cart drawer.
   - Click to open fullscreen interactive reel player with sound and "Shop Look" direct purchase card.
6. **Slide-out Cart Drawer:**
   - **Dynamic Free Shipping Meter** (Calculates remaining amount towards Rs. 999 threshold).
   - Item quantity steppers, instant subtotal calculation, and cross-sell upsell recommendation.
   - Persistent `localStorage` so cart items remain saved across page refreshes.
7. **Brand Story & Fabric Pillars:**
   - Highlighting **100% 60x60 Pure Combed Cotton**, handcrafted tailoring, COD, and 7-day exchanges.
8. **Predictive Search Drawer & Mobile Navigation:**
   - Instant live search by title, fabric, and category.
   - Sticky bottom navigation bar for mobile shoppers.

---

## 🚀 How to Run Locally

You can open the website in any of the following ways:

### Option 1: Direct File Open
Simply double-click `index.html` in your `Anerii` folder to open it in Chrome / Edge / Firefox.

### Option 2: Live Local Server (Recommended)
Open a terminal in `c:\Users\u\Downloads\Anerii` and run:
```bash
npx serve .
```
or
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

---

## 🛍️ How to Add More Products in the Future

Open `products.js`. Inside the `PRODUCTS_DATA` array, you can add any new product with this simple format:

```javascript
{
  id: "anerii-010",
  title: "New Kurta Set Name",
  handle: "new-kurta-set",
  category: "kurta-sets", // "co-ords", "kurta-sets", or "kurtis"
  collection: "festive",
  price: 1599,
  originalPrice: 1999,
  discount: "20% OFF",
  badge: "New Arrival",
  rating: 5.0,
  reviewCount: 12,
  fabric: "100% 60×60 Pure Cotton",
  description: "Product description...",
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [
    "https://your-image-url-1.jpg",
    "https://your-image-url-2.jpg"
  ],
  video: "your-video.mp4",
  inStock: true
}
```

The website will **automatically** render the new product card, update category filters, and make it available in the search bar and cart drawer without touching any HTML!
