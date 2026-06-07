import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="absolute left-0 top-24 h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[520px] w-[520px] rounded-full bg-violet-700/10 blur-3xl" />

        <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-amber-300">
              Private Pokémon Card Buyer
            </p>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              Selling high-end Pokémon cards should feel premium.
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
              Nifty Inc buys and evaluates rare, graded and high-value Pokémon
              cards with a focus on discretion, market knowledge and serious
              collector-grade service.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#valuation"
                className="rounded-xl bg-amber-400 px-6 py-4 text-center font-bold text-black hover:bg-amber-300"
              >
                Request Private Valuation
              </a>

              <a
                href="/grader"
                className="rounded-xl border border-slate-700 px-6 py-4 text-center font-bold text-white hover:border-amber-400/60"
              >
                Try AI Card Grader
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-slate-950 to-black p-6 shadow-[0_0_60px_rgba(251,191,36,0.12)]">
            <div className="rounded-[1.5rem] border border-slate-800 bg-black/60 p-6">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-300">
                We Buy
              </p>

              <div className="space-y-4">
                {[
                  "PSA 10 grails and chase cards",
                  "Vintage holographics",
                  "Japanese promos and trophy-style cards",
                  "Sealed premium Pokémon products",
                  "High-end collections and graded slabs",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <p className="text-slate-200">✓ {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-24 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
            <p className="text-3xl font-black text-amber-300">Premium</p>
            <p className="mt-2 text-slate-300">
              Built for high-value Pokémon cards, not bulk low-end collections.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <p className="text-3xl font-black text-violet-300">Discreet</p>
            <p className="mt-2 text-slate-300">
              Private valuations for collectors who want a simple, serious
              process.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6">
            <p className="text-3xl font-black text-blue-300">Data-Led</p>
            <p className="mt-2 text-slate-300">
              AI grading tools, eBay sold data and market checks support
              valuation decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-300">
              What We Look For
            </p>

            <h2 className="text-4xl font-black">
              High-end cards deserve a high-end process.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Condition",
                text: "Centering, corners, surface, whitening and eye appeal are reviewed carefully.",
              },
              {
                title: "Market Demand",
                text: "We consider collector demand, liquidity and recent comparable sales.",
              },
              {
                title: "Grade Potential",
                text: "Raw cards are assessed for their realistic grading upside.",
              },
              {
                title: "Authenticity Signals",
                text: "We look for consistency in card details, print quality and known set characteristics.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-black/40 p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-amber-200">
                  {item.title}
                </h3>
                <p className="text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="valuation" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-300">
              Private Valuation
            </p>

            <h2 className="mb-5 text-4xl font-black">
              Want to sell a serious Pokémon card?
            </h2>

            <p className="mb-6 text-lg text-slate-300">
              Send clear front and back photos, the card name, set, number,
              grade if already slabbed, and your asking price if you have one.
            </p>

            <p className="text-slate-400">
              For now, use the AI grader link to pre-check condition, then
              contact us with the cards you are considering selling.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
            <div className="rounded-2xl border border-slate-800 bg-black/50 p-6">
              <h3 className="mb-5 text-2xl font-bold">
                What to include
              </h3>

              <ul className="space-y-4 text-slate-300">
                <li>• Front and back photos in good light</li>
                <li>• Any PSA, CGC, BGS, TAG or ACE grade</li>
                <li>• Card name, set and number</li>
                <li>• Any visible damage or whitening</li>
                <li>• Whether you want a cash offer or valuation only</li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/grader"
                  className="rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-black hover:bg-amber-300"
                >
                  Pre-Check With AI Grader
                </a>

                <a
                  href="mailto:hello@niftyinc.io"
                  className="rounded-xl border border-slate-700 px-5 py-3 text-center font-bold text-white hover:border-amber-400/60"
                >
                  Email Cards
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Change hello@niftyinc.io to your preferred email address if
                needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}