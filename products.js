// Anerii Product Catalog Database
// Scalable data structure: you can add any number of new products here!

const PRODUCTS_DATA = [
  {
    id: "anerii-009",
    title: "Noor-e-Neel Backless Short Kurti",
    handle: "noor-e-neel-backless-short-kurti",
    category: "kurtis",
    collection: "noor-e-neel",
    price: 999,
    originalPrice: 1299,
    discount: "23% OFF",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 42,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Contemporary Halter Open-Back",
    description: "Make a bold ethnic statement with the Noor-e-Neel Backless Short Kurti. Crafted in breathable 60x60 cotton with a tranquil sky-blue base and delicate white geometric block motifs. Features a chic halter neckline and open-back tie detail.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri009_noor-e-neel-backless-short-kurti.jpg?v=1787809941",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri009-10.jpg?v=1787811666",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri009-2.jpg?v=1787811666",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri009-3.jpg?v=1787811667"
    ],
    video: "11.mp4",
    inStock: true
  },
  {
    id: "anerii-008",
    title: "Noor-e-Neel Cord Set",
    handle: "noor-e-neel-cord-set",
    category: "co-ords",
    collection: "noor-e-neel",
    price: 1450,
    originalPrice: 1899,
    discount: "24% OFF",
    badge: "Trending",
    rating: 4.8,
    reviewCount: 56,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Full-Sleeve Collared Shirt + Wide Leg Pant",
    description: "Effortlessly polished and endlessly comfortable, the Noor-e-Neel Cord Set is made from breathable 60x60 cotton in a sky-blue base with geometric motifs. A full-sleeve button-down shirt paired with tailored wide-leg trousers.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri008-1.jpg?v=1787815008",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri008-2.jpg?v=1787815008",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri008-3.jpg?v=1787815008",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri008-4.jpg?v=1787815008"
    ],
    video: "8.mp4",
    inStock: true
  },
  {
    id: "anerii-007",
    title: "Noor-e-Neel Kurta Set",
    handle: "noor-e-neel-kurta-set",
    category: "kurta-sets",
    collection: "noor-e-neel",
    price: 1599,
    originalPrice: 1999,
    discount: "20% OFF",
    badge: "Classic",
    rating: 5.0,
    reviewCount: 68,
    fabric: "100% 60×60 Pure Cotton",
    fit: "A-Line V-Neck Kurta + Matching Straight Pants",
    description: "Step into effortless grace with the Noor-e-Neel Kurta Set. Crafted in soft, breathable 60x60 cotton with geometric motifs. The kurta has a flattering V-neckline, 3/4 sleeves, and an A-line drape paired with relaxed bottoms.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri007-3.jpg?v=1787815743",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri007-1.jpg?v=1787815743",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri007-2.jpg?v=1787815743",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri007-4.jpg?v=1787815743"
    ],
    video: "7.mp4",
    inStock: true
  },
  {
    id: "anerii-006",
    title: "Rangrez Short Top",
    handle: "coral-pink-v-neck-top",
    category: "kurtis",
    collection: "rangrez",
    price: 799,
    originalPrice: 999,
    discount: "20% OFF",
    badge: "Must Have",
    rating: 4.7,
    reviewCount: 39,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Sleeveless Curved Hemline",
    description: "A bright and versatile short top designed for effortless summer styling. Crafted in comfortable 60x60 cotton with a clean sleeveless cut, subtle V-slit neckline, and softly curved hemline. Pairs perfectly with high-waisted denims.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4336.jpg?v=1787836076",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4332.jpg?v=1787836076",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4340.jpg?v=1787836076",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4329.jpg?v=1787836076"
    ],
    video: "9.mp4",
    inStock: true
  },
  {
    id: "anerii-005",
    title: "Rangrez Co-ord Set",
    handle: "rani-printed-cord-set",
    category: "co-ords",
    collection: "rangrez",
    price: 1399,
    originalPrice: 1799,
    discount: "22% OFF",
    badge: "Hot Seller",
    rating: 4.9,
    reviewCount: 81,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Sleeveless Top with Side Ties + Straight Pants",
    description: "Vibrant and celebratory, the Rangrez Co-ord Set features an eye-catching Rani pink and multi-colored motif. The sleeveless top is accentuated with delicate side-tie detail and paired with matching straight-cut pants.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4247.jpg?v=1787840184",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4242.jpg?v=1787840184",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4240.jpg?v=1787840184",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4248.jpg?v=1787840184"
    ],
    video: "4.mp4",
    inStock: true
  },
  {
    id: "anerii-004",
    title: "Rangrez Kurta Set",
    handle: "rani-printed-kurta-set",
    category: "kurta-sets",
    collection: "rangrez",
    price: 1499,
    originalPrice: 1899,
    discount: "21% OFF",
    badge: "Festive Edit",
    rating: 4.8,
    reviewCount: 64,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Collared V-Neck Placket + Solid Rani Bottoms",
    description: "A rich printed kurta set crafted in pure cotton for all-day comfort. Features a smart collared neckline with front button placket and 3/4 sleeves, paired with solid Rani pink straight-fit pants.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4197.jpg?v=1787836695",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4202.jpg?v=1787836695",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4200.jpg?v=1787836695",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4193.jpg?v=1787836695"
    ],
    video: "3.mp4",
    inStock: true
  },
  {
    id: "anerii-003",
    title: "Gulnaaz Kurta Set",
    handle: "gulnaaz-kurta-set",
    category: "kurta-sets",
    collection: "gulnaaz",
    price: 1450,
    originalPrice: 1850,
    discount: "22% OFF",
    badge: "Floral Charm",
    rating: 4.9,
    reviewCount: 47,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Flattering V-Neck Kurta + Printed Straight Trousers",
    description: "Embrace timeless botanical beauty with the Gulnaaz Kurta Set. Featuring an all-over earthy floral print on breathable pure cotton. Designed with a flattering V-neckline, relaxed 3/4 sleeves, and matching floral trousers.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-3.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-2.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-5.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-7.jpg?v=1787817296"
    ],
    video: "5.mp4",
    inStock: true
  },
  {
    id: "anerii-002",
    title: "Gulnaaz Cord Set",
    handle: "gulnaaz-cord-set",
    category: "co-ords",
    collection: "gulnaaz",
    price: 1299,
    originalPrice: 1699,
    discount: "24% OFF",
    badge: "Pinterest Pick",
    rating: 4.9,
    reviewCount: 73,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Sleeveless Floral Top + Relaxed-Fit Pants",
    description: "Your go-to co-ord for coffee runs, brunch dates, and travel escapes. The Gulnaaz Cord Set showcases delicate floral sprigs on light cotton with a comfortable sleeveless silhouette and fluid matching bottoms.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri002-1.jpg?v=1787818151",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri002-2.jpg?v=1787818151",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri002-3.jpg?v=1787818152",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri002-4.jpg?v=1787818152"
    ],
    video: "6.mp4",
    inStock: true
  },
  {
    id: "anerii-001",
    title: "Gulnaaz Short Kurti",
    handle: "gulnaaz-short-kurti",
    category: "kurtis",
    collection: "gulnaaz",
    price: 999,
    originalPrice: 1299,
    discount: "23% OFF",
    badge: "Breezy Cotton",
    rating: 4.8,
    reviewCount: 52,
    fabric: "100% 60×60 Pure Cotton",
    fit: "Softly Gathered Flared Short Kurti",
    description: "Feminine, graceful, and breathable. The Gulnaaz Short Kurti features soft micro-gathers below the bust, a graceful V-neckline, and subtle bell sleeves adorned with delicate floral prints in natural earth pigments.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-1.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-4.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-6.jpg?v=1787817296",
      "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-8.jpg?v=1787817296"
    ],
    video: "10.mp4",
    inStock: true
  }
];

