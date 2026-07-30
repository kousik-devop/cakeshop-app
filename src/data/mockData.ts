import { Cake, Category, Offer, Review, ShopSettings, BlogPost, AppNotification } from '@/types';

export const initialShopSettings: ShopSettings = {
  shopName: 'Sweet Delight Cakes',
  tagline: 'Crafting Sweet Memories One Cake at a Time',
  contactEmail: 'orders@sweetdelightcakes.com',
  contactPhone: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  address: '124 Luxury Bakery Lane, Gourmet Avenue, New Delhi, 110001',
  currencySymbol: '₹',
  freeShippingMinOrder: 499,
  heroNoticeBanner: '🎉 Welcome to Sweet Delight Cakes! Freshly baked custom cakes available.',
  heroSliderImages: [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1400&q=80',
  ],
};

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Birthday Cakes',
    slug: 'birthday-cakes',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant & delicious cakes designed to make every birthday unforgettable.',
    iconName: 'Cake',
  },
  {
    id: 'cat-2',
    name: 'Wedding Cakes',
    slug: 'wedding-cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    description: 'Elegant multi-tiered masterpieces handcrafted for your dream wedding.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'cat-3',
    name: 'Anniversary Cakes',
    slug: 'anniversary-cakes',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    description: 'Romantic floral & gold leaf creations celebrating timeless love.',
    iconName: 'Heart',
  },
  {
    id: 'cat-4',
    name: 'Kids Cakes',
    slug: 'kids-cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
    description: 'Fun, colorful cartoon and superhero themed cakes kids adore.',
    iconName: 'Sparkles',
  },
  {
    id: 'cat-5',
    name: 'Photo Cakes',
    slug: 'photo-cakes',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80',
    description: 'High-definition edible sugar print photo cakes personalized for you.',
    iconName: 'Camera',
  },
  {
    id: 'cat-6',
    name: 'Chocolate Cakes',
    slug: 'chocolate-cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Decadent Belgian chocolate, truffle, and nut-filled chocolate delights.',
    iconName: 'Dessert',
  },
];

// Completely empty initial cakes list as requested by user
export const initialCakes: Cake[] = [];

export const initialOffers: Offer[] = [];

export const initialReviews: Review[] = [];

export const initialBlogs: BlogPost[] = [];

export const initialNotifications: AppNotification[] = [];

export const faqsList: { question: string; answer: string; category: string }[] = [];
