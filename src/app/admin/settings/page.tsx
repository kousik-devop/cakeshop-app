'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { Save, CheckCircle2, MessageCircle, Store, MapPin, Phone, Mail, DollarSign } from 'lucide-react';

export default function AdminSettingsPage() {
  const { shopSettings, updateShopSettings } = useShop();

  const [shopName, setShopName] = useState(shopSettings.shopName);
  const [tagline, setTagline] = useState(shopSettings.tagline);
  const [whatsappNumber, setWhatsappNumber] = useState(shopSettings.whatsappNumber || '+919876543210');
  const [currencySymbol, setCurrencySymbol] = useState(shopSettings.currencySymbol || '₹');
  const [contactPhone, setContactPhone] = useState(shopSettings.contactPhone);
  const [contactEmail, setContactEmail] = useState(shopSettings.contactEmail);
  const [address, setAddress] = useState(shopSettings.address);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    updateShopSettings({
      shopName,
      tagline,
      whatsappNumber,
      currencySymbol,
      contactPhone,
      contactEmail,
      address,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-950 text-stone-100">
      <AdminNavbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
            Bakery & WhatsApp Store Settings
          </h1>
          <p className="text-xs text-stone-400">
            Update your live Shop Name, WhatsApp receiving number, currency symbol, and store details.
          </p>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-950 border border-emerald-500/40 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Store Settings Updated Live Successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="glass-card bg-stone-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 text-xs">
          
          {/* Section 1: Bakery Identity & WhatsApp */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury font-bold text-base text-amber-200 border-b border-stone-800 pb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" /> Shop Identity & WhatsApp Number
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200">Shop Name (Editable Live) *</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-sm text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200">Bakery Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-emerald-400 flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> WhatsApp Order Phone Number (Country Code + Number) *
              </label>
              <input
                type="text"
                required
                placeholder="+919876543210"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-500/50 bg-stone-800 font-mono font-bold text-emerald-300 focus:outline-none focus:border-emerald-400"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                All customer cake order specifications will be sent directly to this WhatsApp number.
              </span>
            </div>
          </div>

          {/* Section 2: Pricing & Currency */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <h3 className="font-serif-luxury font-bold text-base text-amber-200 border-b border-stone-800 pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" /> Currency Settings
            </h3>

            <div>
              <label className="block font-bold mb-1 text-stone-200">Currency Symbol *</label>
              <input
                type="text"
                required
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Section 3: Contact & Address */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <h3 className="font-serif-luxury font-bold text-base text-amber-200 border-b border-stone-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> Contact & Store Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-stone-200 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Contact Phone
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-200 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-200">Bakery Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-button-gradient font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings Live
          </button>
        </form>
      </div>
    </div>
  );
}
