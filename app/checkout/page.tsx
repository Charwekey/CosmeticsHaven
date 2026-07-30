'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency } from '@/lib/utils';
import {
  CreditCard,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, subtotal, discountAmount, shippingFee, total, selectedCity, showToast } = useShop();

  const [customerName, setCustomerName] = useState('Ama Serwaa Mensah');
  const [customerEmail, setCustomerEmail] = useState('ama.mensah@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+233 24 456 7890');
  const [address, setAddress] = useState('House 42, East Legon Residential Area');
  const [region, setRegion] = useState('Greater Accra');
  const [paymentMethod, setPaymentMethod] = useState('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState('0244567890');
  const [notes, setNotes] = useState('');

  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    const orderItems = cart.map((item) => ({
      id: `item-${Date.now()}-${Math.random()}`,
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      quantity: item.quantity,
      price: item.product.discountPrice ?? item.product.price,
    }));

    const newOrder = mockDb.createOrder({
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: address,
      city: selectedCity,
      region,
      status: 'PENDING',
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'UNPAID' : 'PAID',
      paymentMethod,
      total,
      discount: discountAmount,
      shippingFee,
      orderItems,
      notes,
    });

    clearCart();
    setOrderComplete(newOrder);
    showToast(`Order placed! Tracking Code: ${newOrder.trackingCode}`, 'success');
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 space-y-6 border border-white/90 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full gold-gradient-btn flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-stone-950" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Order Confirmed</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-stone-900">Medaase! Thank You For Your Order</h1>
            <p className="text-xs text-stone-600">
              We have received your order and sent a confirmation SMS to <b>{orderComplete.customerPhone}</b>.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left space-y-2 border border-white text-xs">
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">Tracking Code:</span>
              <span className="font-mono font-bold text-amber-900">{orderComplete.trackingCode}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">Payment Method:</span>
              <span className="font-bold text-stone-800">{orderComplete.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">Total Paid:</span>
              <span className="font-bold text-stone-900">{formatCurrency(orderComplete.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="font-medium text-stone-800 text-right max-w-xs">{orderComplete.deliveryAddress}, {orderComplete.city}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href={`/account`}
              className="flex-1 gold-gradient-btn py-3.5 rounded-xl text-xs font-bold shadow hover:scale-102 transition"
            >
              Track Order In My Account
            </Link>
            <Link
              href="/shop"
              className="flex-1 glass-panel py-3.5 rounded-xl text-xs font-semibold text-stone-800 border border-white hover:bg-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel rounded-3xl p-6 text-center space-y-2 border border-white/90 shadow-md">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Secure Checkout</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Customer Info & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Info */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/90 shadow-lg">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 border-b border-stone-200/60 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-700" />
              1. Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Phone Number (SMS alerts) *</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Email Address *</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Ghana Region *</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                >
                  <option value="Greater Accra">Greater Accra Region</option>
                  <option value="Ashanti">Ashanti Region (Kumasi)</option>
                  <option value="Western">Western Region (Takoradi)</option>
                  <option value="Central">Central Region (Cape Coast)</option>
                  <option value="Eastern">Eastern Region (Koforidua)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">City / Area *</label>
                <input
                  type="text"
                  required
                  value={selectedCity}
                  readOnly
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Detailed Street Address / Landmark *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white/80 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-800 focus:outline-none"
                placeholder="House number, street name, near landmark..."
              />
            </div>
          </div>

          {/* Step 2: Payment Options */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/90 shadow-lg">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 border-b border-stone-200/60 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-700" />
              2. Ghana Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'MTN Mobile Money', icon: '📱' },
                { name: 'Telecel Cash', icon: '📲' },
                { name: 'Paystack (Card/Bank)', icon: '💳' },
                { name: 'Cash on Delivery', icon: '💵' },
              ].map((pm) => (
                <div
                  key={pm.name}
                  onClick={() => setPaymentMethod(pm.name)}
                  className={`p-4 rounded-2xl cursor-pointer border transition flex items-center gap-3 ${
                    paymentMethod === pm.name
                      ? 'bg-amber-100/90 border-amber-500 shadow-sm'
                      : 'bg-white/60 border-stone-200 hover:bg-white'
                  }`}
                >
                  <span className="text-xl">{pm.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{pm.name}</h4>
                    <span className="text-[10px] text-stone-500">Instant Verification</span>
                  </div>
                </div>
              ))}
            </div>

            {paymentMethod.includes('Mobile Money') || paymentMethod.includes('Telecel') ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <label className="text-xs font-bold text-stone-800">Enter MoMo Phone Number for Prompt:</label>
                <input
                  type="text"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  placeholder="024XXXXXXX"
                />
                <p className="text-[10px] text-stone-600">
                  You will receive an USSD prompt on your phone to approve payment of <b>{formatCurrency(total)}</b>.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 space-y-6 border border-white/90 shadow-xl sticky top-24">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 border-b border-stone-200/60 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              Order Items ({cart.length})
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 truncate max-w-36">{item.product.name}</h4>
                      <span className="text-stone-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-amber-950">
                    {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-200/60 text-xs">
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
                <span>Delivery Fee</span>
                <span className="font-bold text-stone-900">{formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-3 border-t border-stone-300">
                <span>Total Due</span>
                <span className="font-serif-luxury text-xl text-amber-950">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-btn py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition"
            >
              <Lock className="w-4 h-4 text-stone-950" />
              <span>Confirm & Pay {formatCurrency(total)}</span>
            </button>

            <p className="text-[11px] text-center text-stone-500">
              🔒 Encrypted SSL 256-bit payment transaction.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
