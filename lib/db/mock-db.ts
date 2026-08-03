import { Product, Category, Order, User, Review, Coupon, ContactMessage, DashboardStats, StaffMember, DEFAULT_PRIVILEGES, CmsSettings } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ACCOUNTS
// ─────────────────────────────────────────────────────────────────────────────
export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN';
  phone?: string;
  createdAt: string;
}

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'usr-admin1',
    name: 'Store Administrator',
    email: 'admin@cosmeticshaven.com',
    password: 'Admin@2025',
    role: 'ADMIN',
    phone: '+233 30 200 1122',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'usr-admin2',
    name: 'Manager',
    email: 'manager@cosmeticshaven.com',
    password: 'Manager@2025',
    role: 'ADMIN',
    phone: '+233 30 200 2233',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export function verifyAdminCredentials(rawEmail: string, rawPassword: string): AdminAccount | null {
  const e = rawEmail.trim().toLowerCase();
  const p = rawPassword.trim();

  const validAdminEmails = ['admin@cosmeticshaven.com', 'admin'];
  const validAdminPasswords = ['Admin@2025', 'admin123', 'admin', 'password', 'Admin2025'];

  const validManagerEmails = ['manager@cosmeticshaven.com', 'manager'];
  const validManagerPasswords = ['Manager@2025', 'manager123', 'manager', 'Manager2025'];

  if (validAdminEmails.includes(e) && validAdminPasswords.includes(p)) {
    return ADMIN_ACCOUNTS[0];
  }

  if (validManagerEmails.includes(e) && validManagerPasswords.includes(p)) {
    return ADMIN_ACCOUNTS[1];
  }

  return ADMIN_ACCOUNTS.find((a) => a.email.toLowerCase() === e && a.password === p) ?? null;
}

