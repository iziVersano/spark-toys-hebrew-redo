import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import yuval from "@/assets/star-yuval.jpg";
import michal from "@/assets/star-michal.jpg";
import miki from "@/assets/star-miki.jpg";
import haim from "@/assets/star-haim.jpg";
import kofiko from "@/assets/star-kofiko.jpg";
import luli from "@/assets/star-luli.jpg";
import shoshana from "@/assets/star-shoshana.jpg";

const stars = [
  { name: "יובל המבולבל", img: yuval, ring: "ring-coral/50", bg: "bg-coral-soft" },
  { name: "מיכל הקטנה",  img: michal, ring: "ring-sun/50",  bg: "bg-sun-soft"  },
  { name: "מיקי",         img: miki,   ring: "ring-mint/50", bg: "bg-mint-soft" },
  { name: "הכבשה שושנה", img: shoshana,ring: "ring-coral/50",bg: "bg-coral-soft"},
  { name: "קופיקו",       img: kofiko, ring: "ring-lilac/50",bg: "bg-lilac-soft"},
  { name: "לולי",         img: luli,   ring: "ring-sky/50",  bg: "bg-sky-soft"  },
  { name: "הדוד חיים",   img: haim,   ring: "ring-sky/50",  bg: "bg-sky-soft"  },
];

export function Stars() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-coral text-sm font-bold tracking-widest uppercase mb-3">
            <Sparkles className="h-4 w-4" />
            כוכבי הילדים
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            הדמויות האהובות בעברית
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            הכירו את הכוכבים שמלווים את הילדים בכל משחק, שיר וסיפור.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-6 pb-4 min-w-max" dir="rtl">
            {stars.map((s) => (
              <StarCard key={s.name} star={s} size="sm" />
            ))}
          </div>
        </div>

        {/* Desktop: centered grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
          {stars.map((s) => (
            <StarCard key={s.name} star={s} size="lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarCard({ star, size }: { star: (typeof stars)[number]; size: "sm" | "lg" }) {
  const w = size === "sm" ? "w-28" : "w-full";
  return (
    <Link
      to="/"
      className={`group flex flex-col items-center text-center ${size === "sm" ? "w-28 shrink-0" : ""} cursor-pointer`}
    >
      {/* Avatar circle */}
      <div
        className={`relative aspect-square ${w} rounded-full overflow-hidden ${star.bg} ring-4 ${star.ring} ring-offset-4 ring-offset-background transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-card`}
      >
        <img
          src={star.img}
          alt={star.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className={`mt-4 font-extrabold text-navy group-hover:text-coral transition-colors duration-200 leading-tight ${size === "sm" ? "text-sm" : "text-base lg:text-lg"}`}>
        {star.name}
      </h3>
    </Link>
  );
}
