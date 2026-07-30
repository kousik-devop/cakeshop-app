'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    collection: 'Cake Collection',
    offers: 'Special Offers',
    customCake: 'Custom Cake Order',
    about: 'About Us',
    contact: 'Contact',
    blog: 'Bakery Blog',
    faq: 'FAQ',
    orderNow: 'Order Now',
    exploreCakes: 'Explore Cakes',
    whatsappOrder: 'WhatsApp Order',
    callNow: 'Call Now',
    addToCart: 'Add to Cart',
    quickView: 'Quick View',
    searchPlaceholder: 'Search by cake name or flavor...',
    eggless: '100% Eggless',
    freeDelivery: 'Free Delivery Available',
  },
  hi: {
    home: 'होम',
    collection: 'केक कलेक्शन',
    offers: 'विशेष ऑफ़र',
    customCake: 'कस्टम केक ऑर्डर',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    blog: 'बेकरी ब्लॉग',
    faq: 'सवाल-जवाब',
    orderNow: 'ऑर्डर करें',
    exploreCakes: 'केक देखें',
    whatsappOrder: 'व्हाट्सएप ऑर्डर',
    callNow: 'कॉल करें',
    addToCart: 'कार्ट में जोड़ें',
    quickView: 'त्वरित देखें',
    searchPlaceholder: 'केक नाम या स्वाद से खोजें...',
    eggless: '100% बिना अंडा (Eggless)',
    freeDelivery: 'मुफ्त डिलीवरी उपलब्ध',
  },
  bn: {
    home: 'হোম',
    collection: 'কেক কালেকশন',
    offers: 'বিশেষ অফার',
    customCake: 'কাস্টম কেক অর্ডার',
    about: 'আমাদের সম্পর্কে',
    contact: 'যোগাযোগ',
    blog: 'বেকরি ব্লগ',
    faq: 'প্রশ্নোত্তর',
    orderNow: 'অর্ডার করুন',
    exploreCakes: 'কেক দেখুন',
    whatsappOrder: 'হোয়াটসঅ্যাপ অর্ডার',
    callNow: 'কল করুন',
    addToCart: 'কার্টে যোগ করুন',
    quickView: 'দ্রুত দেখুন',
    searchPlaceholder: 'কেকের নাম বা ফ্লেভার দিয়ে খুঁজুন...',
    eggless: '১০০% নিরামিষ কেক (Eggless)',
    freeDelivery: 'ফ্রি ডেলিভারি উপলব্ধ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('sdc_lang') as Language | null;
    if (saved && ['en', 'hi', 'bn'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sdc_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
