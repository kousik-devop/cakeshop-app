'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { StockStatus } from '@/types';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { AlertTriangle, CheckCircle2, PackageX } from 'lucide-react';

export default function AdminInventoryPage() {
  const { cakes, updateCake } = useShop();

  const lowStockCakes = cakes.filter((c) => c.inventoryCount < 10);

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-serif-luxury text-xl sm:text-3xl font-extrabold text-amber-100 leading-tight">
            Bakery Inventory & Stock Manager
          </h1>
          <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
            Monitor stock levels, set low stock thresholds, and update cake availability live.
          </p>
        </div>

        {/* Low Stock Banner Alert */}
        {lowStockCakes.length > 0 && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-[11px] sm:text-xs text-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
              <span>
                <strong>Low Stock Alert:</strong> {lowStockCakes.length} cake(s) have fewer than 10 units left in stock.
              </span>
            </div>
          </div>
        )}

        {/* Inventory Table Container (Fluid Responsive) */}
        <div className="glass-card bg-stone-900 p-4 sm:p-6 rounded-3xl border border-amber-500/30 space-y-4">
          <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-amber-100">
            Stock Registry & Controls
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 pb-2 text-[11px] sm:text-xs">
                  <th className="py-2.5 px-2">Cake Name</th>
                  <th className="py-2.5 px-2 hidden sm:table-cell">Category</th>
                  <th className="py-2.5 px-2">Stock Count</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {cakes.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 px-2 font-bold text-stone-100 flex items-center gap-2">
                      <img src={c.image} alt={c.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <span className="block truncate text-xs sm:text-sm">{c.name}</span>
                        <span className="text-[10px] text-stone-400 sm:hidden block">{c.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-stone-400 hidden sm:table-cell">{c.category}</td>
                    <td className="py-3 px-2">
                      <input
                        type="number"
                        value={c.inventoryCount}
                        onChange={(e) => updateCake(c.id, { inventoryCount: Number(e.target.value) })}
                        className="w-16 sm:w-20 px-2 py-1 rounded-lg border border-stone-700 bg-stone-800 font-bold text-amber-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] sm:text-xs whitespace-nowrap ${
                          c.stockStatus === 'Available'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : c.stockStatus === 'Limited Stock'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {c.stockStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={c.stockStatus}
                        onChange={(e) => updateCake(c.id, { stockStatus: e.target.value as StockStatus })}
                        className="px-2 py-1 rounded-lg border border-stone-700 bg-stone-800 font-bold text-stone-100 text-[10px] sm:text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Available">Available</option>
                        <option value="Limited Stock">Limited Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
