'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Coupon, Role } from '@/lib/types';
import { INITIAL_USERS } from '@/lib/db/mock-db';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  
  // Coupon & Shipping
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  total: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & Admin Switcher
  currentUser: User | null;
  userRole: Role;
  login: (email: string) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;

  // Toast System
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Quick Search Drawer
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Accra');
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[1]); // Default demo customer
  const [userRole, setUserRole] = useState<Role>('CUSTOMER');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ch_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('ch_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRole = localStorage.getItem('ch_role');
      if (savedRole) setUserRole(savedRole as Role);
    } catch (e) {
      console.error('Storage parse error', e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ch_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ch_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ch_role', userRole);
    } catch (e) {}
  }, [userRole]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Discount calculation
  const discountAmount = appliedCoupon
    ? appliedCoupon.isPercent
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;

  // Ghana shipping rates by city
  const getShippingFee = (city: string) => {
    switch (city.toLowerCase()) {
      case 'accra':
        return 35;
      case 'east legon':
      case 'cantonments':
      case 'osu':
        return 30;
      case 'tema':
        return 45;
      case 'kumasi':
        return 65;
      case 'takoradi':
        return 75;
      default:
        return 50;
    }
  };

  const shippingFee = cart.length > 0 ? getShippingFee(selectedCity) : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    if (code.toUpperCase() === 'HAVEN10') {
      const coupon: Coupon = {
        id: 'coup-1',
        code: 'HAVEN10',
        discount: 10,
        isPercent: true,
        usageLimit: 500,
        usedCount: 42,
        active: true,
      };
      setAppliedCoupon(coupon);
      showToast('10% discount applied!', 'success');
      return { success: true, message: '10% discount applied successfully' };
    } else if (code.toUpperCase() === 'WELCOMEGH50') {
      const coupon: Coupon = {
        id: 'coup-2',
        code: 'WELCOMEGH50',
        discount: 50,
        isPercent: false,
        usageLimit: 100,
        usedCount: 18,
        active: true,
      };
      setAppliedCoupon(coupon);
      showToast('GH₵ 50 discount applied!', 'success');
      return { success: true, message: 'GH₵ 50 discount applied' };
    }
    showToast('Invalid coupon code', 'error');
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const login = (email: string) => {
    const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setUserRole(user.role);
      showToast(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    // Create new customer mock
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    setUserRole('CUSTOMER');
    showToast('Account created successfully!', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('CUSTOMER');
    showToast('Logged out safely', 'info');
  };

  const switchRole = (role: Role) => {
    setUserRole(role);
    if (role === 'ADMIN') {
      setCurrentUser(INITIAL_USERS[0]); // Admin user
      showToast('Switched to Admin Mode', 'info');
    } else {
      setCurrentUser(INITIAL_USERS[1]); // Customer user
      showToast('Switched to Customer Mode', 'info');
    }
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        selectedCity,
        setSelectedCity,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        userRole,
        login,
        logout,
        switchRole,
        toasts,
        showToast,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
