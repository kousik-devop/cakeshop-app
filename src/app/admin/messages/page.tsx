'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { MessageSquare, Send, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function AdminMessagesPage() {
  const { sellerMessages } = useShop();

  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(sellerMessages[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const activeMsg = sellerMessages.find((m) => m.id === selectedMsgId) || sellerMessages[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMsg) return;

    activeMsg.status = 'Replied';
    setReplySuccess(true);
    setReplyText('');
    setTimeout(() => setReplySuccess(false), 3000);
  };

  return (
    <div className="min-h-screen pb-16 bg-stone-50 dark:bg-stone-950">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div>
          <h1 className="font-serif-luxury text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Customer Inquiries & Live Chat Support
          </h1>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Reply directly to customer custom cake inquiries and quote requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Messages List */}
          <div className="glass-card p-4 rounded-3xl border border-amber-200 space-y-3">
            <h3 className="font-serif-luxury font-bold text-sm text-stone-900 dark:text-stone-100 border-b pb-2">
              Inbox ({sellerMessages.length})
            </h3>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {sellerMessages.length === 0 ? (
                <p className="text-xs text-stone-500 py-8 text-center">No customer messages yet.</p>
              ) : (
                sellerMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMsgId(msg.id)}
                    className={`p-3 rounded-2xl cursor-pointer border text-xs transition-colors ${
                      selectedMsgId === msg.id
                        ? 'bg-amber-500/20 border-amber-500 font-semibold'
                        : 'bg-white dark:bg-stone-900 border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 dark:text-stone-100">{msg.customerName}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                          msg.status === 'Unread'
                            ? 'bg-rose-500 text-white'
                            : msg.status === 'Replied'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">{msg.message}</p>
                    <span className="text-[9px] text-amber-600 block mt-1">{msg.createdAt}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Message Details & Reply Panel */}
          {activeMsg ? (
            <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-amber-200 space-y-6">
              <div className="border-b pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury font-bold text-xl text-stone-900 dark:text-stone-100">
                    Inquiry from {activeMsg.customerName}
                  </h3>
                  <span className="text-xs text-stone-500">{activeMsg.createdAt}</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                  Phone: {activeMsg.phone} {activeMsg.cakeName && `• Cake: ${activeMsg.cakeName}`}
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 text-xs space-y-3">
                <div className="flex items-center gap-4 text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Preferred Date: {activeMsg.preferredDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Time: {activeMsg.preferredTime}
                  </span>
                </div>

                <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
                  "{activeMsg.message}"
                </p>
              </div>

              {replySuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Reply sent successfully to customer!
                </div>
              )}

              <form onSubmit={handleSendReply} className="space-y-3">
                <label className="block font-serif-luxury font-bold text-sm text-stone-900 dark:text-stone-100">
                  Reply to Customer:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your response (e.g. We have confirmed your custom cake order date...)"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-button-gradient font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Reply to Customer
                </button>
              </form>
            </div>
          ) : (
            <div className="lg:col-span-2 glass-card p-12 rounded-3xl text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="text-sm font-bold">Select a message from the inbox to reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
