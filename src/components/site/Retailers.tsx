import { Store, ArrowLeft } from "lucide-react";
import productCube from "@/assets/product-cube.png";
import productClock from "@/assets/product-clock.png";
import productMic from "@/assets/product-mic.png";

export function Retailers() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative bg-gradient-to-br from-lilac-soft via-sky-soft to-cream rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-base font-semibold text-navy/80 mb-5">
                <Store className="h-4 w-4" />
                לקמעונאים ומפיצים
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance">
                שותפים להצלחה.
                <br />
                <span className="text-coral">בואו לעבוד איתנו.</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-lg lg:text-xl max-w-md mx-auto lg:mr-0">
                אנחנו עובדים עם רשתות וחנויות מובילות בישראל ומרחיבים את פעילותנו לשווקים בינלאומיים.
              </p>
              <button className="mt-7 inline-flex items-center gap-2 h-13 px-7 rounded-full bg-white text-navy font-bold text-base border border-border hover:bg-navy hover:text-white hover:border-navy transition-all">
                לפרטים לקמעונאים
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="relative h-56 sm:h-72 lg:h-80">
              <img src={productCube} alt="" loading="lazy" className="absolute right-2 sm:right-12 top-4 h-40 sm:h-56 drop-shadow-xl rotate-[-6deg]" />
              <img src={productClock} alt="" loading="lazy" className="absolute right-32 sm:right-52 bottom-0 h-36 sm:h-48 drop-shadow-xl rotate-[5deg]" />
              <img src={productMic} alt="" loading="lazy" className="absolute left-2 sm:left-8 bottom-4 h-44 sm:h-60 drop-shadow-xl rotate-[10deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
