'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Coupon } from '@/lib/types';
import { Plus, Tag } from 'lucide-react';

export default function AdminCouponsPage() {
  const { showToast } = useShop();
  const [coupons, setCoupons] = useState<Coupon[]>(mockDb.getCoupons());

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState<number>(15);
  const [isPercent, setIsPercent] = useState(true);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (code) {
      const created = mockDb.addCoupon({
        code: code.toUpperCase(),
        discount,
        isPercent,
        usageLimit: 500,
        active: true,
      });
      setCoupons([...mockDb.getCoupons()]);
      showToast(`Coupon ${code.toUpperCase()} created!`, 'success');
      setCode('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Coupons & Promo Codes</h2>
        <p className="text-stone-600 text-xs">Manage discount codes for online marketing campaigns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="glass-panel rounded-2xl p-4 border border-white/90 shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-amber-900 text-base">{c.code}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-stone-700 font-bold">
                  Discount: {c.isPercent ? `${c.discount}% OFF` : `GH₵ ${c.discount} OFF`}
                </p>
                <span className="text-[10px] text-stone-500 block">Used {c.usedCount} times</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-4">
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-700" /> Create Coupon
          </h3>
          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 uppercase font-mono font-bold"
                placeholder="e.g. SUMMER20"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Discount Amount *</label>
              <input
                type="number"
                required
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Type *</label>
              <select
                value={isPercent ? 'percent' : 'fixed'}
                onChange={(e) => setIsPercent(e.target.value === 'percent')}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
              >
                <option value="percent">Percentage Discount (%)</option>
                <option value="fixed">Fixed Amount Discount (GH₵)</option>
              </select>
            </div>
            <button type="submit" className="w-full gold-gradient-btn py-2.5 rounded-xl font-bold">
              Save Promo Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
