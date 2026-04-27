"use client";

// WooCommerce Store API v1 cart — uses session cookies, no auth needed.
// Nonce is fetched on mount from /wp-json/wc/store/v1/cart and stored in state.

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import type { StoreCart, StoreCartItem } from "./woocommerce";
import { formatPrice } from "./woocommerce";

const CART_URL = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/store/v1/cart`;

type CartContextValue = {
  cart: StoreCart | null;
  itemCount: number;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  formatCartPrice: (minorUnits: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<StoreCart | null>(null);
  const [nonce, setNonce] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(CART_URL, { credentials: "include" });
      if (res.ok) {
        const newNonce = res.headers.get("X-WC-Store-API-Nonce") ?? nonce;
        if (newNonce) setNonce(newNonce);
        setCart(await res.json());
      }
    } catch {
      // Cart unavailable (e.g. cross-origin in dev) — silently ignore
    }
  }, [nonce]);

  useEffect(() => { fetchCart(); }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = useCallback(async (productId: number, quantity = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${CART_URL}/add-item`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
        },
        body: JSON.stringify({ id: productId, quantity }),
      });
      if (res.ok) {
        const newNonce = res.headers.get("X-WC-Store-API-Nonce");
        if (newNonce) setNonce(newNonce);
        await fetchCart();
        setIsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [nonce, fetchCart]);

  const removeItem = useCallback(async (itemKey: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${CART_URL}/remove-item`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
        },
        body: JSON.stringify({ key: itemKey }),
      });
      if (res.ok) await fetchCart();
    } finally {
      setIsLoading(false);
    }
  }, [nonce, fetchCart]);

  const updateQuantity = useCallback(async (itemKey: string, quantity: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${CART_URL}/update-item`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
        },
        body: JSON.stringify({ key: itemKey, quantity }),
      });
      if (res.ok) await fetchCart();
    } finally {
      setIsLoading(false);
    }
  }, [nonce, fetchCart]);

  const itemCount = cart?.items_count ?? 0;

  return (
    <CartContext.Provider value={{
      cart,
      itemCount,
      isOpen,
      isLoading,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      formatCartPrice: formatPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export type { StoreCart, StoreCartItem };
