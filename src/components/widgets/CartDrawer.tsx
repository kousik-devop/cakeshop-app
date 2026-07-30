'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    shopSettings,
  } = useShop();

  if (!isCartDrawerOpen) return null;

  // Construct complete WhatsApp Order message with cake links
  const handleSendFullOrderToWhatsApp = () => {
    if (cart.length === 0) return;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sweetdelightcakes.com';

    let itemsListText = '';
    cart.forEach((item, index) => {
      const price = calculateDiscountedPrice(item.cake.price, item.cake.discountPercent);
      const cakeLink = `${baseUrl}/cake/${item.cake.id}`;

      itemsListText += `${index + 1}. *${item.cake.name}*\n` +
                        `   • Weight: ${item.selectedWeight}\n` +
                        `   • Flavor: ${item.selectedFlavor}\n` +
                        `   • Eggless: ${item.isEggless ? 'Yes 🌱' : 'No'}\n` +
                        `   • Qty: ${item.quantity} x ${formatCurrency(price, shopSettings.currencySymbol)}\n` +
                        (item.customWriting ? `   • Message: "${item.customWriting}"\n` : '') +
                        `   • 🔗 Link: ${cakeLink}\n\n`;
    });

    const fullMsg = encodeURIComponent(
      `🎂 *NEW CAKE ORDER SUMMARY - ${shopSettings.shopName}*\n\n` +
      `*Selected Items*:\n${itemsListText}` +
      `*Total Amount*: ${formatCurrency(cartTotal, shopSettings.currencySymbol)}\n\n` +
      `Please confirm availability and estimated delivery time!`
    );

    window.open(`https://wa.me/${shopSettings.whatsappNumber}?text=${fullMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif-luxury text-lg font-bold text-amber-100">WhatsApp Order Tray</h3>
              <span className="bg-amber-500 text-stone-950 text-xs px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-lg text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-stone-800 flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-base font-bold">Your order tray is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Select your favorite cakes to customize weight, flavor, and message!
                </p>
                <Link
                  href="/collection"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block px-5 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-sm"
                >
                  Explore Cake Menu
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => {
                const itemPrice = calculateDiscountedPrice(item.cake.price, item.cake.discountPercent);
                return (
                  <div
                    key={`${item.cake.id}-${item.selectedFlavor}-${item.selectedWeight}-${idx}`}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex gap-3 items-center"
                  >
                    <img
                      src={item.cake.image}
                      alt={item.cake.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif-luxury font-bold text-stone-900 dark:text-stone-100 text-xs truncate">
                        {item.cake.name}
                      </h5>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        {item.selectedWeight} • {item.selectedFlavor}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-amber-600 text-xs">
                          {formatCurrency(itemPrice * item.quantity, shopSettings.currencySymbol)}
                        </span>

                        <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-900">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.cake.id, item.selectedFlavor, item.selectedWeight, item.quantity - 1)
                            }
                            className="p-1 text-stone-600 hover:text-rose-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.cake.id, item.selectedFlavor, item.selectedWeight, item.quantity + 1)
                            }
                            className="p-1 text-stone-600 hover:text-emerald-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cake.id, item.selectedFlavor, item.selectedWeight)}
                      className="text-stone-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Direct WhatsApp Button */}
          {cart.length > 0 && (
            <div className="p-4 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex justify-between font-serif-luxury font-bold text-base text-stone-900 dark:text-stone-100">
                <span>Total Estimated</span>
                <span className="text-amber-600 font-black">
                  {formatCurrency(cartTotal, shopSettings.currencySymbol)}
                </span>
              </div>

              <button
                onClick={handleSendFullOrderToWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order to WhatsApp (With Cake Links)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
