import Navbar from "@/components/Navbar";

const cards = [
  {
    name: "Charizard ex",
    set: "Obsidian Flames",
    number: "223/197",
    value: "£65",
  },
  {
    name: "Pikachu ex",
    set: "Surging Sparks",
    number: "238/191",
    value: "£120",
  },
  {
    name: "Umbreon VMAX",
    set: "Brilliant Stars Trainer Gallery",
    number: "TG23/TG30",
    value: "£40",
  },
  {
    name: "Mew ex",
    set: "Paldean Fates",
    number: "232/091",
    value: "£85",
  },
  {
    name: "Gengar ex",
    set: "Temporal Forces",
    number: "193/162",
    value: "£55",
  },
];

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
            Browse popular Pokémon cards, estimated values and grading
            opportunities. Nifty Value™ combines grading analysis and market
            intelligence to help collectors decide what to grade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.name + card.number}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <h2 className="mb-2 text-2xl font-bold">
                {card.name}
              </h2>

              <p className="mb-1 text-slate-400">
                {card.set}
              </p>

              <p className="mb-4 text-slate-500">
                {card.number}
              </p>

              <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                <p className="text-sm text-slate-400">
                  Estimated Raw Value
                </p>

                <p className="mt-2 text-3xl font-black text-violet-300">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}