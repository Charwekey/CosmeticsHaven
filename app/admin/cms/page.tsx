'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Globe, Save } from 'lucide-react';

export default function AdminCmsPage() {
  const { showToast } = useShop();

  const [bannerText, setBannerText] = useState(
    'Free Accra Same-Day Delivery on orders over GH₵ 500 | Code: HAVEN10'
  );
  const [heroTitle, setHeroTitle] = useState('Unveil Your Radiant Haven');
  const [heroSubtitle, setHeroSubtitle] = useState(
    'Formulated specifically for melanin-rich complexions. Sourced with pure Ghanaian Baobab, Grade-A Northern Shea, and haute-couture perfumes.'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('CMS content updated live!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Website CMS Management</h2>
        <p className="text-stone-600 text-xs">Update top announcement bar, homepage tagline, and banners.</p>
      </div>

      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-6">
        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Top Announcement Banner Text *</label>
          <input
            type="text"
            required
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800"
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Homepage Hero Title *</label>
          <input
            type="text"
            required
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 font-serif-luxury text-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-xs text-stone-800">Homepage Hero Subtitle *</label>
          <textarea
            required
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800"
          />
        </div>

        <button type="submit" className="gold-gradient-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
          <Save className="w-4 h-4 text-stone-950" /> Save CMS Changes
        </button>
      </form>
    </div>
  );
}
