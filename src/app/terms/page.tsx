'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';

export default function TermsPage() {
  const { shopSettings } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-stone-800 dark:text-stone-200">
      <h1 className="font-serif-luxury text-3xl font-bold">Terms & Conditions</h1>
      <p className="text-xs text-stone-500">Last updated: July 2026</p>

      <div className="glass-card p-8 rounded-3xl space-y-4 text-xs leading-relaxed border border-amber-200/80">
        <h3 className="font-bold text-sm">1. Cake Delivery & Perishable Goods Policy</h3>
        <p>
          Our artisanal cakes are perishable baked goods. Once dispatched in temperature-controlled vans, customers must ensure availability at the specified delivery slot and address.
        </p>

        <h3 className="font-bold text-sm">2. Custom Cake & Cancellation Policy</h3>
        <p>
          Custom cake orders require specialized baker preparation. Cancellations made 12 hours prior to scheduled delivery are eligible for a 100% store credit refund.
        </p>

        <h3 className="font-bold text-sm">3. Contact & Inquiries</h3>
        <p>
          For order modifications, please reach out to {shopSettings.shopName} support at {shopSettings.contactPhone}.
        </p>
      </div>
    </div>
  );
}
