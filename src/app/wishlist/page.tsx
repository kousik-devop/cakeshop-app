'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { CakeCard } from '@/components/cake/CakeCard';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Heart className="w-16 h-16 text-rose-400 mx-auto opacity-60" />
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-800 dark:text-stone-200">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-stone-500">
          Click the heart icon on any cake card to save your favorite flavors!
        </p>
        <Link
          href="/collection"
          className="inline-block px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md"
        >
          Explore Cake Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
          Saved Favorites
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          My Saved Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </div>
  );
}
