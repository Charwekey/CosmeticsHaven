'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { ADMIN_ACCOUNTS } from '@/lib/db/mock-db';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
  const { login, register, showToast, currentUser } = useShop();
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) { showToast('Please fill in all fields', 'error'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const success = login(signInData.email, signInData.password);
    setLoading(false);
    if (success) {
      onClose();
      // Check if the credentials match an admin account
      const isAdmin = ADMIN_ACCOUNTS.some(
        (a) => a.email.toLowerCase() === signInData.email.toLowerCase() && a.password === signInData.password
      );
      if (isAdmin) {
        showToast('Welcome back, Admin! 🛡️', 'success');
        router.push('/admin');
      } else {
        showToast('Welcome back! 👑', 'success');
        router.push('/');
      }
    } else {
      showToast('Invalid email or password', 'error');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirm } = signUpData;
    if (!name || !email || !phone || !password || !confirm) { showToast('Please fill in all fields', 'error'); return; }
    if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    register(name, email, phone, password);
    setLoading(false);
    showToast(`Welcome to Cosmetics Haven, ${name}! 🌟`, 'success');
    onClose();
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all input-base";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(49, 42, 68, 0.5)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#fff', border: '1px solid var(--border)', animation: 'fadeUp 0.3s ease both' }}
      >
        {/* Header */}
        <div className="relative px-8 pt-7 pb-5" style={{ background: 'var(--midnight-orchid)' }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg transition hover:bg-white/10"
            style={{ color: 'var(--plum-blossom)' }}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-serif-luxury font-bold text-lg"
              style={{ background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' }}
            >
              CH
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-white">Cosmetics Haven</h2>
              <p className="text-xs" style={{ color: 'var(--iris-mist)' }}>Accra's Luxury Beauty Destination</p>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex rounded-xl p-1 gap-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {(['signin', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold transition"
                style={tab === t
                  ? { background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' }
                  : { color: 'var(--iris-mist)' }
                }
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-4">
          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Sign in to track orders, save your wishlist &amp; checkout faster.
              </p>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />
                <input type="email" placeholder="Email address" value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} className={inputClass} />
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} className={`${inputClass} pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
                  style={{ color: 'var(--dusky-lilac)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs font-medium hover:opacity-70 transition" style={{ color: 'var(--dusky-lilac)' }}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 gap-2 disabled:opacity-60">
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <> Sign In <ArrowRight className="w-4 h-4" /></>
                }
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                No account?{' '}
                <button type="button" onClick={() => setTab('signup')}
                  className="font-bold hover:opacity-70 transition" style={{ color: 'var(--midnight-orchid)' }}>
                  Create one free
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Join Cosmetics Haven — free shipping on your first order!
              </p>

              {[
                { IconComp: User, placeholder: 'Full name', type: 'text', key: 'name' },
                { IconComp: Mail, placeholder: 'Email address', type: 'email', key: 'email' },
                { IconComp: Phone, placeholder: 'Phone (e.g. 0241234567)', type: 'tel', key: 'phone' },
              ].map(({ IconComp, placeholder, type, key }) => (
                <div key={key} className="relative">
                  <IconComp className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />
                  <input type={type} placeholder={placeholder}
                    value={(signUpData as any)[key]}
                    onChange={(e) => setSignUpData({ ...signUpData, [key]: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ))}

              {[
                { placeholder: 'Create password (min. 6 chars)', key: 'password' },
                { placeholder: 'Confirm password', key: 'confirm' },
              ].map(({ placeholder, key }) => (
                <div key={key} className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dusky-lilac)' }} />
                  <input type={showPassword ? 'text' : 'password'} placeholder={placeholder}
                    value={(signUpData as any)[key]}
                    onChange={(e) => setSignUpData({ ...signUpData, [key]: e.target.value })}
                    className={`${inputClass} pr-10`}
                  />
                  {key === 'password' && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
                      style={{ color: 'var(--dusky-lilac)' }}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              ))}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 gap-2 disabled:opacity-60">
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <> Create My Account <ArrowRight className="w-4 h-4" /></>
                }
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                Have an account?{' '}
                <button type="button" onClick={() => setTab('signin')}
                  className="font-bold hover:opacity-70 transition" style={{ color: 'var(--midnight-orchid)' }}>
                  Sign in
                </button>
              </p>
              <p className="text-center text-[10px]" style={{ color: 'var(--text-muted)' }}>
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
