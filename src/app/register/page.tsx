'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import { Cake, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const { shopSettings } = useShop();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      router.push('/collection');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-stone-100 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center mx-auto font-bold">
          <Cake className="w-6 h-6" />
        </div>
        <h1 className="font-serif-luxury text-2xl font-bold text-amber-100">Create Account</h1>
        <p className="text-xs text-stone-400">Join {shopSettings.shopName} to save your favorite cakes.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card bg-stone-900 p-6 rounded-3xl border border-amber-500/30 space-y-4 text-xs">
        <div>
          <label className="block font-bold mb-1 text-stone-200">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 text-stone-200">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1 text-stone-200">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
          </div>
        </div>

        <button type="submit" className="w-full py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2">
          <span>Create Account & Browse</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-2">
          <Link href="/login" className="text-stone-400 text-[11px] hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
