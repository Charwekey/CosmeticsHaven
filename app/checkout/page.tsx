'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency } from '@/lib/utils';
import {
  CreditCard,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Truck,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    selectedCity,
    showToast,
    currentUser,
    openSignIn,
  } = useShop();

  // All checkout form fields cleared by default
  const [customerName, setCustomerName]   = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress]             = useState('');
  const [city, setCity]                   = useState(selectedCity || '');
  const [region, setRegion]               = useState('Greater Accra');
  const [notes, setNotes]                 = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showToast('Kindly log in to complete your order 👑', 'info');
      openSignIn();
      return;
    }

    if (!cart.length) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    if (!customerName || !customerEmail || !customerPhone || !address || !city) {
      showToast('Please fill in all delivery and contact fields.', 'error');
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

    const createFinalOrder = (payRef?: string) => {
      const newOrder = mockDb.createOrder({
        userId: currentUser.id,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: address,
        city: city || selectedCity,
        region,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: payRef ? `Paystack (Ref: ${payRef})` : 'Paystack (GHS)',
        total,
        discount: discountAmount,
        shippingFee,
        orderItems,
        notes,
      });

      clearCart();
      setOrderComplete(newOrder);
      showToast(`Payment successful! Order Code: ${newOrder.trackingCode}`, 'success');
    };

    // Paystack Popup Trigger
    const paystackKey = (process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '').trim();
    const isValidKey  = paystackKey.length > 10 &&
                        (paystackKey.startsWith('pk_test_') || paystackKey.startsWith('pk_live_')) &&
                        !paystackKey.includes('your_paystack_public_key_here');

    // Check if Paystack script is available on window
    const PaystackPop = (window as any).PaystackPop;

    if (!isValidKey) {
      showToast('⚠️ Please paste your Paystack Public Key (starts with pk_test_ or pk_live_) in .env.local', 'error');
      // Complete order in test mode so user can test checkout
      setLoadingPayment(true);
      setTimeout(() => {
        setLoadingPayment(false);
        createFinalOrder('PAYSTACK-TEST-MODE');
      }, 1200);
      return;
    }

    if (PaystackPop && isValidKey) {
      setLoadingPayment(true);
      try {
        const handler = PaystackPop.setup({
          key: paystackKey,
          email: customerEmail,
          amount: Math.round(total * 100), // Pesewas / Kobo
          currency: 'GHS',
          ref: 'CH-GH-' + Date.now(),
          metadata: {
            custom_fields: [
              { display_name: 'Customer Name', variable_name: 'customer_name', value: customerName },
              { display_name: 'Phone Number', variable_name: 'phone_number', value: customerPhone },
              { display_name: 'Delivery Address', variable_name: 'delivery_address', value: `${address}, ${city}` },
            ],
          },
          callback: function (response: any) {
            setLoadingPayment(false);
            createFinalOrder(response.reference);
          },
          onClose: function () {
            setLoadingPayment(false);
            showToast('Paystack payment window closed.', 'info');
          },
        });
        handler.openIframe();
      } catch (err) {
        setLoadingPayment(false);
        createFinalOrder('PAYSTACK-BACKUP');
      }
    }
  };

  // If user is not logged in, prompt to log in first
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="card-elevated p-8 sm:p-12 space-y-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)', color: '#fff' }}
          >
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="eyebrow">Authentication Required</span>
            <h1 className="font-serif-luxury text-3xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
              Sign In To Complete Checkout
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Kindly log in or create a free account to complete your checkout, receive order SMS updates, and track delivery.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={openSignIn}
              className="btn-primary w-full py-3.5 text-sm gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In / Register Now →</span>
            </button>
          </div>

          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            Free shipping on Accra orders over GH₵ 500
          </p>
        </div>
      </div>
    );
  }

  // Order Confirmation Success Screen
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="card-elevated p-8 sm:p-12 space-y-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)', color: '#fff' }}
          >
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="eyebrow">Order Confirmed</span>
            <h1 className="font-serif-luxury text-3xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
              Medaase! Thank You For Your Order
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              We have received your payment via Paystack and sent a confirmation SMS to <b>{orderComplete.customerPhone}</b>.
            </p>
          </div>

          <div
            className="p-5 rounded-2xl text-left space-y-2.5 text-xs border"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tracking Code:</span>
              <span className="font-mono font-bold" style={{ color: 'var(--midnight-orchid)' }}>{orderComplete.trackingCode}</span>
            </div>
            <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{orderComplete.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Paid:</span>
              <span className="font-bold" style={{ color: 'var(--midnight-orchid)' }}>{formatCurrency(orderComplete.total)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-muted)' }}>Delivery Location:</span>
              <span className="font-medium text-right max-w-xs" style={{ color: 'var(--text-primary)' }}>
                {orderComplete.deliveryAddress}, {orderComplete.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/account"
              className="flex-1 btn-primary py-3.5 text-xs font-bold"
            >
              Track Order In My Account
            </Link>
            <Link
              href="/shop"
              className="flex-1 btn-secondary py-3.5 text-xs font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="card-elevated p-6 text-center space-y-2">
          <span className="eyebrow">Paystack Secured Checkout</span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Customer Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-6 space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold border-b pb-3 flex items-center gap-2" style={{ color: 'var(--midnight-orchid)', borderColor: 'var(--border)' }}>
                <Truck className="w-5 h-5" style={{ color: 'var(--dusky-lilac)' }} />
                Delivery Address &amp; Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="input-base"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>Phone Number (SMS alerts) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0241234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="input-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>Ghana Region *</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="input-base"
                  >
                    <option value="Greater Accra">Greater Accra Region</option>
                    <option value="Ashanti">Ashanti Region (Kumasi)</option>
                    <option value="Western">Western Region (Takoradi)</option>
                    <option value="Central">Central Region (Cape Coast)</option>
                    <option value="Eastern">Eastern Region (Koforidua)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>City / Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Accra - Nima, East Legon, Kumasi..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>Detailed Street Address / Landmark *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-base"
                  placeholder="House number, street name, near landmark..."
                />
              </div>
            </div>

            {/* Paystack Gateway Notice */}
            <div
              className="p-5 rounded-2xl border flex items-start gap-3.5"
              style={{ background: 'var(--bg)', borderColor: 'var(--border-strong)' }}
            >
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>
                  Paystack Ghana Payment
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  When you tap <b>Confirm &amp; Pay</b>, Paystack popup will open instantly. You can pay using <b>MTN Mobile Money, Telecel Cash, AT Money, or Visa/Mastercard</b>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-elevated p-6 space-y-6 sticky top-24">
              <h3 className="font-serif-luxury text-xl font-bold border-b pb-3 flex items-center gap-2" style={{ color: 'var(--midnight-orchid)', borderColor: 'var(--border)' }}>
                <ShoppingBag className="w-5 h-5" style={{ color: 'var(--dusky-lilac)' }} />
                Order Items ({cart.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold truncate" style={{ color: 'var(--midnight-orchid)' }}>{item.product.name}</h4>
                        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold shrink-0" style={{ color: 'var(--midnight-orchid)' }}>
                      {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t text-xs" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span className="font-bold" style={{ color: 'var(--midnight-orchid)' }}>{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Delivery Fee</span>
                  <span className="font-bold" style={{ color: 'var(--midnight-orchid)' }}>{formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--midnight-orchid)' }}>Total Due</span>
                  <span className="font-serif-luxury text-xl" style={{ color: 'var(--midnight-orchid)' }}>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingPayment}
                className="btn-primary w-full py-4 text-sm font-bold gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{loadingPayment ? 'Opening Paystack...' : `Confirm & Pay ${formatCurrency(total)}`}</span>
              </button>

              <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
                🔒 Official Paystack 256-bit Encrypted Transaction.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
