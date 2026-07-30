'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { MessageSquare, Mail, Phone } from 'lucide-react';

export default function AdminMessagesPage() {
  const { sellerMessages } = useShop();

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        <div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
            Customer Inquiries & Messages
          </h1>
          <p className="text-xs text-stone-400">
            View messages and custom cake requests sent by visitors.
          </p>
        </div>

        <div className="space-y-4">
          {sellerMessages.map((msg) => (
            <div key={msg.id} className="glass-card bg-stone-900 p-5 rounded-2xl border border-amber-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-sm">{msg.senderName}</span>
                <span className="text-[10px] text-stone-400">{msg.createdAt}</span>
              </div>
              <p className="text-stone-300 font-medium">{msg.subject}</p>
              <p className="text-stone-400 text-xs">{msg.message}</p>
              <div className="flex items-center gap-4 text-[10px] text-stone-400 pt-2 border-t border-stone-800">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-amber-400" /> {msg.senderEmail}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> {msg.senderPhone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
