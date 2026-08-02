'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Users2,
  MessageSquare,
  Tag,
  BarChart3,
  Globe,
  LogOut,
  ShieldCheck,
  Store,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { userRole, currentUser, logout } = useShop();

  // ── Auth Guard ─────────────────────────────────────────────────────────────
  // Skip guard on the login page itself
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage && currentUser !== undefined) {
      if (!currentUser || userRole !== 'ADMIN') {
        router.replace('/admin/login');      // send to staff login
      }
    }
  }, [currentUser, userRole, router, isLoginPage]);

  // While redirecting or on the login page, render just children (the login form)
  if (isLoginPage) return <>{children}</>;

  if (!currentUser || userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center space-y-3">
          <ShieldCheck className="w-12 h-12 mx-auto" style={{ color: 'var(--iris-mist)' }} />
          <p className="font-serif-luxury text-xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
            Admin access required
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Redirecting to login…</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard',        href: '/admin',              icon: LayoutDashboard },
    { name: 'Products',         href: '/admin/products',     icon: Package },
    { name: 'Categories',       href: '/admin/categories',   icon: Layers },
    { name: 'Orders',           href: '/admin/orders',       icon: ShoppingBag },
    { name: 'Customers',        href: '/admin/customers',    icon: Users },
    { name: 'Reviews',          href: '/admin/reviews',      icon: MessageSquare },
    { name: 'Coupons',          href: '/admin/coupons',      icon: Tag },
    { name: 'Reports',          href: '/admin/reports',      icon: BarChart3 },
    { name: 'Website CMS',      href: '/admin/cms',          icon: Globe },
    { name: 'Staff',            href: '/admin/staff',        icon: Users2 },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* ── Top Admin Header Bar ─────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'var(--midnight-orchid)',
          borderBottom: '1px solid rgba(186,170,200,0.2)',
        }}
      >
        {/* Left — brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(215,197,216,0.2)', border: '1px solid rgba(215,197,216,0.3)' }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: 'var(--plum-blossom)' }} />
          </div>
          <div>
            <h1 className="font-serif-luxury text-lg font-bold text-white leading-none">
              Cosmetics Haven
            </h1>
            <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--iris-mist)' }}>
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Right — user info + actions */}
        <div className="flex items-center gap-3">
          {/* Logged-in admin info */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'rgba(215,197,216,0.3)' }}
            >
              {currentUser.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--plum-blossom)' }}>
              {currentUser.name}
            </span>
          </div>

          {/* View Store button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--plum-blossom)', border: '1px solid rgba(215,197,216,0.25)' }}
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Store</span>
          </Link>

          {/* Sign out */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ──────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto flex min-h-[calc(100vh-65px)]">

        {/* Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-56 shrink-0 p-4 space-y-1 border-r sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto"
          style={{ background: '#fff', borderColor: 'var(--border)' }}
        >
          <p className="text-[10px] uppercase font-bold tracking-widest px-3 py-2 mb-1" style={{ color: 'var(--text-muted)' }}>
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon  = item.icon;
            const exact = item.href === '/admin';
            const active = exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={
                  active
                    ? { background: 'var(--midnight-orchid)', color: '#fff' }
                    : { color: 'var(--text-secondary)' }
                }
              >
                <Icon className="w-4 h-4 shrink-0" style={active ? { color: 'var(--plum-blossom)' } : { color: 'var(--dusky-lilac)' }} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Mobile bottom nav */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center gap-1 px-3 py-2 border-t overflow-x-auto"
          style={{ background: '#fff', borderColor: 'var(--border)' }}
        >
          {navItems.map((item) => {
            const Icon  = item.icon;
            const exact = item.href === '/admin';
            const active = exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl min-w-fit text-center transition-all"
                style={active ? { background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' } : { color: 'var(--text-muted)' }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-semibold whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8 space-y-6 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
}
