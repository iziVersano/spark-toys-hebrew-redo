import { useState } from "react";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, Heart } from "lucide-react";
import sparkLogo from "@/assets/spark-logo.png";

const columns = [
  {
    title: "מוצרים",
    color: "bg-coral",
    links: ["כל המוצרים", "חדשים", "מוצרים מובילים", "מבצעים"],
  },
  {
    title: "לפי גיל",
    color: "bg-mint",
    links: ["0–1 שנים", "1–2 שנים", "2–3 שנים", "3+ שנים"],
  },
  {
    title: "לפי התפתחות",
    color: "bg-sky",
    links: ["פיתוח שפה", "מוזיקה וקצב", "חשיבה ולמידה", "מוטוריקה"],
  },
  {
    title: "שירות לקוחות",
    color: "bg-sun",
    links: ["משלוחים והחזרות", "שאלות נפוצות", "מדיניות פרטיות", "טלפון"],
  },
  {
    title: "אודות",
    color: "bg-lilac",
    links: ["Spark Toys", "הסיפור שלנו", "ביקורות", "בלוג"],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <footer className="bg-navy text-white/80">

      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-right">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              הצטרפו למשפחת ספרק
            </h3>
            <p className="text-white/60 mt-1 text-sm">
              טיפים להתפתחות, מבצעים ועדכונים — ישר למייל.
            </p>
          </div>

          {status === "success" ? (
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 text-white font-semibold">
              <Heart className="h-4 w-4 fill-coral text-coral" />
              נרשמתם בהצלחה!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto items-center gap-2 bg-white/10 border border-white/20 rounded-full p-1.5 backdrop-blur-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="האימייל שלך"
                required
                aria-label="כתובת אימייל להרשמה"
                className="bg-transparent text-white placeholder:text-white/40 focus:outline-none h-10 px-4 text-right text-sm flex-1 min-w-[200px]"
              />
              <button
                type="submit"
                className="rounded-full bg-coral hover:bg-coral/90 text-white h-10 px-5 flex items-center gap-2 font-bold text-sm shrink-0 transition-colors duration-200 cursor-pointer"
              >
                הרשמה
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10">

          {/* Brand block */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
              <img src={sparkLogo} alt="Spark Toys" className="h-9 w-auto" />
            </div>
            <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-sm">
              צעצועים אינטראקטיביים עם תוכן עשיר שמפתחים ילדים בעברית מלאה ובאהבה גדולה.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              {[
                { icon: Phone, text: "03-000-0000", href: "tel:+972000000000" },
                { icon: Mail, text: "hello@sparktoys.co.il", href: "mailto:hello@sparktoys.co.il" },
                { icon: MapPin, text: "תל אביב, ישראל", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href} className="flex items-center gap-3 text-sm text-white/55 hover:text-white transition-colors duration-200 cursor-pointer group">
                  <span className="h-8 w-8 rounded-xl bg-white/10 group-hover:bg-coral/30 flex items-center justify-center transition-colors duration-200 shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-9 w-9 rounded-xl bg-white/10 hover:bg-coral flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
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
                  <span className={`h-2 w-2 rounded-full ${col.color} shrink-0`} />
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
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
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p className="flex items-center gap-1.5">
            © 2024 Spark Toys. נוצר עם
            <Heart className="h-3.5 w-3.5 fill-coral text-coral" />
            בישראל.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">תקנון</a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors cursor-pointer">מדיניות פרטיות</a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors cursor-pointer">משלוחים והחזרות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
