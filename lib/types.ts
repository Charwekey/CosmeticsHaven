export type Role = 'CUSTOMER' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  address?: string;
  city?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand: string;
  categoryId: string;
  categoryName?: string;
  stock: number;
  sku: string;
  featured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  images: string[];
  ingredients?: string;
  usage?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  region: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  total: number;
  discount: number;
  shippingFee: number;
  orderItems: OrderItem[];
  trackingCode: string;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  productName?: string;
  rating: number;
  comment: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  isPercent: boolean;
  expiryDate?: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED';
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  lowStockCount: number;
  pendingOrdersCount: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}
