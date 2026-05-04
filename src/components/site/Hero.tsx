import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";
import productGuitar from "@/assets/product-guitar.png";

export function Hero() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream">
          <div className="grid lg:grid-cols-2 min-h-[540px] lg:min-h-[620px]">

            {/* TEXT PANEL */}
            <div className="relative z-10 order-2 lg:order-1 bg-cream px-6 sm:px-10 lg:px-14 py-10 lg:py-16 flex flex-col justify-center text-right">

              {/* Badge */}
              <div className="inline-flex self-end items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-soft mb-6 ring-1 ring-black/5">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                חדש בקטלוג — סדרת המוסיקה
              </div>

              {/* Headline */}
              <h1 className="font-display text-[2.6rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold leading-[1.05] text-coral text-balance">
                יותר ממשחק,
                <br />
                <span className="text-navy relative">
                  עולם של למידה.
                  <svg aria-hidden viewBox="0 0 220 12" className="absolute -bottom-2 right-0 w-full" fill="none">
                    <path d="M4 8 Q55 2 110 8 Q165 14 216 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </span>
              </h1>

              <p className="mt-7 text-lg sm:text-xl text-navy/70 leading-relaxed max-w-md mr-0 ml-auto lg:ml-0">
                Spark Toys יוצרים צעצועים אינטראקטיביים וחינוכיים שעוזרים לילדים להתפתח דרך מוסיקה, צלילים ומשחק.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button className="group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-coral text-white font-bold text-base shadow-pop hover:bg-coral/90 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                  גלו את המוצרים
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                </button>
                <button className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-white text-navy font-bold text-base border border-border hover:border-navy/20 hover:shadow-soft transition-all duration-200 cursor-pointer">
                  לפי שלבי התפתחות
                </button>
              </div>

              {/* Trust chips */}
              <div className="mt-8 flex flex-wrap justify-end items-center gap-3">
                {[
                  { icon: ShieldCheck, text: "תוכן בעברית מלאה", color: "text-mint" },
                  { icon: Star, text: "מותאם לגילאי 0–3+", color: "text-sun" },
                  { icon: Truck, text: "משלוח מהיר", color: "text-sky" },
                ].map(({ icon: Icon, text, color }) => (
                  <span key={text} className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/65">
                    <Icon className={`h-4 w-4 ${color}`} strokeWidth={2} />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* IMAGE PANEL */}
            <div className="relative order-1 lg:order-2 min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden">
              <img
                src={heroChild}
                alt="ילד משחק עם צעצוע למידה אינטראקטיבי של Spark Toys"
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Gradient blends */}
              <div aria-hidden className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent pointer-events-none hidden lg:block" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none lg:hidden" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cream/30 to-transparent pointer-events-none lg:hidden" />

              {/* Floating product card */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-card p-3 flex items-center gap-3 ring-1 ring-black/5 max-w-[180px]">
                <div className="h-12 w-12 rounded-xl bg-mint-soft flex items-center justify-center shrink-0">
                  <img src={productGuitar} alt="" aria-hidden className="h-9 w-9 object-contain" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-navy leading-tight">הגיטרה הראשונה שלי</p>
                  <p className="text-sm font-extrabold text-coral mt-0.5">₪159</p>
                </div>
              </div>

              {/* Stars rating badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full shadow-soft px-3 py-1.5 flex items-center gap-1.5 ring-1 ring-black/5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-sun fill-sun" />
                  ))}
                </div>
                <span className="text-xs font-bold text-navy">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
