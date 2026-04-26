import { ArrowLeft, Play } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob bg-coral-soft -top-20 -right-20 h-72 w-72" />
      <div className="blob bg-mint-soft top-40 -left-24 h-80 w-80" />
      <div className="blob bg-sun-soft bottom-0 right-1/3 h-60 w-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-10 sm:pb-14 lg:pt-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="relative order-2 lg:order-1 lg:col-span-6 text-center lg:text-right">
            {/* Tiny badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-sm text-navy/70 shadow-soft mb-5">
              <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
              חדש בקטלוג — סדרת המוסיקה
            </div>

            <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance">
              יותר ממשחק,
              <br />
              <span className="text-coral">עולם של למידה.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mr-0">
              צעצועים אינטראקטיביים עם תוכן עשיר שמשלבים שירים, צלילים ומשחק
              כדי לעזור לילדים ללמוד, לחקור וליהנות.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start justify-center gap-3">
              <button className="group inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-navy text-primary-foreground font-semibold text-[15px] shadow-card hover:shadow-pop transition-all hover:-translate-y-0.5">
                גלו את המוצרים
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-white text-navy font-semibold text-[15px] border border-border hover:border-navy/30 hover:bg-cream transition-all">
                <Play className="h-4 w-4 fill-coral text-coral" />
                לפי שלבי התפתחות
              </button>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> תוכן בעברית מלאה</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky" /> מותאם לגילאי 0–3+</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sun" /> משלוח חינם מ-₪199</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[560px]">
              {/* Soft glow behind card */}
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-coral-soft via-sun-soft to-sky-soft blur-2xl opacity-70" />

              {/* Decorative offset color block */}
              <div aria-hidden className="absolute -bottom-5 -left-5 sm:-left-7 w-[88%] h-[88%] rounded-[2rem] bg-gradient-to-tr from-mint-soft to-sky-soft" />

              {/* Main image card */}
              <div className="relative z-10 rounded-[2rem] overflow-hidden bg-white border border-white shadow-pop ring-1 ring-black/5">
                <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                  <img
                    src={heroChild}
                    alt="ילד משחק עם קוביית למידה אינטראקטיבית של Spark Toys"
                    width={1024}
                    height={1024}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* subtle gradient sheen */}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating note bubbles */}
              <div className="absolute z-20 -top-4 right-3 sm:-top-5 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white shadow-card flex items-center justify-center text-coral text-xl sm:text-2xl rotate-[-8deg]">♪</div>
              <div className="absolute z-20 top-16 -left-3 sm:top-24 sm:-left-5 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white shadow-card flex items-center justify-center text-mint text-xl sm:text-2xl rotate-[10deg]">♫</div>

              {/* Floating sparkle dot */}
              <div aria-hidden className="absolute z-20 top-1/3 -right-2 sm:-right-3 h-6 w-6 rounded-full bg-sun shadow-soft" />

              {/* Floating product mini-card */}
              <div className="absolute z-20 -bottom-5 right-3 sm:right-6 bg-white rounded-2xl shadow-pop px-4 py-3 flex items-center gap-3 max-w-[240px] border border-border/60">
                <div className="h-10 w-10 rounded-xl bg-mint-soft flex items-center justify-center shrink-0">
                  <span className="text-mint text-lg">★</span>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-muted-foreground">דירוג הורים</div>
                  <div className="text-sm font-semibold text-navy">4.9 / 5 · +12,000 משפחות</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
