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
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Soft pastel blob field — fixed behind all content for a continuous, airy backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob bg-coral/35 h-[28rem] w-[28rem] -top-32 -right-24" />
        <div className="blob bg-sky/30 h-[24rem] w-[24rem] top-[18%] -left-32" />
        <div className="blob bg-sun/30 h-[22rem] w-[22rem] top-[40%] right-[10%]" />
        <div className="blob bg-mint/30 h-[26rem] w-[26rem] top-[62%] -left-20" />
        <div className="blob bg-lilac/30 h-[24rem] w-[24rem] top-[80%] right-[-6rem]" />
        <div className="blob bg-coral/25 h-[20rem] w-[20rem] bottom-[5%] left-[20%]" />
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
