import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import sparkLogo from "@/assets/spark-logo.png";

const navItems = [
  { label: "דף הבית", to: "/" },
  { label: "מוצרים", to: "/" },
  { label: "לפי גיל", to: "/" },
  { label: "לפי התפתחות", to: "/" },
  { label: "אודות", to: "/" },
  { label: "צור קשר", to: "/" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        {/* Logo (visually right in RTL = first child) */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={sparkLogo} alt="Spark Toys" className="h-9 sm:h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-foreground/80">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="relative hover:text-navy transition-colors after:absolute after:right-0 after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-coral after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="חיפוש"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-navy transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="חשבון"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-navy transition-colors"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            aria-label="עגלה"
            className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-navy transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -left-0.5 h-4.5 w-4.5 min-w-[18px] px-1 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </button>
          <button
            aria-label="תפריט"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-navy transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-base font-medium text-navy hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-3 border-t border-border/60 mt-2">
              <button className="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-medium">
                <Search className="h-4 w-4" /> חיפוש
              </button>
              <button className="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-medium">
                <User className="h-4 w-4" /> חשבון
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
