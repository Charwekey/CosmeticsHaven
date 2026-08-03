'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Product, Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Search, Heart, ShoppingBag, Star, X } from 'lucide-react';
import Link from 'next/link';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceLimit, setPriceLimit] = useState<number>(1000);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCategories(mockDb.getCategories());
    setAllProducts(mockDb.getProducts());
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        p.categoryId === selectedCategory ||
        p.categoryName?.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const currentPrice = p.discountPrice ?? p.price;
      const matchesPrice = currentPrice <= priceLimit;

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      const priceA = a.discountPrice ?? a.price;
      const priceB = b.discountPrice ?? b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [allProducts, selectedCategory, searchQuery, sortBy, priceLimit]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 text-center space-y-3 border border-white/90 shadow-md">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Boutique Catalog
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900">
          Shop Beauty & Skincare
        </h1>
        <p className="text-stone-600 text-sm max-w-lg mx-auto">
          Explore luxury Ghanaian formulations, organic shea balms, haute-couture oud fragrances, and high-pigment cosmetics.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'gold-gradient-btn text-stone-950 shadow-sm'
                : 'bg-white/60 text-stone-700 hover:bg-white'
            }`}
          >
            All Products ({allProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat.slug
                  ? 'gold-gradient-btn text-stone-950 shadow-sm'
                  : 'bg-white/60 text-stone-700 hover:bg-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-800 border border-stone-200 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/70 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 border border-stone-200 focus:outline-none"
          >
            <option value="featured">Sort by Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Tags */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>Active Filters:</span>
          {selectedCategory !== 'all' && (
            <span className="glass-pill px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-amber-900">
              Category: {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer hover:text-rose-600"
                onClick={() => setSelectedCategory('all')}
              />
            </span>
          )}
          {searchQuery && (
            <span className="glass-pill px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-amber-900">
              Search: "{searchQuery}"
              <X
                className="w-3 h-3 cursor-pointer hover:text-rose-600"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {product.discountPrice && (
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-900">
                      SALE
                    </span>
                  )}
                  {product.stock <= 0 ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      OUT OF STOCK
                    </span>
                  ) : (
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-stone-800 bg-white/90">
                      {product.stock} units in stock
                    </span>
                  )}
                </div>

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
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl">
          <p className="text-stone-500 text-base">No cosmetics found matching your filter selection.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 gold-gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Loading shop collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
