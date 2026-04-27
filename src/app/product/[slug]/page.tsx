import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, CheckCircle2, Package } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { getProduct, formatPrice } from "@/lib/woocommerce";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) return { title: "מוצר לא נמצא — Spark Toys" };
  return {
    title: `${product.name} — Spark Toys`,
    description: product.short_description.replace(/<[^>]*>/g, "").trim().slice(0, 160),
    openGraph: {
      title: product.name,
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  const price = formatPrice(product.prices.price);
  const regularPrice = formatPrice(product.prices.regular_price);
  const isOnSale = product.on_sale && product.prices.sale_price !== product.prices.regular_price;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-coral transition-colors">בית</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-coral transition-colors">כל המוצרים</Link>
          {product.categories[0] && (
            <>
              <span>/</span>
              <Link
                href={`/category/${product.categories[0].slug}`}
                className="hover:text-coral transition-colors"
              >
                {product.categories[0].name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-navy font-semibold line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream border border-border/40">
              {product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  fill
                  priority
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">🧸</div>
              )}
              {isOnSale && (
                <span className="absolute top-4 right-4 bg-coral text-white text-sm font-bold px-3 py-1 rounded-full">
                  מבצע
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.slice(0, 6).map((img) => (
                  <div
                    key={img.id}
                    className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-border/50 bg-cream"
                  >
                    <Image
                      src={img.thumbnail}
                      alt={img.alt || product.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col text-right">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-xs font-semibold text-coral bg-coral/10 px-3 py-1 rounded-full hover:bg-coral/20 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {Number(product.average_rating) > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s <= Math.round(Number(product.average_rating)) ? "fill-sun text-sun" : "text-border"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground mr-1">
                  ({product.review_count} ביקורות)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-extrabold text-coral">₪{price}</span>
              {isOnSale && (
                <span className="text-xl text-muted-foreground line-through">₪{regularPrice}</span>
              )}
            </div>

            {/* Short description */}
            <div
              className="mt-5 text-navy/80 text-base leading-relaxed prose prose-sm max-w-none text-right"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />

            {/* Stock */}
            <div className="flex items-center gap-2 mt-5">
              {product.is_in_stock ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-mint shrink-0" />
                  <span className="text-sm font-semibold text-mint">במלאי</span>
                </>
              ) : (
                <>
                  <Package className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">אזל מהמלאי</span>
                </>
              )}
            </div>

            {/* Add to cart */}
            {product.is_purchasable && product.is_in_stock && (
              <div className="mt-8 flex gap-3">
                <AddToCartButton productId={product.id} name={product.name} />
                <a
                  href={`${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/checkout/?add-to-cart=${product.id}`}
                  className="flex-1 h-14 rounded-full bg-navy text-white font-bold text-base flex items-center justify-center gap-2 hover:shadow-pop transition-all hover:-translate-y-0.5"
                >
                  קנה עכשיו
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </div>
            )}

            {/* Full description */}
            {product.description && product.description !== product.short_description && (
              <div className="mt-10 pt-8 border-t border-border/60">
                <h2 className="text-xl font-extrabold text-navy mb-4">תיאור המוצר</h2>
                <div
                  className="text-navy/80 text-base leading-relaxed prose prose-sm max-w-none text-right"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
