import { ArrowLeft, Play } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4">
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream">
          <div className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[600px]">
            {/* TEXT PANEL — right side in RTL (first in DOM, lg:order-2 places it visually right since dir=rtl) */}
            <div className="relative z-10 order-2 lg:order-1 bg-cream px-6 sm:px-10 lg:px-14 py-10 lg:py-16 flex flex-col justify-center text-right">
              {/* Tiny badge */}
              <div className="inline-flex self-end items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm text-navy/80 shadow-soft mb-5 ring-1 ring-black/5">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                חדש בקטלוג — סדרת המוסיקה
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.05] text-navy text-balance">
                יותר ממשחק,
                <br />
                <span className="text-coral">עולם של למידה.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-navy/70 leading-relaxed max-w-md mr-0 ml-auto lg:ml-0 lg:mr-0">
                Spark Toys יוצרים צעצועים אינטראקטיביים וחינוכיים שעוזרים
                לילדים להתפתח דרך מוסיקה, צלילים ומשחק.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button className="group inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-navy text-primary-foreground font-semibold text-[15px] shadow-card hover:shadow-pop transition-all hover:-translate-y-0.5">
                  גלו את המוצרים
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-white text-navy font-semibold text-[15px] border border-border hover:border-navy/30 transition-all">
                  <Play className="h-4 w-4 fill-coral text-coral" />
                  לפי שלבי התפתחות
                </button>
              </div>

              {/* Trust line */}
              <div className="mt-7 flex flex-wrap justify-end items-center gap-x-5 gap-y-2 text-sm text-navy/65">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> תוכן בעברית מלאה</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky" /> מותאם לגילאי 0–3+</span>
              </div>
            </div>

            {/* IMAGE PANEL — left side in RTL */}
            <div className="relative order-1 lg:order-2 min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-cream">
              <img
                src={heroChild}
                alt="ילד משחק עם צעצוע למידה אינטראקטיבי של Spark Toys"
                width={1200}
                height={1200}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Soft seam blend toward the text panel (right edge in RTL = left visually) */}
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent pointer-events-none hidden lg:block"
              />
              {/* Mobile: bottom fade so text panel below blends */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none lg:hidden"
              />

              {/* Floating music notes — positioned over image, brand colors */}
              <div aria-hidden className="absolute top-[22%] right-[6%] text-sky text-3xl sm:text-4xl rotate-[-10deg] drop-shadow-sm select-none">♪</div>
              <div aria-hidden className="absolute top-[34%] right-[16%] text-mint text-2xl sm:text-3xl rotate-[15deg] drop-shadow-sm select-none">♫</div>
              <div aria-hidden className="absolute top-[44%] right-[8%] text-sun text-3xl sm:text-4xl rotate-[-8deg] drop-shadow-sm select-none">♪</div>
              <div aria-hidden className="absolute top-[52%] right-[20%] text-coral text-2xl sm:text-3xl rotate-[12deg] drop-shadow-sm select-none">♫</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
