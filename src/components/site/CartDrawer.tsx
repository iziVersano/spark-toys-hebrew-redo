"use client";

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity, isLoading, formatCartPrice } = useCart();
  const items = cart?.items ?? [];
  const total = cart?.totals.total_price ?? "0";

  const checkoutUrl = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/checkout/`;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col p-0" dir="rtl">
        <SheetHeader className="px-6 py-5 border-b border-border/60">
          <SheetTitle className="flex items-center gap-2 text-navy text-xl font-extrabold">
            <ShoppingCart className="h-5 w-5 text-coral" />
            עגלת הקניות
            {items.length > 0 && (
              <span className="mr-auto text-sm font-medium text-muted-foreground">
                {cart?.items_count} פריטים
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
              <div className="h-20 w-20 rounded-2xl bg-cream flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-navy/30" />
              </div>
              <p className="text-lg font-bold text-navy">העגלה ריקה</p>
              <p className="text-muted-foreground text-sm">הוסיפו מוצרים ותתחילו לקנות</p>
              <Button
                onClick={closeCart}
                className="rounded-full bg-navy text-white mt-2"
              >
                המשיכו לקנות
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-4 p-4 bg-cream rounded-2xl">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-white shrink-0">
                  {item.images[0] ? (
                    <Image
                      src={item.images[0].src}
                      alt={item.images[0].alt || item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-cream flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-navy/30" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy line-clamp-2 leading-snug">{item.name}</p>
                  <p className="text-base font-extrabold text-coral mt-1">
                    ₪{formatCartPrice(item.prices.price)}
                  </p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      disabled={isLoading || item.quantity <= 1}
                      className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-navy hover:bg-muted disabled:opacity-40"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-bold text-navy w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      disabled={isLoading}
                      className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-navy hover:bg-muted disabled:opacity-40"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.key)}
                      disabled={isLoading}
                      className="mr-auto h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-coral hover:bg-coral/10 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border/60 bg-background space-y-3">
            <div className="flex items-center justify-between text-base font-bold text-navy">
              <span>{'סה"כ לתשלום'}</span>
              <span className="text-xl font-extrabold text-coral">₪{formatCartPrice(total)}</span>
            </div>
            <a
              href={checkoutUrl}
              className="flex items-center justify-center gap-2 w-full h-13 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5"
            >
              לתשלום
              <ArrowLeft className="h-5 w-5" />
            </a>
            <button
              onClick={closeCart}
              className="w-full h-11 rounded-full border border-border text-navy font-medium text-sm hover:bg-cream transition-colors"
            >
              המשיכו לקנות
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
