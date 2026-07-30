'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import { Trash2, ShoppingBag, ArrowRight, Tag, MapPin, Sparkles, Check } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    selectedCity,
    setSelectedCity,
    total,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel rounded-3xl p-8 text-center space-y-2 border border-white/90 shadow-md">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Shopping Bag</span>
        <h1 className="font-serif-luxury text-4xl font-bold text-stone-900">Your Cosmetics Haven Cart</h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const price = item.product.discountPrice ?? item.product.price;
              return (
                <div
                  key={item.product.id}
                  className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/80 shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700">
                        {item.product.brand}
                      </span>
                      <h3 className="font-serif-luxury text-base font-bold text-stone-900">
                        {item.product.name}
                      </h3>
                      <span className="text-xs font-bold text-amber-900">
                        {formatCurrency(price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity controls */}
                    <div className="glass-panel rounded-xl flex items-center border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-stone-700 font-bold hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-stone-700 font-bold hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Total item price */}
                    <span className="text-sm font-bold text-stone-900 min-w-20 text-right">
                      {formatCurrency(price * item.quantity)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Delivery Calculator */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-3xl p-6 space-y-6 border border-white/90 shadow-xl">
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 border-b border-stone-200/60 pb-3">
                Order Summary
              </h3>

              {/* Delivery location selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  Select Ghana Delivery Region:
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white/80 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                >
                  <option value="Accra">Accra Central (GH₵ 35.00)</option>
                  <option value="East Legon">East Legon / Cantonments (GH₵ 30.00)</option>
                  <option value="Tema">Tema / Spintex (GH₵ 45.00)</option>
                  <option value="Kumasi">Kumasi (GH₵ 65.00)</option>
                  <option value="Takoradi">Takoradi (GH₵ 75.00)</option>
                </select>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-700" /> Promo / Coupon Code:
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-300">
                    <span>Code Applied: {appliedCoupon.code}</span>
                    <button onClick={removeCoupon} className="text-rose-600 underline text-[11px]">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. HAVEN10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white/80 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none uppercase"
                    />
                    <button type="submit" className="gold-gradient-btn px-4 py-1.5 rounded-xl text-xs font-bold">
                      Apply
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-stone-500">Try coupon <b>HAVEN10</b> for 10% off!</p>
              </div>

              {/* Calculations */}
              <div className="space-y-3 pt-3 border-t border-stone-200/60 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-stone-900">{formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-300">
                  <span>Total Amount</span>
                  <span className="font-serif-luxury text-xl text-amber-950">{formatCurrency(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full gold-gradient-btn py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl space-y-4 max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">Your bag is empty</h3>
          <p className="text-stone-500 text-xs">Discover our luxury skincare and makeup formulations.</p>
          <Link href="/shop" className="gold-gradient-btn px-6 py-3 rounded-xl text-xs font-bold inline-block">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
