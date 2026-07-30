'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { shopSettings, addSellerMessage } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSellerMessage({
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      subject: 'Inquiry from Contact Page',
      message: message,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-stone-100">
      <div>
        <h1 className="font-serif-luxury text-3xl font-extrabold text-amber-100">
          Contact Bakery
        </h1>
        <p className="text-xs text-stone-400">Send us a message or inquiry directly.</p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="font-serif-luxury font-bold text-lg">Message Received!</h3>
          <p className="text-xs text-stone-300">We will respond to your inquiry via email/phone shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card bg-stone-900 p-6 rounded-3xl border border-amber-500/30 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1 text-stone-200">Your Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
            </div>
            <div>
              <label className="block font-bold mb-1 text-stone-200">Phone Number *</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-stone-200">Email Address *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
          </div>

          <div>
            <label className="block font-bold mb-1 text-stone-200">Message *</label>
            <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-100" />
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl gold-button-gradient font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
