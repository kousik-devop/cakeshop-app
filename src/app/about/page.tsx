'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Award, Heart, ShieldCheck, Cake, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { shopSettings } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" /> Our Bakery Story
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-stone-100">
          About {shopSettings.shopName}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
          Founded with a passion for luxury confectionery, we combine classic French pastry techniques with modern artistic cake styling to elevate every birthday, wedding, and celebration into a sweet memory.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl glass-card border border-amber-300">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
            alt="Master Chef Baking"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Craftsmanship & Love</span>
          <h2 className="font-serif-luxury text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Handcrafted with Organic Butter & Pure Belgian Cocoa
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Every layer of sponge is baked fresh daily in our stone hearth ovens using 100% grass-fed organic butter, Madagascar bourbon vanilla beans, and single-origin Belgian dark cocoa. We never compromise on quality or rely on artificial pre-mixes.
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs font-bold text-stone-800 dark:text-stone-200">
            <div className="p-4 glass-card rounded-2xl border border-amber-200 flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-600" />
              <span>5-Star Certified Master Bakers</span>
            </div>
            <div className="p-4 glass-card rounded-2xl border border-amber-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>100% Eggless Option Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="glass-card p-8 rounded-3xl border border-amber-200/80 space-y-2">
          <span className="font-serif-luxury text-4xl font-black text-amber-600">50,000+</span>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Cakes Delivered</h4>
          <p className="text-xs text-stone-500">Delighting families across the city</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-amber-200/80 space-y-2">
          <span className="font-serif-luxury text-4xl font-black text-amber-600">4.9 / 5.0</span>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Customer Rating</h4>
          <p className="text-xs text-stone-500">Based on 1,500+ verified customer reviews</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-amber-200/80 space-y-2">
          <span className="font-serif-luxury text-4xl font-black text-amber-600">3-Hour</span>
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Express Delivery</h4>
          <p className="text-xs text-stone-500">Temperature-controlled cake delivery vans</p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-10 rounded-3xl text-center space-y-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300">
        <h3 className="font-serif-luxury text-3xl font-bold text-stone-900 dark:text-stone-100">
          Ready to taste true bakery perfection?
        </h3>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl gold-button-gradient font-extrabold text-sm shadow-xl"
        >
          Explore Cake Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
