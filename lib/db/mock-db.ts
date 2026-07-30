import { Product, Category, Order, User, Review, Coupon, ContactMessage, DashboardStats } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-skincare',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Nourishing botanical serums, hydrators, sunscreen, and daily essentials crafted for glowing melanin skin.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    productCount: 8,
  },
  {
    id: 'cat-makeup',
    name: 'Makeup',
    slug: 'makeup',
    description: 'High-pigment foundations, velvety lipsticks, radiant highlighters, and eye cosmetics for every complexion.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    productCount: 10,
  },
  {
    id: 'cat-haircare',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Organic shea butter treatments, scalp oils, deep conditioners, and curl defining creams for natural textures.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    productCount: 6,
  },
  {
    id: 'cat-fragrances',
    name: 'Fragrances',
    slug: 'fragrances',
    description: 'Exquisite perfumes, oud elixirs, and luxury body mists crafted with rich amber and floral notes.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-personalcare',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Silk body washes, exfoliating scrubs, Ghanaian raw black soap infusions, and moisturizing lotions.',
    image: 'https://images.unsplash.com/photo-1608248597260-657d6543bc3b?auto=format&fit=crop&w=800&q=80',
    productCount: 6,
  },
  {
    id: 'cat-accessories',
    name: 'Beauty Accessories',
    slug: 'beauty-accessories',
    description: 'Precision makeup brushes, facial beauty sponges, LED vanity mirrors, and luxury silk bonnet wraps.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    productCount: 4,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Ghana Gold Radiance Vitamin C Serum',
    description: 'A concentrated brightening serum infused with pure L-Ascorbic Acid, Rosehip extract, and Ghanaian Baobab oil to deeply nourish skin, fade dark spots, and enhance natural radiance.',
    price: 280,
    discountPrice: 240,
    brand: 'Cosmetics Haven Botanicals',
    categoryId: 'cat-skincare',
    categoryName: 'Skincare',
    stock: 24,
    sku: 'CH-SKIN-001',
    featured: true,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248580460-1e530e613b5d?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Deionized Water, Baobab Seed Oil, Vitamin C (L-Ascorbic Acid 15%), Hyaluronic Acid, Vitamin E, Ferulic Acid, Rosehip Extract.',
    usage: 'Apply 3-4 drops to cleansed face and neck morning and night before moisturization. Follow with sunscreen during daytime.',
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2026-06-15T10:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'Velvet Matte Liquid Lipstick - Royal Ashanti Red',
    description: 'An ultra-pigmented, transfer-proof liquid lipstick designed specifically for rich African complexions. Delivers 16-hour lightweight wear without drying lips.',
    price: 150,
    discountPrice: 125,
    brand: 'Haven Color',
    categoryId: 'cat-makeup',
    categoryName: 'Makeup',
    stock: 45,
    sku: 'CH-MAKE-002',
    featured: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Isododecane, Dimethicone, Shea Butter Ethyl Esters, Tocopherol Acetate, Iron Oxides, Red 7 Lake.',
    usage: 'Exfoliate lips gently before application. Glide smoothly across lips starting from the Cupid bow outwards.',
    rating: 4.8,
    reviewCount: 38,
    createdAt: '2026-06-18T10:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Raw Northern Shea Butter Moisture Melt Balm',
    description: 'Hand-crafted Grade A organic raw shea butter sourced directly from Northern Ghana, whipped with jojoba and sweet almond oil for intense body hydration.',
    price: 110,
    discountPrice: 95,
    brand: 'Natures Gold Ghana',
    categoryId: 'cat-personalcare',
    categoryName: 'Personal Care',
    stock: 60,
    sku: 'CH-CARE-003',
    featured: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597260-657d6543bc3b?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: '100% Unrefined Ghanaian Butyrospermum Parkii (Shea Butter), Organic Simmondsia Chinensis (Jojoba) Oil, Sweet Almond Oil, Essential Oils.',
    usage: 'Warm a dime-sized amount between clean hands and massage gently into dry skin, knees, elbows, or hair tips.',
    rating: 5.0,
    reviewCount: 64,
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Oud & Amber Gold Extrait de Parfum (100ml)',
    description: 'An alluring luxury fragrance capturing opulent notes of Cambodian Oud, Black Rose, Sandalwood, and Golden Amber. Designed for long-lasting sillage.',
    price: 850,
    discountPrice: 750,
    brand: 'Haven Private Reserve',
    categoryId: 'cat-fragrances',
    categoryName: 'Fragrances',
    stock: 12,
    sku: 'CH-FRAG-004',
    featured: true,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Linalool, Limonene, Citronellol, Benzyl Benzoate, Agarwood Extract.',
    usage: 'Mist onto pulse points including wrists, inner elbows, and base of neck from 15cm distance.',
    rating: 4.9,
    reviewCount: 19,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Nectar Glow Hydrating Facial Cleanser',
    description: 'Gentle pH-balanced gel cleanser with Aloe Vera, Honey Nectar, and Niacinamide that removes makeup and impurities without stripping natural moisture.',
    price: 180,
    brand: 'Cosmetics Haven Botanicals',
    categoryId: 'cat-skincare',
    categoryName: 'Skincare',
    stock: 35,
    sku: 'CH-SKIN-005',
    featured: false,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Aqua, Aloe Barbadensis Leaf Juice, Niacinamide 2%, Raw Honey Extract, Glycerin, Sodium Cocoyl Isethionate.',
    usage: 'Lather between damp palms and massage onto face for 60 seconds. Rinse thoroughly with lukewarm water.',
    rating: 4.7,
    reviewCount: 23,
    createdAt: '2026-07-10T10:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'Soft Focus Luminous Foundation (30 Shades)',
    description: 'A medium-to-full buildable coverage liquid foundation enriched with hyaluronic acid that leaves skin with a natural, breathable satin glow.',
    price: 320,
    discountPrice: 290,
    brand: 'Haven Color',
    categoryId: 'cat-makeup',
    categoryName: 'Makeup',
    stock: 50,
    sku: 'CH-MAKE-006',
    featured: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Water, Cyclopentasiloxane, Hyaluronic Acid, Tocopheryl Acetate, Titanium Dioxide, Iron Oxides.',
    usage: 'Pump desired amount onto brush or damp sponge. Blend evenly outward from the center of the face.',
    rating: 4.9,
    reviewCount: 51,
    createdAt: '2026-04-20T10:00:00Z',
  },
  {
    id: 'prod-7',
    name: 'Chebe & Hibiscus Deep Scalp Restorative Oil',
    description: 'Potent scalp treatment infused with Chadian Chebe powder, Hibiscus petal oil, and Black Castor oil to stimulate hair follicles and eliminate breakage.',
    price: 195,
    discountPrice: 170,
    brand: 'Haven Crown',
    categoryId: 'cat-haircare',
    categoryName: 'Hair Care',
    stock: 18,
    sku: 'CH-HAIR-007',
    featured: false,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1608248580460-1e530e613b5d?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Jamaican Black Castor Oil, Chebe Powder Infusion, Hibiscus Rosa-Sinensis Flower Extract, Peppermint Oil.',
    usage: 'Part hair into sections and apply directly to scalp twice weekly. Massage with fingertips for 5 minutes.',
    rating: 4.8,
    reviewCount: 31,
    createdAt: '2026-06-25T10:00:00Z',
  },
  {
    id: 'prod-8',
    name: 'Pro-Precision 12-Piece Gold Makeup Brush Suite',
    description: 'Professional grade synthetic bristles paired with weighted rose gold and champagne metallic handles, encased in a luxury travel roll.',
    price: 360,
    discountPrice: 310,
    brand: 'Haven Studio',
    categoryId: 'cat-accessories',
    categoryName: 'Beauty Accessories',
    stock: 8,
    sku: 'CH-ACC-008',
    featured: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Ultra-soft Taklon Synthetic Fibers, Recycled Aluminum Ferrules, Sustainable Wooden Handles.',
    usage: 'Use specialized brushes for powder, foundation blending, eye shading, and precision lip lining. Wash weekly.',
    rating: 5.0,
    reviewCount: 29,
    createdAt: '2026-05-30T10:00:00Z',
  },
  {
    id: 'prod-9',
    name: 'African Black Soap Liquid Detox Body Wash',
    description: 'Traditional Ghanaian Alata Samina formulated with Aloe Vera juice, Coconut oil, and Tea Tree oil for a deep purifying cleanse that calms acne-prone skin.',
    price: 95,
    brand: 'Natures Gold Ghana',
    categoryId: 'cat-personalcare',
    categoryName: 'Personal Care',
    stock: 40,
    sku: 'CH-CARE-009',
    featured: false,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1608248597260-657d6543bc3b?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: 'Traditional Ghanaian Plantain Ash Extract, Palm Kernel Oil, Shea Butter, Aloe Vera, Tea Tree Essential Oil.',
    usage: 'Pour onto washcloth or sponge, lather generously over damp skin, and rinse off thoroughly.',
    rating: 4.8,
    reviewCount: 37,
    createdAt: '2026-03-12T10:00:00Z',
  },
  {
    id: 'prod-10',
    name: 'Rose Quartz 3D Sculpting Facial Roller & Gua Sha Set',
    description: 'Hand-carved authentic Brazilian Rose Quartz tools designed to relieve facial tension, stimulate lymphatic drainage, and lift contours.',
    price: 220,
    discountPrice: 195,
    brand: 'Haven Studio',
    categoryId: 'cat-accessories',
    categoryName: 'Beauty Accessories',
    stock: 14,
    sku: 'CH-ACC-010',
    featured: false,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    ],
    ingredients: '100% Natural Brazilian Rose Quartz, Reinforced Stainless Steel Frame.',
    usage: 'Apply facial oil or serum. Roll or scrape upward and outward from chin to cheekbones and forehead.',
    rating: 4.9,
    reviewCount: 16,
    createdAt: '2026-07-02T10:00:00Z',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    userId: 'usr-cust1',
    customerName: 'Ama Serwaa Mensah',
    customerEmail: 'ama.mensah@gmail.com',
    customerPhone: '+233 24 456 7890',
    deliveryAddress: 'House 42, East Legon Residential Area',
    city: 'Accra',
    region: 'Greater Accra',
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    paymentMethod: 'MTN Mobile Money',
    total: 425,
    discount: 25,
    shippingFee: 35,
    orderItems: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Ghana Gold Radiance Vitamin C Serum',
        productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 240,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Velvet Matte Liquid Lipstick - Royal Ashanti Red',
        productImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 125,
      },
    ],
    trackingCode: 'CH-GH-89201',
    notes: 'Please call customer upon arrival at gate.',
    createdAt: '2026-07-25T14:30:00Z',
  },
  {
    id: 'ord-1002',
    userId: 'usr-cust2',
    customerName: 'Kofi Owusu-Ansah',
    customerEmail: 'kofi.owusu@outlook.com',
    customerPhone: '+233 20 812 3456',
    deliveryAddress: 'Plot 15 Cantonments Road, near US Embassy',
    city: 'Accra',
    region: 'Greater Accra',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'Paystack Card',
    total: 785,
    discount: 0,
    shippingFee: 35,
    orderItems: [
      {
        id: 'item-3',
        productId: 'prod-4',
        productName: 'Oud & Amber Gold Extrait de Parfum (100ml)',
        productImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 750,
      },
    ],
    trackingCode: 'CH-GH-89202',
    notes: 'Gift wrap requested.',
    createdAt: '2026-07-28T09:15:00Z',
  },
  {
    id: 'ord-1003',
    userId: 'usr-cust3',
    customerName: 'Akosua Adoma Appiah',
    customerEmail: 'akosua.appiah@yahoo.com',
    customerPhone: '+233 55 123 9876',
    deliveryAddress: 'Abelemkpe Phase 2, Accra',
    city: 'Accra',
    region: 'Greater Accra',
    status: 'PENDING',
    paymentStatus: 'UNPAID',
    paymentMethod: 'Telecel Cash',
    total: 325,
    discount: 0,
    shippingFee: 35,
    orderItems: [
      {
        id: 'item-4',
        productId: 'prod-6',
        productName: 'Soft Focus Luminous Foundation',
        productImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 290,
      },
    ],
    trackingCode: 'CH-GH-89203',
    notes: '',
    createdAt: '2026-07-29T11:20:00Z',
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin1',
    name: 'Cosmetics Haven Store Admin',
    email: 'admin@cosmeticshaven.com',
    phone: '+233 30 200 1122',
    role: 'ADMIN',
    address: 'Cosmetics Haven Flagship Store, Oxford Street, Osu',
    city: 'Accra',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'usr-cust1',
    name: 'Ama Serwaa Mensah',
    email: 'ama.mensah@gmail.com',
    phone: '+233 24 456 7890',
    role: 'CUSTOMER',
    address: 'House 42, East Legon Residential Area',
    city: 'Accra',
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'usr-cust2',
    name: 'Kofi Owusu-Ansah',
    email: 'kofi.owusu@outlook.com',
    phone: '+233 20 812 3456',
    role: 'CUSTOMER',
    address: 'Plot 15 Cantonments Road',
    city: 'Accra',
    createdAt: '2026-04-10T12:00:00Z',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userId: 'usr-cust1',
    userName: 'Ama S.',
    productId: 'prod-1',
    productName: 'Ghana Gold Radiance Vitamin C Serum',
    rating: 5,
    comment: 'Absolute game changer for my dark spots! I noticed a visible glow within 10 days of continuous use. Smells divine too!',
    status: 'APPROVED',
    createdAt: '2026-07-26T16:00:00Z',
  },
  {
    id: 'rev-2',
    userId: 'usr-cust2',
    userName: 'Kofi O.',
    productId: 'prod-4',
    productName: 'Oud & Amber Gold Extrait de Parfum',
    rating: 5,
    comment: 'The scent longevity is unmatched. I wore it to an evening gala in Airport Residential and received compliments all night.',
    status: 'APPROVED',
    createdAt: '2026-07-28T18:40:00Z',
  },
  {
    id: 'rev-3',
    userName: 'Efya Poku',
    productId: 'prod-3',
    productName: 'Raw Northern Shea Butter Moisture Melt Balm',
    rating: 5,
    comment: 'Nothing beats authentic Ghanaian shea butter. So rich and smooth!',
    status: 'APPROVED',
    createdAt: '2026-07-20T11:15:00Z',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'HAVEN10',
    discount: 10,
    isPercent: true,
    usageLimit: 500,
    usedCount: 42,
    active: true,
  },
  {
    id: 'coup-2',
    code: 'WELCOMEGH50',
    discount: 50,
    isPercent: false,
    usageLimit: 100,
    usedCount: 18,
    active: true,
  },
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Abena Osei',
    email: 'abena.osei@gmail.com',
    phone: '+233 24 999 8877',
    subject: 'Wholesale & Bulk Orders Inquiry',
    message: 'Hello, I manage a beauty salon in Kumasi and would like to inquire about wholesale prices for your foundation and vitamin C serums.',
    status: 'UNREAD',
    createdAt: '2026-07-29T10:00:00Z',
  },
];

