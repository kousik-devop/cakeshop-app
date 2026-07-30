'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Download, Truck, ArrowRight, Sparkles, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { orders, shopSettings } = useShop();
  const orderId = searchParams.get('orderId');

  const order = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    // Fire festive celebration confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  }, []);

  const handleDownloadInvoice = () => {
    alert(`Downloading Tax Invoice PDF for Order #${order?.orderNumber || 'SDC-998811'}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Success Banner Card */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-amber-300 text-center space-y-4 bg-gradient-to-b from-emerald-500/10 via-amber-500/10 to-transparent shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Payment Confirmed & Order Placed
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
            Order <strong>#{order?.orderNumber}</strong> has been received by our executive bakers and is moving to the baking station.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/orders"
            className="px-6 py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Truck className="w-4 h-4" /> Live Order Tracking Timeline
          </Link>

          <button
            onClick={handleDownloadInvoice}
            className="px-5 py-3 rounded-xl border border-amber-400 text-amber-900 dark:text-amber-200 font-bold text-xs hover:bg-amber-100/50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF Receipt
          </button>
        </div>
      </div>

      {/* Invoice Details Box */}
      {order && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-200/80 space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900 pb-4">
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100">
                Order Receipt
              </h3>
              <p className="text-stone-400 text-[11px]">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[11px]">
                Payment: {order.paymentStatus} ({order.paymentMethod})
              </span>
              {order.transactionId && <p className="text-[10px] text-stone-400 mt-1">Txn: {order.transactionId}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 dark:text-stone-200">Ordered Cake Items:</h4>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-amber-100 dark:border-amber-900">
                <div className="flex items-center gap-3">
                  <img src={item.cake.image} alt={item.cake.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">{item.cake.name}</p>
                    <p className="text-[11px] text-stone-500">
                      {item.selectedWeight} • {item.selectedFlavor} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-amber-600">
                  {formatCurrency(item.cake.price * item.quantity, shopSettings.currencySymbol)}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-100 dark:border-amber-900">
            <div>
              <h5 className="font-bold text-stone-800 dark:text-stone-200 mb-1">Delivery Address:</h5>
              <p className="text-stone-500">{order.shippingAddress.fullName}</p>
              <p className="text-stone-500">{order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.pinCode}</p>
              <p className="text-stone-500">Phone: {order.customerPhone}</p>
            </div>

            <div>
              <h5 className="font-bold text-stone-800 dark:text-stone-200 mb-1">Delivery Slot & Date:</h5>
              <p className="text-amber-600 font-bold">{order.deliverySlot}</p>
              <p className="text-stone-500">Date: {order.deliveryDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Invoice...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
