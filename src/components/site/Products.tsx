import { ShoppingCart, ArrowLeft, Sparkles } from "lucide-react";
import productClock from "@/assets/product-clock.png";
import productGuitar from "@/assets/product-guitar.png";
import productBook from "@/assets/product-book.png";
import productMic from "@/assets/product-mic.png";
import productCube from "@/assets/product-cube.png";

const products = [
  { name: "השעון הראשון שלי", desc: "לומדים את השעה, זמנים ומושגים דרך משחק ושאלות", price: 139, img: productClock, bg: "bg-sky-soft", tag: null },
  { name: "הגיטרה הראשונה שלי", desc: "מכירים צלילים, קצב ושירים בעברית", price: 159, img: productGuitar, bg: "bg-mint-soft", tag: "חדש" },
  { name: "הספר המדבר שלי", desc: "סיפורים, שירים ומשפטים ללימוד והנאה", price: 149, img: productBook, bg: "bg-sun-soft", tag: null },
  { name: "המיקרופון שלי", desc: "שרים יחד ולומדים מילים בקלות ובכיף", price: 99, img: productMic, bg: "bg-lilac-soft", tag: "מבצע" },
  { name: "הקובייה הלומדת", desc: "אותיות, חיות וצלילים בקובייה אחת חכמה", price: 179, img: productCube, bg: "bg-coral-soft", tag: null },
];

export function Products() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 text-coral text-sm font-bold tracking-widest uppercase mb-3">
            <Sparkles className="h-4 w-4" />
            מוצרים מובילים
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance leading-[1.05] text-navy">
            מוצרים שמובילים<br className="hidden sm:block" /> למשחק ולמידה
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            אוסף מובחר של צעצועים אינטראקטיביים שילדים אוהבים והורים בוחרים שוב ושוב.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-border/60 hover:border-coral/20 hover:shadow-card transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Tag badge */}
              {p.tag && (
                <span className="absolute top-3 right-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full bg-coral text-white leading-none">
                  {p.tag}
                </span>
              )}

              {/* Image */}
              <div className={`relative aspect-square rounded-2xl ${p.bg} flex items-center justify-center mb-4 overflow-hidden`}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-[75%] h-[75%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-navy line-clamp-1">{p.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug flex-1">
                {p.desc}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-navy">₪{p.price}</span>
                <button
                  aria-label={`הוסף לעגלה: ${p.name}`}
                  className="h-10 w-10 rounded-full bg-coral-soft text-coral flex items-center justify-center hover:bg-coral hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button className="group inline-flex items-center gap-2.5 h-14 px-9 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            צפו בכל המוצרים
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
