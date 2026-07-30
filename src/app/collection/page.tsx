'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { CakeCard } from '@/components/cake/CakeCard';
import { Filter, Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

function CollectionContent() {
  const { cakes, categories } = useShop();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || '';

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [priceMax, setPriceMax] = useState<number>(200);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high' | 'best-selling'>('popular');

  // Available flavors list derived from cakes
  const allFlavors = Array.from(new Set(cakes.flatMap((c) => c.flavors)));
  const allWeights = Array.from(new Set(cakes.flatMap((c) => c.weights)));

  // Filter & Sort Logic
  const filteredCakes = useMemo(() => {
    return cakes
      .filter((cake) => {
        if (selectedCategory && cake.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        if (selectedFlavor && !cake.flavors.some((f) => f.toLowerCase().includes(selectedFlavor.toLowerCase()))) return false;
        if (selectedWeight && !cake.weights.includes(selectedWeight)) return false;
        if (egglessOnly && !cake.isEggless) return false;
        if (cake.price > priceMax) return false;
        if (
          searchQuery.trim() &&
          !cake.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !cake.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'best-selling') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'newest') return (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0);
        return b.rating - a.rating; // default popular
      });
  }, [cakes, selectedCategory, selectedFlavor, selectedWeight, egglessOnly, priceMax, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedFlavor('');
    setSelectedWeight('');
    setEgglessOnly(false);
    setPriceMax(200);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Artisanal Bakery Selection
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Our Cake Collection
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Browse through handcrafted cakes for birthdays, weddings, anniversaries, and parties. Filter by weight, dietary preference, or flavor.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-200/80 dark:border-amber-900/60 shadow-md">
        {/* Live Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-600" />
          <input
            type="text"
            placeholder="Search by cake name or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-stone-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-amber-600" /> Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="best-selling">Best Selling</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-5 border border-amber-200/80 dark:border-amber-900/60 space-y-6">
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-3">
              <h3 className="font-serif-luxury font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" /> Filter Cakes
              </h3>
              <button onClick={clearFilters} className="text-[11px] text-rose-500 font-bold hover:underline">
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200">Category</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === ''
                      ? 'bg-amber-500 text-amber-950 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-amber-100/50'
                  }`}
                >
                  All Categories ({cakes.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-amber-500 text-amber-950 font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-amber-100/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Eggless Toggle */}
            <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={egglessOnly}
                  onChange={(e) => setEgglessOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
                <span>100% Eggless Only 🌱</span>
              </label>
            </div>

            {/* Flavor Filter */}
            <div className="space-y-2 pt-2 border-t border-amber-100 dark:border-amber-900/40">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200">Flavor Profile</label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              >
                <option value="">All Flavors</option>
                {allFlavors.map((flv) => (
                  <option key={flv} value={flv}>
                    {flv}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Filter */}
            <div className="space-y-2 pt-2 border-t border-amber-100 dark:border-amber-900/40">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200">Weight</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedWeight('')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    selectedWeight === '' ? 'bg-amber-500 text-amber-950 font-bold border-amber-500' : 'border-stone-300'
                  }`}
                >
                  Any
                </button>
                {allWeights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      selectedWeight === w ? 'bg-amber-500 text-amber-950 font-bold border-amber-500' : 'border-stone-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div className="space-y-2 pt-2 border-t border-amber-100 dark:border-amber-900/40">
              <div className="flex justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
                <span>Max Price:</span>
                <span className="text-amber-600">${priceMax}</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Right Cake Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>
              Showing <strong>{filteredCakes.length}</strong> cakes
            </span>
            {selectedCategory && (
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-semibold px-2.5 py-1 rounded-full">
                Category: {selectedCategory}
              </span>
            )}
          </div>

          {filteredCakes.length === 0 ? (
            <div className="glass-card p-12 text-center space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-800 dark:text-stone-200">
                No cakes found matching your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try resetting your price filter or selecting another category.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCakes.map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Bakery Collection...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
