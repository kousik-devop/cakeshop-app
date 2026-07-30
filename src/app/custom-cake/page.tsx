'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import {
  Sparkles,
  Upload,
  MessageCircle,
  CheckCircle2,
  Image as ImageIcon,
  Palette,
} from 'lucide-react';

export default function CustomCakePage() {
  const { shopSettings } = useShop();

  const [shape, setShape] = useState('Round');
  const [theme, setTheme] = useState('Birthday');
  const [flavor, setFlavor] = useState('Belgian Chocolate Truffle');
  const [weightKg, setWeightKg] = useState(1.5);
  const [isEggless, setIsEggless] = useState(true);
  const [customWriting, setCustomWriting] = useState('');
  const [refImagePreview, setRefImagePreview] = useState<string | null>(null);

  const handleRefImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setRefImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Estimated price calculator
  const baseRatePerKg = flavor.includes('Truffle') ? 700 : 600;
  const shapeMultiplier = shape === 'Multi-tier Luxury' ? 1.4 : shape === 'Heart' ? 1.1 : 1.0;
  const estimatedPrice = Math.round(weightKg * baseRatePerKg * shapeMultiplier);

  // Send Custom Cake Specifications directly to WhatsApp
  const handleSendCustomCakeToWhatsApp = () => {
    const msgText = encodeURIComponent(
      `🎂 *NEW CUSTOM CAKE DESIGN REQUEST - ${shopSettings.shopName}*\n\n` +
      `*Cake Shape*: ${shape}\n` +
      `*Occasion / Theme*: ${theme}\n` +
      `*Weight*: ${weightKg} kg\n` +
      `*Flavor*: ${flavor}\n` +
      `*Eggless Option*: ${isEggless ? 'Yes 🌱 (100% Eggless)' : 'No'}\n` +
      (customWriting ? `*Custom Writing*: "${customWriting}"\n` : '') +
      `*Estimated Price*: ${formatCurrency(estimatedPrice, shopSettings.currencySymbol)}\n\n` +
      `I have prepared my custom cake design! Please let me know availability and delivery details.`
    );

    window.open(`https://wa.me/${shopSettings.whatsappNumber}?text=${msgText}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-8 py-8 space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] sm:text-xs font-bold">
          <Palette className="w-3.5 h-3.5 text-amber-400" /> Bespoke Confectionery Studio
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-stone-100">
          Design Your Custom Cake
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Pick your shape, theme, weight, and flavor, then send your custom specifications directly to our WhatsApp!
        </p>
      </div>

      <div className="glass-card bg-stone-900 p-4 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 text-xs">
        {/* 1. Shape Selection */}
        <div className="space-y-2">
          <label className="block font-bold text-amber-200 text-xs sm:text-sm">1. Choose Cake Shape:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {['Round', 'Heart', 'Square', 'Multi-tier Luxury'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  shape === s
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-md'
                    : 'border-stone-800 bg-stone-800/80 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Occasion Theme */}
        <div className="space-y-2">
          <label className="block font-bold text-amber-200 text-xs sm:text-sm">2. Occasion / Theme:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {['Birthday', 'Wedding', 'Anniversary', 'Baby Shower'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  theme === t
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-md'
                    : 'border-stone-800 bg-stone-800/80 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Weight Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-bold text-xs sm:text-sm">
            <label className="text-amber-200">3. Select Weight:</label>
            <span className="text-amber-400 font-extrabold text-sm">{weightKg} kg</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* 4. Flavor Picker */}
        <div className="space-y-2">
          <label className="block font-bold text-amber-200 text-xs sm:text-sm">4. Select Flavor:</label>
          <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="Belgian Chocolate Truffle">Belgian Chocolate Truffle</option>
            <option value="Classic Red Velvet Cream Cheese">Classic Red Velvet Cream Cheese</option>
            <option value="Madagascar Vanilla Bean">Madagascar Vanilla Bean</option>
            <option value="Butterscotch Caramel Crunch">Butterscotch Caramel Crunch</option>
            <option value="Fresh Pineapple Delight">Fresh Pineapple Delight</option>
            <option value="Matcha Green Tea & Lotus Biscoff">Matcha Green Tea & Lotus Biscoff</option>
          </select>
        </div>

        {/* 5. Custom Writing & Reference Photo */}
        <div className="space-y-4 pt-4 border-t border-stone-800">
          <div>
            <label className="block font-bold text-amber-200 text-xs sm:text-sm mb-1">
              5. Custom Message / Name Piping (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Happy 50th Anniversary Mom & Dad!"
              value={customWriting}
              onChange={(e) => setCustomWriting(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-stone-700 bg-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block font-bold text-amber-200 text-xs sm:text-sm mb-1">
              Upload Design Reference Photo (Optional):
            </label>
            <label className="cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl bg-stone-800 text-stone-300 transition-colors">
              <Upload className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-xs">Choose Reference Image from Device</span>
              <input type="file" accept="image/*" onChange={handleRefImageUpload} className="hidden" />
            </label>

            {refImagePreview && (
              <div className="mt-3 relative aspect-video rounded-2xl overflow-hidden border-2 border-amber-500/50">
                <img src={refImagePreview} alt="Reference Preview" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <CheckCircle2 className="w-3 h-3" /> Image Selected
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 font-bold text-xs pt-2">
            <input
              type="checkbox"
              id="custom-eggless"
              checked={isEggless}
              onChange={(e) => setIsEggless(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 shrink-0"
            />
            <label htmlFor="custom-eggless" className="cursor-pointer text-stone-200">
              100% Eggless Custom Cake 🌱
            </label>
          </div>
        </div>

        {/* Price Estimate & Direct WhatsApp Order Action */}
        <div className="p-4 sm:p-6 rounded-2xl bg-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
              Estimated Custom Price
            </span>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-black text-amber-400">
              {formatCurrency(estimatedPrice, shopSettings.currencySymbol)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSendCustomCakeToWhatsApp}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Custom Cake Request to WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
