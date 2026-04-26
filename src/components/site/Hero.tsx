import { ArrowLeft, Play } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4">
        {/* Hero canvas */}
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream">
          {/* Background image */}
          <img
            src={heroChild}
            alt="ילד משחק עם צעצוע למידה אינטראקטיבי של Spark Toys"
            width={1920}
            height={1200}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* RTL gradient: cream on the right (text side) fading to transparent on the left (image side).
              On mobile, fade vertically from bottom so text is readable above the child. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/10 lg:bg-gradient-to-l lg:from-cream lg:via-cream/85 lg:via-40% lg:to-transparent"
          />

          {/* Subtle color wash for playful tone */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-coral-soft/30 via-transparent to-sky-soft/30 mix-blend-multiply pointer-events-none"
          />

          {/* Floating playful accents */}
          <div aria-hidden className="hidden sm:block absolute top-8 left-10 h-14 w-14 rounded-2xl bg-white/90 shadow-card flex items-center justify-center text-coral text-2xl rotate-[-8deg]">
            <span className="leading-none">♪</span>
          </div>
          <div aria-hidden className="hidden sm:block absolute bottom-12 left-1/3 h-12 w-12 rounded-2xl bg-white/90 shadow-card flex items-center justify-center text-mint text-xl rotate-[10deg]">
            <span className="leading-none">♫</span>
          </div>
          <div aria-hidden className="hidden lg:block absolute top-1/3 left-[42%] h-5 w-5 rounded-full bg-sun shadow-soft" />
          <div aria-hidden className="hidden lg:block absolute bottom-20 left-16 h-3 w-3 rounded-full bg-coral" />

          {/* Content overlay */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-6 px-5 sm:px-8 lg:px-14 pt-10 sm:pt-14 lg:pt-20 pb-[55%] sm:pb-[42%] lg:pb-20">
            <div className="lg:col-span-7 lg:col-start-6 text-center lg:text-right">
              {/* Tiny badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-sm text-navy/80 shadow-soft mb-4 sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                חדש בקטלוג — סדרת המוסיקה
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] text-navy text-balance drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                יותר ממשחק,
                <br />
                <span className="text-coral">עולם של למידה.</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-navy/75 leading-relaxed max-w-xl mx-auto lg:mr-0">
                צעצועים אינטראקטיביים עם תוכן עשיר שמשלבים שירים, צלילים ומשחק
                כדי לעזור לילדים ללמוד, לחקור וליהנות.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start justify-center gap-3">
                <button className="group inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 sm:px-7 rounded-full bg-navy text-primary-foreground font-semibold text-[15px] shadow-card hover:shadow-pop transition-all hover:-translate-y-0.5">
                  גלו את המוצרים
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 sm:px-7 rounded-full bg-white/95 backdrop-blur text-navy font-semibold text-[15px] border border-border hover:border-navy/30 hover:bg-white transition-all">
                  <Play className="h-4 w-4 fill-coral text-coral" />
                  לפי שלבי התפתחות
                </button>
              </div>

              {/* Trust line */}
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-x-5 gap-y-2 text-sm text-navy/70">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> תוכן בעברית מלאה</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky" /> מותאם לגילאי 0–3+</span>
                <span className="hidden sm:flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sun" /> משלוח חינם מ-₪199</span>
              </div>
            </div>
          </div>

          {/* Floating rating card - bottom corner */}
          <div className="hidden md:flex absolute z-20 bottom-5 left-5 lg:bottom-7 lg:left-7 bg-white/95 backdrop-blur rounded-2xl shadow-pop px-4 py-3 items-center gap-3 max-w-[260px] border border-border/60">
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
    </section>
  );
}
