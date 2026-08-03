'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Product, Review, Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ShoppingBag,
  Heart,
  Star,
  CheckCircle,
  Sparkles,
  Leaf,
  Droplets,
  Wind,
  Sun,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  skincare:   <Droplets className="w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />,
  makeup:     <Sparkles className="w-4 h-4" style={{ color: '#c084a0' }} />,
  fragrance:  <Wind className="w-4 h-4" style={{ color: '#8878c0' }} />,
  haircare:   <Leaf className="w-4 h-4" style={{ color: '#7aaa7a' }} />,
  body:       <Sun className="w-4 h-4" style={{ color: '#d4996a' }} />,
  wellness:   <Sparkles className="w-4 h-4" style={{ color: 'var(--iris-mist)' }} />,
};

export default function HomePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers'>('featured');
  const [cmsTitle, setCmsTitle] = useState('Unveil Your Radiant Haven');
  const [cmsSubtitle, setCmsSubtitle] = useState("We are Accra's luxury beauty destination — formulated specifically for melanin-rich complexions, deeply rooted in Ghanaian botanical heritage.");

  useEffect(() => {
    setMounted(true);
    setCategories(mockDb.getCategories());
    setProducts(mockDb.getProducts());
    setReviews(mockDb.getReviews().filter((r) => r.status === 'APPROVED'));
    const cms = mockDb.getCmsSettings();
    if (cms.heroTitle) setCmsTitle(cms.heroTitle);
    if (cms.heroSubtitle) setCmsSubtitle(cms.heroSubtitle);
  }, []);

  const featuredProducts = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const displayProducts = activeTab === 'featured' ? featuredProducts : bestSellers;

  return (
    <div className="space-y-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* ═══════════════════════════════════════════════
          HERO — Astra-style contained gradient card
      ════════════════════════════════════════════════ */}
      <section className="pt-6">
        <div className="hero-card p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left — Copy */}
            <div className="space-y-6 animate-fade-up">
              <p className="eyebrow">We craft with purpose</p>

              <h1
                className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight whitespace-pre-line"
                style={{ color: 'var(--midnight-orchid)' }}
              >
                {cmsTitle}
              </h1>

              <p className="text-base leading-relaxed max-w-[28rem]" style={{ color: 'var(--text-secondary)' }}>
                {cmsSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/shop" className="btn-primary text-sm gap-2 px-6 py-3">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="btn-secondary text-sm px-6 py-3">
                  About Us
                </Link>
              </div>

              {/* Stats row — "120+ Projects" style */}
              <div
                className="flex flex-wrap gap-8 pt-4 mt-2 border-t"
                style={{ borderColor: 'rgba(186,170,200,0.4)' }}
              >
                {[
                  { value: '500+', label: 'Products' },
                  { value: '2,500+', label: 'Happy Clients' },
                  { value: '100%', label: 'Authentic' },
                ].map((s) => (
                  <div key={s.label}>
                    <span
                      className="font-serif-luxury text-3xl font-bold block leading-none"
                      style={{ color: 'var(--midnight-orchid)' }}
                    >
                      {s.value}
                    </span>
                    <span className="text-xs font-medium mt-1 block" style={{ color: 'var(--text-muted)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Arch image + floating badge */}
            <div className="relative flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.12s' }}>
              <div className="relative w-full max-w-[360px]">
                {/* The arch */}
                <div className="arch-wrap shadow-2xl" style={{ boxShadow: '0 24px 60px rgba(49,42,68,0.14)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80"
                    alt="Luxury beauty collection"
                  />
                </div>

                {/* Floating badge — like Astra's "Creative Studio" circle */}
                <div
                  className="absolute bottom-8 -left-8 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-2 animate-float"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderColor: 'var(--plum-blossom)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Sparkles className="w-4 h-4 mb-0.5" style={{ color: 'var(--dusky-lilac)' }} />
                  <span className="text-[8px] font-bold uppercase tracking-wider leading-tight" style={{ color: 'var(--midnight-orchid)' }}>
                    Luxury<br />Ghana
                  </span>
                </div>

                {/* Floating product mini-card */}
                <div
                  className="absolute -top-4 -right-4 card px-4 py-3 w-44 hidden sm:block animate-float-alt shadow-lg"
                >
                  <p className="eyebrow text-[9px]">Same-Day</p>
                  <p className="font-serif-luxury font-bold text-sm mt-0.5" style={{ color: 'var(--midnight-orchid)' }}>
                    Accra Delivery
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Orders over GH₵ 500</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORIES — "What We Offer" Astra-style
      ════════════════════════════════════════════════ */}
      <section className="card-elevated px-8 sm:px-10 py-10">

        {/* Section header row — like Astra's "Thoughtful Design / for Modern Brands" */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="eyebrow mb-2">What We Offer</p>
            <h2
              className="font-serif-luxury text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: 'var(--midnight-orchid)' }}
            >
              Thoughtful Beauty<br />
              for <span className="heading-gradient">Every Skin</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We carry curated skincare, cosmetics, fragrances, and wellness products tailored for you.
            </p>
            <Link href="/shop" className="btn-primary text-xs px-5 py-2.5 gap-1.5 shrink-0">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-column service cards — exactly like Astra */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="service-card block group">
              {/* Image area */}
              <div className="relative h-40 overflow-hidden" style={{ background: 'var(--silver-wisteria)' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Icon badge — the colored dot/icon from Astra */}
                <div className="service-icon-badge">
                  {CATEGORY_ICONS[cat.slug] || <Sparkles className="w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />}
                </div>
              </div>

              {/* Text content */}
              <div className="p-4">
                <h4
                  className="font-serif-luxury font-semibold text-base"
                  style={{ color: 'var(--midnight-orchid)' }}
                >
                  {cat.name}
                </h4>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {cat.description}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-3 group-hover:gap-2 transition-all"
                  style={{ color: 'var(--dusky-lilac)' }}
                >
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════════════════ */}
      <section className="space-y-7">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">Handpicked for You</p>
            <h2
              className="font-serif-luxury text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--midnight-orchid)' }}
            >
              Recent <span className="heading-gradient">Favourites</span>
            </h2>
          </div>

          {/* Tab toggle — clean pill style */}
          <div
            className="flex gap-1 p-1 rounded-full"
            style={{ background: 'rgba(215,197,216,0.35)', border: '1px solid var(--border)' }}
          >
            {(['featured', 'bestsellers'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  activeTab === t
                    ? { background: 'var(--midnight-orchid)', color: '#fff', boxShadow: '0 2px 10px rgba(49,42,68,0.22)' }
                    : { color: 'var(--text-secondary)' }
                }
              >
                {t === 'featured' ? 'Featured' : 'Best Sellers'}
              </button>
            ))}
          </div>
        </div>

        {/* Product cards — empty state or grid */}
        {displayProducts.length === 0 ? (
          <div
            className="col-span-4 py-16 text-center rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
          >
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" style={{ color: 'var(--dusky-lilac)' }} />
            <p className="font-serif-luxury text-xl font-semibold" style={{ color: 'var(--midnight-orchid)' }}>No products yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Products added from the admin dashboard will appear here.</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="service-card group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden h-48" style={{ background: 'var(--silver-wisteria)' }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges top-left */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {product.discountPrice && <span className="badge badge-dark">Sale</span>}
                  {product.isBestSeller && <span className="badge badge-orchid">Top Seller</span>}
                  {product.stock <= 0 ? (
                    <span className="badge" style={{ background: '#ef4444', color: '#fff' }}>Out of Stock</span>
                  ) : (
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--midnight-orchid)', fontWeight: 600 }}>
                      {product.stock} units in stock
                    </span>
                  )}
                </div>

                {/* Wishlist top-right */}
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow transition-transform hover:scale-110"
                >
                  <Heart
                    className="w-3.5 h-3.5"
                    style={isInWishlist(product.id)
                      ? { fill: '#be185d', color: '#be185d' }
                      : { color: 'var(--dusky-lilac)' }
                    }
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--dusky-lilac)' }}>
                  {product.brand}
                </p>
                <Link href={`/product/${product.id}`}>
                  <h3
                    className="font-serif-luxury font-bold text-base leading-tight hover:opacity-70 transition-opacity line-clamp-1"
                    style={{ color: 'var(--midnight-orchid)' }}
                  >
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--dusky-lilac)' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>
                    {product.rating}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                </div>

                <div
                  className="flex items-center justify-between mt-auto pt-3 border-t"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div>
                    <span className="font-bold text-sm" style={{ color: 'var(--midnight-orchid)' }}>
                      {formatCurrency(product.discountPrice ?? product.price)}
                    </span>
                    {product.discountPrice && (
                      <span className="text-xs line-through ml-1.5" style={{ color: 'var(--text-muted)' }}>
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)', color: '#fff' }}
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="text-center pt-2">
          <Link href="/shop" className="btn-secondary text-sm px-8 py-3 gap-2 inline-flex items-center">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRAND STORY — Clean dark card
      ════════════════════════════════════════════════ */}
      <section>
        <div
          className="card-dark relative overflow-hidden px-10 sm:px-14 py-12 sm:py-16"
          style={{ background: 'linear-gradient(135deg, var(--midnight-orchid) 0%, #4a3a62 100%)' }}
        >
          {/* Subtle image overlay */}
          <div className="absolute inset-0 hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=60"
              alt="Shea butter"
              className="w-full h-full object-cover object-right opacity-10"
            />
          </div>
          {/* Soft radial gradient accent */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--plum-blossom) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-xl space-y-5">
            <p className="eyebrow" style={{ color: 'var(--iris-mist)' }}>Rooted in Heritage</p>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
              Crafted for African<br />Beauty &amp; Elegance
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--plum-blossom)' }}>
              From raw shea butter handcrafted by women cooperatives in Tamale to
              fine fragrances blended in Accra — we bridge traditional West African botanical
              wisdom with modern cosmetic science.
            </p>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-sm px-6 py-3 mt-2"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(215,197,216,0.5)', color: 'var(--plum-blossom)' }}
            >
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          REVIEWS
      ════════════════════════════════════════════════ */}
      <section className="space-y-7 pb-4">
        <div>
          <p className="eyebrow mb-1">Love From Our Clients</p>
          <h2
            className="font-serif-luxury text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--midnight-orchid)' }}
          >
            What Customers <span className="heading-gradient">Say</span>
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div
            className="col-span-3 py-14 text-center rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
          >
            <Star className="w-8 h-8 mx-auto mb-3 opacity-30" style={{ color: 'var(--dusky-lilac)' }} />
            <p className="font-serif-luxury text-lg font-semibold" style={{ color: 'var(--midnight-orchid)' }}>No reviews yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Customer reviews will appear here after purchases.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="card p-6 space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--dusky-lilac)' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                  "{rev.comment}"
                </p>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--midnight-orchid)' }}>{rev.userName}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Verified Purchaser · Accra</p>
                  </div>
                  <CheckCircle className="w-4 h-4" style={{ color: '#16a34a' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
