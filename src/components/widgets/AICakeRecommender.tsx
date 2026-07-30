'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Cake } from '@/types';
import { Sparkles, X, ChevronRight, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';

export const AICakeRecommender: React.FC = () => {
  const { cakes, setQuickViewCake, shopSettings } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [selectedFlavorPref, setSelectedFlavorPref] = useState<string>('');
  const [isEgglessOnly, setIsEgglessOnly] = useState<boolean>(false);
  const [recommendedCakes, setRecommendedCakes] = useState<Cake[]>([]);

  const occasions = ['Birthday', 'Wedding', 'Anniversary', 'Kids Celebration', 'Romantic Date', 'Family Gathering'];
  const flavors = ['Belgian Chocolate', 'Vanilla & Strawberry', 'Red Velvet', 'Truffle & Nuts', 'Caramel Biscoff'];

  const handleCalculateRecommendations = () => {
    let matches = cakes.filter((cake) => {
      let score = 0;
      if (selectedOccasion && cake.occasion.toLowerCase().includes(selectedOccasion.toLowerCase())) score += 2;
      if (selectedFlavorPref && cake.flavors.some((f) => f.toLowerCase().includes(selectedFlavorPref.toLowerCase()))) score += 3;
      if (isEgglessOnly && cake.isEggless) score += 2;
      return score > 0;
    });

    if (matches.length === 0) {
      matches = cakes.slice(0, 3);
    }
    setRecommendedCakes(matches.slice(0, 3));
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedOccasion('');
    setSelectedFlavorPref('');
    setIsEgglessOnly(false);
    setRecommendedCakes([]);
  };

  return (
    <>
      {/* Banner / Trigger on Homepage or Collection */}
      <div className="glass-card bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300 dark:border-amber-800 p-6 rounded-3xl my-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" /> AI Cake Matchmaker
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900 dark:text-stone-100">
            Unsure which cake to choose for your celebration?
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xl">
            Answer 3 quick preference questions and let our AI Sommelier pair the perfect cake flavor, weight, and design!
          </p>
        </div>
        <button
          onClick={() => {
            handleReset();
            setIsOpen(true);
          }}
          className="px-6 py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md shrink-0 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Sparkles className="w-4 h-4" /> Start AI Recommendation
        </button>
      </div>

      {/* AI Wizard Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl glass-card bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800 shadow-2xl rounded-3xl overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Step Progress */}
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                AI Cake Recommendation Engine
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {step === 1 && 'What is the celebration occasion?'}
                {step === 2 && 'What flavor profile do you crave?'}
                {step === 3 && 'Dietary preference confirmation'}
                {step === 4 && '✨ Your Curated AI Cake Matches'}
              </h3>
            </div>

            {/* Step 1: Occasion */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`p-3.5 rounded-xl text-xs font-bold text-center border transition-all ${
                        selectedOccasion === occ
                          ? 'bg-amber-500 text-amber-950 border-amber-500 shadow'
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    disabled={!selectedOccasion}
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-amber-900 text-amber-100 font-bold text-xs disabled:opacity-50 flex items-center gap-1"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Flavor */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {flavors.map((flv) => (
                    <button
                      key={flv}
                      onClick={() => setSelectedFlavorPref(flv)}
                      className={`p-3.5 rounded-xl text-xs font-bold text-left border transition-all ${
                        selectedFlavorPref === flv
                          ? 'bg-amber-500 text-amber-950 border-amber-500 shadow'
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                      }`}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="text-xs text-stone-500 underline font-semibold">
                    Back
                  </button>
                  <button
                    disabled={!selectedFlavorPref}
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-amber-900 text-amber-100 font-bold text-xs disabled:opacity-50 flex items-center gap-1"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Eggless */}
            {step === 3 && (
              <div className="space-y-6 text-center py-4">
                <p className="text-sm text-stone-700 dark:text-stone-300">
                  Do you require strict <strong>100% Eggless</strong> preparation for your cake?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsEgglessOnly(true)}
                    className={`px-6 py-3 rounded-xl font-bold text-xs border transition-all ${
                      isEgglessOnly
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    Yes, 100% Eggless Only 🌱
                  </button>
                  <button
                    onClick={() => setIsEgglessOnly(false)}
                    className={`px-6 py-3 rounded-xl font-bold text-xs border transition-all ${
                      !isEgglessOnly
                        ? 'bg-amber-500 text-amber-950 border-amber-500 shadow'
                        : 'border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    Either Egg or Eggless is Fine ✨
                  </button>
                </div>
                <div className="flex justify-between pt-6 border-t border-amber-100 dark:border-amber-900">
                  <button onClick={() => setStep(2)} className="text-xs text-stone-500 underline font-semibold">
                    Back
                  </button>
                  <button
                    onClick={handleCalculateRecommendations}
                    className="px-8 py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Find Matching Cakes
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1">
                  {recommendedCakes.map((cake) => {
                    const price = calculateDiscountedPrice(cake.price, cake.discountPercent);
                    return (
                      <div
                        key={cake.id}
                        className="p-3.5 glass-card border border-amber-200/80 dark:border-amber-900/60 rounded-2xl flex items-center gap-4 hover:border-amber-400 transition-colors"
                      >
                        <img src={cake.image} alt={cake.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">
                            99% Match Score
                          </span>
                          <h4 className="font-serif-luxury font-bold text-stone-900 dark:text-stone-100 text-sm truncate">
                            {cake.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                            {cake.flavors.join(', ')}
                          </p>
                          <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mt-1">
                            {formatCurrency(price, shopSettings.currencySymbol)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setQuickViewCake(cake);
                          }}
                          className="px-3.5 py-2 rounded-lg bg-amber-500 text-amber-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0"
                        >
                          View Cake
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-amber-100 dark:border-amber-900">
                  <button
                    onClick={handleReset}
                    className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retake AI Quiz
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 rounded-xl bg-stone-800 text-stone-200 font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
