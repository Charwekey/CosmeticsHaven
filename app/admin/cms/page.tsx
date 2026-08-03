'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Save } from 'lucide-react';

export default function AdminCmsPage() {
  const { showToast } = useShop();

  const [bannerText, setBannerText] = useState('');
  const [heroTitle, setHeroTitle]   = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');

  useEffect(() => {
    const cms = mockDb.getCmsSettings();
    setBannerText(cms.bannerText);
    setHeroTitle(cms.heroTitle);
    setHeroSubtitle(cms.heroSubtitle);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.updateCmsSettings({
      bannerText,
      heroTitle,
      heroSubtitle,
    });
    showToast('Website CMS updated live! Homepage refreshed.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Website CMS Management</h2>
        <p className="text-stone-600 text-xs">Update top announcement bar, homepage title, tagline, and banners.</p>
      </div>

      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-6">
        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Top Announcement Banner Text *</label>
          <input
            type="text"
            required
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none"
            placeholder="Announcement bar text..."
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Homepage Hero Title *</label>
          <input
            type="text"
            required
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-sm text-stone-800 font-serif-luxury font-bold focus:outline-none"
            placeholder="Main hero title..."
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Homepage Hero Subtitle *</label>
          <textarea
            required
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none"
            placeholder="Main hero subtitle text..."
          />
        </div>

        <button type="submit" className="gold-gradient-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:scale-102 transition">
          <Save className="w-4 h-4 text-stone-950" /> Save CMS Changes
        </button>
      </form>
    </div>
  );
}
