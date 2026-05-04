import { Flame, ShoppingCart } from "lucide-react";
import productClock from "@/assets/product-clock.png";
import productGuitar from "@/assets/product-guitar.png";
import productCube from "@/assets/product-cube.png";

const hotProducts = [
  { name: "השעון הראשון שלי", price: 139, img: productClock, bg: "bg-sky-soft" },
  { name: "הגיטרה הראשונה שלי", price: 159, img: productGuitar, bg: "bg-mint-soft" },
  { name: "קובייה קסומה", price: 119, img: productCube, bg: "bg-sun-soft" },
];

export function HotProducts() {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-5">
            <Flame className="h-3.5 w-3.5" />
            חמים החודש
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            מוצרים חמים <span className="text-coral">של החודש</span>
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {hotProducts.map((p) => (
            <article
              key={p.name}
              className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-border/60 hover:border-coral/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
            >
              <span className="self-end text-[11px] font-bold px-2.5 py-1 rounded-full bg-coral text-white mb-3 flex items-center gap-1 leading-none">
                <Flame className="h-3 w-3" />
                חם
              </span>

              <div className={`aspect-square rounded-2xl ${p.bg} flex items-center justify-center mb-4 overflow-hidden`}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="eager"
                  className="w-[75%] h-[75%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-navy line-clamp-1 text-right">{p.name}</h3>

              <div className="mt-4 flex items-center justify-between">
                <button
                  aria-label={`הוסף לעגלה: ${p.name}`}
                  className="h-10 w-10 rounded-full bg-coral-soft text-coral flex items-center justify-center hover:bg-coral hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
                <span className="text-2xl font-extrabold text-navy">₪{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
