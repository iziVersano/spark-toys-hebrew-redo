import { ArrowLeft, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] ring-1 ring-black/5 shadow-pop bg-cream">
          <div className="grid lg:grid-cols-2 min-h-[620px] lg:min-h-[700px]">

            {/* TEXT PANEL */}
            <div
              className="order-2 lg:order-1 px-6 sm:px-10 py-10 lg:py-16 relative text-right"
              style={{
                backgroundColor: '#ffffff',
                backgroundImage: "linear-gradient(rgba(255,255,255,0.35),rgba(255,255,255,0.35)), url('/assets/images/hero-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black leading-[1.05] text-black tracking-tight text-balance">
                  משחק חכם<br />
                  <span className="text-coral">מתחיל בסקרנות.</span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-md mr-0 font-light">
                  צעצועים דוברי עברית שמפתחים חשיבה, דמיון ולמידה דרך משחק.
                </p>
              </div>

              {/* CTA buttons */}
              <div
                className="flex flex-col gap-4 absolute"
                style={{ bottom: '2.5rem', left: '2.5rem', right: '2.5rem' }}
              >
                <a
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-3 h-[58px] rounded-2xl font-extrabold text-lg text-white transition-all duration-200 hover:-translate-y-1 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg,#e8614a 0%,#d94f38 100%)',
                    boxShadow: '0 6px 24px -4px rgba(232,97,74,.55)',
                    width: '100%',
                  }}
                >
                  גלו את המוצרים
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="#benefits"
                  className="group inline-flex items-center justify-center gap-3 h-[58px] rounded-2xl font-extrabold text-lg transition-all duration-200 hover:-translate-y-1 whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(232,97,74,0.35)',
                    color: '#1e2a4a',
                    boxShadow: '0 4px 16px -4px rgba(30,42,74,.12)',
                    width: '100%',
                  }}
                >
                  <Users className="w-[18px] h-[18px] text-coral" strokeWidth={2.5} />
                  לפי גיל והתפתחות
                </a>
              </div>
            </div>

            {/* VIDEO PANEL */}
            <div className="relative order-1 lg:order-2 overflow-hidden bg-cream" style={{ minHeight: '560px' }}>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center top' }}
                src="/assets/videos/hero.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
              <div aria-hidden className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent pointer-events-none hidden lg:block" />
              <div aria-hidden className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none lg:hidden" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
