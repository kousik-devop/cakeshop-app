'use client';

import React, { useState } from 'react';
import { faqsList } from '@/data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Got Questions? We Have Answers
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqsList.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card border border-amber-200/80 dark:border-amber-900/60 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 dark:text-stone-100 text-sm hover:text-amber-600"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-amber-100 dark:border-amber-900/40 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
