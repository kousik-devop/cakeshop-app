'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const { shopSettings } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Welcome to ${shopSettings.shopName}! 🎂 How can our executive pastry team help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');

    // Generate automated smart bakery bot response
    setTimeout(() => {
      let botReply = `Thank you for your message! Our head baker will inspect your request shortly. You can also call us directly at ${shopSettings.contactPhone}.`;
      const lower = userText.toLowerCase();

      if (lower.includes('eggless')) {
        botReply = 'Yes! Almost all of our cakes can be prepared 100% Eggless with equal softness and premium taste!';
      } else if (lower.includes('delivery') || lower.includes('time') || lower.includes('pin')) {
        botReply = 'We offer 3-Hour Express Local Delivery for menu cakes! Enter your PIN code on any cake page or checkout to verify.';
      } else if (lower.includes('custom') || lower.includes('photo') || lower.includes('design')) {
        botReply = 'You can design your custom cake with custom weights, colors, writing, and reference pictures on our "Custom Cake Order" page!';
      } else if (lower.includes('discount') || lower.includes('offer') || lower.includes('coupon')) {
        botReply = 'Use coupon WELCOME20 at checkout for flat 20% OFF your first cake order!';
      }

      const replyMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-amber-500 via-rose-400 to-amber-600 text-amber-950 p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-2 border-white dark:border-stone-900"
          title="Open Live Chat"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="font-bold text-xs hidden sm:inline">Live Chat</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 glass-card bg-white dark:bg-stone-900 shadow-2xl border border-amber-300 dark:border-amber-800 rounded-3xl overflow-hidden flex flex-col h-[460px]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-500 via-rose-400 to-amber-600 text-amber-950 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-950 text-amber-200 flex items-center justify-center font-bold text-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-sm leading-tight">{shopSettings.shopName} Assistant</h4>
                <span className="text-[10px] text-emerald-950 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Online & Ready
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-amber-950/20 text-amber-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-950/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-amber-950 font-medium rounded-tr-none shadow'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-amber-100 dark:border-amber-900 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] text-right mt-1 opacity-70">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-amber-50 dark:bg-stone-900 border-t border-amber-200/50 dark:border-amber-900/50 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => setInputMsg('Is eggless cake available?')}
              className="px-2 py-1 rounded-full bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 shrink-0"
            >
              Eggless cakes?
            </button>
            <button
              onClick={() => setInputMsg('How fast is delivery?')}
              className="px-2 py-1 rounded-full bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 shrink-0"
            >
              Delivery time?
            </button>
            <button
              onClick={() => setInputMsg('What offers are running?')}
              className="px-2 py-1 rounded-full bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 shrink-0"
            >
              Offers & Coupons?
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-stone-900 border-t border-amber-200/50 dark:border-amber-900/50 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
