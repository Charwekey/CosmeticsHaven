'use client';

import React, { useState, use } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency } from '@/lib/utils';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const product = mockDb.getProductById(id) || mockDb.getProducts()[0];

  const [selectedImg, setSelectedImg] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'reviews'>('ingredients');

  // New review state
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const productReviews = mockDb.getReviews(product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName && comment) {
      mockDb.addReview({
        productId: product.id,
        userName: reviewerName,
        rating,
        comment,
      });
      showToast('Thank you! Your review has been published.', 'success');
      setReviewerName('');
      setComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop Collection
        </Link>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-floating-3d rounded-3xl p-4 overflow-hidden border border-white/90 shadow-xl aspect-square flex items-center justify-center">
            <img
              src={selectedImg}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                    selectedImg === img ? 'border-amber-600 scale-105 shadow-md' : 'border-white/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-700">
              {product.brand} • {product.sku}
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 text-sm text-amber-600 pt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount} Reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 pt-2 border-t border-stone-200/60">
            <span className="text-3xl font-bold text-amber-950 font-serif-luxury">
              {formatCurrency(product.discountPrice ?? product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-lg line-through text-stone-400">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-300">
              In Stock ({product.stock} units left)
            </span>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-4 border-t border-stone-200/60">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-stone-700">Quantity:</span>
              <div className="glass-panel rounded-xl flex items-center border border-stone-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 gold-gradient-btn py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Add {quantity} To Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="p-4 rounded-2xl glass-panel border border-white/90 hover:scale-105 transition"
                title="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Delivery & Authentication guarantee */}
          <div className="glass-panel rounded-2xl p-4 space-y-2 border border-white/80 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-700" />
              <span>Free express same-day dispatch for East Legon, Osu & Cantonments.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>100% certified authentic product directly imported or formulated in Ghana.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Ingredients, Usage, Reviews */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-lg">
        <div className="flex gap-4 border-b border-stone-200/60 pb-3">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`text-sm font-bold pb-2 transition ${
              activeTab === 'ingredients'
                ? 'text-amber-800 border-b-2 border-amber-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Ingredients & Formulation
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`text-sm font-bold pb-2 transition ${
              activeTab === 'usage'
                ? 'text-amber-800 border-b-2 border-amber-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            How To Use
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 transition ${
              activeTab === 'reviews'
                ? 'text-amber-800 border-b-2 border-amber-600'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {activeTab === 'ingredients' && (
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-lg text-stone-900">Key Active Ingredients</h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {product.ingredients || 'Formulated with organic Ghanaian Baobab Oil, Vitamin C, Niacinamide, and Rosehip Extract.'}
            </p>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-lg text-stone-900">Application Guide</h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {product.usage || 'Apply gently onto clean skin morning and evening before moisturization.'}
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white/60 space-y-2 border border-stone-200/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-xs">{rev.userName}</span>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 italic">"{rev.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500">No reviews yet for this product. Be the first to leave a review!</p>
              )}
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleReviewSubmit} className="glass-panel p-4 rounded-2xl space-y-3 border border-white">
              <h5 className="font-serif-luxury font-bold text-stone-900 text-sm">Write a Customer Review</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="bg-white/80 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="bg-white/80 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>
              <textarea
                required
                rows={3}
                placeholder="Share your experience with this beauty formulation..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white/80 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <button type="submit" className="gold-gradient-btn px-5 py-2 rounded-xl text-xs font-bold">
                Submit Verified Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
