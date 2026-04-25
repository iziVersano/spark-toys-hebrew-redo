import { Facebook, Instagram, Youtube } from "lucide-react";
import sparkLogo from "@/assets/spark-logo.png";

const columns = [
  {
    title: "מוצרים",
    links: ["כל המוצרים", "חדשים", "מוצרים מובילים", "מבצעים"],
  },
  {
    title: "לפי גיל",
    links: ["0–1 שנים", "1–2 שנים", "2–3 שנים", "3+ שנים"],
  },
  {
    title: "לפי התפתחות",
    links: ["פיתוח שפה", "מוזיקה וקצב", "חשיבה ולמידה", "מוטוריקה"],
  },
  {
    title: "שירות לקוחות",
    links: ["משלוחים והחזרות", "שאלות נפוצות", "מדיניות פרטיות", "טלפון"],
  },
  {
    title: "אודות",
    links: ["Spark Toys", "הסיפור שלנו", "ביקורות", "בלוג"],
  },
  {
    title: "יצירת קשר",
    links: ["השאירו פרטים", "צרו קשר", "ניוזלטר", "לקמעונאים"],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <img src={sparkLogo} alt="Spark Toys" className="h-10 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              צעצועים אינטראקטיביים עם תוכן עשיר שמפתחים ילדים בעברית מלאה ובאהבה גדולה.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="h-9 w-9 rounded-full bg-cream flex items-center justify-center text-navy hover:bg-coral hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-navy mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-coral transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2024 Spark Toys. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-navy">תקנון</a>
            <a href="#" className="hover:text-navy">מדיניות פרטיות</a>
            <a href="#" className="hover:text-navy">משלוחים והחזרות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
