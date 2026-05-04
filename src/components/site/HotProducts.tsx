import { Flame, ShoppingCart } from "lucide-react";
import productClock from "@/assets/product-clock.png";
import productGuitar from "@/assets/product-guitar.png";
import productMic from "@/assets/product-mic.png";
import productCube from "@/assets/product-cube.png";

const hotProducts = [
  { name: "השעון הראשון שלי", price: 139, img: productClock, bg: "bg-sky-soft" },
  { name: "הגיטרה הראשונה שלי", price: 159, img: productGuitar, bg: "bg-mint-soft" },
  { name: "המיקרופון שלי", price: 99, img: productMic, bg: "bg-lilac-soft" },
  { name: "הקובייה הלומדת", price: 179, img: productCube, bg: "bg-coral-soft" },
];

export function HotProducts() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 justify-end">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">חם עכשיו</h2>
          <Flame className="h-6 w-6 text-coral animate-pulse" />
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {hotProducts.map((p) => (
            <article
              key={p.name}
              className="snap-start shrink-0 w-44 sm:w-52 bg-white rounded-2xl border border-border/60 hover:border-coral/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col p-4"
            >
              {/* Flame badge */}
              <span className="self-end text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral text-white mb-2 flex items-center gap-1">
                <Flame className="h-3 w-3" />
                חם
              </span>

              {/* Image */}
              <div className={`aspect-square rounded-xl ${p.bg} flex items-center justify-center mb-3 overflow-hidden`}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-[70%] h-[70%] object-contain drop-shadow-md"
                />
              </div>

              <h3 className="text-sm font-bold text-navy line-clamp-1 text-right">{p.name}</h3>

              <div className="mt-3 flex items-center justify-between">
                <button
                  aria-label={`הוסף לעגלה: ${p.name}`}
                  className="h-8 w-8 rounded-full bg-coral-soft text-coral flex items-center justify-center hover:bg-coral hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </button>
                <span className="text-lg font-extrabold text-navy">₪{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
