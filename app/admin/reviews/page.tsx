'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Review } from '@/lib/types';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';

export default function AdminReviewsPage() {
  const { showToast } = useShop();
  const [reviews, setReviews] = useState<Review[]>(mockDb.getReviews());

  const handleStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    mockDb.moderateReview(id, status);
    setReviews([...mockDb.getReviews()]);
    showToast(`Review marked as ${status}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Review Moderation</h2>
        <p className="text-stone-600 text-xs">Approve or reject customer product testimonials.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-panel rounded-2xl p-5 border border-white/90 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-xs">{rev.userName}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900">
                  {rev.status}
                </span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 text-xs italic">"{rev.comment}"</p>
            </div>

            <div className="flex items-center gap-2">
              {rev.status !== 'APPROVED' && (
                <button
                  onClick={() => handleStatus(rev.id, 'APPROVED')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
              )}
              {rev.status !== 'REJECTED' && (
                <button
                  onClick={() => handleStatus(rev.id, 'REJECTED')}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-rose-700"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
