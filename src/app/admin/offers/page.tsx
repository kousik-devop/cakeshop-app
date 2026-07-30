'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { Plus, Tag, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export default function AdminOffersPage() {
  const { offers, addOffer, toggleOfferStatus } = useShop();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [buyPoundsRule, setBuyPoundsRule] = useState('');
  const [freeCupcakesRule, setFreeCupcakesRule] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    addOffer({
      title,
      subtitle,
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      buyPoundsRule: buyPoundsRule || undefined,
      freeCupcakesRule: freeCupcakesRule || undefined,
      validTill: '2026-12-31T23:59:59Z',
      bannerBg: 'from-amber-600 via-rose-500 to-pink-600',
      isActive: true,
    });

    setTitle('');
    setSubtitle('');
    setCode('');
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-50 dark:bg-stone-950">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Manage Promos, Offers & Banners
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Publish promo codes and countdown offer banners live on the storefront.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Offer
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleCreateOffer} className="glass-card p-6 rounded-3xl border border-amber-300 space-y-4 text-xs">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100">
              Offer Banner Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Offer Title *</label>
                <input
                  type="text"
                  required
                  placeholder="🎉 FESTIVE CUPCAKE SPECIAL"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="FESTIVE25"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Discount Percentage (%)</label>
                <input
                  type="number"
                  required
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Buy Weight Rule (Optional)</label>
                <input
                  type="text"
                  placeholder="Buy 1 kg Cake -> Get 2 FREE Cupcakes"
                  value={buyPoundsRule}
                  onChange={(e) => setBuyPoundsRule(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Free Item Rule (Optional)</label>
                <input
                  type="text"
                  placeholder="Buy 2 kg Cake -> Get 4 FREE Cupcakes"
                  value={freeCupcakesRule}
                  onChange={(e) => setFreeCupcakesRule(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-900 dark:text-stone-100">Offer Subtitle / Banner Text</label>
              <textarea
                rows={2}
                placeholder="Get flat 20% OFF on all customized birthday and wedding cakes..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>

            <button type="submit" className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold shadow-md">
              Publish Offer Banner Live
            </button>
          </form>
        )}

        <div className="space-y-4">
          {offers.map((o) => (
            <div
              key={o.id}
              className={`p-6 rounded-3xl border text-xs space-y-2 ${
                o.isActive
                  ? 'glass-card border-amber-400 bg-white dark:bg-stone-900'
                  : 'bg-stone-100 dark:bg-stone-900 opacity-60 border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest text-[10px]">
                  Coupon Code: {o.code} ({o.discountPercent}% OFF)
                </span>
                <button
                  onClick={() => toggleOfferStatus(o.id)}
                  className="flex items-center gap-1 font-bold text-stone-700 dark:text-stone-300"
                >
                  {o.isActive ? (
                    <>
                      <ToggleRight className="w-5 h-5 text-emerald-600" /> Active Live
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5 text-stone-400" /> Disabled
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100">{o.title}</h3>
              <p className="text-stone-600 dark:text-stone-300">{o.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
