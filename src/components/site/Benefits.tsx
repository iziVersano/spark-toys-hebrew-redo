import { MessageCircle, Music, Lightbulb, Hand } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "פיתוח שפה",
    desc: "מעודד דיבור, הקשבה והבנת מילים",
    color: "bg-coral-soft text-coral",
  },
  {
    icon: Music,
    title: "מוזיקה וקצב",
    desc: "לימוד דרך צלילים, שירים וקצב",
    color: "bg-sun-soft text-sun",
  },
  {
    icon: Lightbulb,
    title: "חשיבה ולמידה",
    desc: "שאלות, חידות ומשחקים שמפתחים הבנה",
    color: "bg-mint-soft text-mint",
  },
  {
    icon: Hand,
    title: "מוטוריקה והתנסות",
    desc: "פעילויות שמפתחות קואורדינציה ומוטוריקה עדינה",
    color: "bg-sky-soft text-sky",
  },
];

export function Benefits() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl bg-white rounded-3xl shadow-card border border-border/60 px-6 sm:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center group">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${b.color}`}>
                <b.icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-navy">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-snug max-w-[210px]">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
