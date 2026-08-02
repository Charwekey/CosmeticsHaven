'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ADMIN_ACCOUNTS, verifyAdminCredentials, mockDb } from '@/lib/db/mock-db';
import { ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, userRole, showToast } = useShop();
  const router = useRouter();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  // Already logged in as admin — go straight to dashboard
  useEffect(() => {
    if (userRole === 'ADMIN') router.replace('/admin');
  }, [userRole, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    // Check admin accounts first (using flexible credential verifier)
    const admin = verifyAdminCredentials(email, password);
    if (admin) {
      login(email, password);
      setLoading(false);
      showToast('Welcome back, Admin! 🛡️', 'success');
      router.push('/admin');
      return;
    }

    // Check staff accounts
    const staff = mockDb.verifyStaffLogin(email.trim(), password.trim());
    if (staff) {
      login(email, password);
      setLoading(false);
      showToast(`Welcome, ${staff.name}!`, 'success');
      router.push('/admin');
      return;
    }

    setLoading(false);
    setError('Invalid credentials. This portal is for authorised staff only.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg, var(--midnight-orchid) 0%, #4a3a62 55%, #2a2038 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--plum-blossom) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--iris-mist) 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-7">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto"
              style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)' }}>
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                <span className="eyebrow">Staff Portal</span>
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
              </div>
              <h1 className="font-serif-luxury text-3xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
                Cosmetics Haven
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Admin &amp; Staff Login — Authorised Personnel Only
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold" style={{ color: 'var(--midnight-orchid)' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your staff email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold" style={{ color: 'var(--midnight-orchid)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base"
                  style={{ paddingRight: '2.75rem' }}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-60 transition"
                  style={{ color: 'var(--dusky-lilac)' }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl px-4 py-3 text-xs font-medium border"
                style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 gap-2 disabled:opacity-60" style={{ marginTop: '0.5rem' }}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In to Dashboard'
              }
            </button>
          </form>
        </div>

        {/* Back to store link */}
        <div className="text-center mt-5">
          <a href="/" className="text-xs font-medium hover:opacity-80 transition" style={{ color: 'var(--plum-blossom)' }}>
            ← Back to the Store
          </a>
        </div>
      </div>
    </div>
  );
}
