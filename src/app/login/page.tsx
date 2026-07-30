'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@sweetdelightcakes.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (email.toLowerCase().includes('admin') || password === 'admin123') {
      login(email, 'admin');
      router.push('/admin');
    } else {
      login(email, 'customer');
      router.push('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stone-50 dark:bg-stone-950">
      <div className="w-full max-w-md glass-card bg-white dark:bg-stone-900 p-8 rounded-3xl border border-amber-300 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif-luxury text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Admin Authentication Portal
          </h1>
          <p className="text-xs text-stone-500">
            Authorized bakery shop management sign-in.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-100 text-rose-900 rounded-xl text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-900 dark:text-stone-100 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 text-[11px] text-amber-900 dark:text-amber-200">
            <span className="font-bold">Preset Credentials:</span>
            <p>Email: <code className="font-mono bg-white dark:bg-stone-800 px-1 py-0.5 rounded">admin@sweetdelightcakes.com</code></p>
            <p>Password: <code className="font-mono bg-white dark:bg-stone-800 px-1 py-0.5 rounded">admin123</code></p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <span>Log In to Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
