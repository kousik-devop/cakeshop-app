'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewCake, setQuickViewCake, addToCart, toggleWishlist, isInWishlist, shopSettings } = useShop();

  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [customWriting, setCustomWriting] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [pinCode, setPinCode] = useState<string>('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  if (!quickViewCake) return null;

  const currentFlavor = selectedFlavor || quickViewCake.flavors[0];
  const currentWeight = selectedWeight || quickViewCake.weights[0];
  const discountedPrice = calculateDiscountedPrice(quickViewCake.price, quickViewCake.discountPercent);
  const isWishlisted = isInWishlist(quickViewCake.id);

  const handleAddToCart = () => {
    addToCart({
      cake: quickViewCake,
      selectedFlavor: currentFlavor,
      selectedWeight: currentWeight,
      isEggless,
      customWriting,
      quantity,
    });
    setQuickViewCake(null);
  };

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length >= 5) {
      setPinStatus('✅ Express 3-Hour Delivery Available to PIN Code ' + pinCode);
    } else {
      setPinStatus('Please enter a valid 5 or 6 digit PIN code');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${shopSettings.shopName}! I would like to order "${quickViewCake.name}" (${currentWeight}, ${currentFlavor}, Eggless: ${isEggless ? 'Yes' : 'No'}).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl glass-card bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800 shadow-2xl rounded-3xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewCake(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-rose-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Showcase */}
          <div className="relative bg-amber-50 dark:bg-stone-950 p-6 flex flex-col justify-center items-center">
            <img
              src={quickViewCake.image}
              alt={quickViewCake.name}
              className="w-full h-72 sm:h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
            {quickViewCake.tag && (
              <span className="absolute top-8 left-8 bg-amber-500 text-amber-950 text-xs font-extrabold px-3 py-1 rounded-full shadow">
                {quickViewCake.tag}
              </span>
            )}
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Baked Fresh Daily • 100% Organic Butter</span>
            </div>
          </div>

          {/* Right Column: Cake Options */}
          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[85vh]">
            <div>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                {quickViewCake.category}
              </span>
              <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {quickViewCake.name}
              </h2>
              {/* Rating & Wishlist */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{quickViewCake.rating}</span>
                  <span className="text-stone-400 text-xs">({quickViewCake.reviewsCount} reviews)</span>
                </div>
                <button
                  onClick={() => toggleWishlist(quickViewCake)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-500'
                      : 'border-stone-200 text-stone-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif-luxury text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                {formatCurrency(discountedPrice, shopSettings.currencySymbol)}
              </span>
              {quickViewCake.discountPercent > 0 && (
                <>
                  <span className="text-stone-400 line-through text-sm">
                    {formatCurrency(quickViewCake.price, shopSettings.currencySymbol)}
                  </span>
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {quickViewCake.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {quickViewCake.description}
            </p>

            {/* Flavor Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Select Flavor:
              </label>
              <div className="flex flex-wrap gap-2">
                {quickViewCake.flavors.map((flv) => (
                  <button
                    key={flv}
                    onClick={() => setSelectedFlavor(flv)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      currentFlavor === flv
                        ? 'bg-amber-500 text-amber-950 border-amber-500 font-bold'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                    }`}
                  >
                    {flv}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Select Weight:
              </label>
              <div className="flex flex-wrap gap-2">
                {quickViewCake.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      currentWeight === w
                        ? 'bg-amber-500 text-amber-950 border-amber-500 font-bold'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Eggless Option Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="quick-eggless"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
              <label htmlFor="quick-eggless" className="text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                100% Eggless Cake Prep (Soft & Fluffy)
              </label>
            </div>

            {/* Custom Writing on Cake */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Custom Text Piping on Cake:
              </label>
              <input
                type="text"
                placeholder="e.g. Happy 30th Birthday Sarah! ❤️"
                value={customWriting}
                onChange={(e) => setCustomWriting(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* PIN Code Delivery Checker */}
            <form onSubmit={handlePinCheck} className="pt-2">
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Check Delivery by PIN Code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter PIN code (e.g. 10001)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 text-white text-xs font-bold rounded-lg hover:bg-stone-700"
                >
                  Check
                </button>
              </div>
              {pinStatus && <p className="text-[11px] font-semibold text-emerald-600 mt-1">{pinStatus}</p>}
            </form>

            {/* Actions */}
            <div className="space-y-2 pt-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-xl gold-button-gradient font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              <a
                href={`https://wa.me/${shopSettings.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
