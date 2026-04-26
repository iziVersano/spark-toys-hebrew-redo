import { Link } from "@tanstack/react-router";
import yuval from "@/assets/star-yuval.jpg";
import michal from "@/assets/star-michal.jpg";
import miki from "@/assets/star-miki.jpg";
import haim from "@/assets/star-haim.jpg";
import kofiko from "@/assets/star-kofiko.jpg";
import luli from "@/assets/star-luli.jpg";
import shoshana from "@/assets/star-shoshana.jpg";

const stars = [
  { name: "יובל המבולבל", img: yuval, ring: "ring-coral/40", bg: "bg-coral-soft" },
  { name: "מיכל הקטנה", img: michal, ring: "ring-sun/50", bg: "bg-sun-soft" },
  { name: "מיקי", img: miki, ring: "ring-mint/50", bg: "bg-mint-soft" },
  { name: "הדוד חיים", img: haim, ring: "ring-sky/50", bg: "bg-sky-soft" },
  { name: "קופיקו", img: kofiko, ring: "ring-lilac/50", bg: "bg-lilac-soft" },
  { name: "לולי", img: luli, ring: "ring-sky/50", bg: "bg-sky-soft" },
  { name: "הכבשה שושנה", img: shoshana, ring: "ring-coral/40", bg: "bg-coral-soft" },
];

export function Stars() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream/40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <span className="text-coral text-base font-bold tracking-wider uppercase">
            כוכבי הילדים
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            הדמויות האהובות בעברית
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            הכירו את הכוכבים שמלווים את הילדים בכל משחק, שיר וסיפור.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-5 pb-2 min-w-max" dir="rtl">
            {stars.map((s) => (
              <StarCard key={s.name} star={s} />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
          {stars.map((s) => (
            <StarCard key={s.name} star={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarCard({ star }: { star: (typeof stars)[number] }) {
  return (
    <Link
      to="/"
      className="group flex flex-col items-center text-center w-28 sm:w-32 md:w-auto shrink-0"
    >
      <div
        className={`relative aspect-square w-28 sm:w-32 md:w-full rounded-full overflow-hidden ${star.bg} ring-4 ${star.ring} ring-offset-4 ring-offset-background transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card`}
      >
        <img
          src={star.img}
          alt={star.name}
          loading="lazy"
          width={512}
          height={512}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-navy group-hover:text-coral transition-colors">
        {star.name}
      </h3>
    </Link>
  );
}
