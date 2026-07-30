'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import { User, Package, MapPin, Bell, LogOut, ArrowRight, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { orders, shopSettings } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'reminders'>('orders');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 text-stone-100">
        <User className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold font-serif-luxury">Please Login First</h2>
        <Link href="/login" className="inline-block px-6 py-2.5 gold-button-gradient font-bold rounded-xl text-xs">
          Go to Sign-In Portal
        </Link>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.customerEmail === user.email);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-stone-100">
      <div className="glass-card bg-stone-900 p-6 rounded-3xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-serif-luxury font-bold text-lg text-amber-100">{user.name}</h2>
            <p className="text-xs text-stone-400">{user.email} • {user.phone}</p>
          </div>
        </div>

        <button onClick={logout} className="px-3.5 py-2 rounded-xl bg-rose-600/20 text-rose-300 font-bold text-xs flex items-center gap-1.5 hover:bg-rose-600 hover:text-white">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 text-xs font-bold">
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl ${activeTab === 'orders' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}>
          Order History ({userOrders.length})
        </button>
        <button onClick={() => setActiveTab('addresses')} className={`px-4 py-2 rounded-xl ${activeTab === 'addresses' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}>
          Saved Addresses ({user.addresses?.length || 0})
        </button>
        <button onClick={() => setActiveTab('reminders')} className={`px-4 py-2 rounded-xl ${activeTab === 'reminders' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}>
          Reminders ({user.reminders?.length || 0})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <p className="text-xs text-stone-400 text-center py-8">No order history found for your account.</p>
          ) : (
            userOrders.map((ord) => (
              <div key={ord.id} className="glass-card bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-amber-400">Order #{ord.orderNumber}</span>
                  <span className="text-emerald-400">{ord.status}</span>
                </div>
                <p className="text-stone-300">Total: {formatCurrency(ord.totalAmount, shopSettings.currencySymbol)}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
