'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import { User as UserIcon, Mail, Phone, Lock, Sparkles, Gift } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const { shopSettings } = useShop();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    register(name, email, phone, referralCode);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card p-6 sm:p-8 border border-amber-300 dark:border-amber-800 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-500 flex items-center justify-center shadow-md mb-2">
            <Gift className="w-6 h-6 text-amber-950" />
          </div>
          <h1 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100">
            Create Bakery Account
          </h1>
          <p className="text-xs text-stone-500">
            Register today & get <strong className="text-amber-600">100 Bonus Loyalty Points</strong>!
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Mobile Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="tel"
                required
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">
              Referral Code (Optional for +50 Extra Points)
            </label>
            <input
              type="text"
              placeholder="e.g. SDC-FRIEND"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full px-3 py-2.5 uppercase rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md"
          >
            Create Account & Get 100 Points
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-600 font-bold hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
