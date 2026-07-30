import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toFixed(2)}`;
}

export function calculateDiscountedPrice(price: number, discountPercent: number): number {
  if (!discountPercent || discountPercent <= 0) return price;
  return Number((price - (price * discountPercent) / 100).toFixed(2));
}

export function generateOrderNumber(): string {
  const prefix = 'SDC';
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomDigits}`;
}
