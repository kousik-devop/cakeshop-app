'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import {
  Truck,
  CheckCircle2,
  Clock,
  ChefHat,
  Flame,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Package,
} from 'lucide-react';

export default function MyOrdersPage() {
  const { orders, shopSettings } = useShop();

  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Package className="w-16 h-16 text-amber-500 mx-auto opacity-60" />
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-800 dark:text-stone-200">
          No Orders Placed Yet
        </h2>
        <p className="text-xs text-stone-500">
          Explore our artisan cakes or custom cake builder to place your first order.
        </p>
        <Link
          href="/collection"
          className="inline-block px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md"
        >
          Browse Bakery Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Live Bakery Oven & Delivery Progress
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          My Orders & Tracking
        </h1>
      </div>

      <div className="space-y-8">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-200/80 dark:border-amber-900/60 shadow-xl space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 dark:border-amber-900 pb-4 text-xs">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Order #{ord.orderNumber}
                </span>
                <span className="text-stone-400 ml-2">• Placed on {new Date(ord.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-serif-luxury font-bold text-amber-600 text-base">
                  {formatCurrency(ord.finalAmount, shopSettings.currencySymbol)}
                </span>
                <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">
                  Status: {ord.status}
                </span>
              </div>
            </div>

            {/* ANIMATED TIMELINE BAR */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" /> Live Kitchen & Delivery Progress:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                {ord.timeline.map((step, idx) => {
                  const isCompleted = step.completed;
                  const isCurrent = step.current;

                  return (
                    <div
                      key={step.status}
                      className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-amber-950 border-amber-500 font-bold shadow-lg scale-105 animate-pulse'
                          : isCompleted
                          ? 'bg-emerald-100/60 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 font-semibold'
                          : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 text-stone-400'
                      }`}
                    >
                      <div className="flex justify-center">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Clock className="w-4 h-4 opacity-50" />
                        )}
                      </div>
                      <p className="text-[11px] font-bold">{step.label}</p>
                      {step.timestamp && <span className="text-[9px] block opacity-75">{step.timestamp}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ordered Items Preview */}
            <div className="pt-4 border-t border-amber-100 dark:border-amber-900/40 space-y-2">
              <h5 className="font-bold text-xs text-stone-700 dark:text-stone-300">Items in this order:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-amber-50/50 dark:bg-stone-800/50 p-2.5 rounded-xl border border-amber-100">
                    <img src={item.cake.image} alt={item.cake.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0 text-xs">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{item.cake.name}</p>
                      <p className="text-[10px] text-stone-500">{item.selectedWeight} • {item.selectedFlavor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
