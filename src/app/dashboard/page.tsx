'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import {
  User,
  MapPin,
  Calendar,
  Gift,
  ShoppingBag,
  Heart,
  Plus,
  Trash2,
  Bell,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, addAddress, deleteAddress, addReminder, deleteReminder, logout } = useAuth();
  const { orders, wishlist, shopSettings } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'reminders' | 'orders'>('profile');

  // New Address form
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPin, setAddrPin] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  // New Reminder form
  const [remTitle, setRemTitle] = useState('');
  const [remPerson, setRemPerson] = useState('');
  const [remDate, setRemDate] = useState('');
  const [remType, setRemType] = useState<'Birthday' | 'Anniversary' | 'Other'>('Birthday');
  const [showAddRem, setShowAddRem] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold">Please Login to Access Dashboard</h2>
        <Link href="/login" className="inline-block px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs">
          Login Now
        </Link>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrPin) return;
    addAddress({
      fullName: addrName || user.name,
      phone: addrPhone || user.phone,
      streetAddress: addrStreet,
      city: addrCity,
      state: addrState,
      pinCode: addrPin,
    });
    setAddrStreet('');
    setAddrCity('');
    setAddrPin('');
    setShowAddAddr(false);
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle || !remDate) return;
    addReminder({
      title: remTitle,
      personName: remPerson,
      date: remDate,
      type: remType,
    });
    setRemTitle('');
    setRemPerson('');
    setRemDate('');
    setShowAddRem(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header Profile Summary */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center font-serif-luxury font-black text-2xl shadow-lg">
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-stone-500">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Loyalty Points Pill */}
          <div className="bg-amber-950 text-amber-200 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border border-amber-400/40 shadow-md">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>{user.loyaltyPoints} Loyalty Points</span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-2xl border border-rose-300 text-rose-600 font-bold text-xs hover:bg-rose-50"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-200 dark:border-amber-900 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-3 border-b-2 transition-colors shrink-0 ${
            activeTab === 'profile'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Profile Overview
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-3 border-b-2 transition-colors shrink-0 ${
            activeTab === 'addresses'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Saved Addresses ({user.addresses.length})
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-5 py-3 border-b-2 transition-colors shrink-0 ${
            activeTab === 'reminders'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Birthday & Anniversary Reminders ({user.reminders.length})
        </button>
        <Link href="/orders" className="px-5 py-3 text-stone-500 hover:text-amber-600 shrink-0">
          My Orders & Live Tracking ({orders.length})
        </Link>
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-amber-200/80 space-y-3">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-600" /> Referral Code
            </h3>
            <p className="text-xs text-stone-500">Share your code with friends. You both get 100 points!</p>
            <div className="p-3 bg-amber-50 dark:bg-stone-800 rounded-xl font-mono font-bold text-center text-sm text-amber-900 dark:text-amber-200 border border-amber-200">
              {user.referralCode}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-amber-200/80 space-y-3">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" /> Recent Orders
            </h3>
            <p className="text-xs text-stone-500">You have {orders.length} total placed orders.</p>
            <Link
              href="/orders"
              className="inline-block px-4 py-2 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs"
            >
              View Order Tracking
            </Link>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-amber-200/80 space-y-3">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> Wishlist
            </h3>
            <p className="text-xs text-stone-500">Saved {wishlist.length} cakes for upcoming parties.</p>
            <Link
              href="/wishlist"
              className="inline-block px-4 py-2 rounded-xl border border-rose-300 text-rose-600 font-bold text-xs"
            >
              Go to Wishlist
            </Link>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100">
              Saved Delivery Addresses
            </h3>
            <button
              onClick={() => setShowAddAddr(!showAddAddr)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          {showAddAddr && (
            <form onSubmit={handleAddAddress} className="glass-card p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={addrCity}
                  onChange={(e) => setAddrCity(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={addrState}
                  onChange={(e) => setAddrState(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={addrPin}
                  onChange={(e) => setAddrPin(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>
              <button type="submit" className="px-5 py-2 bg-amber-900 text-white font-bold rounded-xl">
                Save Address
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map((a) => (
              <div key={a.id} className="glass-card p-5 rounded-2xl border border-amber-200/80 flex justify-between items-start text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">{a.fullName}</h4>
                  <p className="text-stone-500 mt-1">{a.streetAddress}, {a.city}, {a.state} - {a.pinCode}</p>
                  <p className="text-stone-400 mt-0.5">Phone: {a.phone}</p>
                </div>
                <button onClick={() => deleteAddress(a.id)} className="text-rose-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100">
                Birthday & Anniversary Reminders
              </h3>
              <p className="text-xs text-stone-500">Never miss a loved one's birthday! Save dates to get automated cake coupon alerts.</p>
            </div>
            <button
              onClick={() => setShowAddRem(!showAddRem)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Reminder
            </button>
          </div>

          {showAddRem && (
            <form onSubmit={handleAddReminder} className="glass-card p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Event Title (e.g. Mom's 50th Birthday)"
                  value={remTitle}
                  onChange={(e) => setRemTitle(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="Person Name"
                  value={remPerson}
                  onChange={(e) => setRemPerson(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <input
                  type="date"
                  value={remDate}
                  onChange={(e) => setRemDate(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
                <select
                  value={remType}
                  onChange={(e) => setRemType(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other Event</option>
                </select>
              </div>
              <button type="submit" className="px-5 py-2 bg-amber-900 text-white font-bold rounded-xl">
                Save Reminder
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.reminders.map((r) => (
              <div key={r.id} className="glass-card p-5 rounded-2xl border border-amber-200/80 flex justify-between items-start text-xs">
                <div>
                  <span className="bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    {r.type}
                  </span>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mt-1">{r.title}</h4>
                  <p className="text-stone-500">{r.personName} • Date: {r.date}</p>
                </div>
                <button onClick={() => deleteReminder(r.id)} className="text-rose-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
