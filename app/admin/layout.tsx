'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  MessageSquare,
  Tag,
  BarChart3,
  Globe,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userRole, switchRole } = useShop();

  const navItems = [
    { name: 'Dashboard Stats', href: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Orders Management', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customer Profiles', href: '/admin/customers', icon: Users },
    { name: 'Review Moderation', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Coupons & Discounts', href: '/admin/coupons', icon: Tag },
    { name: 'Sales & Revenue Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Website CMS', href: '/admin/cms', icon: Globe },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="glass-card-dark rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient-btn flex items-center justify-center font-bold text-stone-950">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif-luxury text-2xl font-bold text-amber-100">
              Cosmetics Haven Admin
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
              Management Portal • Accra, Ghana
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => switchRole('CUSTOMER')}
            className="glass-panel px-4 py-2 rounded-xl text-xs font-bold text-stone-900 border border-white hover:bg-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
            <span>Return to Customer View</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-4 border border-white/90 shadow-md space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 px-3 py-1.5 block">
            Navigation Menu
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
                  active
                    ? 'gold-gradient-btn text-stone-950 shadow-sm'
                    : 'text-stone-700 hover:bg-white/80 hover:text-amber-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-stone-950' : 'text-amber-700'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">{children}</main>
      </div>
    </div>
  );
}
