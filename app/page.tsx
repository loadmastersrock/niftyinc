import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#f5f0e8]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-28 pt-44">
        <div className="max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-[#c6a15b]">
            Private Pokémon Card Acquisitions
          </p>

          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            We buy exceptional Pokémon cards.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#b8b0a3]">
            Nifty Inc privately evaluates and acquires high-value Pokémon cards,
            graded slabs, vintage holographics, modern grails and premium
            collections.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#valuation"
              className="rounded-full bg-[#c6a15b] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-black hover:bg-[#d8b66f]"
            >
              Request Valuation
            </a>

            <a
              href="/grader"
              className="rounded-full border border-[#c6a15b]/40 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#f5f0e8] hover:border-[#c6a15b]"
            >
              AI Pre-Check
            </a>
          </div>
        </div>

        <div className="mt-24 grid gap-8 border-y border-[#2a261d] py-10 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#c6a15b]">
              Focus
            </p>
            <p className="mt-3 text-2xl font-semibold">
              High-end cards only
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#c6a15b]">
              Method
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Data-led valuations
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#c6a15b]">
              Service
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Private and discreet
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-28 text-[#080806]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#8b6a2f]">
                What We Buy
              </p>

              <h2 className="text-5xl font-semibold leading-tight">
                Serious cards. Serious collectors.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                "PSA 10 modern grails",
                "Vintage holographics",
                "Japanese promos",
                "Gold stars and crystals",
                "High-value raw cards",
                "Premium sealed products",
              ].map((item) => (
                <div key={item} className="border-t border-[#c9bda7] pt-5">
                  <p className="text-2xl font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#c6a15b]">
              Valuation Process
            </p>

            <h2 className="text-5xl font-semibold leading-tight">
              Every offer starts with condition, market demand and liquidity.
            </h2>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "Condition review",
                text: "We review centering, surface, edges, corners, whitening and presentation quality.",
              },
              {
                title: "Market comparison",
                text: "Recent sold data, graded premiums and collector demand are considered before making an offer.",
              },
              {
                title: "Private acquisition",
                text: "If the card fits our buying criteria, we can discuss a direct private purchase.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-[#2a261d] pt-6">
                <h3 className="text-2xl font-semibold text-[#f5f0e8]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#b8b0a3]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="valuation" className="bg-[#11100d] px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#c6a15b]">
            Sell To Nifty Inc
          </p>

          <h2 className="text-5xl font-semibold leading-tight">
            Request a private card valuation.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#b8b0a3]">
            Send clear front and back images, the card name, set, number,
            grading company and grade if applicable. We focus on premium cards,
            rare slabs and strong collector demand.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@niftyinc.io"
              className="rounded-full bg-[#c6a15b] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black hover:bg-[#d8b66f]"
            >
              Email Your Cards
            </a>

            <a
              href="/grader"
              className="rounded-full border border-[#c6a15b]/40 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f5f0e8] hover:border-[#c6a15b]"
            >
              Use AI Pre-Check
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}