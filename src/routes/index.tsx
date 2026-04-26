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
    <div className="relative min-h-screen">
      {/* Soft pastel blob field — fixed behind all content for a continuous, airy backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="blob bg-coral/60 h-[32rem] w-[32rem] -top-32 -right-24" style={{ opacity: 0.7 }} />
        <div className="blob bg-sky/55 h-[28rem] w-[28rem] top-[15%] -left-32" style={{ opacity: 0.7 }} />
        <div className="blob bg-sun/55 h-[26rem] w-[26rem] top-[40%] right-[8%]" style={{ opacity: 0.7 }} />
        <div className="blob bg-mint/55 h-[30rem] w-[30rem] top-[60%] -left-20" style={{ opacity: 0.7 }} />
        <div className="blob bg-lilac/55 h-[28rem] w-[28rem] top-[78%] -right-24" style={{ opacity: 0.7 }} />
        <div className="blob bg-coral/50 h-[24rem] w-[24rem] bottom-[5%] left-[15%]" style={{ opacity: 0.7 }} />
      </div>

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
    </div>
  );
}
