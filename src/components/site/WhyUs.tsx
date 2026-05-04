import { Mic2, Music2, BookOpen, Brain, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Mic2,        title: "דובר עברית מלאה",          desc: "כל התוכן בעברית נקייה ועשירה",        color: "text-coral",  bg: "bg-coral-soft",  ring: "ring-coral/25"  },
  { icon: Music2,      title: "מאות שירים ומשפטים",       desc: "ספריית תוכן ענקית שגדלה כל הזמן",     color: "text-sky",    bg: "bg-sky-soft",    ring: "ring-sky/25"    },
  { icon: BookOpen,    title: "תוכן חינוכי עשיר",          desc: "מבוסס על מחקרי התפתחות ילדים",        color: "text-mint",   bg: "bg-mint-soft",   ring: "ring-mint/25"   },
  { icon: Brain,       title: "פיתוח אמיתי דרך משחק",     desc: "גירוי קוגניטיבי בכל שלב גיל",         color: "text-sun",    bg: "bg-sun-soft",    ring: "ring-sun/25"    },
  { icon: ShieldCheck, title: "איכות ובטיחות",             desc: "עומד בתקנים הבינלאומיים הקפדניים",    color: "text-lilac",  bg: "bg-lilac-soft",  ring: "ring-lilac/25"  },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-cream/40">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-14 leading-[1.05] text-balance text-navy">
          מה הופך את <span className="text-coral">Spark Toys</span> לשונים?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group flex flex-col items-center text-center bg-white rounded-3xl p-6 border border-border/60 hover:border-transparent hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 ring-4 ${r.ring} ${r.bg} transition-transform duration-300 group-hover:scale-110`}>
                <r.icon className={`h-8 w-8 ${r.color}`} strokeWidth={2} />
              </div>
              <p className="text-base font-extrabold text-navy leading-snug">{r.title}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
