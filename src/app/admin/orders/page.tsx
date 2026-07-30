'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { ShoppingBag, Clock, CheckCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, shopSettings } = useShop();

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        <div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
            WhatsApp Order History
          </h1>
          <p className="text-xs text-stone-400">
            View orders forwarded to WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const amount = order.finalAmount || order.totalAmount;
            return (
              <div key={order.id} className="glass-card bg-stone-900 p-5 rounded-2xl border border-amber-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Order #{order.orderNumber}</span>
                  <span className="text-stone-400">{order.createdAt}</span>
                </div>
                <p className="text-stone-200">Customer: {order.customerName} ({order.customerPhone})</p>
                <p className="font-bold text-amber-400">Total: {shopSettings.currencySymbol}{amount.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
