import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import catDevelopment from "@/assets/category-development.jpg";
import catRobots from "@/assets/category-robots.jpg";
import catBlox from "@/assets/category-blox.jpg";
import catWood from "@/assets/category-wood.jpg";
import catBooks from "@/assets/category-books.jpg";
import catMusic from "@/assets/category-music.jpg";
import type { StaticImageData } from "next/image";

import type { StoreCategory } from "@/lib/woocommerce";
export type { StoreCategory as WCCategory };

const FALLBACK_CATEGORIES = [
  { name: "צעצועי התפתחות", img: catDevelopment, bg: "bg-coral-soft", slug: "development-toys" },
  { name: "רובוטים", img: catRobots, bg: "bg-mint-soft", slug: "robots" },
  { name: "Spark BloX אבני הרכבה", img: catBlox, bg: "bg-sun-soft", slug: "spark-blox" },
  { name: "צעצועי עץ", img: catWood, bg: "bg-lilac-soft", slug: "wooden-toys" },
  { name: "ספרים אינטראקטיביים", img: catBooks, bg: "bg-sky-soft", slug: "interactive-books" },
  { name: "מוסיקה וכלי נגינה", img: catMusic, bg: "bg-coral-soft", slug: "music" },
];

const BG_CYCLE = ["bg-coral-soft", "bg-mint-soft", "bg-sun-soft", "bg-lilac-soft", "bg-sky-soft"];

type CategoryCardProps = {
  name: string;
  bg: string;
  slug: string;
} & (
  | { kind: "static"; img: StaticImageData }
  | { kind: "remote"; remoteImg: string; alt: string }
);

function CategoryCard(props: CategoryCardProps) {
  return (
    <Link href={`/category/${props.slug}`} className="group block text-center">
      <div
        className={`relative aspect-square rounded-3xl ${props.bg} overflow-hidden border border-border/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card`}
      >
        {props.kind === "remote" ? (
          <Image
            src={props.remoteImg}
            alt={props.alt}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <Image
            src={props.img}
            alt={props.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 h-9 w-9 rounded-full bg-background/95 text-coral flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <ArrowLeft className="h-4 w-4" />
        </div>
      </div>
      <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl lg:text-2xl font-extrabold text-navy group-hover:text-coral transition-colors">
        {props.name}
      </h3>
    </Link>
  );
}

export function Categories({ categories }: { categories?: StoreCategory[] }) {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <span className="text-coral text-xl sm:text-2xl font-extrabold tracking-wider uppercase">
            קטגוריות
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            גלו עולם של משחק ולמידה
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            מגוון רחב של קטגוריות שיתאימו לכל ילד ולכל שלב התפתחותי.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories && categories.length > 0
            ? categories.map((cat, i) =>
                cat.image ? (
                  <CategoryCard
                    key={cat.id}
                    kind="remote"
                    name={cat.name}
                    remoteImg={cat.image.src}
                    alt={cat.image.alt || cat.name}
                    bg={BG_CYCLE[i % BG_CYCLE.length]}
                    slug={cat.slug}
                  />
                ) : (
                  <CategoryCard
                    key={cat.id}
                    kind="static"
                    name={cat.name}
                    img={FALLBACK_CATEGORIES[i % FALLBACK_CATEGORIES.length].img}
                    bg={BG_CYCLE[i % BG_CYCLE.length]}
                    slug={cat.slug}
                  />
                )
              )
            : FALLBACK_CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  kind="static"
                  name={cat.name}
                  img={cat.img}
                  bg={cat.bg}
                  slug={cat.slug}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
