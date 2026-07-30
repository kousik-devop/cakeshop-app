'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Gift, Clock, Sparkles, Tag, Check, Copy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OffersPage() {
  const { offers, applyCoupon, setIsCartDrawerOpen } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    confetti({ particleCount: 80, spread: 60 });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Special Discounts & Promo Deals
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Bakery Offers & Coupons
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Claim promotional discounts, buy-1-get-free cupcake bundles, and seasonal festival offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`glass-card p-6 sm:p-8 border border-amber-300 dark:border-amber-800 rounded-3xl shadow-xl bg-gradient-to-br ${offer.bannerBg} text-white space-y-6 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <span className="bg-amber-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-yellow-300" /> Active Promo
              </span>
              <span className="text-xs text-yellow-200 font-extrabold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Limited Time
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-yellow-100">
                {offer.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-100 leading-relaxed font-medium">
                {offer.subtitle}
              </p>
            </div>

            {offer.buyPoundsRule && (
              <div className="bg-amber-950/40 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs font-bold space-y-1">
                <p>🎁 {offer.buyPoundsRule}</p>
                {offer.freeCupcakesRule && <p>✨ {offer.freeCupcakesRule}</p>}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="bg-white text-stone-900 px-4 py-2 rounded-xl font-mono font-extrabold text-sm tracking-wider flex items-center gap-2 shadow-md">
                <Tag className="w-4 h-4 text-amber-600" />
                <span>{offer.code}</span>
              </div>

              <button
                onClick={() => handleCopyCode(offer.code)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-4 h-4" /> Applied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy & Apply
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="glass-card p-8 rounded-3xl text-center space-y-4 max-w-3xl mx-auto border border-amber-300/50">
        <Sparkles className="w-10 h-10 text-amber-500 mx-auto animate-spin" />
        <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100">
          Ready to apply your offer and order?
        </h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Explore our artisan cake catalog or design your own custom cake now!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/collection"
            className="px-6 py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md"
          >
            Shop Bakery Collection
          </Link>
          <Link
            href="/custom-cake"
            className="px-6 py-3 rounded-xl border border-amber-400 text-amber-900 dark:text-amber-200 font-bold text-xs hover:bg-amber-400 hover:text-amber-950"
          >
            Custom Cake Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
