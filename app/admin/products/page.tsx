'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit, Trash2, Search, X, Check, Upload, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const { showToast } = useShop();
  const [products, setProducts] = useState<Product[]>(mockDb.getProducts());
  const categories = mockDb.getCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-skincare');
  const [price, setPrice] = useState<number>(150);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(20);
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [usage, setUsage] = useState('');
  const [featured, setFeatured] = useState<boolean>(true);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(true);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP, etc.)', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file size must be less than 5MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
        showToast('Image file uploaded successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setBrand('Cosmetics Haven Botanicals');
    setCategoryId(categories[0]?.id || 'cat-skincare');
    setPrice(150);
    setDiscountPrice(undefined);
    setStock(20);
    setSku(`CH-PROD-${Math.floor(100 + Math.random() * 900)}`);
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80');
    setIngredients('');
    setUsage('');
    setFeatured(true);
    setIsBestSeller(true);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setPrice(p.price);
    setDiscountPrice(p.discountPrice);
    setStock(p.stock);
    setSku(p.sku);
    setDescription(p.description);
    setImageUrl(p.images[0] || '');
    setIngredients(p.ingredients || '');
    setUsage(p.usage || '');
    setFeatured(p.featured ?? true);
    setIsBestSeller(p.isBestSeller ?? true);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === categoryId);

    if (editingId) {
      mockDb.updateProduct(editingId, {
        name,
        brand,
        categoryId,
        categoryName: catObj?.name,
        price,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock,
        sku,
        description,
        featured,
        isBestSeller,
        images: [imageUrl],
        ingredients,
        usage,
      });
      showToast('Product updated successfully!', 'success');
    } else {
      mockDb.addProduct({
        name,
        brand,
        categoryId,
        categoryName: catObj?.name,
        price,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock,
        sku,
        featured,
        isBestSeller,
        images: [imageUrl],
        description,
        ingredients,
        usage,
        rating: 5.0,
        reviewCount: 1,
      });
      showToast('New product added to catalog!', 'success');
    }

    setProducts([...mockDb.getProducts()]);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      mockDb.deleteProduct(id);
      setProducts([...mockDb.getProducts()]);
      showToast('Product removed', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Product Management</h2>
          <p className="text-stone-600 text-xs">Create, edit, track stock, and update cosmetics catalog.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4 text-stone-950" /> Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/60 transition">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <span className="font-bold text-stone-900 block line-clamp-1">{p.name}</span>
                      <span className="text-[10px] text-stone-500">{p.brand}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-900">{p.sku}</td>
                  <td className="py-3 px-3 font-medium text-stone-700">{p.categoryName || 'General'}</td>
                  <td className="py-3 px-3 font-bold text-stone-900">
                    {formatCurrency(p.discountPrice ?? p.price)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        p.stock <= 10 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 space-y-4 border border-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                {editingId ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Price (GH₵) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Discount Price (GH₵)</label>
                  <input
                    type="number"
                    value={discountPrice || ''}
                    onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              {/* ── Image Selector: Dual Mode (Upload File OR Web URL) ── */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-700 block">Product Image *</label>
                  <div className="flex bg-stone-100 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        imageMode === 'upload'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        imageMode === 'url'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" /> Web Image URL
                    </button>
                  </div>
                </div>

                {imageMode === 'upload' ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      isDragging
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    }`}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: any) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                      };
                      input.click();
                    }}
                  >
                    <Upload className="w-8 h-8 mx-auto text-amber-700 mb-2 opacity-80" />
                    <p className="font-bold text-stone-800 text-xs">
                      Click to choose an image or drag &amp; drop here
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Supports PNG, JPG, WEBP, GIF up to 5MB
                    </p>
                  </div>
                ) : (
                  <input
                    type="text"
                    required={!imageUrl}
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                )}

                {/* Live Image Preview */}
                {imageUrl && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-100 border border-stone-200/80 mt-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-14 h-14 object-cover rounded-xl border border-stone-200 shrink-0 bg-white"
                      onError={() => showToast('Could not load image preview. Please check URL/file.', 'error')}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900 text-xs truncate">Image Loaded</p>
                      <p className="text-[10px] text-stone-500 truncate max-w-full font-mono mt-0.5">
                        {imageUrl.startsWith('data:') ? 'Local file uploaded (Base64)' : imageUrl}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition text-xs font-bold"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 py-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Show on Home (Featured)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Show on Home (Best Seller)</span>
                </label>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Description *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter main product overview..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Ingredients &amp; Formulation</label>
                <textarea
                  rows={2}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. Formulated with organic Ghanaian Baobab Oil, Vitamin C 15%, Niacinamide, and Rosehip Extract..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">How To Use (Application Guide)</label>
                <textarea
                  rows={2}
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  placeholder="e.g. Apply 3-4 drops to cleansed face and neck morning and night..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="gold-gradient-btn px-6 py-2 rounded-xl font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
