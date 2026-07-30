'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, shopSettings, createOrder } = useShop();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses?.[0]?.streetAddress || '124 Celebration Lane');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'New Delhi');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Delhi');
  const [pinCode, setPinCode] = useState(user?.addresses?.[0]?.pinCode || '110001');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 text-stone-100">
        <ShoppingBag className="w-16 h-16 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-serif-luxury font-bold">Your Cake Tray is Empty</h2>
        <Link href="/collection" className="inline-block px-6 py-3 gold-button-gradient font-bold rounded-xl text-xs">
          Browse Cake Collection
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sweetdelightcakes.com';

    const itemsSummary = cart
      .map((i, index) => {
        const itemPrice = calculateDiscountedPrice(i.cake.price, i.cake.discountPercent);
        const cakeLink = `${baseUrl}/cake/${i.cake.id}`;
        return `${index + 1}. *${i.cake.name}* (${i.selectedWeight}, ${i.selectedFlavor}) x${i.quantity} = ${formatCurrency(itemPrice * i.quantity, shopSettings.currencySymbol)}\n   🔗 Link: ${cakeLink}`;
      })
      .join('\n\n');

    const whatsappMsg = encodeURIComponent(
      `🎂 *NEW CAKE ORDER - ${shopSettings.shopName}*\n\n` +
      `*Customer Name*: ${fullName}\n` +
      `*Phone*: ${phone}\n` +
      `*Delivery Address*: ${street}, ${city}, ${state} - ${pinCode}\n\n` +
      `*Order Items*:\n${itemsSummary}\n\n` +
      `*Total Amount*: ${formatCurrency(cartTotal, shopSettings.currencySymbol)}\n\n` +
      `Please confirm order delivery schedule!`
    );

    createOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
    });

    window.open(`https://wa.me/${shopSettings.whatsappNumber}?text=${whatsappMsg}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-stone-100">
      <Link href="/collection" className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Cake Catalog
      </Link>

      <div>
        <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
          WhatsApp Order Details
        </h1>
        <p className="text-xs text-stone-400">Fill in your delivery contact details to forward your order to WhatsApp.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="glass-card bg-stone-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 text-stone-200">Full Name *</label>
            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
          </div>
          <div>
            <label className="block font-bold mb-1 text-stone-200">Phone Number *</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 text-stone-200">Delivery Street Address *</label>
          <input type="text" required value={street} onChange={(e) => setStreet(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1 text-stone-200">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
          </div>
          <div>
            <label className="block font-bold mb-1 text-stone-200">State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
          </div>
          <div>
            <label className="block font-bold mb-1 text-stone-200">Pin Code</label>
            <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 font-medium" />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-stone-400 block text-[10px]">Total Order Price</span>
            <span className="font-serif-luxury text-2xl font-black text-amber-400">{formatCurrency(cartTotal, shopSettings.currencySymbol)}</span>
          </div>

          <button type="submit" className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer">
            <MessageCircle className="w-5 h-5" /> Forward Order to WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
