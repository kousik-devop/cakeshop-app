'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import {
  Cake,
  Users,
  AlertTriangle,
  Package,
  Settings,
  MessageSquare,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { cakes, sellerMessages, categories } = useShop();

  const lowStockCakes = cakes.filter((c) => c.inventoryCount < 10);
  const unreadMessagesCount = sellerMessages.filter((m) => m.status === 'Unread').length;

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-3xl font-extrabold text-amber-100 leading-tight">
              Bakery Admin Control Dashboard
            </h1>
            <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
              Manage your live cake menu, inventory counts, and WhatsApp bakery settings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/cakes"
              className="px-3.5 py-2 rounded-xl gold-button-gradient font-bold text-xs shadow-sm"
            >
              + Add New Cake
            </Link>
            <Link
              href="/admin/settings"
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs border border-stone-700"
            >
              ⚙ Store Settings
            </Link>
          </div>
        </div>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="glass-card bg-stone-900 p-4 sm:p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Total Live Cakes
              </span>
              <span className="font-serif-luxury text-xl sm:text-3xl font-black text-amber-400">
                {cakes.length}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-0.5">across {categories.length} categories</span>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Cake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="glass-card bg-stone-900 p-4 sm:p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Available Stock
              </span>
              <span className="font-serif-luxury text-xl sm:text-3xl font-black text-emerald-400">
                {cakes.filter((c) => c.stockStatus === 'Available').length}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-0.5">ready for WhatsApp order</span>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="glass-card bg-stone-900 p-4 sm:p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Low Stock Warning
              </span>
              <span className="font-serif-luxury text-xl sm:text-3xl font-black text-rose-400">
                {lowStockCakes.length}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-0.5">fewer than 10 units</span>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="glass-card bg-stone-900 p-4 sm:p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Categories
              </span>
              <span className="font-serif-luxury text-xl sm:text-3xl font-black text-blue-400">
                {categories.length}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-0.5">active categories</span>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Low Stock Warning Banner */}
        {lowStockCakes.length > 0 && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                <strong>Low Stock Alert:</strong> {lowStockCakes.length} cake(s) have fewer than 10 units in stock.
              </span>
            </div>
            <Link href="/admin/inventory" className="font-bold underline text-amber-400 shrink-0 text-xs">
              Update Inventory
            </Link>
          </div>
        )}

        {/* Cake Catalog Quick Preview */}
        <div className="glass-card bg-stone-900 p-4 sm:p-6 rounded-3xl border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-amber-100">
              Live Cake Menu Registry
            </h3>
            <Link href="/admin/cakes" className="text-xs text-amber-400 font-bold hover:underline">
              Manage All Cakes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs">
            {cakes.slice(0, 6).map((c) => (
              <div key={c.id} className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center gap-3">
                <img src={c.image} alt={c.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-100 truncate text-xs">{c.name}</h4>
                  <p className="text-[10px] text-stone-400 truncate">{c.category}</p>
                  <span className="font-bold text-amber-400 text-xs">₹{c.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
