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
            <Heart className="inline-block h-6 w-6 text-coral mb-3" fill="currentColor" />
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-balance">
              רגעים קטנים של משחק
              <br />
              <span className="text-mint">שהופכים ללמידה אמיתית.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mr-0">
              כל מוצר של Spark נועד לעודד סקרנות, לחזק ביטחון עצמי ולתמוך בהתפתחות
              של ילדכם דרך משחק, שירה וחוויה משותפת עם ההורים.
            </p>
            <button className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-navy text-primary-foreground font-semibold hover:shadow-pop transition-all hover:-translate-y-0.5">
              קראו על Spark
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
