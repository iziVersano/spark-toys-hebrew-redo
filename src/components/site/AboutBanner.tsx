import { Heart, ArrowLeft } from "lucide-react";
import family from "@/assets/about-family.jpg";

export function AboutBanner() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center bg-white rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-soft border border-border/60 overflow-hidden relative">
          <div className="blob bg-coral-soft -top-10 -left-10 h-48 w-48" />

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
              <img
                src={family}
                alt="אמא ובת משחקות יחד עם המיקרופון של Spark"
                loading="lazy"
                width={1024}
                height={768}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-right">
            <Heart className="inline-block h-7 w-7 text-coral mb-4" fill="currentColor" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance">
              רגעים קטנים של משחק
              <br />
              <span className="text-mint">שהופכים ללמידה אמיתית.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mr-0">
              כל מוצר של Spark נועד לעודד סקרנות, לחזק ביטחון עצמי ולתמוך בהתפתחות
              של ילדכם דרך משחק, שירה וחוויה משותפת עם ההורים.
            </p>
            <button className="mt-8 inline-flex items-center gap-2 h-13 px-7 rounded-full bg-navy text-primary-foreground font-bold text-base hover:shadow-pop transition-all hover:-translate-y-0.5">
              קראו על Spark
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
