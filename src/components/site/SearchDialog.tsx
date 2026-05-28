import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type SearchItem = {
  name: string;
  group: string;
  to: string;
  keywords?: string;
};

const searchableItems: SearchItem[] = [
  // Products
  { name: "השעון הראשון שלי", group: "מוצרים", to: "/", keywords: "שעון זמן לימוד" },
  { name: "הגיטרה הראשונה שלי", group: "מוצרים", to: "/", keywords: "גיטרה מוסיקה כלי נגינה" },
  { name: "הספר המדבר שלי", group: "מוצרים", to: "/", keywords: "ספר סיפורים שירים" },
  { name: "המיקרופון שלי", group: "מוצרים", to: "/", keywords: "מיקרופון שירה מוסיקה" },
  { name: "הקובייה הלומדת", group: "מוצרים", to: "/", keywords: "קובייה אותיות חיות" },
  { name: "קובייה קסומה", group: "מוצרים", to: "/", keywords: "קובייה קסם" },

  // Categories
  { name: "צעצועי עץ", group: "קטגוריות", to: "/" },
  { name: "Spark BloX אבני הרכבה", group: "קטגוריות", to: "/", keywords: "אבני בנייה לגו" },
  { name: "ספרים אינטראקטיביים", group: "קטגוריות", to: "/", keywords: "ספר ספרים" },
  { name: "צעצועי התפתחות", group: "קטגוריות", to: "/", keywords: "התפתחות תינוקות" },
  { name: "בובות", group: "קטגוריות", to: "/" },
  { name: "רובוטים", group: "קטגוריות", to: "/", keywords: "רובוט robot" },
  { name: "מוסיקה וכלי נגינה", group: "קטגוריות", to: "/", keywords: "כלי נגינה מוזיקה" },
  { name: "מולטימדיה", group: "קטגוריות", to: "/" },

  // Kid stars
  { name: "יובל המבולבל", group: "כוכבי הילדים", to: "/" },
  { name: "מיכל הקטנה", group: "כוכבי הילדים", to: "/" },
  { name: "מיקי", group: "כוכבי הילדים", to: "/" },
  { name: "הדוד חיים", group: "כוכבי הילדים", to: "/" },
  { name: "קופיקו", group: "כוכבי הילדים", to: "/" },
  { name: "לולי", group: "כוכבי הילדים", to: "/" },
  { name: "הכבשה שושנה", group: "כוכבי הילדים", to: "/" },

  // Site pages
  { name: "בית", group: "דפים", to: "/" },
  { name: "מרכיבי ההתפתחות", group: "דפים", to: "/" },
  { name: "פורטל ההורדות ספרקי", group: "דפים", to: "/", keywords: "הורדות פורטל" },
  { name: "ספרק קנדי", group: "דפים", to: "/" },
  { name: "צרו קשר", group: "דפים", to: "/", keywords: "צור קשר" },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[֑-ֽֿׁ-ׇ]/g, "").trim();
}

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const grouped = useMemo(() => {
    const q = normalize(query);
    const filtered = q
      ? searchableItems.filter((item) => {
          const hay = normalize(`${item.name} ${item.keywords ?? ""}`);
          return hay.includes(q);
        })
      : searchableItems;

    const map = new Map<string, SearchItem[]>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    }
    return Array.from(map.entries());
  }, [query]);

  const totalResults = grouped.reduce((sum, [, items]) => sum + items.length, 0);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          dir="rtl"
          className="fixed left-1/2 top-[12%] z-50 w-[92%] max-w-2xl -translate-x-1/2 rounded-3xl bg-white shadow-card border border-border/60 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">חיפוש</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            חיפוש מוצרים, קטגוריות ועמודים באתר
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
            <Search className="h-5 w-5 text-navy/60 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="מה תרצו לחפש?"
              dir="rtl"
              className="flex-1 bg-transparent outline-none text-base text-navy placeholder:text-navy/40"
              aria-label="חיפוש באתר"
            />
            <DialogPrimitive.Close
              aria-label="סגירה"
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-cream text-navy/70 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {totalResults === 0 ? (
              <div className="px-5 py-10 text-center text-navy/60 text-sm">
                לא נמצאו תוצאות עבור "{query}"
              </div>
            ) : (
              grouped.map(([group, items]) => (
                <div key={group} className="mb-2 last:mb-0">
                  <div className="px-4 pt-3 pb-1.5 text-[11px] font-bold tracking-wider uppercase text-coral">
                    {group}
                  </div>
                  <ul className="flex flex-col">
                    {items.map((item) => (
                      <li key={`${group}-${item.name}`}>
                        <a
                          href={item.to}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-navy hover:bg-coral-soft hover:text-coral transition-colors duration-150 cursor-pointer"
                        >
                          <Search className="h-3.5 w-3.5 text-navy/40 shrink-0" />
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
