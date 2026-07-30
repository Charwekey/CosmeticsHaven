'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  MapPin,
  ChevronDown,
  LogOut,
  PackageCheck,
  Settings,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    cartCount,
    wishlist,
    setSearchOpen,
    currentUser,
    userRole,
    switchRole,
    logout,
    subtotal,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdminPath = pathname?.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-stone-900 text-amber-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-between items-center px-6 border-b border-amber-900/40">
        <div className="hidden sm:flex items-center gap-2 text-stone-300">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Flagship Boutique: Oxford Street, Osu & East Legon, Accra</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Free Accra Same-Day Delivery on orders over GH₵ 500 | Code: <b>HAVEN10</b></span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="hover:text-amber-300 transition">Store Locator</Link>
          <span className="text-stone-700">|</span>
          <Link href="/account" className="hover:text-amber-300 transition">Track Order</Link>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav className="glass-panel mx-auto my-2 max-w-7xl rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg border border-white/80">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gold-gradient-btn flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <span className="font-serif-luxury font-bold text-xl text-stone-900">CH</span>
          </div>
          <div>
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-stone-900 block leading-none">
              Cosmetics Haven
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold block mt-0.5">
              Accra • Ghana
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        {!isAdminPath && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition hover:text-amber-700 ${
                pathname === '/' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : 'text-stone-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition hover:text-amber-700 ${
                pathname === '/shop' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : 'text-stone-700'
              }`}
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition hover:text-amber-700 ${
                pathname === '/about' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : 'text-stone-700'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition hover:text-amber-700 ${
                pathname === '/contact' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : 'text-stone-700'
              }`}
            >
              Contact
            </Link>
          </div>
        )}

        {/* Action Icons & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-xl text-stone-700 hover:text-amber-800 hover:bg-stone-100/60 transition"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {!isAdminPath && (
            <>
              {/* Wishlist */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-2 rounded-xl text-stone-700 hover:text-amber-800 hover:bg-stone-100/60 transition"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900 text-amber-100 hover:bg-stone-800 transition shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold hidden sm:inline">
                  {cartCount > 0 ? formatCurrency(subtotal) : 'Cart'}
                </span>
                <span className="w-5 h-5 bg-amber-500 text-stone-950 font-bold text-[11px] rounded-full flex items-center justify-center ml-1">
                  {cartCount}
                </span>
              </Link>
            </>
          )}

          {/* Quick Customer <-> Admin Mode Switcher Pill */}
          <div className="hidden lg:flex items-center bg-stone-200/60 rounded-full p-1 border border-stone-300/40">
            <button
              onClick={() => switchRole('CUSTOMER')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                userRole === 'CUSTOMER'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => switchRole('ADMIN')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition flex items-center gap-1 ${
                userRole === 'ADMIN'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Admin Mode
            </button>
          </div>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100/60 transition flex items-center gap-1"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-2xl border border-white/90 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-stone-200/60">
                  <p className="text-xs font-bold text-stone-900 truncate">
                    {currentUser?.name || 'Guest Customer'}
                  </p>
                  <p className="text-[11px] text-stone-500 truncate">{currentUser?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-white/80 transition"
                  >
                    <PackageCheck className="w-4 h-4 text-amber-700" />
                    <span>My Account & Orders</span>
                  </Link>

                  {userRole === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-100/60 transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Admin Management Dashboard</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        switchRole('ADMIN');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-amber-100/60 transition text-left"
                    >
                      <Settings className="w-4 h-4 text-amber-700" />
                      <span>Switch to Admin Mode</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-700 hover:bg-rose-50 transition text-left mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-800 hover:bg-stone-100/60 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel mx-4 rounded-2xl p-4 shadow-xl border border-white/80 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-medium text-stone-800 hover:bg-amber-50"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-medium text-stone-800 hover:bg-amber-50"
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-medium text-stone-800 hover:bg-amber-50"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-medium text-stone-800 hover:bg-amber-50"
          >
            Contact & Maps
          </Link>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-medium text-stone-800 hover:bg-amber-50"
          >
            Order Tracker & Account
          </Link>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Toggle View Mode:</span>
            <button
              onClick={() => {
                switchRole(userRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900 text-amber-300"
            >
              Switch to {userRole === 'ADMIN' ? 'Customer' : 'Admin'} Mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