// Lookbook Reels configuration (Only the 9 model showcase videos 3.mp4 to 11.mp4)
const REELS_DATA = [
  {
    id: "reel-3",
    video: "3.mp4",
    title: "Rangrez Kurta Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-004",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4197.jpg?v=1787836695",
    likes: "2.4k"
  },
  {
    id: "reel-4",
    video: "4.mp4",
    title: "Rangrez Co-ord Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-005",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4247.jpg?v=1787840184",
    likes: "4.1k"
  },
  {
    id: "reel-5",
    video: "5.mp4",
    title: "Gulnaaz Kurta Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-003",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-3.jpg?v=1787817296",
    likes: "1.9k"
  },
  {
    id: "reel-6",
    video: "6.mp4",
    title: "Gulnaaz Co-ord Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-002",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri002-1.jpg?v=1787818151",
    likes: "5.6k"
  },
  {
    id: "reel-7",
    video: "7.mp4",
    title: "Noor-e-Neel Kurta Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-007",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri007-3.jpg?v=1787815743",
    likes: "2.7k"
  },
  {
    id: "reel-8",
    video: "8.mp4",
    title: "Noor-e-Neel Cord Set",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-008",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri008-1.jpg?v=1787815008",
    likes: "3.8k"
  },
  {
    id: "reel-9",
    video: "9.mp4",
    title: "Rangrez Short Top",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-006",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/PUN4336.jpg?v=1787836076",
    likes: "4.5k"
  },
  {
    id: "reel-10",
    video: "10.mp4",
    title: "Gulnaaz Short Kurti",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-001",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri-new-floral-1.jpg?v=1787817296",
    likes: "3.1k"
  },
  {
    id: "reel-11",
    video: "11.mp4",
    title: "Noor-e-Neel Backless Short Kurti",
    collectionName: "Summer Prêt 2026",
    productId: "anerii-009",
    poster: "https://cdn.shopify.com/s/files/1/1013/9628/3701/files/aneri009_noor-e-neel-backless-short-kurti.jpg?v=1787809941",
    likes: "6.8k"
  }
];
