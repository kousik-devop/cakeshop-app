'use client';

import React from 'react';
import Link from 'next/link';
import { Cake } from '@/types';
import { useShop } from '@/context/ShopContext';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { Star, Heart, Eye, MessageCircle } from 'lucide-react';

interface CakeCardProps {
  cake: Cake;
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const { setQuickViewCake, toggleWishlist, isInWishlist, shopSettings } = useShop();

  const discountedPrice = calculateDiscountedPrice(cake.price, cake.discountPercent);
  const isWishlisted = isInWishlist(cake.id);

  // Direct WhatsApp Message generator for individual cake
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msgText = encodeURIComponent(
      `🎂 *NEW CAKE INQUIRY / ORDER*\n\n` +
      `*Cake Name*: ${cake.name}\n` +
      `*Category*: ${cake.category}\n` +
      `*Weight*: ${cake.weights[0]}\n` +
      `*Flavor*: ${cake.flavors[0]}\n` +
      `*Eggless*: ${cake.isEggless ? 'Yes 🌱' : 'No'}\n` +
      `*Price*: ${formatCurrency(discountedPrice, shopSettings.currencySymbol)}\n\n` +
      `Please let me know availability and delivery time!`
    );

    window.open(`https://wa.me/${shopSettings.whatsappNumber}?text=${msgText}`, '_blank');
  };

  return (
    <div className="group bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative">
      {/* Image Showcase */}
      <div className="relative overflow-hidden aspect-square bg-amber-50/50 dark:bg-stone-950 cursor-pointer">
        <Link href={`/cake/${cake.id}`}>
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Tag Badge */}
        {cake.tag && (
          <span className="absolute top-2.5 left-2.5 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            {cake.tag}
          </span>
        )}

        {/* Eggless badge */}
        {cake.isEggless && (
          <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Eggless 🌱
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(cake);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full border transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white/90 dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 border-stone-200 hover:text-rose-500'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            onClick={() => setQuickViewCake(cake)}
            className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold text-xs shadow-lg flex items-center gap-1 hover:bg-amber-400 hover:text-stone-950 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-amber-700 dark:text-amber-400 font-bold text-[10px] uppercase tracking-wider">
              {cake.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{cake.rating}</span>
            </div>
          </div>

          <Link href={`/cake/${cake.id}`}>
            <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors line-clamp-1">
              {cake.name}
            </h3>
          </Link>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
            {cake.flavors.join(', ')}
          </p>
        </div>

        {/* Pricing & WhatsApp CTA */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
          <div>
            <span className="font-serif-luxury text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
              {formatCurrency(discountedPrice, shopSettings.currencySymbol)}
            </span>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-transform active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
