'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Package,
  Heart,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ShoppingBag,
  Trash2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { currentUser, wishlist, toggleWishlist, addToCart, showToast } = useShop();

  const [mounted, setMounted] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setUserOrders(mockDb.getOrders());
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      const found = mockDb.getOrderById(trackingInput.trim());
      if (found) {
        setTrackedOrder(found);
        showToast(`Order ${found.trackingCode} retrieved`, 'success');
      } else {
        showToast('No order found with that tracking code', 'error');
      }
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'PENDING': return 1;
      case 'CONFIRMED': return 2;
      case 'PROCESSING': return 3;
      case 'READY': return 4;
      case 'COMPLETED': return 5;
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Bar */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/90 shadow-md">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full gold-gradient-btn flex items-center justify-center font-serif-luxury font-bold text-2xl text-stone-950 shadow-md">
            {currentUser?.name ? currentUser.name.charAt(0) : 'C'}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">Customer Portal</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-stone-900">
              Welcome, {currentUser?.name || 'Valued Client'}
            </h1>
            <p className="text-xs text-stone-500">{currentUser?.email || 'ama.mensah@gmail.com'}</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'gold-gradient-btn text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" /> My Orders ({mounted ? userOrders.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'gold-gradient-btn text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({mounted ? wishlist.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'addresses'
                ? 'gold-gradient-btn text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" /> Addresses
          </button>
        </div>
      </div>

      {/* Track Any Order Form */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/80 space-y-3">
        <h3 className="font-serif-luxury text-lg font-bold text-stone-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-amber-700" /> Track Any Order Status
        </h3>
        <form onSubmit={handleTrack} className="flex gap-2 max-w-lg">
          <input
            type="text"
            placeholder="Enter tracking code (e.g. CH-GH-89201)..."
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            className="flex-1 bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-mono font-semibold focus:outline-none"
          />
          <button type="submit" className="gold-gradient-btn px-5 py-2 rounded-xl text-xs font-bold">
            Lookup
          </button>
        </form>

        {trackedOrder && (
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-xs border-b border-amber-200 pb-2">
              <span className="font-bold text-amber-950">Tracking: {trackedOrder.trackingCode}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                {trackedOrder.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] pt-2">
              {['Pending', 'Confirmed', 'Processing', 'Ready', 'Completed'].map((st, idx) => {
                const currentStep = getStatusStep(trackedOrder.status);
                const isPassed = idx + 1 <= currentStep;
                return (
                  <div key={st} className="space-y-1">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isPassed ? 'bg-amber-600' : 'bg-stone-200'
                      }`}
                    />
                    <span className={`font-semibold ${isPassed ? 'text-amber-900' : 'text-stone-400'}`}>
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Order History</h2>
          <div className="space-y-4">
            {userOrders.map((ord) => (
              <div
                key={ord.id}
                className="glass-panel rounded-2xl p-6 border border-white/90 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-amber-900 text-sm">{ord.trackingCode}</span>
                    <span className="text-stone-500 block">Placed on {formatDate(ord.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                      Status: {ord.status}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">{formatCurrency(ord.total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.orderItems.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-bold text-stone-900">{item.productName}</h4>
                          <span className="text-stone-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-800">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-stone-500">
                  <span>Delivery to: {ord.deliveryAddress}, {ord.city}</span>
                  <span className="font-medium">Method: {ord.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Saved Wishlist Products</h2>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="glass-floating-3d rounded-3xl p-4 flex flex-col justify-between border border-white/90"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif-luxury font-bold text-stone-900 text-sm line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-xs font-bold text-amber-900 block">
                      {formatCurrency(product.discountPrice ?? product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full gold-gradient-btn py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-panel rounded-3xl">
              <p className="text-stone-500 text-sm">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/90">
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Saved Delivery Addresses</h2>
          <div className="p-4 rounded-2xl bg-white/70 border border-stone-200 max-w-md space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase">Primary Residence</span>
            <p className="text-xs font-semibold text-stone-800">House 42, East Legon Residential Area</p>
            <p className="text-xs text-stone-500">Accra • Greater Accra Region, Ghana</p>
            <span className="text-xs text-stone-600 font-mono">+233 24 456 7890</span>
          </div>
        </div>
      )}
    </div>
  );
}
