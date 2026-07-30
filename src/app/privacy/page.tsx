'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';

export default function PrivacyPage() {
  const { shopSettings } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-stone-800 dark:text-stone-200">
      <h1 className="font-serif-luxury text-3xl font-bold">Privacy Policy</h1>
      <p className="text-xs text-stone-500">Last updated: July 2026</p>

      <div className="glass-card p-8 rounded-3xl space-y-4 text-xs leading-relaxed border border-amber-200/80">
        <h3 className="font-bold text-sm">1. Information We Collect</h3>
        <p>
          At {shopSettings.shopName}, we respect your personal privacy. We collect customer names, phone numbers, delivery addresses, and email details strictly for fulfilling cake orders and delivering status updates.
        </p>

        <h3 className="font-bold text-sm">2. Security & Payment Processing</h3>
        <p>
          All online credit card, Razorpay, UPI, and bank transaction details are processed via 256-bit SSL encrypted payment gateways. {shopSettings.shopName} does not store raw credit card credentials on our servers.
        </p>

        <h3 className="font-bold text-sm">3. Contacting Us</h3>
        <p>
          If you have questions regarding data privacy, please contact our administrative desk at {shopSettings.contactEmail}.
        </p>
      </div>
    </div>
  );
}
