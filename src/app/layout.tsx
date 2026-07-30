import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ShopProvider } from '@/context/ShopContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/widgets/CartDrawer';
import { QuickViewModal } from '@/components/cake/QuickViewModal';
import { FloatingButtons } from '@/components/widgets/FloatingButtons';

export const metadata: Metadata = {
  title: 'Sweet Delight Cakes - Order Fresh Custom Cakes via WhatsApp',
  description:
    'Browse freshly baked customized cakes for birthdays, anniversaries, weddings, and celebrations. Choose your flavor, weight, and custom writing, then send directly to our WhatsApp!',
  keywords: 'cake shop, customized birthday cakes, wedding cakes, eggless cakes, bento cakes, whatsapp cake order',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Sweet Delight Cakes - Direct WhatsApp Bakery',
    description: 'Choose your dream cake and order directly via WhatsApp in 1-click.',
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased selection:bg-amber-400 selection:text-amber-950">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ShopProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
                <FloatingButtons />
              </ShopProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
