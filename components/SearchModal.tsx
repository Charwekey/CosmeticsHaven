'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setResults(mockDb.getProducts(undefined, query));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-900/40 backdrop-blur-md">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-white/80 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200/50">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-amber-700" />
            <input
              type="text"
              autoFocus
              placeholder="Search lipstick, vitamin C serum, shea butter, oud..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-stone-800 placeholder-stone-400 text-lg outline-none font-medium"
            />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200/50 text-stone-500 hover:text-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="py-6">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Vitamin C Serum', 'Liquid Lipstick', 'Shea Butter', 'Oud Parfum', 'Foundation', 'Black Soap'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100/80 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition border border-stone-200/60"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto py-4 space-y-3">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/50 hover:bg-white/90 transition border border-stone-100 group"
                >
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 flex-1"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <h4 className="text-stone-800 font-semibold text-sm group-hover:text-amber-800 transition">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500">{product.brand}</p>
                      <span className="text-xs font-bold text-amber-700">
                        {formatCurrency(product.discountPrice ?? product.price)}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-stone-500 text-sm">No products found matching "{query}"</p>
            )}
          </div>
        )}

        {query && results.length > 0 && (
          <div className="pt-3 border-t border-stone-200/50 flex justify-end">
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={() => setSearchOpen(false)}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              View all results ({results.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
