'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  const { orders, shopSettings } = useShop();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 text-stone-100">
        <Package className="w-16 h-16 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-serif-luxury font-bold">No WhatsApp Orders Found</h2>
        <Link href="/collection" className="inline-block px-6 py-3 gold-button-gradient font-bold rounded-xl text-xs">
          Explore Cake Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-stone-100">
      <div>
        <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
          WhatsApp Order History
        </h1>
        <p className="text-xs text-stone-400">View orders placed via WhatsApp.</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => {
          const total = ord.finalAmount || ord.totalAmount;
          return (
            <div key={ord.id} className="glass-card bg-stone-900 p-5 rounded-2xl border border-amber-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">Order #{ord.orderNumber}</span>
                <span className="text-emerald-400 font-bold">{ord.status}</span>
              </div>
              <p className="font-bold text-amber-400">
                Total: {formatCurrency(total, shopSettings.currencySymbol)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
