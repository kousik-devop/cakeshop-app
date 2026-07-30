'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export default function AdminBlogsPage() {
  const { blogs, addBlog, deleteBlog } = useShop();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Recipes' | 'Cake Care' | 'Celebration Ideas' | 'Wedding Trends'>('Cake Care');
  const [author, setAuthor] = useState('Master Chef Antoine');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    addBlog({
      title,
      excerpt,
      content,
      category,
      author,
      image,
      readTime: '5 min read',
    });

    setTitle('');
    setExcerpt('');
    setContent('');
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-50 dark:bg-stone-950">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Publish Bakery Blogs & Recipe Articles
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Publish baking tips, cake care advice, and celebration guides.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Publish New Blog Post
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleCreateBlog} className="glass-card p-6 rounded-3xl border border-amber-300 space-y-4 text-xs">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100">
              Article Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="5 Secrets for Moist Sponge Cakes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                >
                  <option value="Recipes">Recipes</option>
                  <option value="Cake Care">Cake Care</option>
                  <option value="Celebration Ideas">Celebration Ideas</option>
                  <option value="Wedding Trends">Wedding Trends</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Feature Image URL</label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Excerpt Summary</label>
              <input
                type="text"
                required
                placeholder="Short 1-2 sentence preview..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Article Body Content</label>
              <textarea
                rows={6}
                required
                placeholder="Write full article here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>

            <button type="submit" className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold shadow-md">
              Publish Post Live
            </button>
          </form>
        )}

        <div className="space-y-4">
          {blogs.map((b) => (
            <div key={b.id} className="glass-card p-5 rounded-2xl border border-amber-200 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img src={b.image} alt={b.title} className="w-16 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">{b.title}</h4>
                  <p className="text-stone-500">{b.category} • By {b.author}</p>
                </div>
              </div>
              <button onClick={() => deleteBlog(b.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
