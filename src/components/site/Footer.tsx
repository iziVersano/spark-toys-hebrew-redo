import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import sparkLogo from "@/assets/spark-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "מוצרים",
    color: "coral",
    links: [
      { label: "כל המוצרים", href: "/shop" },
      { label: "חדשים", href: "/shop?sort=newest" },
      { label: "מוצרים מובילים", href: "/shop?sort=popular" },
      { label: "מבצעים", href: "/shop?sale=1" },
    ],
  },
  {
    title: "לפי גיל",
    color: "mint",
    links: [
      { label: "0–1 שנים", href: "/age/0-1" },
      { label: "1–2 שנים", href: "/age/1-2" },
      { label: "2–3 שנים", href: "/age/2-3" },
      { label: "3+ שנים", href: "/age/3-plus" },
    ],
  },
  {
    title: "לפי התפתחות",
    color: "sky",
    links: [
      { label: "פיתוח שפה", href: "/development/language" },
      { label: "מוזיקה וקצב", href: "/development/music" },
      { label: "חשיבה ולמידה", href: "/development/cognitive" },
      { label: "מוטוריקה", href: "/development/motor" },
    ],
  },
  {
    title: "שירות לקוחות",
    color: "sun",
    links: [
      { label: "משלוחים והחזרות", href: "/shipping" },
      { label: "שאלות נפוצות", href: "/faq" },
      { label: "מדיניות פרטיות", href: "/privacy" },
      { label: "טלפון", href: "tel:+972000000000" },
    ],
  },
  {
    title: "אודות",
    color: "lilac",
    links: [
      { label: "Spark Toys", href: "/about" },
      { label: "הסיפור שלנו", href: "/about#story" },
      { label: "ביקורות", href: "/reviews" },
      { label: "בלוג", href: "/blog" },
    ],
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
    <footer className="relative overflow-hidden bg-cream/50 border-t border-border/60">
      <div className="blob bg-coral/25 h-72 w-72 -top-20 -right-20" />
      <div className="blob bg-sky/25 h-80 w-80 top-40 -left-24" />
      <div className="blob bg-sun/25 h-64 w-64 bottom-0 right-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Newsletter strip */}
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-pop">
          <div className="bg-gradient-to-l from-coral via-coral to-sun px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-right">
              <div className="hidden sm:flex h-12 w-12 shrink-0 rounded-2xl bg-white/25 backdrop-blur items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  הצטרפו למשפחת ספרק ✨
                </h3>
                <p className="text-sm text-white/90 mt-1">
                  טיפים להתפתחות, מבצעים סודיים והשקות חמות — ישר למייל.
                </p>
              </div>
            </div>
            <form className="flex w-full lg:w-auto items-center gap-2 bg-white rounded-full p-1.5 shadow-xl">
              <Input
                type="email"
                placeholder="האימייל שלך"
                className="border-0 bg-transparent text-navy placeholder:text-navy/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 px-4 text-right text-base"
              />
              <Button
                type="submit"
                className="rounded-full bg-navy hover:bg-navy/90 text-white h-10 px-5 gap-2 shrink-0"
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
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-soft">
              <Image src={sparkLogo} alt="Spark Toys" height={36} className="w-auto" />
            </div>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
              צעצועים אינטראקטיביים עם תוכן עשיר שמפתחים ילדים בעברית מלאה ובאהבה גדולה.
              כל מוצר נבחר בקפידה כדי להצית סקרנות וללוות התפתחות.
            </p>

            <div className="mt-6 space-y-2.5">
              <a href="tel:+972000000000" className="group flex items-center gap-3 text-base text-navy/80 hover:text-coral transition-colors">
                <span className="h-10 w-10 rounded-xl bg-white shadow-soft group-hover:bg-coral group-hover:text-white text-coral flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                03-000-0000
              </a>
              <a href="mailto:hello@sparktoys.co.il" className="group flex items-center gap-3 text-base text-navy/80 hover:text-coral transition-colors">
                <span className="h-10 w-10 rounded-xl bg-white shadow-soft group-hover:bg-mint group-hover:text-white text-mint flex items-center justify-center transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                hello@sparktoys.co.il
              </a>
              <div className="flex items-center gap-3 text-base text-navy/80">
                <span className="h-10 w-10 rounded-xl bg-white shadow-soft text-sky flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </span>
                תל אביב, ישראל
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: Facebook, hover: "hover:bg-sky", label: "Facebook" },
                { Icon: Instagram, hover: "hover:bg-coral", label: "Instagram" },
                { Icon: Youtube, hover: "hover:bg-sun", label: "YouTube" },
              ].map(({ Icon, hover, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-navy ${hover} hover:text-white transition-all duration-300 hover:-translate-y-0.5`}
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
                <h4 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dotColor[col.color]}`} />
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-base text-muted-foreground hover:text-coral hover:translate-x-[-2px] inline-block transition-all"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            © 2024 Spark Toys. נוצר עם
            <Heart className="h-4 w-4 fill-coral text-coral" />
            בישראל.
          </p>
          <div className="flex items-center gap-5">
            <a href="/terms" className="hover:text-navy transition-colors">תקנון</a>
            <span className="h-1 w-1 rounded-full bg-navy/30" />
            <a href="/privacy" className="hover:text-navy transition-colors">מדיניות פרטיות</a>
            <span className="h-1 w-1 rounded-full bg-navy/30" />
            <a href="/shipping" className="hover:text-navy transition-colors">משלוחים והחזרות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
