import type { Metadata } from "next";
import { Assistant, Heebo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/site/CartDrawer";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spark Toys — יותר ממשחק, עולם של למידה",
  description:
    "צעצועים אינטראקטיביים בעברית עם שירים, צלילים ותוכן חינוכי עשיר שמפתחים ילדים בכל שלב — שפה, מוזיקה, חשיבה ומוטוריקה.",
  openGraph: {
    title: "Spark Toys — יותר ממשחק, עולם של למידה",
    description:
      "צעצועים אינטראקטיביים בעברית שמפתחים ילדים דרך משחק, שירים ולמידה.",
    type: "website",
    locale: "he_IL",
    url: "https://spark-toys.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark Toys — יותר ממשחק, עולם של למידה",
    description:
      "צעצועים אינטראקטיביים בעברית שמפתחים ילדים דרך משחק, שירים ולמידה.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
