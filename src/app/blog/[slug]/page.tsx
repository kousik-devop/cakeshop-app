'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ArrowLeft, Clock, User, Share2, Sparkles, Cake } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const { blogs } = useShop();

  const slug = params?.slug as string;
  const blog = blogs.find((b) => b.slug === slug) || blogs[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <Link href="/blog" className="text-xs text-amber-600 font-bold flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Bakery Blog
      </Link>

      <div className="space-y-4">
        <span className="bg-amber-500 text-amber-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          {blog.category}
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-stone-500 border-b border-amber-100 dark:border-amber-900 pb-4">
          <span className="flex items-center gap-1 font-bold text-stone-800 dark:text-stone-200">
            <User className="w-4 h-4 text-amber-600" /> {blog.author}
          </span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-amber-600" /> {blog.readTime}
          </span>
        </div>
      </div>

      <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-amber-200/80 space-y-6 text-stone-800 dark:text-stone-200 text-sm leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      <div className="glass-card p-6 rounded-3xl border border-amber-300 text-center space-y-3">
        <Cake className="w-8 h-8 text-amber-600 mx-auto" />
        <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100">
          Craving fresh artisan cakes after reading?
        </h3>
        <p className="text-xs text-stone-500">Order from our 3-hour express local bakery menu now!</p>
        <Link href="/collection" className="inline-block px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md">
          Explore Cake Catalog
        </Link>
      </div>
    </div>
  );
}
