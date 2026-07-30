'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { CakeCard } from '@/components/cake/CakeCard';
import {
  Star,
  Heart,
  MessageCircle,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export default function CakeDetailPage() {
  const params = useParams();
  const { cakes, shopSettings, toggleWishlist, isInWishlist } = useShop();

  const cakeId = params?.id as string;
  const cake = cakes.find((c) => c.id === cakeId) || cakes[0];

  const [selectedImage, setSelectedImage] = useState(cake.image);
  const [selectedWeight, setSelectedWeight] = useState(cake.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(cake.flavors[0]);
  const [isEggless, setIsEggless] = useState(cake.isEggless);
  const [customWriting, setCustomWriting] = useState('');
  const [deliveryPin, setDeliveryPin] = useState('');
  const [pinChecked, setPinChecked] = useState(false);

  const discountedPrice = calculateDiscountedPrice(cake.price, cake.discountPercent);
  const isWishlisted = isInWishlist(cake.id);

  // Formats WhatsApp Order URL with all selected parameters
  const handleDirectWhatsAppOrder = () => {
    const msgText = encodeURIComponent(
      `🎂 *NEW CAKE ORDER - ${shopSettings.shopName}*\n\n` +
      `*Cake Name*: ${cake.name}\n` +
      `*Category*: ${cake.category}\n` +
      `*Selected Weight*: ${selectedWeight}\n` +
      `*Selected Flavor*: ${selectedFlavor}\n` +
      `*Eggless*: ${isEggless ? 'Yes 🌱 (100% Eggless)' : 'No'}\n` +
      (customWriting ? `*Custom Writing*: "${customWriting}"\n` : '') +
      `*Price*: ${formatCurrency(discountedPrice, shopSettings.currencySymbol)}\n\n` +
      `Please let me know availability and estimated delivery slot!`
    );

    window.open(`https://wa.me/${shopSettings.whatsappNumber}?text=${msgText}`, '_blank');
  };

  const relatedCakes = cakes.filter((c) => c.category === cake.category && c.id !== cake.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Link href="/collection" className="text-xs text-amber-600 font-bold flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Cake Collection
      </Link>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden glass-card bg-stone-900 shadow-md">
            <img src={selectedImage} alt={cake.name} className="w-full h-full object-cover" />
          </div>

          {cake.gallery && cake.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {cake.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-amber-500 scale-105' : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details & WhatsApp Order Customizer */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {cake.category}
              </span>
              <button
                onClick={() => toggleWishlist(cake)}
                className={`p-2 rounded-full border ${isWishlisted ? 'bg-rose-500 text-white' : 'text-stone-400'}`}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              {cake.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{cake.rating}</span>
              </div>
              <span className="text-xs text-stone-400">({cake.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
            <span className="font-serif-luxury text-3xl font-black text-amber-600 dark:text-amber-400">
              {formatCurrency(discountedPrice, shopSettings.currencySymbol)}
            </span>
            {cake.discountPercent > 0 && (
              <span className="text-stone-400 line-through text-sm">
                {formatCurrency(cake.price, shopSettings.currencySymbol)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {cake.description}
          </p>

          {/* Options Selectors */}
          <div className="space-y-4 text-xs font-bold">
            {/* Weight Picker */}
            <div>
              <label className="block text-stone-900 dark:text-stone-100 mb-1.5">Select Weight:</label>
              <div className="flex flex-wrap gap-2">
                {cake.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      selectedWeight === w
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Picker */}
            <div>
              <label className="block text-stone-900 dark:text-stone-100 mb-1.5">Select Flavor:</label>
              <div className="flex flex-wrap gap-2">
                {cake.flavors.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFlavor(f)}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      selectedFlavor === f
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Eggless Toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="detail-eggless"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="w-4 h-4 accent-emerald-600"
              />
              <label htmlFor="detail-eggless" className="cursor-pointer text-stone-900 dark:text-stone-100">
                100% Eggless Cake (No Eggs) 🌱
              </label>
            </div>

            {/* Custom Writing Field */}
            <div>
              <label className="block text-stone-900 dark:text-stone-100 mb-1.5">Message on Cake (Optional):</label>
              <input
                type="text"
                placeholder="e.g. Happy Birthday Rahul!"
                value={customWriting}
                onChange={(e) => setCustomWriting(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Primary WhatsApp Order Button */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={handleDirectWhatsAppOrder}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Cakes */}
      {relatedCakes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif-luxury font-bold text-2xl text-stone-900 dark:text-stone-100">
            More {cake.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCakes.map((c) => (
              <CakeCard key={c.id} cake={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
