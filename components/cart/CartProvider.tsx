"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  addedAt: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  count: number;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "mjade-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate từ localStorage sau mount — bắt buộc chạy client-side để tránh
    // hydration mismatch, nên chấp nhận một lần re-render có chủ đích ở đây.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // hỏng dữ liệu cũ thì bỏ qua
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage đầy/không khả dụng — không chặn UI
    }
  }, [items, ready]);

  const add = useCallback((slug: string) => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug) ? prev : [...prev, { slug, addedAt: Date.now() }]
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  const value = useMemo(
    () => ({ items, add, remove, clear, has, count: items.length, ready }),
    [items, add, remove, clear, has, ready]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
