'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { BookOpen, Clock, User, ArrowRight, Sparkles, Tag } from 'lucide-react';

export default function BlogPage() {
  const { blogs } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Recipes', 'Cake Care', 'Celebration Ideas', 'Wedding Trends'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Bakery Recipes & Celebration Inspiration
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          The Sweet Delight Blog
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Master chef baking secrets, fondant cake care tips, party decoration guides, and luxury wedding cake trends.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex justify-center gap-2 overflow-x-auto text-xs font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-amber-950 border-amber-500 shadow-md'
                : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs.map((b) => (
          <article
            key={b.id}
            className="glass-card bg-white dark:bg-stone-900/90 border border-amber-200/60 dark:border-amber-900/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-4 left-4 bg-amber-500 text-amber-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                {b.category}
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-stone-400 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-600" /> {b.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {b.readTime}
                  </span>
                </div>

                <Link href={`/blog/${b.slug}`}>
                  <h2 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors">
                    {b.title}
                  </h2>
                </Link>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {b.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-semibold">{b.date}</span>
                <Link
                  href={`/blog/${b.slug}`}
                  className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
