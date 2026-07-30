'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency, calculateDiscountedPrice } from '@/lib/utils';
import {
  CreditCard,
  Building,
  Smartphone,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Tag,
  MapPin,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    appliedCoupon,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    createOrder,
    shopSettings,
  } = useShop();
  const { user } = useAuth();

  // Form states
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses[0]?.streetAddress || '124 Celebration St');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Metropolis');
  const [state, setState] = useState(user?.addresses[0]?.state || 'NY');
  const [pinCode, setPinCode] = useState(user?.addresses[0]?.pinCode || '10001');

  const [deliverySlot, setDeliverySlot] = useState('Morning (9 AM - 12 PM)');
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'Stripe' | 'UPI' | 'Card' | 'NetBanking' | 'COD'>('Razorpay');

  const [couponInput, setCouponInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = couponDiscountPercent ? (cartTotal * couponDiscountPercent) / 100 : 0;
  const deliveryFee = cartTotal >= shopSettings.freeShippingMinOrder ? 0 : 4.99;
  const finalAmount = cartTotal - discountAmount + deliveryFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) applyCoupon(couponInput);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city || !pinCode) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newOrd = createOrder({
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName,
          phone,
          streetAddress: street,
          city,
          state,
          pinCode,
        },
        deliverySlot,
        deliveryDate,
        totalAmount: cartTotal,
        discountAmount,
        deliveryFee,
        finalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'COD' : 'Paid',
      });

      setIsProcessing(false);
      router.push(`/order-success?orderId=${newOrd.id}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold">Your Cart is Empty</h2>
        <p className="text-xs text-stone-500">Add some delicious cakes to proceed with checkout.</p>
        <button
          onClick={() => router.push('/collection')}
          className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs"
        >
          Explore Cakes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Secure 256-bit Encrypted Payment
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Bakery Order Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="glass-card p-6 sm:p-8 border border-amber-200/80 rounded-3xl space-y-4">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" /> Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">City & State</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                  />
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">PIN Code</label>
                <input
                  type="text"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Delivery Slot Selection */}
          <div className="glass-card p-6 sm:p-8 border border-amber-200/80 rounded-3xl space-y-4">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" /> Select Preferred Delivery Slot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Delivery Date</label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Time Window</label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                  <option>Midnight Surprise (11:30 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Gateway Options */}
          <div className="glass-card p-6 sm:p-8 border border-amber-200/80 rounded-3xl space-y-4">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Payment Gateway Option
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'Razorpay', label: 'Razorpay Instant', icon: Sparkles },
                { id: 'Stripe', label: 'Stripe Pay', icon: CreditCard },
                { id: 'UPI', label: 'UPI / QR Code', icon: Smartphone },
                { id: 'Card', label: 'Credit/Debit Card', icon: CreditCard },
                { id: 'NetBanking', label: 'Net Banking', icon: Building },
                { id: 'COD', label: 'Cash on Delivery', icon: Truck },
              ].map((pm) => {
                const IconComp = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3.5 rounded-2xl border text-left font-bold transition-all flex items-center gap-2 ${
                      paymentMethod === pm.id
                        ? 'bg-amber-500 text-amber-950 border-amber-500 shadow-md scale-105'
                        : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary & Pay Button */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border border-amber-300 dark:border-amber-800 rounded-3xl space-y-6 sticky top-28 shadow-xl">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-amber-900 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
              {cart.map((item, idx) => {
                const price = calculateDiscountedPrice(item.cake.price, item.cake.discountPercent);
                return (
                  <div key={idx} className="flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{item.cake.name}</p>
                      <p className="text-[10px] text-stone-400">
                        {item.selectedWeight} • {item.selectedFlavor} x{item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-amber-600 shrink-0">
                      {formatCurrency(price * item.quantity, shopSettings.currencySymbol)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Coupon Application */}
            <div className="pt-3 border-t border-amber-100 dark:border-amber-900 space-y-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 uppercase"
                />
                <button type="submit" className="px-3 py-1.5 bg-amber-900 text-white font-bold text-xs rounded-xl">
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>Coupon {appliedCoupon}</span>
                  <button onClick={removeCoupon} className="text-rose-500 underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 pt-3 border-t border-amber-100 dark:border-amber-900">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal, shopSettings.currencySymbol)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-500 font-bold">
                  <span>Promo Discount ({couponDiscountPercent}%)</span>
                  <span>-{formatCurrency(discountAmount, shopSettings.currencySymbol)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee, shopSettings.currencySymbol)}</span>
              </div>
              <div className="flex justify-between font-serif-luxury font-black text-xl text-amber-950 dark:text-amber-100 pt-2 border-t border-amber-100 dark:border-amber-900">
                <span>Final Payable</span>
                <span className="text-amber-600 dark:text-amber-400">
                  {formatCurrency(finalAmount, shopSettings.currencySymbol)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl gold-button-gradient font-black text-sm shadow-xl flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" /> Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Place Order ({paymentMethod})
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
