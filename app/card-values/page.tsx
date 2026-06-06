import Navbar from "@/components/Navbar";
import { seoCards } from "@/lib/cards";

export default function CardValuesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
            Pokémon Card Values
          </p>

          <h1 className="mb-4 text-5xl font-bold">
            Popular Pokémon Card Values
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Browse popular Pokémon cards, estimated raw values, PSA 9 values,
            PSA 10 values and grading potential. Nifty Value™ helps collectors
            decide whether a card may be worth grading.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seoCards.map((card) => (
            <a
              key={card.slug}
              href={`/cards/${card.slug}`}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-violet-500/50 hover:bg-slate-900/80"
            >
              <h2 className="mb-2 text-2xl font-bold">{card.name}</h2>

              <p className="mb-1 text-slate-400">{card.set}</p>

              <p className="mb-4 text-slate-500">{card.number}</p>

              <div className="space-y-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Raw</span>
                  <span className="font-bold text-violet-300">
                    {card.rawValue}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">PSA 9</span>
                  <span className="font-bold text-blue-300">
                    {card.psa9Value}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">PSA 10</span>
                  <span className="font-bold text-green-300">
                    {card.psa10Value}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold text-violet-300">
                View grading guide →
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}