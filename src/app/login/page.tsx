'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { shopSettings } = useShop();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      if (email.toLowerCase() === 'priya2006maity@gmail.com') {
        router.push('/admin');
      } else {
        router.push('/collection');
      }
    } else {
      setError('Invalid admin credentials. Please enter valid email and password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-stone-100">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center mx-auto font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-amber-100">
            Bakery Admin Sign In
          </h1>
          <p className="text-xs text-stone-400">
            Authorized management portal for {shopSettings.shopName}.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card bg-stone-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-5 text-xs">
          <div>
            <label className="block font-bold mb-1.5 text-stone-200">Admin Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-700 bg-stone-800 font-bold text-stone-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1.5 text-stone-200">Admin Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-button-gradient font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In to Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
