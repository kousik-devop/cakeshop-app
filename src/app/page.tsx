'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { CakeCard } from '@/components/cake/CakeCard';
import { AICakeRecommender } from '@/components/widgets/AICakeRecommender';
import {
  Sparkles,
  ShoppingBag,
  MessageCircle,
  PhoneCall,
  Clock,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const { shopSettings, categories, cakes, reviews } = useShop();

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = shopSettings.heroSliderImages.length
    ? shopSettings.heroSliderImages
    : [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1400&q=80',
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const whatsappHeroMsg = encodeURIComponent(
    `Hello ${shopSettings.shopName}! I would like to choose a fresh cake for my celebration.`
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-hidden">
      {/* 1. Hero Section (WhatsApp Order Focus) */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <img src={img} alt="Hero Cake Visual" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-stone-950/75 sm:bg-gradient-to-r sm:from-stone-950/90 sm:via-stone-950/75 sm:to-stone-950/30" />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-white text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>Direct WhatsApp Bakery</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-6xl font-extrabold tracking-tight leading-tight text-stone-50">
              Choose Your Cake <span className="gold-gradient-text">Order Directly</span> via WhatsApp
            </h1>

            <p className="text-stone-200 text-sm sm:text-lg leading-relaxed max-w-xl font-medium">
              Browse customized cakes for birthdays, anniversaries, and weddings. Select your flavor, weight, and custom writing, then send directly to our WhatsApp!
            </p>

            {/* Action Buttons Grid */}
            <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4">
              <Link
                href="/collection"
                className="py-3 px-4 rounded-xl gold-button-gradient font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Choose Cake
              </Link>

              <a
                href={`https://wa.me/${shopSettings.whatsappNumber}?text=${whatsappHeroMsg}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              <a
                href={`tel:${shopSettings.contactPhone}`}
                className="py-3 px-4 rounded-xl bg-stone-900/80 border border-amber-500/50 text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" /> Call Bakery
              </a>
            </div>

            {/* Highlights */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap justify-center sm:justify-start gap-4 text-[11px] text-amber-200/90 font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% Fresh & Eggless Available
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> Fast Local Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories (Mobile Grid) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            Handcrafted Daily
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
            Explore Bakery Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collection?category=${encodeURIComponent(cat.name)}`}
              className="group glass-card bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 rounded-2xl overflow-hidden p-2.5 sm:p-3 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif-luxury font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. AI Cake Recommender */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <AICakeRecommender />
      </div>

      {/* 4. Featured Cakes Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Fresh Oven Bakes
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
              Choose Your Favorite Cake
            </h2>
          </div>
          <Link
            href="/collection"
            className="px-3.5 py-2 rounded-xl border border-amber-400 text-stone-900 dark:text-amber-200 font-bold text-xs hover:bg-amber-400 shrink-0"
          >
            View All ({cakes.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cakes.slice(0, 8).map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8">
        <div className="glass-card bg-white dark:bg-stone-900 border border-amber-200/80 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-sm">
          <Quote className="w-10 h-10 text-amber-500 mx-auto opacity-50" />
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Happy Customer Reviews
          </h2>
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <p className="font-serif-luxury italic text-sm sm:text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto">
            "{reviews[0]?.comment || 'The Belgian Truffle cake was absolute heaven! Ordered on WhatsApp and received it within 3 hours.'}"
          </p>
          <p className="font-bold text-xs text-amber-700 dark:text-amber-400">
            — {reviews[0]?.customerName || 'Sophia Reynolds'}
          </p>
        </div>
      </section>
    </div>
  );
}
