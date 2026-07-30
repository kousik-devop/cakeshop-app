'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { Category } from '@/types';
import { Tags, Plus, Upload, Trash2, Edit3, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useShop();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [iconName, setIconName] = useState('Cake');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle direct file upload with FileReader preview
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.image);
    setImagePreview(cat.image);
    setIconName(cat.iconName || 'Cake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setImageUrl('');
    setImagePreview('');
    setIconName('Cake');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';

    if (editingId) {
      updateCategory(editingId, {
        name,
        description,
        image: finalImage,
        iconName,
      });
      setSuccessMessage(`Category "${name}" updated successfully!`);
    } else {
      addCategory({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        image: finalImage,
        iconName,
      });
      setSuccessMessage(`Category "${name}" added successfully!`);
    }

    resetForm();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Are you sure you want to delete category "${catName}"?`)) {
      deleteCategory(id);
      setSuccessMessage(`Category "${catName}" deleted.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-amber-100 flex items-center gap-2">
            <Tags className="w-6 h-6 text-amber-500" /> Category Manager
          </h1>
          <p className="text-xs text-stone-400">
            Set custom images, titles, and descriptions for Bakery Categories displayed across the site.
          </p>
        </div>

        <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1.5 rounded-full text-xs self-start sm:self-auto border border-amber-500/40">
          Total Categories: {categories.length}
        </span>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid: Form Left, List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Upload / Edit Form */}
        <div className="lg:col-span-1">
          <div className="glass-card bg-stone-900 p-6 rounded-3xl border border-amber-500/30 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h2 className="font-serif-luxury font-bold text-base text-amber-200 flex items-center gap-2">
                {editingId ? <Edit3 className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-amber-500" />}
                {editingId ? 'Edit Category' : 'Add New Category'}
              </h2>
              {editingId && (
                <button onClick={resetForm} className="text-[11px] text-stone-400 hover:underline">
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-stone-200">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Designer Cakes, Cupcakes..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description for category cards..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Direct Image Upload & URL */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-200">Category Image *</label>

                {/* File input */}
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 cursor-pointer text-amber-300 font-bold transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File from Device</span>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                </label>

                <div className="text-center text-[10px] text-stone-500 font-bold uppercase">— OR —</div>

                {/* URL input */}
                <input
                  type="text"
                  placeholder="Paste Image URL link..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-[11px] focus:outline-none focus:border-amber-400"
                />

                {/* Image Preview Box */}
                {imagePreview && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-amber-500/40 bg-stone-950 mt-2">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                      Live Image Preview
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>{editingId ? 'Update Category' : 'Save Category'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif-luxury font-bold text-lg text-amber-100">Active Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="glass-card bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div className="relative w-full h-40 bg-stone-950">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif-luxury font-bold text-base text-stone-100">{cat.name}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                  <p className="text-stone-400 text-[11px] line-clamp-2">
                    {cat.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
                    <button
                      onClick={() => startEdit(cat)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 font-bold text-stone-200 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Image/Title
                    </button>

                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
