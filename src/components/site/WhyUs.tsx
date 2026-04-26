import { Mic2, Music2, BookOpen, Brain, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Mic2, title: "דובר עברית מלאה", color: "text-coral", bg: "bg-coral-soft" },
  { icon: Music2, title: "מאות שירים ומשפטים", color: "text-sky", bg: "bg-sky-soft" },
  { icon: BookOpen, title: "תוכן חינוכי עשיר", color: "text-mint", bg: "bg-mint-soft" },
  { icon: Brain, title: "פיתוח אמיתי דרך משחק", color: "text-sun", bg: "bg-sun-soft" },
  { icon: ShieldCheck, title: "איכות ובטיחות לשקט נפשי", color: "text-lilac", bg: "bg-lilac-soft" },
];

export function WhyUs() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-cream/60">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-14 leading-[1.05] text-balance">
          מה הופך את <span className="text-coral">Spark Toys</span> לשונים?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col items-center text-center">
              <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-4 ${r.bg}`}>
                <r.icon className={`h-9 w-9 ${r.color}`} strokeWidth={2} />
              </div>
              <p className="text-base lg:text-lg font-bold text-navy max-w-[170px] leading-snug">{r.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
