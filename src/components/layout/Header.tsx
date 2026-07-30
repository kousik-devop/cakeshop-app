'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Cake as CakeIcon,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  Globe,
  Mic,
  MessageCircle,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { shopSettings, cart, wishlist, setIsCartDrawerOpen, cakes, setQuickViewCake } = useShop();
  const { language, setLanguage, t } = useLanguage();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  // Hide header completely on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredSearchCakes = searchQuery.trim()
    ? cakes.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.flavors.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Belgian Chocolate');
      setIsListeningVoice(false);
    }, 2000);
  };

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('collection'), href: '/collection' },
    { name: t('customCake'), href: '/custom-cake', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Main Header Container */}
      <div className="glass-header border-b border-amber-500/20 bg-stone-950/95 backdrop-blur-md px-3 sm:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-100 hover:bg-stone-800"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <CakeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-stone-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-lg sm:text-2xl font-extrabold tracking-tight text-amber-100 group-hover:text-amber-400 transition-colors leading-tight">
                  {shopSettings.shopName}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-400 uppercase font-semibold">
                  {shopSettings.tagline || 'Direct WhatsApp Bakery'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    link.highlight
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm hover:bg-amber-400'
                      : isActive
                      ? 'bg-amber-950/80 text-amber-200 font-bold border border-amber-500/30'
                      : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-stone-950" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-bold bg-stone-900 px-2 py-1 rounded-lg border border-amber-500/30">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <button onClick={() => setLanguage('en')} className={`px-1 rounded ${language === 'en' ? 'bg-amber-500 text-stone-950' : 'text-stone-300'}`}>EN</button>
              <button onClick={() => setLanguage('hi')} className={`px-1 rounded ${language === 'hi' ? 'bg-amber-500 text-stone-950' : 'text-stone-300'}`}>HI</button>
              <button onClick={() => setLanguage('bn')} className={`px-1 rounded ${language === 'bn' ? 'bg-amber-500 text-stone-950' : 'text-stone-300'}`}>BN</button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-stone-300 hover:bg-stone-800 transition-colors"
              title="Search Cakes"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-stone-300 hover:bg-rose-950/60 transition-colors hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Selected Cakes Tray Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Order</span>
              {cartItemsCount > 0 && (
                <span className="bg-white text-emerald-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-card mx-3 my-2 p-4 bg-stone-900 shadow-2xl border border-amber-500/40 rounded-2xl">
          <nav className="flex flex-col gap-1.5 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  pathname === link.href
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-200 hover:bg-stone-800'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-stone-950" />}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search Drawer */}
      {isSearchOpen && (
        <div className="glass-card mx-3 sm:mx-8 my-2 max-w-3xl sm:mx-auto p-3 bg-stone-900 shadow-2xl border border-amber-500/40 rounded-2xl">
          <div className="relative flex items-center gap-2">
            <Search className="absolute left-3 w-4 h-4 text-amber-400" />
            <input
              type="text"
              placeholder={isListeningVoice ? 'Listening...' : 'Search cakes by name or flavor...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-12 py-2.5 text-xs rounded-xl border border-stone-700 bg-stone-800 text-stone-100 focus:outline-none"
              autoFocus
            />
            <button onClick={handleVoiceSearch} className={`absolute right-9 p-1.5 rounded-full ${isListeningVoice ? 'bg-rose-500 text-white animate-pulse' : 'text-stone-400'}`}>
              <Mic className="w-4 h-4" />
            </button>
            <button onClick={() => setIsSearchOpen(false)} className="absolute right-2 text-stone-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          {searchQuery.trim() && (
            <div className="mt-2 max-h-60 overflow-y-auto divide-y divide-stone-800">
              {filteredSearchCakes.map((c) => (
                <div key={c.id} onClick={() => { setQuickViewCake(c); setIsSearchOpen(false); }} className="p-2 flex items-center justify-between hover:bg-stone-800 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-stone-100 text-xs">{c.name}</p>
                      <p className="text-[10px] text-stone-400">{c.category}</p>
                    </div>
                  </div>
                  <span className="font-bold text-amber-400 text-xs">{formatCurrency(c.price, shopSettings.currencySymbol)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
