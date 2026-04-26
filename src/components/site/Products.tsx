import { ShoppingCart, ArrowLeft } from "lucide-react";
import productClock from "@/assets/product-clock.png";
import productGuitar from "@/assets/product-guitar.png";
import productBook from "@/assets/product-book.png";
import productMic from "@/assets/product-mic.png";
import productCube from "@/assets/product-cube.png";

const products = [
  { name: "השעון הראשון שלי", desc: "לומדים את השעה, זמנים ומושגים דרך משחק ושאלות", price: 139, img: productClock, bg: "bg-sky-soft" },
  { name: "הגיטרה הראשונה שלי", desc: "מכירים צלילים, קצב ושירים נשירים בעברית", price: 159, img: productGuitar, bg: "bg-mint-soft" },
  { name: "הספר המדבר שלי", desc: "סיפורים, שירים ומשפטים ללימוד והנאה", price: 149, img: productBook, bg: "bg-sun-soft" },
  { name: "המיקרופון שלי", desc: "שרים יחד ולומדים מילים בקלות ובכיף", price: 99, img: productMic, bg: "bg-lilac-soft" },
  { name: "הקובייה הלומדת", desc: "אותיות, חיות וצלילים בקובייה אחת חכמה", price: 179, img: productCube, bg: "bg-coral-soft" },
];

export function Products() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-coral text-base font-bold tracking-wider uppercase">מוצרים מובילים</span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance leading-[1.05]">
            מוצרים שמובילים למשחק ולמידה
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            אוסף מובחר של צעצועים אינטראקטיביים שילדים אוהבים והורים בוחרים שוב ושוב.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((p) => (
            <article
              key={p.name}
              className="group bg-cream rounded-3xl p-4 sm:p-5 border border-border/50 hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className={`relative aspect-square rounded-2xl ${p.bg} flex items-center justify-center mb-4 overflow-hidden`}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-[78%] h-[78%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-navy line-clamp-1">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-snug min-h-[40px]">
                {p.desc}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-navy font-extrabold text-xl">
                  ₪{p.price}
                </div>
                <button
                  aria-label={`הוסף לעגלה: ${p.name}`}
                  className="h-9 w-9 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="inline-flex items-center gap-2 h-13 px-7 rounded-full bg-navy text-primary-foreground font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5">
            צפו בכל המוצרים
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
