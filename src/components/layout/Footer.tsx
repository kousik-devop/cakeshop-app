'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  Cake,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { shopSettings } = useShop();

  // Hide footer completely on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-6 border-t border-amber-500/20 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif-luxury font-extrabold text-xl text-amber-100">
                {shopSettings.shopName}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Crafting sweet memories with 100% fresh ingredients and eggless options. Order your favorite customized cake directly via WhatsApp!
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Orders Available 24/7</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sm text-stone-100 uppercase tracking-wider">
              Cake Catalog
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/collection" className="hover:text-amber-300 transition-colors">
                  All Cakes
                </Link>
              </li>
              <li>
                <Link href="/custom-cake" className="hover:text-amber-300 transition-colors">
                  Custom Cake Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-amber-300 transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Info */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sm text-stone-100 uppercase tracking-wider">
              Bakery Info
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{shopSettings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{shopSettings.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{shopSettings.contactEmail}</span>
              </p>
            </div>
          </div>

          {/* Admin Private Login Portal Link */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-sm text-stone-100 uppercase tracking-wider">
              Bakery Administration
            </h4>
            <p className="text-stone-400 text-xs">Authorized shop owner portal access:</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-stone-700"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Login Portal
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} {shopSettings.shopName}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-stone-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
