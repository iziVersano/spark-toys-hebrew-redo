import { MessageCircle, Music, Lightbulb, Hand } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "פיתוח שפה",
    desc: "מעודד דיבור, הקשבה והבנת מילים",
    color: "text-coral",
    bg: "bg-coral-soft",
    ring: "ring-coral/20",
  },
  {
    icon: Music,
    title: "מוזיקה וקצב",
    desc: "לימוד דרך צלילים, שירים וקצב",
    color: "text-sun",
    bg: "bg-sun-soft",
    ring: "ring-sun/20",
  },
  {
    icon: Lightbulb,
    title: "חשיבה ולמידה",
    desc: "שאלות, חידות ומשחקים שמפתחים הבנה",
    color: "text-mint",
    bg: "bg-mint-soft",
    ring: "ring-mint/20",
  },
  {
    icon: Hand,
    title: "מוטוריקה",
    desc: "פעילויות שמפתחות קואורדינציה ומוטוריקה עדינה",
    color: "text-sky",
    bg: "bg-sky-soft",
    ring: "ring-sky/20",
  },
];

export function Benefits() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-3xl shadow-card border border-border/60 px-6 sm:px-10 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center group">
                <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-5 ring-4 ${b.ring} ${b.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <b.icon className={`h-9 w-9 ${b.color}`} strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-navy">{b.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-snug max-w-[200px]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
