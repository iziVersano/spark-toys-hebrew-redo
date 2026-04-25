import { ArrowLeft, Play } from "lucide-react";
import heroChild from "@/assets/hero-child.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob bg-coral-soft -top-20 -right-20 h-72 w-72" />
      <div className="blob bg-mint-soft top-40 -left-24 h-80 w-80" />
      <div className="blob bg-sun-soft bottom-0 right-1/3 h-60 w-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="relative order-2 lg:order-1 text-center lg:text-right">
            {/* Tiny badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-sm text-navy/70 shadow-soft mb-6">
              <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
              חדש בקטלוג — סדרת המוסיקה
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance">
              יותר ממשחק,
              <br />
              <span className="text-coral">עולם של למידה.</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mr-0">
              צעצועים אינטראקטיביים עם תוכן עשיר שמשלבים שירים, צלילים ומשחק
              כדי לעזור לילדים ללמוד, לחקור וליהנות.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center lg:items-stretch lg:justify-start justify-center gap-3">
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
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> תוכן בעברית מלאה</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky" /> מותאם לגילאי 0–3+</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sun" /> משלוח חינם מ-₪199</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Soft cream backdrop circle */}
              <div className="absolute inset-4 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-cream-deep via-coral-soft to-sky-soft" />
              <img
                src={heroChild}
                alt="ילד משחק עם קוביית למידה אינטראקטיבית של Spark Toys"
                width={1024}
                height={1024}
                className="relative z-10 w-full h-full object-cover rounded-[38%_62%_55%_45%/55%_45%_60%_40%] shadow-card"
              />

              {/* Floating note bubbles */}
              <div className="absolute z-20 top-6 right-2 h-12 w-12 rounded-2xl bg-white shadow-card flex items-center justify-center text-coral text-xl rotate-[-8deg]">♪</div>
              <div className="absolute z-20 top-24 -left-2 h-14 w-14 rounded-2xl bg-white shadow-card flex items-center justify-center text-mint text-2xl rotate-[10deg]">♫</div>

              {/* Floating product mini-card */}
              <div className="absolute z-20 -bottom-4 right-4 sm:right-8 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3 max-w-[230px]">
                <div className="h-10 w-10 rounded-xl bg-mint-soft flex items-center justify-center">
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
