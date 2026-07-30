'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { shopSettings, addSellerMessage } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    addSellerMessage({
      customerName: name,
      phone: phone,
      message: `[Email: ${email}] ${message}`,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Anytime',
    });

    setIsSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          We Would Love to Hear From You
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Contact Our Bakery
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Have questions regarding wedding orders, party bulk orders, or custom designs? Get in touch with our executive bakers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="glass-card p-6 border border-amber-200/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-base text-stone-900 dark:text-stone-100">Call Us Directly</h3>
            <p className="text-xs text-stone-500">Speak to our order desk representative:</p>
            <a href={`tel:${shopSettings.contactPhone}`} className="font-bold text-amber-600 dark:text-amber-400 text-sm block">
              {shopSettings.contactPhone}
            </a>
          </div>

          <div className="glass-card p-6 border border-amber-200/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-base text-stone-900 dark:text-stone-100">WhatsApp Instant Chat</h3>
            <p className="text-xs text-stone-500">Send custom cake pictures on WhatsApp:</p>
            <a
              href={`https://wa.me/${shopSettings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
            >
              Open WhatsApp Chat
            </a>
          </div>

          <div className="glass-card p-6 border border-amber-200/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-base text-stone-900 dark:text-stone-100">Visit Our Bakery</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{shopSettings.address}</p>
            <div className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5" /> Mon-Sun: 8:00 AM - 10:00 PM
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-10 border border-amber-200/80 rounded-3xl space-y-6">
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 dark:text-stone-100">
            Send Us a Quick Message
          </h2>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="font-serif-luxury font-bold text-lg text-emerald-900 dark:text-emerald-100">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Thank you for contacting {shopSettings.shopName}. Our customer support executive will call you within 15 minutes!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">Message / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message, custom event details, or general inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}

          {/* Embedded Google Map Placeholder */}
          <div className="pt-4 border-t border-amber-100 dark:border-amber-900">
            <h4 className="font-bold text-stone-800 dark:text-stone-200 text-xs mb-2">Bakery Store Location Map</h4>
            <div className="w-full h-48 rounded-2xl bg-amber-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 text-xs font-semibold border border-amber-200">
              📍 Map Preview: {shopSettings.address} (3-Hour Express Radius)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
