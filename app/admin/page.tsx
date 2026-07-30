'use client';

import React, { useState } from 'react';
import { mockDb } from '@/lib/db/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = mockDb.getDashboardStats();
  const [orders, setOrders] = useState(mockDb.getOrders());

  const handleStatusChange = (orderId: string, newStatus: any) => {
    const updated = mockDb.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders([...mockDb.getOrders()]);
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 space-y-2 border border-white/90 shadow-md">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Total Revenue</span>
            <DollarSign className="w-5 h-5 p-1 rounded-lg bg-amber-100" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            {formatCurrency(stats.totalRevenue)}
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 space-y-2 border border-white/90 shadow-md">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Total Orders</span>
            <ShoppingBag className="w-5 h-5 p-1 rounded-lg bg-amber-100" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            {stats.totalOrders}
          </h3>
          <span className="text-[10px] text-stone-500 font-medium">{stats.pendingOrdersCount} pending dispatch</span>
        </div>

        <div className="glass-panel rounded-3xl p-5 space-y-2 border border-white/90 shadow-md">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Active Products</span>
            <Package className="w-5 h-5 p-1 rounded-lg bg-amber-100" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            {stats.totalProducts}
          </h3>
          <span className="text-[10px] text-rose-600 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> {stats.lowStockCount} low stock alerts
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 space-y-2 border border-white/90 shadow-md">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Registered Clients</span>
            <Users className="w-5 h-5 p-1 rounded-lg bg-amber-100" />
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            {stats.totalCustomers}
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold">+12 new this week</span>
        </div>
      </div>

      {/* Revenue Trend Chart Visualizer */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Weekly Revenue Trend (Accra Sales)</h3>
          <span className="text-xs font-bold text-amber-800">July 2026</span>
        </div>

        {/* Bar chart representation */}
        <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-stone-200/60">
          {[
            { day: 'Jul 20', val: 1450, h: '40%' },
            { day: 'Jul 22', val: 2100, h: '55%' },
            { day: 'Jul 24', val: 1890, h: '48%' },
            { day: 'Jul 26', val: 3400, h: '80%' },
            { day: 'Jul 28', val: 2950, h: '70%' },
            { day: 'Jul 29', val: 4120, h: '100%' },
          ].map((bar) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-bold text-amber-900 opacity-0 group-hover:opacity-100 transition">
                GH₵ {bar.val}
              </span>
              <div
                style={{ height: bar.h }}
                className="w-full max-w-12 gold-gradient-btn rounded-t-xl shadow-sm transition-all duration-300 group-hover:scale-105"
              />
              <span className="text-[10px] font-semibold text-stone-500">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Stream */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Recent Customer Orders</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-amber-800 hover:underline">
            View All ({orders.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Tracking Code</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/50">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition">
                  <td className="py-3.5 px-3 font-mono font-bold text-amber-900">{ord.trackingCode}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-500">{ord.city}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-stone-700">{ord.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-stone-900">{formatCurrency(ord.total)}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                      className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-[11px] font-medium"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="READY">READY</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
