import { NextResponse } from "next/server";
import { getCategories } from "@/lib/woocommerce";

export const revalidate = 300;

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 502 });
  }
}
