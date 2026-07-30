'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Cake,
  Tags,
  Package,
  Settings,
  Globe,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';

export const AdminNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { shopSettings } = useShop();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Cakes Menu', href: '/admin/cakes', icon: Cake },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Inventory & Stock', href: '/admin/inventory', icon: Package },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="bg-stone-900 text-stone-100 border-b border-amber-500/30 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-stone-800 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-serif-luxury font-bold text-sm sm:text-base text-amber-200 block truncate">
                {shopSettings.shopName} — Admin
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block -mt-0.5 font-medium truncate">
                Bakery Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] sm:text-xs flex items-center gap-1 border border-stone-700"
            >
              <Globe className="w-3.5 h-3.5" /> <span className="hidden sm:inline">View Public Site</span><span className="sm:hidden">Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
