import { ArrowLeft, Play } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10">
        {/* Unified hero banner */}
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream isolate">
          {/* Background image fills entire banner */}
          <img
            src={heroChild}
            alt="ילד משחק עם צעצוע למידה אינטראקטיבי של Spark Toys"
            width={1920}
            height={1200}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-[25%_center] lg:object-[15%_center]"
          />

          {/* Subtle warm wash for brand tone */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-coral-soft/15 via-transparent to-sky-soft/20 mix-blend-multiply pointer-events-none"
          />

          {/* Smooth RTL text-overlay gradient — solid cream on the right (text), fading to fully transparent toward the image side. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 via-40% to-transparent lg:bg-gradient-to-l lg:from-cream lg:from-30% lg:via-cream/70 lg:via-65% lg:to-transparent"
          />

          {/* Soft warm glow behind text for premium depth */}
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, color-mix(in oklab, var(--sun) 12%, transparent) 0%, transparent 65%)",
            }}
          />

          {/* Floating music notes — placed over image, never over text area */}
          <div aria-hidden className="hidden sm:block absolute top-[18%] left-[38%] lg:left-[32%] text-sky text-3xl lg:text-4xl rotate-[-12deg] drop-shadow-sm select-none pointer-events-none">♪</div>
          <div aria-hidden className="hidden sm:block absolute top-[32%] left-[44%] lg:left-[38%] text-mint text-2xl lg:text-3xl rotate-[14deg] drop-shadow-sm select-none pointer-events-none">♫</div>
          <div aria-hidden className="hidden sm:block absolute top-[48%] left-[36%] lg:left-[30%] text-sun text-3xl lg:text-4xl rotate-[-6deg] drop-shadow-sm select-none pointer-events-none">♪</div>
          <div aria-hidden className="hidden lg:block absolute top-[26%] left-[42%] h-2.5 w-2.5 rounded-full bg-coral shadow-soft" />
          <div aria-hidden className="hidden lg:block absolute top-[58%] left-[28%] h-3.5 w-3.5 rounded-full bg-sun shadow-soft" />

          {/* Content overlay — sits on the right (RTL natural) */}
          <div className="relative z-10 grid lg:grid-cols-12 px-5 sm:px-8 lg:px-14 pt-10 sm:pt-14 lg:pt-20 pb-[60%] sm:pb-[46%] lg:pb-20 lg:min-h-[600px]">
            <div className="lg:col-span-6 lg:col-start-7 text-center lg:text-right flex flex-col lg:justify-center">
              {/* Badge */}
              <div className="inline-flex self-center lg:self-end items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-1.5 text-sm text-navy/80 shadow-soft mb-4 sm:mb-5 ring-1 ring-black/5">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                חדש בקטלוג — סדרת המוסיקה
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.05] text-navy text-balance">
                יותר ממשחק,
                <br />
                <span className="text-coral">עולם של למידה.</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-navy/75 leading-relaxed max-w-md mx-auto lg:mr-0 lg:ml-0">
                צעצועים אינטראקטיביים עם תוכן עשיר שמשלבים שירים, צלילים ומשחק
                כדי לעזור לילדים ללמוד, לחקור וליהנות.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-3">
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
              <div className="mt-6 sm:mt-7 flex flex-wrap justify-center lg:justify-end items-center gap-x-5 gap-y-2 text-sm text-navy/65">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> תוכן בעברית מלאה</span>
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky" /> מותאם לגילאי 0–3+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
