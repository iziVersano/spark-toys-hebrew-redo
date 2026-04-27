import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { getProducts, getCategories, formatPrice } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "כל המוצרים — Spark Toys",
  description: "גלו את כל צעצועי Spark — אינטראקטיביים, חינוכיים, בעברית מלאה.",
};

const BG_CYCLE = ["bg-sky-soft", "bg-mint-soft", "bg-sun-soft", "bg-lilac-soft", "bg-coral-soft"];

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const page = params.page ?? "1";

  const [products, categories] = await Promise.allSettled([
    getProducts({
      per_page: "24",
      page,
      ...(categorySlug ? { category: decodeURIComponent(categorySlug) } : {}),
    }),
    getCategories({ per_page: "20" }),
  ]);

  const productList = products.status === "fulfilled" ? products.value : [];
  const categoryList = categories.status === "fulfilled" ? categories.value : [];

  // Filter to main Hebrew categories only (skip English duplicates + "ללא")
  const mainCategories = categoryList.filter(
    (c) => !["none", "developmental-toys", "learning-toys"].includes(c.slug) && c.count > 3
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy">כל המוצרים</h1>
          <p className="mt-2 text-muted-foreground text-lg">
            {productList.length > 0 ? `${productList.length}+ מוצרים` : ""}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar — category filter */}
          <aside className="lg:w-56 shrink-0">
            <h2 className="text-base font-extrabold text-navy mb-4">קטגוריות</h2>
            <nav className="flex flex-row lg:flex-col flex-wrap gap-2">
              <Link
                href="/shop"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  !categorySlug
                    ? "bg-navy text-white"
                    : "bg-cream text-navy hover:bg-navy/10"
                }`}
              >
                הכל
              </Link>
              {mainCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    categorySlug === cat.slug
                      ? "bg-navy text-white"
                      : "bg-cream text-navy hover:bg-navy/10"
                  }`}
                >
                  {cat.name}
                  <span className="mr-1.5 text-xs opacity-60">({cat.count})</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {productList.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">לא נמצאו מוצרים</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {productList.map((p, i) => (
                  <article
                    key={p.id}
                    className="group bg-cream rounded-3xl p-4 border border-border/50 hover:shadow-card transition-all hover:-translate-y-1"
                  >
                    <Link href={`/product/${encodeURIComponent(p.slug)}`}>
                      <div className={`relative aspect-square rounded-2xl ${BG_CYCLE[i % BG_CYCLE.length]} mb-4 overflow-hidden`}>
                        {p.images[0] ? (
                          <Image
                            src={p.images[0].src}
                            alt={p.images[0].alt || p.name}
                            fill
                            loading="lazy"
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">🧸</div>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-navy line-clamp-2 leading-snug min-h-[40px]">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-snug min-h-[32px]">
                        {stripHtml(p.short_description)}
                      </p>
                    </Link>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-navy font-extrabold text-lg">
                        ₪{formatPrice(p.prices.price)}
                      </div>
                      <AddToCartButton productId={p.id} name={p.name} />
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {productList.length === 24 && (
              <div className="mt-12 flex justify-center gap-3">
                {Number(page) > 1 && (
                  <Link
                    href={`/shop${categorySlug ? `?category=${categorySlug}&page=${Number(page) - 1}` : `?page=${Number(page) - 1}`}`}
                    className="h-11 px-6 rounded-full bg-cream text-navy font-semibold border border-border hover:bg-navy hover:text-white transition-colors"
                  >
                    הקודם
                  </Link>
                )}
                <Link
                  href={`/shop${categorySlug ? `?category=${categorySlug}&page=${Number(page) + 1}` : `?page=${Number(page) + 1}`}`}
                  className="h-11 px-6 rounded-full bg-navy text-white font-semibold hover:shadow-pop transition-all"
                >
                  הבא
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
