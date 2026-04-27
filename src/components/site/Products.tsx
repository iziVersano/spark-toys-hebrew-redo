import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { formatPrice } from "@/lib/woocommerce";
import productClock from "@/assets/product-clock.png";
import productGuitar from "@/assets/product-guitar.png";
import productBook from "@/assets/product-book.png";
import productMic from "@/assets/product-mic.png";
import productCube from "@/assets/product-cube.png";
import type { StaticImageData } from "next/image";

import type { StoreProduct } from "@/lib/woocommerce";
export type { StoreProduct as WCProduct };

const FALLBACK_PRODUCTS = [
  { name: "השעון הראשון שלי", desc: "לומדים את השעה, זמנים ומושגים דרך משחק ושאלות", price: "139", img: productClock, bg: "bg-sky-soft", slug: "clock" },
  { name: "הגיטרה הראשונה שלי", desc: "מכירים צלילים, קצב ושירים נשירים בעברית", price: "159", img: productGuitar, bg: "bg-mint-soft", slug: "guitar" },
  { name: "הספר המדבר שלי", desc: "סיפורים, שירים ומשפטים ללימוד והנאה", price: "149", img: productBook, bg: "bg-sun-soft", slug: "book" },
  { name: "המיקרופון שלי", desc: "שרים יחד ולומדים מילים בקלות ובכיף", price: "99", img: productMic, bg: "bg-lilac-soft", slug: "mic" },
  { name: "הקובייה הלומדת", desc: "אותיות, חיות וצלילים בקובייה אחת חכמה", price: "179", img: productCube, bg: "bg-coral-soft", slug: "cube" },
];

const BG_CYCLE = ["bg-sky-soft", "bg-mint-soft", "bg-sun-soft", "bg-lilac-soft", "bg-coral-soft"];

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

type ProductCardProps = {
  name: string;
  desc: string;
  price: string;
  bg: string;
  slug: string;
  productId?: number;
} & (
  | { kind: "static"; img: StaticImageData }
  | { kind: "remote"; remoteImg: string; imgAlt: string }
);

function ProductCard(props: ProductCardProps) {
  return (
    <article className="group bg-cream rounded-3xl p-4 sm:p-5 border border-border/50 hover:shadow-card transition-all hover:-translate-y-1">
      <div className={`relative aspect-square rounded-2xl ${props.bg} flex items-center justify-center mb-4 overflow-hidden`}>
        {props.kind === "remote" ? (
          <Image
            src={props.remoteImg}
            alt={props.imgAlt}
            fill
            loading="lazy"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <Image
            src={props.img}
            alt={props.name}
            loading="lazy"
            width={400}
            height={400}
            className="w-[78%] h-[78%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
          />
        )}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-navy line-clamp-1">{props.name}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug min-h-[40px]">
        {props.desc}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-navy font-extrabold text-xl">
          ₪{props.price}
        </div>
        {props.productId ? (
          <AddToCartButton productId={props.productId} name={props.name} />
        ) : (
          <div className="h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center text-navy/30">
            <ArrowLeft className="h-4 w-4" />
          </div>
        )}
      </div>
    </article>
  );
}

export function Products({ products }: { products?: StoreProduct[] }) {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-coral text-xl sm:text-2xl font-extrabold tracking-wider uppercase">מוצרים מובילים</span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance leading-[1.05]">
            מוצרים שמובילים למשחק ולמידה
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            אוסף מובחר של צעצועים אינטראקטיביים שילדים אוהבים והורים בוחרים שוב ושוב.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products && products.length > 0
            ? products.map((p, i) => (
                <ProductCard
                  key={p.id}
                  kind="remote"
                  name={p.name}
                  desc={stripHtml(p.short_description)}
                  price={formatPrice(p.prices.price)}
                  bg={BG_CYCLE[i % BG_CYCLE.length]}
                  slug={p.slug}
                  productId={p.id}
                  remoteImg={p.images[0]?.src ?? ""}
                  imgAlt={p.images[0]?.alt || p.name}
                />
              ))
            : FALLBACK_PRODUCTS.map((p) => (
                <ProductCard
                  key={p.slug}
                  kind="static"
                  name={p.name}
                  desc={p.desc}
                  price={p.price}
                  bg={p.bg}
                  slug={p.slug}
                  img={p.img}
                />
              ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 h-13 px-7 rounded-full bg-navy text-primary-foreground font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5"
          >
            צפו בכל המוצרים
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
