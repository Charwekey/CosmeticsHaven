'use client';

import React from 'react';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

export default function AdminReportsPage() {
  const stats = mockDb.getDashboardStats();
  const products = mockDb.getProducts();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Sales & Revenue Reports</h2>
        <p className="text-stone-600 text-xs">Analytics, daily sales trends, and top performing cosmetics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 space-y-2 border border-white/90 shadow-md">
          <span className="text-[10px] uppercase font-bold text-stone-500">Gross Sales</span>
          <h3 className="font-serif-luxury text-3xl font-bold text-amber-950">
            {formatCurrency(stats.totalRevenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-bold">100% Mobile Money & Paystack Settled</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 space-y-2 border border-white/90 shadow-md">
          <span className="text-[10px] uppercase font-bold text-stone-500">Average Order Value</span>
          <h3 className="font-serif-luxury text-3xl font-bold text-stone-900">
            {formatCurrency(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0)}
          </h3>
          <p className="text-[11px] text-stone-500">Across {stats.totalOrders} total completed orders</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 space-y-2 border border-white/90 shadow-md">
          <span className="text-[10px] uppercase font-bold text-stone-500">Top Performing Category</span>
          <h3 className="font-serif-luxury text-2xl font-bold text-amber-900">
            Skincare & Serums
          </h3>
          <p className="text-[11px] text-amber-700 font-semibold">Ghana Gold Vitamin C leads sales</p>
        </div>
      </div>

      {/* Top Products Breakdown */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-4">
        <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Top Performing Products</h3>
        <div className="space-y-3">
          {products.slice(0, 5).map((p, idx) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/60 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="font-bold text-stone-900">{p.name}</span>
              </div>
              <span className="font-bold text-amber-900">{formatCurrency(p.discountPrice ?? p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
