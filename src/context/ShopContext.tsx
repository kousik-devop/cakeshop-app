'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cake, Category, Offer, CartItem, Order, ShopSettings, SellerMessage, Review, BlogPost, AppNotification } from '@/types';
import { initialShopSettings, initialCakes, initialCategories, initialOffers, initialReviews, initialBlogs, initialNotifications } from '@/data/mockData';
import { generateOrderNumber, formatCurrency } from '@/lib/utils';

interface ShopContextType {
  shopSettings: ShopSettings;
  updateShopSettings: (newSettings: Partial<ShopSettings>) => void;
  cakes: Cake[];
  addCake: (cake: Omit<Cake, 'id'>) => void;
  updateCake: (id: string, cake: Partial<Cake>) => void;
  deleteCake: (id: string) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
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
  const [cakes, setCakes] = useState<Cake[]>(initialCakes);
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

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) setShopSettings(JSON.parse(savedSettings));

      const savedCakes = localStorage.getItem(STORAGE_KEYS.CAKES);
      if (savedCakes) setCakes(JSON.parse(savedCakes));

      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (savedOffers) setOffers(JSON.parse(savedOffers));

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRecent = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      if (savedRecent) setRecentlyViewedCakes(JSON.parse(savedRecent));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedMsgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (savedMsgs) setSellerMessages(JSON.parse(savedMsgs));

      const savedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    } catch (e) {
      console.error('Error reading local storage:', e);
    }
  }, []);

  const updateShopSettings = (newSettings: Partial<ShopSettings>) => {
    const updated = { ...shopSettings, ...newSettings };
    setShopSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
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
  };

  const updateCake = (id: string, updatedFields: Partial<Cake>) => {
    const updated = cakes.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    setCakes(updated);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updated));
  };

  const deleteCake = (id: string) => {
    const updated = cakes.filter((c) => c.id !== id);
    setCakes(updated);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updated));
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = { ...catData, id: `cat-${Date.now()}` };
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  };

  const addOffer = (offerData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = { ...offerData, id: `offer-${Date.now()}` };
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
    const existingIndex = cart.findIndex(
      (ci) =>
        ci.cake.id === item.cake.id &&
        ci.selectedFlavor === item.selectedFlavor &&
        ci.selectedWeight === item.selectedWeight &&
        ci.isEggless === item.isEggless
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cart, item];
    }
    setCart(updatedCart);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updatedCart));
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cakeId: string, flavor: string, weight: string) => {
    const updated = cart.filter(
      (item) => !(item.cake.id === cakeId && item.selectedFlavor === flavor && item.selectedWeight === weight)
    );
    setCart(updated);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
  };

  const updateCartQuantity = (cakeId: string, flavor: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cakeId, flavor, weight);
      return;
    }
    const updated = cart.map((item) =>
      item.cake.id === cakeId && item.selectedFlavor === flavor && item.selectedWeight === weight
        ? { ...item, quantity }
        : item
    );
    setCart(updated);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  const cartTotal = cart.reduce((total, item) => {
    const basePrice = item.cake.discountPercent
      ? item.cake.price - (item.cake.price * item.cake.discountPercent) / 100
      : item.cake.price;
    return total + basePrice * item.quantity;
  }, 0);

  const toggleWishlist = (cake: Cake) => {
    const exists = wishlist.some((c) => c.id === cake.id);
    let updated: Cake[];
    if (exists) {
      updated = wishlist.filter((c) => c.id !== cake.id);
    } else {
      updated = [...wishlist, cake];
    }
    setWishlist(updated);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
  };

  const isInWishlist = (cakeId: string) => wishlist.some((c) => c.id === cakeId);

  const addRecentlyViewed = (cake: Cake) => {
    const filtered = recentlyViewedCakes.filter((c) => c.id !== cake.id);
    const updated = [cake, ...filtered].slice(0, 8);
    setRecentlyViewedCakes(updated);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
  };

  // Order creation with Auto Stock Reduction
  const createOrder = (orderData: Partial<Order>): Order => {
    const orderNum = generateOrderNumber();
    const currentCartItems = orderData.items || cart;

    // Reduce inventory counts automatically
    const updatedCakes = cakes.map((c) => {
      const cartItem = currentCartItems.find((ci) => ci.cake.id === c.id);
      if (cartItem) {
        const newCount = Math.max(0, c.inventoryCount - cartItem.quantity);
        return {
          ...c,
          inventoryCount: newCount,
          stockStatus: newCount === 0 ? 'Out of Stock' : newCount < 10 ? 'Limited Stock' : 'Available',
        } as Cake;
      }
      return c;
    });
    setCakes(updatedCakes);
    localStorage.setItem(STORAGE_KEYS.CAKES, JSON.stringify(updatedCakes));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: currentCartItems,
      totalAmount: orderData.totalAmount || cartTotal,
      discountAmount: orderData.discountAmount || 0,
      deliveryFee: orderData.deliveryFee || 0,
      finalAmount: orderData.finalAmount || cartTotal,
      status: 'Accepted',
      timeline: [
        { status: 'Pending', label: 'Order Received', timestamp: new Date().toLocaleTimeString(), completed: true, current: false, description: 'Your order was registered.' },
        { status: 'Accepted', label: 'Order Confirmed', timestamp: new Date().toLocaleTimeString(), completed: true, current: true, description: 'Kitchen accepted your request.' },
        { status: 'Preparing', label: 'Batter & Mix', completed: false, current: false, description: 'Selecting organic ingredients.' },
        { status: 'Baking', label: 'In Oven', completed: false, current: false, description: 'Baking at 180°C.' },
        { status: 'Decorating', label: 'Icing & Topping', completed: false, current: false, description: 'Applying Belgian buttercream.' },
        { status: 'Out for Delivery', label: 'Dispatched', completed: false, current: false, description: 'Dispatched in refrigerated van.' },
        { status: 'Delivered', label: 'Delivered', completed: false, current: false, description: 'Delivered to your doorstep!' },
      ],
      customerName: orderData.customerName || 'Valued Guest',
      customerEmail: orderData.customerEmail || 'guest@example.com',
      customerPhone: orderData.customerPhone || '+1 (555) 019-2834',
      shippingAddress: orderData.shippingAddress || { id: 'addr-1', fullName: 'Guest', phone: '', streetAddress: '123 Cake St', city: 'Metropolis', state: 'NY', pinCode: '10001' },
      deliverySlot: orderData.deliverySlot || 'Morning 10:00 AM - 1:00 PM',
      deliveryDate: orderData.deliveryDate || new Date().toLocaleDateString(),
      paymentMethod: orderData.paymentMethod || 'Razorpay',
      paymentStatus: orderData.paymentStatus || 'Paid',
      transactionId: orderData.transactionId || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      assignedBaker: 'Chef Antoine Laurent',
      assignedCourier: 'Express Bakery Delivery #42',
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `🎉 Order #${orderNum} Placed!`,
      message: `Your cake order for ${formatCurrency(newOrder.finalAmount, shopSettings.currencySymbol)} is confirmed.`,
      date: 'Just now',
      read: false,
      type: 'order',
    };
    setNotifications([newNotif, ...notifications]);

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status'], baker?: string, courier?: string) => {
    const updated = orders.map((ord) => {
      if (ord.id !== orderId) return ord;

      const updatedTimeline = ord.timeline.map((step) => {
        if (step.status === newStatus) {
          return { ...step, completed: true, current: true, timestamp: new Date().toLocaleTimeString() };
        }
        return step;
      });

      return {
        ...ord,
        status: newStatus,
        timeline: updatedTimeline,
        assignedBaker: baker || ord.assignedBaker,
        assignedCourier: courier || ord.assignedCourier,
      };
    });

    setOrders(updated);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  };

  const addSellerMessage = (msgData: Omit<SellerMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: SellerMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'Unread',
    };
    const updated = [newMsg, ...sellerMessages];
    setSellerMessages(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const addReview = (revData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    setReviews([newRev, ...reviews]);
  };

  // Blog CRUD
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
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const foundOffer = offers.find((o) => o.code === formatted && o.isActive);
    if (foundOffer) {
      setAppliedCoupon(foundOffer.code);
      setCouponDiscountPercent(foundOffer.discountPercent);
      return true;
    }
    if (formatted === 'WELCOME20') {
      setAppliedCoupon('WELCOME20');
      setCouponDiscountPercent(20);
      return true;
    }
    if (formatted === 'FREECUPCAKES') {
      setAppliedCoupon('FREECUPCAKES');
      setCouponDiscountPercent(15);
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
