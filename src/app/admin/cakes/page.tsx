'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { Cake } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Plus,
  Edit3,
  Trash2,
  Upload,
  CheckCircle,
  Package,
  Sparkles,
  Tag,
  DollarSign,
  Info,
  Loader2,
  CloudUpload,
} from 'lucide-react';

export default function AdminCakesPage() {
  const { cakes, categories, shopSettings, addCake, updateCake, deleteCake } = useShop();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(699);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [category, setCategory] = useState(categories[0]?.name || 'Birthday Cakes');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80');
  const [flavors, setFlavors] = useState('Belgian Dark Chocolate, Dutch Truffle');
  const [weights, setWeights] = useState('0.5 kg, 1 kg, 2 kg');
  const [isEggless, setIsEggless] = useState(true);
  const [tag, setTag] = useState<'Best Seller' | 'New' | 'Trending' | 'Festive' | 'Chef Choice'>('Best Seller');

  const [isAdding, setIsAdding] = useState(false);
  const [editingCakeId, setEditingCakeId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Handle direct file upload via Cloudinary (/api/upload)
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result === 'string') {
        const rawData = reader.result;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: rawData }),
          });
          const json = await res.json();
          if (json.success && json.url) {
            setImage(json.url);
            setUploadSuccess('Image successfully uploaded to Cloudinary!');
            setTimeout(() => setUploadSuccess(''), 3000);
          } else {
            setImage(rawData);
          }
        } catch (err) {
          console.error('Cloudinary upload error:', err);
          setImage(rawData);
        } finally {
          setIsUploading(false);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const cakePayload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      price: Number(price),
      discountPercent: Number(discountPercent),
      category,
      image,
      gallery: [image],
      rating: 5.0,
      reviewsCount: 1,
      flavors: flavors.split(',').map((f) => f.trim()),
      weights: weights.split(',').map((w) => w.trim()),
      isEggless,
      ingredients: ['Premium Flour', 'Butter', 'Fresh Cream', 'Sugar'],
      deliveryTimeHours: 3,
      occasion: 'All Celebrations',
      available: true,
      stockStatus: 'Available' as const,
      inventoryCount: 25,
      tag,
    };

    if (editingCakeId) {
      updateCake(editingCakeId, cakePayload);
      setEditingCakeId(null);
    } else {
      addCake(cakePayload);
    }

    resetForm();
    setIsAdding(false);
  };

  const startEdit = (cake: Cake) => {
    setEditingCakeId(cake.id);
    setName(cake.name);
    setDescription(cake.description);
    setPrice(cake.price);
    setDiscountPercent(cake.discountPercent);
    setCategory(cake.category);
    setImage(cake.image);
    setFlavors(cake.flavors.join(', '));
    setWeights(cake.weights.join(', '));
    setIsEggless(cake.isEggless);
    setTag(cake.tag || 'Best Seller');
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(699);
    setDiscountPercent(10);
    setImage('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80');
    setEditingCakeId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-stone-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-amber-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-500" /> Bakery Cake Catalog Manager
          </h1>
          <p className="text-xs text-stone-400">
            Add, update, or remove cakes. Uploaded images are hosted on Cloudinary.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAdding) {
              setIsAdding(false);
              resetForm();
            } else {
              setIsAdding(true);
            }
          }}
          className="px-5 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          {isAdding ? (
            <span>Close Form</span>
          ) : (
            <>
              <Plus className="w-4 h-4" /> <span>Add New Cake</span>
            </>
          )}
        </button>
      </div>

      {uploadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Add / Edit Form Modal Box */}
      {isAdding && (
        <div className="glass-card bg-stone-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 text-xs animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h2 className="font-serif-luxury text-lg font-bold text-amber-200">
              {editingCakeId ? 'Edit Cake Details' : 'Upload New Cake'}
            </h2>
            <span className="text-[10px] text-stone-400">Cloudinary Media Storage Enabled</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200">Cake Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Belgian Truffle Delight"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-bold focus:outline-none focus:border-amber-400"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Direct Image File Upload to Cloudinary & URL fallback */}
            <div className="space-y-2">
              <label className="block font-bold text-stone-200">Cake Image (Cloudinary Hosted) *</label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 cursor-pointer text-amber-300 font-bold transition-colors">
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <CloudUpload className="w-4 h-4 text-amber-400" />
                      <span>Upload Device Image to Cloudinary</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>

                <input
                  type="text"
                  placeholder="Or paste direct image URL..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Live Preview Card */}
              {image && (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-amber-500/40 bg-stone-950 mt-2">
                  <img src={image} alt="Cake Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-stone-950/80 px-1.5 py-0.5 rounded text-[9px] text-amber-300 font-bold">
                    Live Preview
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Badge / Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-bold"
                >
                  <option value="Best Seller">Best Seller</option>
                  <option value="New">New Arrival</option>
                  <option value="Trending">Trending</option>
                  <option value="Festive">Festive Special</option>
                  <option value="Chef Choice">Chef Choice</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200">Available Flavors (Comma separated)</label>
                <input
                  type="text"
                  value={flavors}
                  onChange={(e) => setFlavors(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Available Weights (Comma separated)</label>
                <input
                  type="text"
                  value={weights}
                  onChange={(e) => setWeights(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-200">Description</label>
              <textarea
                rows={3}
                placeholder="Rich Belgian chocolate layers with crunchy hazelnut praline..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="admin-eggless"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
              <label htmlFor="admin-eggless" className="font-bold text-stone-200 cursor-pointer">
                100% Eggless Cake 🌱
              </label>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  resetForm();
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{editingCakeId ? 'Save Changes' : 'Publish Cake to Menu'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cakes Table List */}
      <div className="glass-card bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-md">
        <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
          <h2 className="font-serif-luxury font-bold text-lg text-amber-100">
            Active Cakes ({cakes.length})
          </h2>
          <span className="text-[11px] text-stone-400">Synced across all devices</span>
        </div>

        {cakes.length === 0 ? (
          <div className="p-12 text-center text-stone-400 space-y-2">
            <Package className="w-12 h-12 text-amber-500/50 mx-auto" />
            <p className="font-bold">No cakes in catalog.</p>
            <p className="text-xs text-stone-500">Click "Add New Cake" above to upload your first cake!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider font-bold border-b border-stone-800">
                <tr>
                  <th className="p-4">Cake Info</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Dietary</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {cakes.map((cake) => (
                  <tr key={cake.id} className="hover:bg-stone-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cake.image}
                          alt={cake.name}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-700 shrink-0"
                        />
                        <div>
                          <span className="font-serif-luxury font-bold text-stone-100 text-sm block">
                            {cake.name}
                          </span>
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {cake.tag || 'Available'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-stone-300 font-medium">{cake.category}</td>

                    <td className="p-4">
                      <span className="font-bold text-amber-400 text-sm">
                        {formatCurrency(cake.price, shopSettings.currencySymbol)}
                      </span>
                    </td>

                    <td className="p-4">
                      {cake.isEggless ? (
                        <span className="text-emerald-400 font-bold">100% Eggless 🌱</span>
                      ) : (
                        <span className="text-stone-400 font-medium">Contains Egg 🥚</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(cake)}
                          className="p-2 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 font-bold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete cake "${cake.name}"?`)) {
                              deleteCake(cake.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
