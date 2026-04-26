import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import catDevelopment from "@/assets/category-development.jpg";
import catRobots from "@/assets/category-robots.jpg";
import catBlox from "@/assets/category-blox.jpg";
import catWood from "@/assets/category-wood.jpg";
import catBooks from "@/assets/category-books.jpg";
import catMusic from "@/assets/category-music.jpg";

const categories = [
  { name: "צעצועי התפתחות", img: catDevelopment, bg: "bg-coral-soft", to: "/" },
  { name: "רובוטים", img: catRobots, bg: "bg-mint-soft", to: "/" },
  { name: "Spark BloX אבני הרכבה", img: catBlox, bg: "bg-sun-soft", to: "/" },
  { name: "צעצועי עץ", img: catWood, bg: "bg-lilac-soft", to: "/" },
  { name: "ספרים אינטראקטיביים", img: catBooks, bg: "bg-sky-soft", to: "/" },
  { name: "מוסיקה וכלי נגינה", img: catMusic, bg: "bg-coral-soft", to: "/" },
];

export function Categories() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <span className="text-coral text-base font-bold tracking-wider uppercase">
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
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.to}
              className="group block text-center"
            >
              <div
                className={`relative aspect-square rounded-3xl ${cat.bg} overflow-hidden border border-border/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 h-9 w-9 rounded-full bg-background/95 text-coral flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl lg:text-2xl font-extrabold text-navy group-hover:text-coral transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
