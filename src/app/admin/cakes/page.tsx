'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Cake } from '@/types';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon, Check } from 'lucide-react';

export default function AdminCakesPage() {
  const { cakes, addCake, updateCake, deleteCake, categories, shopSettings } = useShop();

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

  // Handle direct file upload from computer/phone
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
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
      flavors: flavors.split(',').map((f) => f.trim()),
      weights: weights.split(',').map((w) => w.trim()),
      rating: 5.0,
      reviewsCount: 1,
      isEggless,
      ingredients: ['Belgian Cocoa', 'Organic Wheat Flour', 'Grass-fed Butter'],
      image,
      gallery: [image],
      deliveryTimeHours: 3,
      tag,
      occasion: 'Celebration',
      seoTitle: name,
      seoDescription: description,
      available: true,
      stockStatus: 'Available' as const,
      inventoryCount: 30,
    };

    if (editingCakeId) {
      updateCake(editingCakeId, cakePayload);
      setEditingCakeId(null);
    } else {
      addCake(cakePayload);
      setIsAdding(false);
    }

    setName('');
    setDescription('');
  };

  const handleEdit = (cake: Cake) => {
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
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-3xl font-extrabold text-amber-100 leading-tight">
              Cake Menu & Upload Manager
            </h1>
            <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
              Upload cake photos, set prices in ₹, and publish live to all website visitors.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCakeId(null);
              setIsAdding(!isAdding);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> {isAdding ? 'Close Form' : 'Add New Cake'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <form onSubmit={handleSubmit} className="glass-card bg-stone-900 p-4 sm:p-6 rounded-3xl border border-amber-500/30 space-y-4 sm:space-y-5 text-xs">
            <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-amber-200">
              {editingCakeId ? 'Edit Cake Entry' : 'Upload & Publish New Cake'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Cake Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Royal Belgian Truffle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cake Image Upload & Live Preview */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
              <label className="block font-bold text-amber-300 text-[11px] sm:text-xs flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-400" /> Upload Cake Photo / Image *
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-center">
                <div className="space-y-2">
                  <label className="cursor-pointer flex flex-col items-center justify-center p-3.5 sm:p-4 border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl bg-stone-900 text-stone-300 transition-colors text-center">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-1" />
                    <span className="font-bold text-[11px] sm:text-xs">Choose Image File from Storage</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 mt-0.5">PNG, JPG, WEBP</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="text-center text-[10px] text-stone-400 font-medium">
                    — OR paste Image URL below —
                  </div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-[11px] sm:text-xs text-stone-200"
                  />
                </div>

                {/* Live Image Preview */}
                {image && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-amber-500/50 bg-stone-950">
                    <img src={image} alt="Cake Preview" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <Check className="w-3 h-3" /> Live Image Preview
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Price (₹ INR) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-amber-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Discount %</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Badge Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs sm:text-sm"
                >
                  <option value="Best Seller">Best Seller</option>
                  <option value="New">New</option>
                  <option value="Trending">Trending</option>
                  <option value="Festive">Festive</option>
                  <option value="Chef Choice">Chef Choice</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Flavors (comma separated)</label>
                <input
                  type="text"
                  value={flavors}
                  onChange={(e) => setFlavors(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Weights (comma separated)</label>
                <input
                  type="text"
                  value={weights}
                  onChange={(e) => setWeights(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-200 text-[11px] sm:text-xs">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-xs sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-2 font-bold text-[11px] sm:text-xs">
              <input
                type="checkbox"
                id="eggless"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 shrink-0"
              />
              <label htmlFor="eggless" className="cursor-pointer text-stone-200">100% Eggless Cake Option Available 🌱</label>
            </div>

            <button type="submit" className="w-full py-3 sm:py-3.5 rounded-xl gold-button-gradient font-bold text-xs sm:text-sm shadow-md">
              {editingCakeId ? 'Update Cake' : 'Publish Cake to Website Live'}
            </button>
          </form>
        )}

        {/* Existing Cakes Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cakes.map((c) => {
            const finalPrice = calculateDiscountedPrice(c.price, c.discountPercent);
            return (
              <div
                key={c.id}
                className="glass-card bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="aspect-video rounded-xl overflow-hidden relative border border-stone-700">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    {c.tag && (
                      <span className="absolute top-2 left-2 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                        {c.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-serif-luxury font-bold text-sm sm:text-base text-amber-100 truncate">{c.name}</h4>
                    <p className="text-[10px] sm:text-xs text-stone-400 truncate">{c.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-amber-400 text-xs sm:text-sm">
                        {formatCurrency(finalPrice, shopSettings.currencySymbol)}
                      </span>
                      {c.discountPercent > 0 && (
                        <span className="text-stone-500 line-through text-[10px] sm:text-xs">
                          {formatCurrency(c.price, shopSettings.currencySymbol)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handleEdit(c)}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-[11px] sm:text-xs flex items-center gap-1 hover:bg-amber-500/30"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteCake(c.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-950/60 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
