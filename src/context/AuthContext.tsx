'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ShippingAddress, Reminder, MembershipTier } from '@/types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, role?: 'customer' | 'admin') => void;
  loginWithOTP: (phone: string, otp: string) => boolean;
  register: (name: string, email: string, phone: string, referralCode?: string) => void;
  logout: () => void;
  addAddress: (address: Omit<ShippingAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
  addWalletBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  id: 'usr-101',
  name: 'Eleanor Vance',
  email: 'eleanor@example.com',
  phone: '+1 (555) 234-5678',
  role: 'customer',
  loyaltyPoints: 350,
  walletBalance: 50.0,
  membershipTier: 'Gold',
  referralCode: 'SWEET-ELEANOR',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Eleanor Vance',
      phone: '+1 (555) 234-5678',
      streetAddress: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      pinCode: '62704',
      isDefault: true,
    },
  ],
  reminders: [
    {
      id: 'rem-1',
      title: "Mom's 50th Birthday",
      personName: 'Margaret Vance',
      date: '2026-08-15',
      type: 'Birthday',
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('sdc_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    }
  }, []);

  const saveUserToStorage = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem('sdc_user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('sdc_user');
    }
  };

  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      ...defaultUser,
      email,
      role,
      name: role === 'admin' ? 'Bakery Admin Master' : email.split('@')[0],
    };
    saveUserToStorage(newUser);
  };

  const loginWithOTP = (phone: string, otp: string): boolean => {
    if (otp === '1234' || otp.length === 4) {
      const newUser: User = {
        ...defaultUser,
        phone,
        name: `Customer (${phone.slice(-4)})`,
      };
      saveUserToStorage(newUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, referralCode?: string) => {
    const bonusPoints = referralCode ? 100 : 50;
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      loyaltyPoints: bonusPoints,
      walletBalance: 25.0,
      membershipTier: 'Silver',
      referralCode: `SDC-${name.slice(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      addresses: [],
      reminders: [],
    };
    saveUserToStorage(newUser);
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const addAddress = (addressData: Omit<ShippingAddress, 'id'>) => {
    if (!user) return;
    const newAddr: ShippingAddress = { ...addressData, id: `addr-${Date.now()}` };
    const updated = {
      ...user,
      addresses: [...user.addresses, newAddr],
    };
    saveUserToStorage(updated);
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    };
    saveUserToStorage(updated);
  };

  const addReminder = (reminderData: Omit<Reminder, 'id'>) => {
    if (!user) return;
    const newRem: Reminder = { ...reminderData, id: `rem-${Date.now()}` };
    const updated = {
      ...user,
      reminders: [...user.reminders, newRem],
    };
    saveUserToStorage(updated);
  };

  const deleteReminder = (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      reminders: user.reminders.filter((r) => r.id !== r.id),
    };
    saveUserToStorage(updated);
  };

  const addWalletBalance = (amount: number) => {
    if (!user) return;
    const updated = {
      ...user,
      walletBalance: Number((user.walletBalance + amount).toFixed(2)),
    };
    saveUserToStorage(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithOTP,
        register,
        logout,
        addAddress,
        deleteAddress,
        addReminder,
        deleteReminder,
        addWalletBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
