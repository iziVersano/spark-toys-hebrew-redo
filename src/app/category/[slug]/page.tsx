import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { getCategories, getProductsByCategory, formatPrice } from "@/lib/woocommerce";

const BG_CYCLE = ["bg-sky-soft", "bg-mint-soft", "bg-sun-soft", "bg-lilac-soft", "bg-coral-soft"];

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const categories = await getCategories({ per_page: "50" }).catch(() => []);
  const cat = categories.find((c) => c.slug === decoded || c.slug === slug);
  const name = cat?.name ?? decoded;
  return {
    title: `${name} — Spark Toys`,
    description: `גלו את כל מוצרי ${name} של Spark Toys`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [products, categories] = await Promise.allSettled([
    getProductsByCategory(slug),
    getCategories({ per_page: "50" }),
  ]);

  const productList = products.status === "fulfilled" ? products.value : [];
  const categoryList = categories.status === "fulfilled" ? categories.value : [];
  const cat = categoryList.find((c) => c.slug === decodeURIComponent(slug) || c.slug === slug);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-coral transition-colors">בית</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-coral transition-colors">כל המוצרים</Link>
          <span>/</span>
          <span className="text-navy font-semibold">{cat?.name ?? slug}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy">{cat?.name ?? slug}</h1>
          {cat?.description && (
            <p className="mt-2 text-muted-foreground text-lg">{cat.description}</p>
          )}
          <p className="mt-1 text-muted-foreground">{productList.length} מוצרים</p>
        </div>

        {productList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-6">לא נמצאו מוצרים בקטגוריה זו</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-navy text-white font-bold"
            >
              לכל המוצרים <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
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
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[32px]">
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
      </main>
      <Footer />
    </div>
  );
}
