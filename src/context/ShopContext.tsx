'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cake, Category, Offer, CartItem, Order, ShopSettings, SellerMessage, Review, BlogPost, AppNotification, ShippingAddress } from '@/types';
import { initialShopSettings, initialCategories, initialOffers, initialReviews, initialBlogs, initialNotifications } from '@/data/mockData';
import { generateOrderNumber, formatCurrency, calculateDiscountedPrice } from '@/lib/utils';

interface ShopContextType {
  shopSettings: ShopSettings;
  updateShopSettings: (newSettings: Partial<ShopSettings>) => void;
  cakes: Cake[];
  addCake: (cake: Omit<Cake, 'id'>) => void;
  updateCake: (id: string, cake: Partial<Cake>) => void;
  deleteCake: (id: string) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  toggleOfferStatus: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cakeId: string, flavor: string, weight: string) => void;
  updateCartQuantity: (cakeId: string, flavor: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  wishlist: Cake[];
  toggleWishlist: (cake: Cake) => void;
  isInWishlist: (cakeId: string) => boolean;
  recentlyViewedCakes: Cake[];
  addRecentlyViewed: (cake: Cake) => void;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, newStatus: Order['status'], baker?: string, courier?: string) => void;
  sellerMessages: SellerMessage[];
  addSellerMessage: (msg: Omit<SellerMessage, 'id' | 'createdAt' | 'status'>) => void;
  reviews: Review[];
  addReview: (rev: Omit<Review, 'id' | 'date'>) => void;
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'date' | 'slug'>) => void;
  deleteBlog: (id: string) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  appliedCoupon: string | null;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  quickViewCake: Cake | null;
  setQuickViewCake: (cake: Cake | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'sdc_shop_settings',
  CAKES: 'sdc_cakes',
  CATEGORIES: 'sdc_categories',
  OFFERS: 'sdc_offers',
  CART: 'sdc_cart',
  WISHLIST: 'sdc_wishlist',
  RECENTLY_VIEWED: 'sdc_recent_cakes',
  ORDERS: 'sdc_orders',
  MESSAGES: 'sdc_seller_messages',
  BLOGS: 'sdc_blogs',
  NOTIFS: 'sdc_notifications',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shopSettings, setShopSettings] = useState<ShopSettings>(initialShopSettings);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Cake[]>([]);
  const [recentlyViewedCakes, setRecentlyViewedCakes] = useState<Cake[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerMessages, setSellerMessages] = useState<SellerMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewCake, setQuickViewCake] = useState<Cake | null>(null);

  // Sync with MongoDB API on mount for multi-device data consistency
  useEffect(() => {
    async function loadBackendData() {
      try {
        const resCakes = await fetch('/api/cakes');
        const jsonCakes = await resCakes.json();
        if (jsonCakes.success && Array.isArray(jsonCakes.data)) {
          setCakes(jsonCakes.data);
          localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(jsonCakes.data));
        }
      } catch (err) {
        console.log('Using local cakes fallback:', err);
      }

      try {
        const resCats = await fetch('/api/categories');
        const jsonCats = await resCats.json();
        if (jsonCats.success && Array.isArray(jsonCats.data) && jsonCats.data.length > 0) {
          setCategories(jsonCats.data);
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(jsonCats.data));
        }
      } catch (err) {
        console.log('Using local categories fallback:', err);
      }

      try {
        const resSettings = await fetch('/api/settings');
        const jsonSettings = await resSettings.json();
        if (jsonSettings.success && jsonSettings.data) {
          setShopSettings((prev) => ({ ...prev, ...jsonSettings.data }));
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(jsonSettings.data));
        }
      } catch (err) {
        console.log('Using local settings fallback:', err);
      }
    }

    loadBackendData();
  }, []);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        setShopSettings(JSON.parse(savedSettings));
      }

      const savedCakes = localStorage.getItem(STORAGE_KEYS.CAKES);
      if (savedCakes) {
        const parsed = JSON.parse(savedCakes);
        if (Array.isArray(parsed)) {
          setCakes(parsed);
        }
      }

      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading local storage:', e);
    }
  }, []);

  const updateShopSettings = (newSettings: Partial<ShopSettings>) => {
    const updated = { ...shopSettings, ...newSettings };
    setShopSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(console.error);
  };

  const addCake = (newCakeData: Omit<Cake, 'id'>) => {
    const newCake: Cake = {
      ...newCakeData,
      id: `cake-${Date.now()}`,
      stockStatus: newCakeData.stockStatus || 'Available',
      inventoryCount: newCakeData.inventoryCount ?? 30,
    };
    const updated = [newCake, ...cakes];
    setCakes(updated);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updated));

    fetch('/api/cakes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCake),
    }).catch(console.error);
  };

  const updateCake = (id: string, cakeData: Partial<Cake>) => {
    const updated = cakes.map((c) => (c.id === id ? { ...c, ...cakeData } : c));
    setCakes(updated);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updated));

    const target = updated.find((c) => c.id === id);
    if (target) {
      fetch('/api/cakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      }).catch(console.error);
    }
  };

  const deleteCake = (id: string) => {
    const updated = cakes.filter((c) => c.id !== id);
    setCakes(updated);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updated));

    fetch(`/api/cakes?id=${id}`, {
      method: 'DELETE',
    }).catch(console.error);
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };
    const updated = [...categories, newCategory];
    setCategories(updated);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));

    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    }).catch(console.error);
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    const updated = categories.map((cat) => (cat.id === id ? { ...cat, ...categoryData } : cat));
    setCategories(updated);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));

    const target = updated.find((c) => c.id === id);
    if (target) {
      fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      }).catch(console.error);
    }
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));

    fetch(`/api/categories?id=${id}`, {
      method: 'DELETE',
    }).catch(console.error);
  };

  const addOffer = (offerData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: `offer-${Date.now()}`,
    };
    const updated = [newOffer, ...offers];
    setOffers(updated);
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  };

  const toggleOfferStatus = (id: string) => {
    const updated = offers.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o));
    setOffers(updated);
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.cake.id === item.cake.id && i.selectedFlavor === item.selectedFlavor && i.selectedWeight === item.selectedWeight
      );
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (cakeId: string, flavor: string, weight: string) => {
    setCart((prev) => {
      const updated = prev.filter(
        (i) => !(i.cake.id === cakeId && i.selectedFlavor === flavor && i.selectedWeight === weight)
      );
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  };

  const updateCartQuantity = (cakeId: string, flavor: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cakeId, flavor, weight);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.cake.id === cakeId && i.selectedFlavor === flavor && i.selectedWeight === weight ? { ...i, quantity } : i
      );
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  };

  const cartTotal = cart.reduce((total, item) => {
    const unitPrice = calculateDiscountedPrice(item.cake.price, item.cake.discountPercent);
    return total + unitPrice * item.quantity;
  }, 0);

  const toggleWishlist = (cake: Cake) => {
    setWishlist((prev) => {
      const exists = prev.some((c) => c.id === cake.id);
      const updated = exists ? prev.filter((c) => c.id !== cake.id) : [...prev, cake];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (cakeId: string) => wishlist.some((c) => c.id === cakeId);

  const addRecentlyViewed = (cake: Cake) => {
    setRecentlyViewedCakes((prev) => {
      const filtered = prev.filter((c) => c.id !== cake.id);
      const updated = [cake, ...filtered].slice(0, 6);
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
      return updated;
    });
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const defaultAddress: ShippingAddress = {
      id: 'addr-default',
      fullName: orderData.customerName || 'Guest Customer',
      phone: orderData.customerPhone || '+91 98765 43210',
      streetAddress: '124 Gourmet Bakery Ave',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110001',
    };

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customerName: orderData.customerName || 'Guest Customer',
      customerEmail: orderData.customerEmail || 'customer@example.com',
      customerPhone: orderData.customerPhone || '+91 98765 43210',
      shippingAddress: orderData.shippingAddress || defaultAddress,
      items: orderData.items || [...cart],
      totalAmount: orderData.totalAmount || cartTotal,
      status: 'Pending',
      paymentStatus: 'Paid',
      paymentMethod: 'Direct WhatsApp Order',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: 'Within 3 hours',
      bakerAssigned: 'Master Chef Antoine',
      deliveryCourier: 'Express Bakery Dispatch',
      customMessageOnCake: orderData.customMessageOnCake,
      isEggless: orderData.isEggless,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Reduce stock counts automatically
    newOrder.items.forEach((item) => {
      const targetCake = cakes.find((c) => c.id === item.cake.id);
      if (targetCake) {
        const newCount = Math.max(0, targetCake.inventoryCount - item.quantity);
        updateCake(targetCake.id, {
          inventoryCount: newCount,
          stockStatus: newCount === 0 ? 'Out of Stock' : newCount < 10 ? 'Limited Stock' : 'Available',
        });
      }
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status'], baker?: string, courier?: string) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: newStatus,
            bakerAssigned: baker || o.bakerAssigned,
            deliveryCourier: courier || o.deliveryCourier,
          }
        : o
    );
    setOrders(updated);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  };

  const addSellerMessage = (msg: Omit<SellerMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: SellerMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Unread',
    };
    const updated = [newMsg, ...sellerMessages];
    setSellerMessages(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const addReview = (rev: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const addBlog = (blogData: Omit<BlogPost, 'id' | 'date' | 'slug'>) => {
    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newBlog, ...blogs];
    setBlogs(updated);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  };

  const deleteBlog = (id: string) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const applyCoupon = (code: string): boolean => {
    const target = offers.find((o) => o.code.toUpperCase() === code.toUpperCase() && o.isActive);
    if (target) {
      setAppliedCoupon(target.code);
      setCouponDiscountPercent(target.discountPercent);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
  };

  return (
    <ShopContext.Provider
      value={{
        shopSettings,
        updateShopSettings,
        cakes,
        addCake,
        updateCake,
        deleteCake,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        offers,
        addOffer,
        toggleOfferStatus,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewedCakes,
        addRecentlyViewed,
        orders,
        createOrder,
        updateOrderStatus,
        sellerMessages,
        addSellerMessage,
        reviews,
        addReview,
        blogs,
        addBlog,
        deleteBlog,
        notifications,
        markNotificationAsRead,
        appliedCoupon,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewCake,
        setQuickViewCake,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
