import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import catDevelopment from "@/assets/category-development.jpg";
import catRobots from "@/assets/category-robots.jpg";
import catBlox from "@/assets/category-blox.jpg";
import catWood from "@/assets/category-wood.jpg";
import catBooks from "@/assets/category-books.jpg";
import catMusic from "@/assets/category-music.jpg";

const categories = [
  { name: "צעצועי התפתחות", img: catDevelopment, to: "/", accent: "from-coral/70" },
  { name: "רובוטים", img: catRobots, to: "/", accent: "from-mint/70" },
  { name: "Spark BloX", img: catBlox, to: "/", accent: "from-sun/70" },
  { name: "צעצועי עץ", img: catWood, to: "/", accent: "from-lilac/70" },
  { name: "ספרים אינטראקטיביים", img: catBooks, to: "/", accent: "from-sky/70" },
  { name: "מוסיקה וכלי נגינה", img: catMusic, to: "/", accent: "from-coral/70" },
];

export function Categories() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream/40">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 text-coral text-sm font-bold tracking-widest uppercase mb-3">
            <Sparkles className="h-4 w-4" />
            קטגוריות
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            גלו עולם של משחק ולמידה
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            מגוון רחב של קטגוריות שיתאימו לכל ילד ולכל שלב התפתחותי.
          </p>
        </div>

        {/* Grid — editorial style: title on image */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={cat.to}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-1" : ""}`}
            >
              {/* Aspect ratio wrapper */}
              <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/7] md:aspect-[16/8]" : "aspect-square"}`}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay — always visible, darkens on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />

                {/* Title always visible on image */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-white font-extrabold text-lg sm:text-xl lg:text-2xl leading-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white/90 text-sm font-semibold">לקטגוריה</span>
                    <ArrowLeft className="h-4 w-4 text-white/90" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
