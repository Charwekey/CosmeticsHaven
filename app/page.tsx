'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency } from '@/lib/utils';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const categories = mockDb.getCategories();
  const featuredProducts = mockDb.getProducts().filter((p) => p.featured);
  const bestSellers = mockDb.getProducts().filter((p) => p.isBestSeller);
  const reviews = mockDb.getReviews().filter((r) => r.status === 'APPROVED');

  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers'>('featured');

  const displayProducts = activeTab === 'featured' ? featuredProducts : bestSellers;

  return (
    <div className="space-y-20 pb-16">
      {/* ================= HERO SECTION (Recreating Reference Image 1 & 2 Aesthetic) ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 px-4 overflow-hidden">
        {/* Soft Ambient Background Geometry & Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5c36515_1px,transparent_1px),linear-gradient(to_bottom,#e5c36515_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/30 via-stone-200/40 to-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-amber-900 border border-amber-300/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Accra's #1 Luxury Beauty Destination</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1]">
              Unveil Your <br />
              <span className="gold-text-gradient italic">Radiant Haven</span>
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Formulated specifically for melanin-rich complexions. Sourced with pure Ghanaian Baobab, Grade-A Northern Shea, and haute-couture perfumes.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="gold-gradient-btn px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition"
              >
                <span>Shop Full Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="glass-panel px-7 py-4 rounded-2xl text-sm font-semibold text-stone-800 border border-white/90 hover:bg-white/80 transition"
              >
                Discover Our Story
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200/60 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-stone-900 block">100%</span>
                <span className="text-xs text-stone-500 font-medium">Authentic & Botanical</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-stone-900 block">Same-Day</span>
                <span className="text-xs text-stone-500 font-medium">Accra Express Delivery</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-stone-900 block">4.9 ★</span>
                <span className="text-xs text-stone-500 font-medium">Over 2,500 Reviews</span>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Floating Glass Display (Exact look of provided screenshot) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px]">
            {/* Background 3D Pill Badge Top Right */}
            <div className="absolute top-0 right-4 z-20 glass-pill px-4 py-2 rounded-full text-xs font-bold text-stone-800 border border-white shadow-md">
              GH₵ Express • Accra
            </div>

            {/* Central Floating Card ("Progria Nova") */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-floating-3d relative z-20 w-full max-w-md rounded-3xl p-8 text-center border border-white/90 shadow-2xl space-y-4"
            >
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
                Signature Collection
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
                Progria Nova
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                Ghana Gold Radiance Vitamin C & Baobab Serum for natural glow and hyperpigmentation defense.
              </p>
              
              <div className="pt-2 flex items-center justify-center gap-3">
                <span className="text-lg font-bold text-amber-800">GH₵ 240.00</span>
                <span className="text-xs line-through text-stone-400">GH₵ 280.00</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => addToCart(featuredProducts[0], 1)}
                  className="gold-gradient-btn px-6 py-3 rounded-xl text-xs font-bold w-full uppercase tracking-wider shadow-md hover:scale-102 transition"
                >
                  Add To Cart
                </button>
              </div>
            </motion.div>

            {/* Top Left Floating Sub-card ("Panlirg") */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-6 left-2 z-10 glass-card-dark p-4 rounded-2xl w-44 shadow-2xl border border-amber-400/30 hidden sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Oud Elixir</p>
              <h4 className="font-serif-luxury text-base font-semibold text-amber-100">Panlirg Gold</h4>
              <p className="text-[11px] text-stone-300">100ml Extrait</p>
            </motion.div>

            {/* Bottom Right Floating Sub-card ("Cedling") */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 right-2 z-30 glass-floating-3d p-4 rounded-2xl w-48 border border-white shadow-xl hidden sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Velvet Matte</p>
              <h4 className="font-serif-luxury text-base font-semibold text-stone-900">Royal Ashanti Red</h4>
              <span className="text-xs font-bold text-amber-800">GH₵ 125.00</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES BAR ================= */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/80 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Accra Same-Day Delivery</h5>
              <p className="text-[11px] text-stone-500">Order by 2pm for express dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">100% Authentic Guarantee</h5>
              <p className="text-[11px] text-stone-500">Directly from verified brands</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Easy Returns & Exchanges</h5>
              <p className="text-[11px] text-stone-500">7-day hassle free policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Mobile Money Ready</h5>
              <p className="text-[11px] text-stone-500">MTN MoMo, Telecel & Paystack</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Curated Selection</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Explore By Category
          </h2>
          <p className="text-stone-600 text-sm">
            Everything you need for a daily ritual of pampering and self-love.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group glass-floating-3d rounded-2xl p-4 text-center border border-white/80 hover:border-amber-400 transition"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 shadow-md group-hover:scale-105 transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif-luxury font-semibold text-stone-900 text-base group-hover:text-amber-800 transition">
                {cat.name}
              </h4>
              <span className="text-[11px] text-stone-500 block mt-0.5">{cat.productCount} Items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED & BESTSELLERS GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Handpicked Essentials</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
              Trending Products
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="glass-panel p-1 rounded-full flex gap-1 border border-stone-200">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                activeTab === 'featured'
                  ? 'gold-gradient-btn text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Featured Selection
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                activeTab === 'bestsellers'
                  ? 'gold-gradient-btn text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="glass-floating-3d rounded-3xl p-4 flex flex-col justify-between border border-white/90 group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-stone-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {product.discountPrice && (
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-900">
                      SALE
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-stone-900/90 backdrop-blur text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      TOP SELLER
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full glass-panel hover:scale-110 transition shadow-sm"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    {product.brand}
                  </span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif-luxury text-lg font-bold text-stone-900 hover:text-amber-800 line-clamp-1 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-800">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount})</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-200/50">
                  <div>
                    <span className="text-sm font-bold text-amber-900 block">
                      {formatCurrency(product.discountPrice ?? product.price)}
                    </span>
                    {product.discountPrice && (
                      <span className="text-[11px] line-through text-stone-400">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="gold-gradient-btn p-2.5 rounded-xl shadow hover:scale-105 transition"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-stone-950" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GHANA BRAND STORY BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-card-dark rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-amber-500/30">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Rooted In Heritage
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-amber-50 leading-tight">
              Crafted for African Beauty & Elegance
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              From pure raw shea butter handcrafted by women co-operatives in Tamale to haute-couture perfumes mixed in Accra, Cosmetics Haven blends traditional West African botanical wisdom with modern cosmetic science.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="gold-gradient-btn px-6 py-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 hidden lg:block pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
              alt="Shea Butter"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= VERIFIED CUSTOMER REVIEWS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Love From Our Clients</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 space-y-4 border border-white/90 shadow-md"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed">
                "{rev.comment}"
              </p>
              <div className="flex items-center justify-between border-t border-stone-200/60 pt-3">
                <div>
                  <h5 className="font-bold text-stone-900 text-xs">{rev.userName}</h5>
                  <span className="text-[10px] text-stone-500">Verified Purchaser • Accra</span>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
