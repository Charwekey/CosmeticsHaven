'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { MapPin, Phone, Mail, Send, ShieldCheck, CreditCard, Sparkles, Share2, Globe, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to Cosmetics Haven VIP news!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t border-stone-200/60 bg-stone-950 text-stone-300 pt-16 pb-12 relative overflow-hidden">
      {/* Soft Glow Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-gradient-btn flex items-center justify-center font-serif-luxury font-bold text-xl text-stone-900 shadow-lg">
                CH
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-tight text-stone-100 block">
                  Cosmetics Haven
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                  Accra • Ghana
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Accra's premier beauty boutique bringing you world-class skincare, high-pigment cosmetics, pure organic shea treatments, and oriental perfumes tailored for melanin radiance.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Oxford Street, Osu & Lagos Avenue, East Legon, Accra - Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+233 30 200 1122 / +233 24 456 7890 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>hello@cosmeticshaven.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg font-semibold text-amber-200">Categories</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/shop?category=skincare" className="hover:text-amber-300 transition">Skincare</Link></li>
              <li><Link href="/shop?category=makeup" className="hover:text-amber-300 transition">Makeup & Foundation</Link></li>
              <li><Link href="/shop?category=hair-care" className="hover:text-amber-300 transition">Hair Care & Shea Oils</Link></li>
              <li><Link href="/shop?category=fragrances" className="hover:text-amber-300 transition">Oud & Perfumes</Link></li>
              <li><Link href="/shop?category=personal-care" className="hover:text-amber-300 transition">Personal Care</Link></li>
              <li><Link href="/shop?category=beauty-accessories" className="hover:text-amber-300 transition">Brush Sets & Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg font-semibold text-amber-200">Customer Support</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/account" className="hover:text-amber-300 transition">Order Tracking</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300 transition">Store Locator & Maps</Link></li>
              <li><Link href="/about" className="hover:text-amber-300 transition">Our Ghana Story</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Admin Portal</Link></li>
              <li><span className="text-stone-500">Shipping Policy (Accra Same-Day)</span></li>
              <li><span className="text-stone-500">Returns & Exchanges</span></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg font-semibold text-amber-200">VIP Beauty Club</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Subscribe to receive exclusive beauty tips, new product drops, and 10% off your first order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded-lg gold-gradient-btn text-stone-950 hover:scale-105 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-2 flex gap-3 text-stone-400">
              <a href="#" className="p-2 rounded-lg bg-stone-900 hover:text-amber-300 transition"><Globe className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-stone-900 hover:text-amber-300 transition"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-stone-900 hover:text-amber-300 transition"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Cosmetics Haven Ghana Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-400 font-semibold border border-amber-900/30 text-[10px]">
              MTN Mobile Money
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-400 font-semibold border border-amber-900/30 text-[10px]">
              Telecel Cash
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-400 font-semibold border border-amber-900/30 text-[10px]">
              Paystack Ghana
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-400 font-semibold border border-amber-900/30 text-[10px]">
              Visa / Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
