import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, Heart, Sparkles } from "lucide-react";
import sparkLogo from "@/assets/spark-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "מוצרים",
    color: "coral",
    links: ["כל המוצרים", "חדשים", "מוצרים מובילים", "מבצעים"],
  },
  {
    title: "לפי גיל",
    color: "mint",
    links: ["0–1 שנים", "1–2 שנים", "2–3 שנים", "3+ שנים"],
  },
  {
    title: "לפי התפתחות",
    color: "sky",
    links: ["פיתוח שפה", "מוזיקה וקצב", "חשיבה ולמידה", "מוטוריקה"],
  },
  {
    title: "שירות לקוחות",
    color: "sun",
    links: ["משלוחים והחזרות", "שאלות נפוצות", "מדיניות פרטיות", "טלפון"],
  },
  {
    title: "אודות",
    color: "lilac",
    links: ["Spark Toys", "הסיפור שלנו", "ביקורות", "בלוג"],
  },
];

const dotColor: Record<string, string> = {
  coral: "bg-coral",
  mint: "bg-mint",
  sky: "bg-sky",
  sun: "bg-sun",
  lilac: "bg-lilac",
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Decorative blobs */}
      <div className="blob bg-coral/30 h-72 w-72 -top-20 -right-20" />
      <div className="blob bg-sky/25 h-80 w-80 top-40 -left-24" />
      <div className="blob bg-sun/20 h-64 w-64 bottom-0 right-1/3" />

      {/* Top wave divider */}
      <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-cream/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Newsletter hero strip */}
        <div className="relative rounded-3xl bg-gradient-to-l from-coral via-coral to-sun p-[2px] mb-16 shadow-pop">
          <div className="rounded-[calc(1.5rem-2px)] bg-navy/95 backdrop-blur px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-right">
              <div className="hidden sm:flex h-12 w-12 shrink-0 rounded-2xl bg-coral items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  הצטרפו למשפחת ספרק ✨
                </h3>
                <p className="text-sm text-white/75 mt-1">
                  טיפים להתפתחות, מבצעים סודיים והשקות חמות — ישר למייל.
                </p>
              </div>
            </div>
            <form className="flex w-full lg:w-auto items-center gap-2 bg-white rounded-full p-1.5 shadow-xl">
              <Input
                type="email"
                placeholder="האימייל שלך"
                className="border-0 bg-transparent text-navy placeholder:text-navy/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-4 text-right"
              />
              <Button
                type="submit"
                className="rounded-full bg-coral hover:bg-coral/90 text-white h-10 px-5 gap-2 shrink-0"
              >
                הרשמה
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">
              <img src={sparkLogo} alt="Spark Toys" className="h-9 w-auto" />
            </div>
            <p className="mt-5 text-sm text-white/75 leading-relaxed max-w-sm">
              צעצועים אינטראקטיביים עם תוכן עשיר שמפתחים ילדים בעברית מלאה ובאהבה גדולה.
              כל מוצר נבחר בקפידה כדי להצית סקרנות וללוות התפתחות.
            </p>

            {/* Contact chips */}
            <div className="mt-6 space-y-2.5">
              <a href="tel:+972000000000" className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <span className="h-9 w-9 rounded-xl bg-white/10 group-hover:bg-coral flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                03-000-0000
              </a>
              <a href="mailto:hello@sparktoys.co.il" className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <span className="h-9 w-9 rounded-xl bg-white/10 group-hover:bg-mint flex items-center justify-center transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                hello@sparktoys.co.il
              </a>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </span>
                תל אביב, ישראל
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: Facebook, hover: "hover:bg-sky" },
                { Icon: Instagram, hover: "hover:bg-coral" },
                { Icon: Youtube, hover: "hover:bg-sun hover:text-navy" },
              ].map(({ Icon, hover }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className={`h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white ${hover} transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="col-span-2 md:col-span-3 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dotColor[col.color]}`} />
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/70 hover:text-white hover:translate-x-[-2px] inline-block transition-all"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="flex items-center gap-1.5">
            © 2024 Spark Toys. נוצר עם
            <Heart className="h-3.5 w-3.5 fill-coral text-coral" />
            בישראל.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">תקנון</a>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <a href="#" className="hover:text-white transition-colors">משלוחים והחזרות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