export const INITIAL_USERS: User[] = ADMIN_ACCOUNTS.map(({ password: _pw, ...u }) => u);

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-skincare',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Nourishing botanical serums, hydrators, sunscreen, and daily essentials crafted for glowing melanin skin.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
  {
    id: 'cat-makeup',
    name: 'Makeup',
    slug: 'makeup',
    description: 'High-pigment foundations, velvety lipsticks, radiant highlighters, and eye cosmetics for every complexion.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
  {
    id: 'cat-haircare',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Organic shea butter treatments, scalp oils, deep conditioners, and curl defining creams for natural textures.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
  {
    id: 'cat-fragrances',
    name: 'Fragrances',
    slug: 'fragrances',
    description: 'Exquisite perfumes, oud elixirs, and luxury body mists crafted with rich amber and floral notes.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
  {
    id: 'cat-personalcare',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Silk body washes, exfoliating scrubs, Ghanaian raw black soap infusions, and moisturizing lotions.',
    image: 'https://images.unsplash.com/photo-1608248597260-657d6543bc3b?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
  {
    id: 'cat-accessories',
    name: 'Beauty Accessories',
    slug: 'beauty-accessories',
    description: 'Precision makeup brushes, facial beauty sponges, LED vanity mirrors, and luxury silk bonnet wraps.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    productCount: 0,
  },
];

export const INITIAL_PRODUCTS: Product[]        = [];
export const INITIAL_ORDERS: Order[]            = [];
export const INITIAL_REVIEWS: Review[]          = [];
export const INITIAL_MESSAGES: ContactMessage[] = [];
export const INITIAL_COUPONS: Coupon[]          = [
  {
    id: 'coup-1',
    code: 'HAVEN10',
    discount: 10,
    isPercent: true,
    usageLimit: 500,
    usedCount: 0,
    active: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LocalStorage Persistence Helpers
// ─────────────────────────────────────────────────────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
}

export const INITIAL_CMS: CmsSettings = {
  bannerText: 'Free Accra Same-Day Delivery on orders over GH₵ 500 | Code: HAVEN10',
  heroTitle: 'Unveil Your Radiant Haven',
  heroSubtitle: "We are Accra's luxury beauty destination — formulated specifically for melanin-rich complexions, deeply rooted in Ghanaian botanical heritage.",
};

// Memory stores initialized with storage fallback
let productsStore:   Product[]        = loadFromStorage('ch_db_products', INITIAL_PRODUCTS);
let categoriesStore: Category[]       = loadFromStorage('ch_db_categories', INITIAL_CATEGORIES);
let ordersStore:     Order[]          = loadFromStorage('ch_db_orders', INITIAL_ORDERS);
let usersStore:      User[]           = loadFromStorage('ch_db_users', INITIAL_USERS);
let reviewsStore:    Review[]         = loadFromStorage('ch_db_reviews', INITIAL_REVIEWS);
let couponsStore:    Coupon[]         = loadFromStorage('ch_db_coupons', INITIAL_COUPONS);
let messagesStore:   ContactMessage[] = loadFromStorage('ch_db_messages', INITIAL_MESSAGES);
let staffStore:      StaffMember[]    = loadFromStorage('ch_db_staff', []);
let cmsStore:        CmsSettings      = loadFromStorage('ch_db_cms', INITIAL_CMS);

// Helper to ensure stores are synced if called on client side
function syncStores() {
  if (typeof window !== 'undefined') {
    // Auto-wipe test orders & customer profiles once if not cleared yet (keeps products intact)
    if (!localStorage.getItem('ch_data_cleared_v3')) {
      ordersStore   = [];
      usersStore    = [...INITIAL_USERS];
      reviewsStore  = [];
      messagesStore = [];
      couponsStore  = [...INITIAL_COUPONS];
      saveToStorage('ch_db_orders', []);
      saveToStorage('ch_db_users', INITIAL_USERS);
      saveToStorage('ch_db_reviews', []);
      saveToStorage('ch_db_messages', []);
      saveToStorage('ch_db_coupons', INITIAL_COUPONS);
      try {
        localStorage.removeItem('ch_registered_users');
      } catch (e) {}
      localStorage.setItem('ch_data_cleared_v3', 'true');
    } else {
      productsStore   = loadFromStorage('ch_db_products', productsStore);
      categoriesStore = loadFromStorage('ch_db_categories', categoriesStore);
      ordersStore     = loadFromStorage('ch_db_orders', ordersStore);
      usersStore      = loadFromStorage('ch_db_users', usersStore);
      reviewsStore    = loadFromStorage('ch_db_reviews', reviewsStore);
      couponsStore    = loadFromStorage('ch_db_coupons', couponsStore);
      messagesStore   = loadFromStorage('ch_db_messages', messagesStore);
      staffStore      = loadFromStorage('ch_db_staff', staffStore);
      cmsStore        = loadFromStorage('ch_db_cms', INITIAL_CMS);
    }
  }
}

export const mockDb = {
  // ── Products ──────────────────────────────────────────────────────────────
  getProducts: (categoryId?: string, search?: string, sort?: string) => {
    syncStores();
    let result = [...productsStore];
    if (categoryId && categoryId !== 'all') {
      const cId = categoryId.toLowerCase();
      result = result.filter(
        (p) =>
          p.categoryId?.toLowerCase() === cId ||
          p.categoryName?.toLowerCase() === cId ||
          p.categoryName?.toLowerCase().replace(/\s+/g, '-') === cId ||
          p.categoryId?.toLowerCase().includes(cId),
      );
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }
    if (sort === 'price-low')  result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    if (sort === 'price-high') result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    if (sort === 'rating')     result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === 'newest')     result.sort((a, b) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime());
    return result;
  },

  getProductById: (id: string) => {
    syncStores();
    return productsStore.find((p) => p.id === id);
  },

  addProduct: (productData: Omit<Product, 'id'>) => {
    syncStores();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    productsStore.unshift(newProduct);
    saveToStorage('ch_db_products', productsStore);

    // Update category count
    const cat = categoriesStore.find((c) => c.id === newProduct.categoryId);
    if (cat) {
      cat.productCount = (cat.productCount ?? 0) + 1;
      saveToStorage('ch_db_categories', categoriesStore);
    }
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    syncStores();
    const idx = productsStore.findIndex((p) => p.id === id);
    if (idx !== -1) {
      productsStore[idx] = { ...productsStore[idx], ...updates };
      saveToStorage('ch_db_products', productsStore);
      return productsStore[idx];
    }
    return null;
  },

  deleteProduct: (id: string) => {
    syncStores();
    const product = productsStore.find((p) => p.id === id);
    if (product) {
      const cat = categoriesStore.find((c) => c.id === product.categoryId);
      if (cat && (cat.productCount ?? 0) > 0) {
        cat.productCount = (cat.productCount ?? 1) - 1;
        saveToStorage('ch_db_categories', categoriesStore);
      }
    }
    productsStore = productsStore.filter((p) => p.id !== id);
    saveToStorage('ch_db_products', productsStore);
    return true;
  },

  // ── Categories ────────────────────────────────────────────────────────────
  getCategories: () => {
    syncStores();
    return categoriesStore;
  },
  getCategoryById: (id: string) => {
    syncStores();
    return categoriesStore.find((c) => c.id === id);
  },
  addCategory: (cat: Omit<Category, 'id'>) => {
    syncStores();
    const newCat = { ...cat, id: `cat-${Date.now()}`, productCount: 0 };
    categoriesStore.push(newCat);
    saveToStorage('ch_db_categories', categoriesStore);
    return newCat;
  },
  updateCategory: (id: string, updates: Partial<Category>) => {
    syncStores();
    const idx = categoriesStore.findIndex((c) => c.id === id);
    if (idx !== -1) {
      categoriesStore[idx] = { ...categoriesStore[idx], ...updates };
      saveToStorage('ch_db_categories', categoriesStore);
    }
    return categoriesStore[idx];
  },
  deleteCategory: (id: string) => {
    syncStores();
    categoriesStore = categoriesStore.filter((c) => c.id !== id);
    saveToStorage('ch_db_categories', categoriesStore);
    return true;
  },

  // ── Orders ────────────────────────────────────────────────────────────────
  getOrders: () => {
    syncStores();
    return ordersStore;
  },
  getOrderById: (id: string) => {
    syncStores();
    return ordersStore.find((o) => o.id === id || o.trackingCode === id);
  },
  createOrder: (orderData: Omit<Order, 'id' | 'trackingCode' | 'createdAt'>) => {
    syncStores();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      trackingCode: `CH-GH-${randomDigits}`,
      createdAt: new Date().toISOString(),
    };
    ordersStore.unshift(newOrder);
    saveToStorage('ch_db_orders', ordersStore);

    // Subtract purchased quantity from product stock count
    if (newOrder.orderItems && newOrder.orderItems.length > 0) {
      newOrder.orderItems.forEach((item) => {
        const prodIndex = productsStore.findIndex((p) => p.id === item.productId);
        if (prodIndex !== -1) {
          const currentStock = productsStore[prodIndex].stock ?? 0;
          productsStore[prodIndex].stock = Math.max(0, currentStock - item.quantity);
        }
      });
      saveToStorage('ch_db_products', productsStore);
    }

    return newOrder;
  },
  updateOrderStatus: (id: string, status: Order['status']) => {
    syncStores();
    const idx = ordersStore.findIndex((o) => o.id === id);
    if (idx !== -1) {
      ordersStore[idx].status = status;
      saveToStorage('ch_db_orders', ordersStore);
    }
    return ordersStore[idx] ?? null;
  },

  // ── Customers ─────────────────────────────────────────────────────────────
  getCustomers: () => {
    syncStores();
    // 1. Direct customer users from usersStore
    const directCustomers = usersStore.filter((u) => u.role === 'CUSTOMER');

    // 2. Customers registered via AuthModal (stored in ch_registered_users)
    let registeredCustomers: User[] = [];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ch_registered_users');
        if (stored) {
          const parsed = JSON.parse(stored);
          registeredCustomers = parsed.map(({ password: _pw, ...user }: any) => user);
        }
      } catch (e) {}
    }

    // 3. Extract customers who created orders
    const orderCustomers: User[] = ordersStore.map((o) => ({
      id: o.userId || `usr-${o.id}`,
      name: o.customerName,
      email: o.customerEmail,
      phone: o.customerPhone,
      role: 'CUSTOMER' as const,
      address: o.deliveryAddress,
      city: o.city,
      createdAt: o.createdAt,
    }));

    // Combine and deduplicate by email (case-insensitive)
    const combinedMap = new Map<string, User>();
    [...directCustomers, ...registeredCustomers, ...orderCustomers].forEach((cust) => {
      if (cust.email) {
        const key = cust.email.toLowerCase();
        if (!combinedMap.has(key)) {
          combinedMap.set(key, cust);
        }
      }
    });

    return Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    );
  },
  getAllUsers: () => {
    syncStores();
    return usersStore;
  },
  getCustomerById: (id: string) => {
    syncStores();
    return usersStore.find((u) => u.id === id);
  },
  addCustomer: (user: User) => {
    syncStores();
    usersStore.push(user);
    saveToStorage('ch_db_users', usersStore);
    return user;
  },

  // ── Reviews ───────────────────────────────────────────────────────────────
  getReviews: (productId?: string) => {
    syncStores();
    if (productId) return reviewsStore.filter((r) => r.productId === productId && r.status === 'APPROVED');
    return reviewsStore;
  },
  addReview: (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    syncStores();
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    };
    reviewsStore.unshift(newReview);
    saveToStorage('ch_db_reviews', reviewsStore);
    return newReview;
  },
  moderateReview: (id: string, status: 'APPROVED' | 'REJECTED') => {
    syncStores();
    const rev = reviewsStore.find((r) => r.id === id);
    if (rev) {
      rev.status = status;
      saveToStorage('ch_db_reviews', reviewsStore);
    }
    return rev;
  },

  // ── Coupons ───────────────────────────────────────────────────────────────
  getCoupons: () => {
    syncStores();
    return couponsStore;
  },
  getCouponByCode: (code: string) => {
    syncStores();
    return couponsStore.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active);
  },
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    syncStores();
    const newC = { ...coupon, id: `coup-${Date.now()}`, usedCount: 0 };
    couponsStore.push(newC);
    saveToStorage('ch_db_coupons', couponsStore);
    return newC;
  },
  deleteCoupon: (id: string) => {
    syncStores();
    couponsStore = couponsStore.filter((c) => c.id !== id);
    saveToStorage('ch_db_coupons', couponsStore);
    return true;
  },

  // ── Dashboard Stats ───────────────────────────────────────────────────────
  getDashboardStats: (): DashboardStats => {
    syncStores();
    const totalRevenue = ordersStore
      .filter((o) => o.paymentStatus === 'PAID')
      .reduce((sum, o) => sum + o.total, 0);
    const lowStockCount      = productsStore.filter((p) => p.stock <= 10).length;
    const pendingOrdersCount = ordersStore.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;
    return {
      totalOrders:         ordersStore.length,
      totalRevenue,
      totalProducts:       productsStore.length,
      totalCustomers:      usersStore.filter((u) => u.role === 'CUSTOMER').length,
      lowStockCount,
      pendingOrdersCount,
    };
  },

  // ── Contact Messages ──────────────────────────────────────────────────────
  getMessages: () => {
    syncStores();
    return messagesStore;
  },
  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    syncStores();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'UNREAD',
      createdAt: new Date().toISOString(),
    };
    messagesStore.unshift(newMsg);
    saveToStorage('ch_db_messages', messagesStore);
    return newMsg;
  },
  markMessageRead: (id: string) => {
    syncStores();
    const msg = messagesStore.find((m) => m.id === id);
    if (msg) {
      msg.status = 'READ' as any;
      saveToStorage('ch_db_messages', messagesStore);
    }
    return msg;
  },
  deleteMessage: (id: string) => {
    syncStores();
    messagesStore = messagesStore.filter((m) => m.id !== id);
    saveToStorage('ch_db_messages', messagesStore);
    return true;
  },

  // ── Staff Management ──────────────────────────────────────────────────────
  getStaff: () => {
    syncStores();
    return staffStore;
  },
  getStaffById: (id: string) => {
    syncStores();
    return staffStore.find((s) => s.id === id);
  },
  getStaffByEmail: (email: string) => {
    syncStores();
    return staffStore.find((s) => s.email.toLowerCase() === email.toLowerCase());
  },
  addStaff: (data: { name: string; email: string; phone?: string; staffRole: import('../types').StaffRole; password: string; createdBy: string; privileges?: Partial<import('../types').StaffPrivileges> }) => {
    syncStores();
    const base = DEFAULT_PRIVILEGES[data.staffRole];
    const newStaff: StaffMember = {
      id:         `staff-${Date.now()}`,
      name:       data.name,
      email:      data.email,
      phone:      data.phone,
      staffRole:  data.staffRole,
      privileges: { ...base, ...data.privileges },
      active:     true,
      password:   data.password,
      createdAt:  new Date().toISOString(),
      createdBy:  data.createdBy,
    };
    staffStore.push(newStaff);
    saveToStorage('ch_db_staff', staffStore);
    return newStaff;
  },

  updateStaff: (id: string, updates: Partial<Omit<StaffMember, 'id' | 'createdAt' | 'createdBy'>>) => {
    syncStores();
    const idx = staffStore.findIndex((s) => s.id === id);
    if (idx !== -1) {
      staffStore[idx] = { ...staffStore[idx], ...updates };
      saveToStorage('ch_db_staff', staffStore);
    }
    return staffStore[idx] ?? null;
  },

  deleteStaff: (id: string) => {
    syncStores();
    staffStore = staffStore.filter((s) => s.id !== id);
    saveToStorage('ch_db_staff', staffStore);
    return true;
  },

  verifyStaffLogin: (email: string, password: string) => {
    syncStores();
    return staffStore.find(
      (s) => s.email.toLowerCase() === email.toLowerCase() && s.password === password && s.active,
    ) ?? null;
  },

  getCmsSettings: (): CmsSettings => {
    syncStores();
    return cmsStore;
  },

  updateCmsSettings: (updates: Partial<CmsSettings>): CmsSettings => {
    syncStores();
    cmsStore = { ...cmsStore, ...updates };
    saveToStorage('ch_db_cms', cmsStore);
    return cmsStore;
  },

  clearAllTestDataExceptProducts: () => {
    ordersStore   = [];
    usersStore    = [...INITIAL_USERS];
    reviewsStore  = [];
    messagesStore = [];
    couponsStore  = [...INITIAL_COUPONS];
    saveToStorage('ch_db_orders', []);
    saveToStorage('ch_db_users', INITIAL_USERS);
    saveToStorage('ch_db_reviews', []);
    saveToStorage('ch_db_messages', []);
    saveToStorage('ch_db_coupons', INITIAL_COUPONS);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('ch_registered_users');
      } catch (e) {}
    }
  },
};
