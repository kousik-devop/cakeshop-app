'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAdminUser: User = {
  id: 'usr-admin',
  name: 'Priya Maity (Admin)',
  email: 'priya2006maity@gmail.com',
  phone: '+91 98765 43210',
  role: 'admin',
  loyaltyPoints: 1000,
  membershipTier: 'Platinum',
};

const mockCustomerUser: User = {
  id: 'usr-cust-1',
  name: 'Eleanor Vance',
  email: 'customer@sweetdelightcakes.com',
  phone: '+91 98765 43210',
  role: 'customer',
  loyaltyPoints: 350,
  membershipTier: 'Gold',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Eleanor Vance',
      phone: '+91 98765 43210',
      streetAddress: '124 Gourmet Bakery Ave',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110001',
      isDefault: true,
    },
  ],
  reminders: [
    {
      id: 'rem-1',
      title: "Mom's 50th Birthday",
      personName: 'Mom',
      date: '2026-08-15',
      type: 'Birthday',
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockAdminUser);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('sdc_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(mockAdminUser);
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
      setUser(mockAdminUser);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (email.toLowerCase() === 'priya2006maity@gmail.com' && pass === 'Priyamaity123') {
      setUser(mockAdminUser);
      localStorage.setItem('sdc_user', JSON.stringify(mockAdminUser));
      return true;
    }

    if (email && pass) {
      const custUser: User = {
        ...mockCustomerUser,
        email: email,
        name: email.split('@')[0] || 'Customer',
      };
      setUser(custUser);
      localStorage.setItem('sdc_user', JSON.stringify(custUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sdc_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('sdc_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
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
