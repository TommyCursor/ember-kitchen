"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { MenuItem } from "./menu-data";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ember-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const next = existing
        ? prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
      localStorage.setItem("ember-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem("ember-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      const next = qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => i.id === id ? { ...i, quantity: qty } : i);
      localStorage.setItem("ember-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("ember-cart");
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
