import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProducts } from "@/lib/woocommerce";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params: Record<string, string> = {};

  // Forward safe query params to WooCommerce
  const allowed = ["per_page", "page", "category", "featured", "orderby", "order", "search"];
  for (const key of allowed) {
    const val = searchParams.get(key);
    if (val) params[key] = val;
  }

  try {
    const products = await getProducts(params);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 502 });
  }
}
