import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { Categories } from "@/components/site/Categories";
import { Stars } from "@/components/site/Stars";
import { Products } from "@/components/site/Products";
import { WhyUs } from "@/components/site/WhyUs";
import { AboutBanner } from "@/components/site/AboutBanner";
import { Retailers } from "@/components/site/Retailers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { SparkleField } from "@/components/site/SparkleField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spark Toys — יותר ממשחק, עולם של למידה" },
      {
        name: "description",
        content:
          "צעצועים אינטראקטיביים בעברית עם שירים, צלילים ותוכן חינוכי עשיר שמפתחים ילדים בכל שלב — שפה, מוזיקה, חשיבה ומוטוריקה.",
      },
      { property: "og:title", content: "Spark Toys — יותר ממשחק, עולם של למידה" },
      {
        property: "og:description",
        content: "צעצועים אינטראקטיביים בעברית שמפתחים ילדים דרך משחק, שירים ולמידה.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background spark-flow overflow-hidden">
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Categories />
          <Stars />
          <Benefits />
          <Products />
          <WhyUs />
          <AboutBanner />
          <Retailers />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating sparkles drift across the entire page, tying sections together.
          Rendered above content but pointer-events-none keeps clicks working. */}
      <SparkleField count={70} />
    </div>
  );
}
