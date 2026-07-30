export type Language = 'en' | 'hi' | 'bn';

export type StockStatus = 'Available' | 'Limited Stock' | 'Out of Stock' | 'Hidden';

export type MembershipTier = 'Silver' | 'Gold' | 'Platinum';

export interface Cake {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPercent: number;
  category: string;
  flavors: string[];
  weights: string[];
  rating: number;
  reviewsCount: number;
  isEggless: boolean;
  ingredients: string[];
  image: string;
  gallery: string[];
  deliveryTimeHours: number;
  tag?: 'Best Seller' | 'New' | 'Trending' | 'Festive' | 'Chef Choice';
  occasion: string;
  seoTitle?: string;
  seoDescription?: string;
  storageInstructions?: string;
  available: boolean;
  stockStatus: StockStatus;
  inventoryCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  iconName: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discountPercent: number;
  buyPoundsRule?: string;
  freeCupcakesRule?: string;
  validTill: string;
  bannerBg: string;
  isActive: boolean;
}

export interface GiftOptions {
  giftWrap: boolean;
  greetingCardText?: string;
  isAnonymous: boolean;
  scheduledSurpriseDate?: string;
}

export interface CartItem {
  cake: Cake;
  selectedWeight: string;
  selectedFlavor: string;
  isEggless: boolean;
  customWriting?: string;
  quantity: number;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface OrderTimelineStep {
  status: 'Pending' | 'Accepted' | 'Preparing' | 'Baking' | 'Decorating' | 'Out for Delivery' | 'Delivered';
  label: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  finalAmount: number;
  status: OrderTimelineStep['status'];
  timeline: OrderTimelineStep[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  deliverySlot: string;
  deliveryDate: string;
  paymentMethod: 'Razorpay' | 'Stripe' | 'UPI' | 'Card' | 'NetBanking' | 'COD' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending' | 'COD';
  transactionId?: string;
  assignedBaker?: string;
  assignedCourier?: string;
  giftOptions?: GiftOptions;
}

export interface Reminder {
  id: string;
  title: string;
  personName: string;
  date: string;
  type: 'Birthday' | 'Anniversary' | 'Other';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  walletBalance: number;
  membershipTier: MembershipTier;
  referralCode: string;
  addresses: ShippingAddress[];
  reminders: Reminder[];
}

export interface SellerMessage {
  id: string;
  cakeId?: string;
  cakeName?: string;
  customerName: string;
  phone: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  referenceImage?: string;
  createdAt: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface Review {
  id: string;
  cakeId: string;
  customerName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: 'Recipes' | 'Cake Care' | 'Celebration Ideas' | 'Wedding Trends';
  readTime: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'offer' | 'baking';
}

export interface ShopSettings {
  shopName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  currencySymbol: string;
  freeShippingMinOrder: number;
  heroNoticeBanner: string;
  heroSliderImages: string[];
}