// Helper functions for persistent database state
let productsStore = [...INITIAL_PRODUCTS];
let categoriesStore = [...INITIAL_CATEGORIES];
let ordersStore = [...INITIAL_ORDERS];
let usersStore = [...INITIAL_USERS];
let reviewsStore = [...INITIAL_REVIEWS];
let couponsStore = [...INITIAL_COUPONS];
let messagesStore = [...INITIAL_MESSAGES];

export const mockDb = {
  // Products
  getProducts: (categoryId?: string, search?: string, sort?: string) => {
    let result = [...productsStore];
    if (categoryId && categoryId !== 'all') {
      result = result.filter((p) => p.categoryId === categoryId || p.categoryName?.toLowerCase() === categoryId.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sort === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
    return result;
  },

  getProductById: (id: string) => {
    return productsStore.find((p) => p.id === id);
  },

  addProduct: (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    productsStore.unshift(newProduct);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    const idx = productsStore.findIndex((p) => p.id === id);
    if (idx !== -1) {
      productsStore[idx] = { ...productsStore[idx], ...updates };
      return productsStore[idx];
    }
    return null;
  },

  deleteProduct: (id: string) => {
    productsStore = productsStore.filter((p) => p.id !== id);
    return true;
  },

  // Categories
  getCategories: () => categoriesStore,
  getCategoryById: (id: string) => categoriesStore.find((c) => c.id === id),
  addCategory: (cat: Omit<Category, 'id'>) => {
    const newCat = { ...cat, id: `cat-${Date.now()}` };
    categoriesStore.push(newCat);
    return newCat;
  },

  // Orders
  getOrders: () => ordersStore,
  getOrderById: (id: string) => ordersStore.find((o) => o.id === id || o.trackingCode === id),
  createOrder: (orderData: Omit<Order, 'id' | 'trackingCode' | 'createdAt'>) => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      trackingCode: `CH-GH-${randomDigits}`,
      createdAt: new Date().toISOString(),
    };
    ordersStore.unshift(newOrder);
    return newOrder;
  },
  updateOrderStatus: (id: string, status: Order['status']) => {
    const idx = ordersStore.findIndex((o) => o.id === id);
    if (idx !== -1) {
      ordersStore[idx].status = status;
      return ordersStore[idx];
    }
    return null;
  },

  // Customers
  getCustomers: () => usersStore,
  getCustomerById: (id: string) => usersStore.find((u) => u.id === id),

  // Reviews
  getReviews: (productId?: string) => {
    if (productId) {
      return reviewsStore.filter((r) => r.productId === productId && r.status === 'APPROVED');
    }
    return reviewsStore;
  },
  addReview: (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    };
    reviewsStore.unshift(newReview);
    return newReview;
  },
  moderateReview: (id: string, status: 'APPROVED' | 'REJECTED') => {
    const rev = reviewsStore.find((r) => r.id === id);
    if (rev) rev.status = status;
    return rev;
  },

  // Coupons
  getCoupons: () => couponsStore,
  getCouponByCode: (code: string) => couponsStore.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active),
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newC = { ...coupon, id: `coup-${Date.now()}`, usedCount: 0 };
    couponsStore.push(newC);
    return newC;
  },

  // Dashboard Stats
  getDashboardStats: (): DashboardStats => {
    const totalRevenue = ordersStore
      .filter((o) => o.paymentStatus === 'PAID')
      .reduce((sum, o) => sum + o.total, 0);
    const lowStockCount = productsStore.filter((p) => p.stock <= 10).length;
    const pendingOrdersCount = ordersStore.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;

    return {
      totalOrders: ordersStore.length,
      totalRevenue,
      totalProducts: productsStore.length,
      totalCustomers: usersStore.filter((u) => u.role === 'CUSTOMER').length,
      lowStockCount,
      pendingOrdersCount,
    };
  },

  // Contact messages
  getMessages: () => messagesStore,
  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'UNREAD',
      createdAt: new Date().toISOString(),
    };
    messagesStore.unshift(newMsg);
    return newMsg;
  },
};
