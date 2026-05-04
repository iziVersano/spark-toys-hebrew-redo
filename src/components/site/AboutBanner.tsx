import { Heart, ArrowLeft, Star } from "lucide-react";
import family from "@/assets/about-family.jpg";

const stats = [
  { value: "50K+", label: "משפחות מרוצות" },
  { value: "200+", label: "מוצרים בקטלוג" },
  { value: "4.9", label: "דירוג ממוצע", icon: Star },
];

export function AboutBanner() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-card border border-border/60 overflow-hidden">

          {/* Subtle background accent */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-coral-soft rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-mint-soft rounded-full blur-3xl opacity-40 pointer-events-none" />

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card">
              <img
                src={family}
                alt="אמא ובת משחקות יחד עם המיקרופון של Spark"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white rounded-2xl shadow-card border border-border/60 px-4 py-3 flex items-center gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {s.icon && <s.icon className="h-3.5 w-3.5 text-sun fill-sun" />}
                    <span className="text-lg font-extrabold text-navy">{s.value}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-right relative">
            <div className="inline-flex items-center gap-2 bg-coral-soft text-coral text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4 fill-coral" />
              הסיפור שלנו
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.05] text-balance text-navy">
              רגעים קטנים של משחק
              <br />
              <span className="text-mint">שהופכים ללמידה אמיתית.</span>
            </h2>
            <p className="mt-6 text-navy/65 text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mr-0">
              כל מוצר של Spark נועד לעודד סקרנות, לחזק ביטחון עצמי ולתמוך בהתפתחות של ילדכם דרך משחק, שירה וחוויה משותפת עם ההורים.
            </p>
            <button className="mt-8 group inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-navy text-white font-bold text-base hover:shadow-pop transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              קראו על Spark
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
