'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { Printer, CheckCircle, Truck, ChefHat, FileText, UserCheck } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, shopSettings } = useShop();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [bakerName, setBakerName] = useState('Chef Antoine Laurent');
  const [courierName, setCourierName] = useState('Express Bakery Delivery #42');

  const handlePrintSlip = (order: Order, type: 'kitchen' | 'invoice' | 'shipping') => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${type.toUpperCase()} - Order #${order.orderNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #111; }
            h1 { font-size: 20px; border-bottom: 2px solid #000; padding-bottom: 5px; }
            .meta { margin-bottom: 15px; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
            .total { font-weight: bold; font-size: 14px; text-align: right; margin-top: 15px; }
          </style>
        </head>
        <body>
          <h1>${shopSettings.shopName} — ${type.toUpperCase()} SLIP</h1>
          <div class="meta">
            <p><strong>Order #:</strong> ${order.orderNumber}</p>
            <p><strong>Customer:</strong> ${order.customerName} (${order.customerPhone})</p>
            <p><strong>Delivery Address:</strong> ${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.pinCode}</p>
            <p><strong>Date & Slot:</strong> ${order.deliveryDate} (${order.deliverySlot})</p>
          </div>
          <table>
            <thead>
              <tr><th>Item</th><th>Weight</th><th>Flavor</th><th>Eggless</th><th>Qty</th></tr>
            </thead>
            <tbody>
              ${order.items.map((i) => `
                <tr>
                  <td>${i.cake.name}</td>
                  <td>${i.selectedWeight}</td>
                  <td>${i.selectedFlavor}</td>
                  <td>${i.isEggless ? 'YES (Eggless)' : 'NO'}</td>
                  <td>${i.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p class="total">Total: ${shopSettings.currencySymbol}${order.finalAmount.toFixed(2)}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-50 dark:bg-stone-950">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Advanced Order Fulfillment & Kitchen Slip Portal
          </h1>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Advance order status timeline, assign bakers and couriers, print invoices and kitchen slips.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-amber-200 space-y-4">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-stone-600 dark:text-stone-400 pb-2">
                  <th className="py-2">Order #</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Customer Details</th>
                  <th className="py-2">Delivery Slot</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Fulfillment Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {orders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-3 font-bold text-amber-700 dark:text-amber-400">{ord.orderNumber}</td>
                    <td className="py-3 text-stone-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <p className="font-bold text-stone-900 dark:text-stone-100">{ord.customerName}</p>
                      <p className="text-[10px] text-stone-500">{ord.customerPhone}</p>
                    </td>
                    <td className="py-3 text-stone-600 dark:text-stone-300">{ord.deliverySlot}</td>
                    <td className="py-3 font-bold text-stone-900 dark:text-stone-100">
                      {formatCurrency(ord.finalAmount, shopSettings.currencySymbol)}
                    </td>
                    <td className="py-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-2 py-1 rounded border border-amber-300 bg-white dark:bg-stone-800 font-bold text-stone-900 dark:text-stone-100"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Baking">Baking</option>
                        <option value="Decorating">Decorating</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePrintSlip(ord, 'kitchen')}
                          className="px-2 py-1 rounded bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1 hover:bg-amber-200"
                          title="Print Kitchen Slip"
                        >
                          <ChefHat className="w-3 h-3" /> Kitchen
                        </button>

                        <button
                          onClick={() => handlePrintSlip(ord, 'invoice')}
                          className="px-2 py-1 rounded bg-stone-900 text-white font-bold text-[10px] flex items-center gap-1 hover:bg-stone-800"
                          title="Print Tax Invoice"
                        >
                          <Printer className="w-3 h-3" /> Invoice
                        </button>
                      </div>
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
