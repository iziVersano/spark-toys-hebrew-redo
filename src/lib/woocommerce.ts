// WooCommerce Store API v1 — public, no authentication required.
// Base: https://www.spark-toys.com/wp-json/wc/store/v1
// Prices are in minor units (agorot): 15000 = ₪150.00

const STORE_BASE = `${process.env.WOOCOMMERCE_URL}/wp-json/wc/store/v1`;

async function storeFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${STORE_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce Store API error ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Price helpers ─────────────────────────────────────────────────────────────

export function formatPrice(minorUnits: string | number): string {
  const num = typeof minorUnits === "string" ? parseInt(minorUnits, 10) : minorUnits;
  return (num / 100).toFixed(0);
}

// ─── Types ─────────────────────────────────────────────────────────────────────

export type StoreImage = {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  alt: string;
  name: string;
};

export type StoreCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: StoreImage | null;
  permalink: string;
};

export type StorePrices = {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
};

export type StoreProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: StorePrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: StoreImage[];
  categories: { id: number; name: string; slug: string; link: string }[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  add_to_cart: { text: string; url: string; minimum: number; maximum: number };
};

export type StoreCartItem = {
  key: string;
  id: number;
  quantity: number;
  name: string;
  prices: StorePrices;
  images: StoreImage[];
  permalink: string;
};

export type StoreCart = {
  items: StoreCartItem[];
  items_count: number;
  totals: {
    total_price: string;
    currency_code: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
};

// ─── API functions ─────────────────────────────────────────────────────────────

export async function getCategories(params?: Record<string, string>): Promise<StoreCategory[]> {
  return storeFetch<StoreCategory[]>("/products/categories", {
    per_page: "20",
    hide_empty: "true",
    orderby: "count",
    order: "desc",
    ...params,
  });
}

export async function getProducts(params?: Record<string, string>): Promise<StoreProduct[]> {
  return storeFetch<StoreProduct[]>("/products", {
    per_page: "16",
    ...params,
  });
}

export async function getFeaturedProducts(): Promise<StoreProduct[]> {
  // Store API doesn't have a ?featured filter — fetch recent and filter, or just fetch newest
  return storeFetch<StoreProduct[]>("/products", {
    per_page: "8",
    orderby: "date",
    order: "desc",
  });
}

export async function getProduct(slug: string): Promise<StoreProduct | null> {
  const results = await storeFetch<StoreProduct[]>("/products", { slug: decodeURIComponent(slug) });
  return results[0] ?? null;
}

export async function getProductsByCategory(
  categorySlug: string,
  params?: Record<string, string>
): Promise<StoreProduct[]> {
  return storeFetch<StoreProduct[]>("/products", {
    per_page: "24",
    category: decodeURIComponent(categorySlug),
    ...params,
  });
}
