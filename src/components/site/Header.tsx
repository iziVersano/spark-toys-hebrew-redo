import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import sparkLogo from "@/assets/spark-logo.png";
import { SearchDialog } from "./SearchDialog";

type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

const navItems: NavItem[] = [
  { label: "בית", to: "/" },
  {
    label: "המוצרים שלנו",
    to: "/",
    children: [
      { label: "צעצועי עץ", to: "/" },
      { label: "Spark BloX אבני הרכבה", to: "/" },
      { label: "ספרים אינטראקטיביים", to: "/" },
      { label: "צעצועי התפתחות", to: "/" },
      { label: "בובות", to: "/" },
      { label: "רובוטים", to: "/" },
      { label: "מוסיקה וכלי נגינה", to: "/" },
      { label: "מולטימדיה", to: "/" },
    ],
  },
  {
    label: "כוכבי הילדים",
    to: "/",
    children: [
      { label: "יובל המבולבל", to: "/" },
      { label: "מיכל הקטנה", to: "/" },
      { label: "מיקי", to: "/" },
      { label: "הדוד חיים", to: "/" },
      { label: "קופיקו", to: "/" },
      { label: "לולי", to: "/" },
      { label: "הכבשה שושנה", to: "/" },
    ],
  },
  { label: "מרכיבי ההתפתחות", to: "/" },
  { label: "פורטל ההורדות ספרקי", to: "/" },
  { label: "ספרק קנדי", to: "/" },
  { label: "צרו קשר", to: "/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
          <img src={sparkLogo} alt="Spark Toys" className="h-10 sm:h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[14px] xl:text-[15px] font-semibold text-navy/75">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-coral transition-colors duration-200 cursor-pointer py-1"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute top-full right-0 pt-3 z-50">
                  <div className="min-w-[220px] bg-white/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-card p-2 text-right">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block px-4 py-2.5 rounded-xl text-[14px] font-medium text-navy hover:bg-coral-soft hover:text-coral transition-colors duration-150 cursor-pointer"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-coral transition-colors duration-200 cursor-pointer py-1"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="חיפוש"
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream text-navy transition-colors duration-200 cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="חשבון"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream text-navy transition-colors duration-200 cursor-pointer"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Cart with badge */}
          <button
            aria-label="עגלה"
            className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-cream text-navy transition-colors duration-200 cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -left-0.5 h-[18px] min-w-[18px] px-1 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center leading-none">
              2
            </span>
          </button>

          {/* CTA button — desktop only */}
          <Link
            to="/"
            className="hidden lg:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-coral text-white font-bold text-sm hover:bg-coral/90 hover:shadow-pop transition-all duration-200 hover:-translate-y-0.5 cursor-pointer mr-1"
          >
            לחנות
          </Link>

          <button
            aria-label="תפריט"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-cream text-navy transition-colors duration-200 cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border/50 bg-background/98 backdrop-blur-lg max-h-[82vh] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded((s) => (s === item.label ? null : item.label))
                    }
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-navy hover:bg-cream transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="pr-3 flex flex-col gap-0.5 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className="px-3 py-2.5 rounded-lg text-sm font-medium text-navy/80 hover:bg-coral-soft hover:text-coral transition-colors cursor-pointer"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-xl text-base font-semibold text-navy hover:bg-cream transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              ),
            )}

            {/* Mobile bottom actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-border/50 mt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-semibold cursor-pointer hover:bg-cream-deep transition-colors"
              >
                <Search className="h-4 w-4" /> חיפוש
              </button>
              <button className="flex-1 h-11 rounded-full bg-cream flex items-center justify-center gap-2 text-navy text-sm font-semibold cursor-pointer hover:bg-cream-deep transition-colors">
                <User className="h-4 w-4" /> חשבון
              </button>
            </div>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="mt-2 h-12 rounded-full bg-coral text-white flex items-center justify-center font-bold text-base hover:bg-coral/90 transition-colors cursor-pointer"
            >
              לחנות
            </Link>
          </nav>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
