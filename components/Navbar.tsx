'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { AuthModal } from '@/components/AuthModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const { cartCount, wishlist, setSearchOpen, currentUser, userRole, logout, subtotal } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  const isAdminPath = pathname?.startsWith('/admin');
  const isLoggedIn = !!currentUser;

  const openSignIn = () => { setAuthTab('signin'); setAuthModalOpen(true); setMobileMenuOpen(false); };
  const openSignUp = () => { setAuthTab('signup'); setAuthModalOpen(true); setMobileMenuOpen(false); };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full">

        {/* ── Announcement Bar ────────────────────────── */}
        <div
          className="hidden sm:flex items-center justify-between text-xs py-2 px-8"
          style={{ background: 'var(--midnight-orchid)', color: 'var(--plum-blossom)' }}
        >
          <div className="flex items-center gap-2" style={{ color: 'var(--iris-mist)' }}>
            <MapPin className="w-3 h-3" />
            <span>Flagship Boutique: Oxford Street, Osu &amp; East Legon, Accra</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-pulse" style={{ color: 'var(--iris-mist)' }} />
            <span>Free Same-Day Delivery on orders over GH₵ 500 · Code: <strong className="text-white">HAVEN10</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition" style={{ color: 'var(--plum-blossom)' }}>Store Locator</Link>
            <span style={{ color: 'rgba(186,170,200,0.3)' }}>·</span>
            <Link href="/account" className="hover:text-white transition" style={{ color: 'var(--plum-blossom)' }}>Track Order</Link>
          </div>
        </div>

        {/* ── Main Nav — Astra style ──────────────────── */}
        <nav className="nav-glass px-6 sm:px-8 lg:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

            {/* Logo — ✦ Astra style */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Sparkles
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                style={{ color: 'var(--dusky-lilac)' }}
              />
              <div>
                <span
                  className="font-serif-luxury text-xl font-bold tracking-tight block leading-none"
                  style={{ color: 'var(--midnight-orchid)' }}
                >
                  Cosmetics Haven
                </span>
                {!isAdminPath && (
                  <span className="text-[9px] uppercase tracking-widest font-medium block" style={{ color: 'var(--text-muted)' }}>
                    Accra · Ghana
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop center links — exactly like Astra */}
            {!isAdminPath && (
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium relative pb-0.5 transition-colors"
                    style={pathname === href
                      ? { color: 'var(--midnight-orchid)', fontWeight: 700 }
                      : { color: 'var(--text-secondary)' }
                    }
                  >
                    {label}
                    {pathname === href && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'var(--dusky-lilac)' }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl transition-all hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Search className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              </button>

              {/* Wishlist + Cart (customer only) */}
              {!isAdminPath && (
                <>
                  <Link
                    href="/account?tab=wishlist"
                    className="relative p-2 rounded-xl transition-all hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Heart className="w-[18px] h-[18px]" />
                    {wishlist.length > 0 && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                        style={{ background: 'var(--midnight-orchid)' }}
                      >
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)' }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{cartCount > 0 ? formatCurrency(subtotal) : 'Cart'}</span>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]"
                      style={{ background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' }}
                    >
                      {cartCount}
                    </span>
                  </Link>
                </>
              )}

              {/* Auth — Astra "Let's Connect →" style */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border transition-all hover:border-[var(--iris-mist)]"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)' }}
                    >
                      {currentUser.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-xs font-semibold truncate max-w-[70px]" style={{ color: 'var(--text-primary)' }}>
                      {currentUser.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                      style={{ border: '1px solid var(--border)', animation: 'fadeUp 0.18s ease both' }}
                    >
                      <div className="px-4 py-3" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                        <p className="text-xs font-bold truncate" style={{ color: 'var(--midnight-orchid)' }}>{currentUser.name}</p>
                        <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{currentUser.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/account" onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors hover:bg-[var(--bg)]"
                          style={{ color: 'var(--text-secondary)' }}>
                          <PackageCheck className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                          My Account &amp; Orders
                        </Link>
                        {userRole === 'ADMIN' && (
                          <Link href="/admin" onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-[var(--bg)]"
                            style={{ color: 'var(--midnight-orchid)' }}>
                            <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* "Let's Connect" pill — like Astra */
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={openSignIn}
                    className="text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openSignUp}
                    className="btn-primary text-xs px-5 py-2.5 gap-1.5"
                  >
                    Join Free <span>→</span>
                  </button>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl transition hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-4 pb-4"
            style={{ background: 'rgba(250,247,253,0.97)', borderBottom: '1px solid var(--border)', animation: 'fadeUp 0.2s ease both' }}
          >
            <div className="max-w-7xl mx-auto space-y-1 pt-2">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--plum-blossom)]"
                  style={{ color: pathname === href ? 'var(--midnight-orchid)' : 'var(--text-secondary)', fontWeight: pathname === href ? 700 : 500 }}
                >
                  {label}
                </Link>
              ))}
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--plum-blossom)]"
                style={{ color: 'var(--text-secondary)' }}>
                <ShoppingBag className="w-4 h-4" />
                Cart ({cartCount})
              </Link>

              {!isLoggedIn && (
                <div className="flex gap-2 pt-3 border-t mt-2" style={{ borderColor: 'var(--border)' }}>
                  <button onClick={openSignIn} className="flex-1 py-2.5 rounded-full text-xs font-semibold border transition"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--midnight-orchid)' }}>
                    Sign In
                  </button>
                  <button onClick={openSignUp} className="flex-1 btn-primary text-xs py-2.5">
                    Join Free
                  </button>
                </div>
              )}
              {isLoggedIn && (
                <div className="pt-3 border-t mt-2 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs px-1" style={{ color: 'var(--text-muted)' }}>Signed in as <strong style={{ color: 'var(--midnight-orchid)' }}>{currentUser?.name}</strong></p>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl transition">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authTab} />
    </>
  );
};
