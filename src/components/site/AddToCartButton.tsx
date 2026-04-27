"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function AddToCartButton({ productId, name }: { productId: number; name: string }) {
  const { addItem, isLoading } = useCart();
  return (
    <button
      aria-label={`הוסף לעגלה: ${name}`}
      disabled={isLoading}
      onClick={() => addItem(productId)}
      className="h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-colors disabled:opacity-50"
    >
      <ShoppingCart className="h-4 w-4" />
    </button>
  );
}
