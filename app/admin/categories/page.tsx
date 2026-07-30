'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Category } from '@/lib/types';
import { Plus, Layers } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { showToast } = useShop();
  const [categories, setCategories] = useState<Category[]>(mockDb.getCategories());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const newCat = mockDb.addCategory({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: description || 'Luxury beauty products',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        productCount: 0,
      });
      setCategories([...mockDb.getCategories()]);
      showToast(`Category ${name} added`, 'success');
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Category Management</h2>
        <p className="text-stone-600 text-xs">Organize skincare, makeup, fragrances, and accessories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="glass-panel rounded-2xl p-4 flex items-center gap-4 border border-white/90 shadow-sm"
              >
                <img src={cat.image} alt={cat.name} className="w-14 h-14 object-cover rounded-xl shadow-xs" />
                <div>
                  <h4 className="font-serif-luxury font-bold text-stone-900 text-base">{cat.name}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{cat.description}</p>
                  <span className="text-[10px] font-bold text-amber-800">{cat.productCount || 5} Products</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Category */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/90 shadow-md space-y-4">
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-700" /> Create Category
          </h3>
          <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                placeholder="e.g. Body Scrubs"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                placeholder="Brief category description..."
              />
            </div>
            <button type="submit" className="w-full gold-gradient-btn py-2.5 rounded-xl font-bold">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
