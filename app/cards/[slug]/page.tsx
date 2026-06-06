import Navbar from "@/components/Navbar";
import { seoCards } from "@/lib/cards";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return seoCards.map((card) => ({
    slug: card.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const card = seoCards.find((item) => item.slug === slug);

  if (!card) {
    return {
      title: "Card Not Found | Nifty Inc",
    };
  }

  return {
    title: `${card.title} | Nifty Inc`,
    description: card.description,
  };
}

export default async function CardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = seoCards.find((item) => item.slug === slug);

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
            Pokémon Card Value Guide
          </p>

          <h1 className="mb-4 text-5xl font-bold leading-tight">
            {card.name} {card.number} Value & Grading Guide
          </h1>

          <p className="max-w-3xl text-lg text-slate-400">
            Check estimated raw value, PSA 9 value, PSA 10 value and grading
            potential for {card.name} from {card.set}.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-6 text-3xl font-bold">
                {card.name} Card Details
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-sm text-slate-400">Card Name</p>
                  <p className="mt-2 text-xl font-bold">{card.name}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-sm text-slate-400">Set</p>
                  <p className="mt-2 text-xl font-bold">{card.set}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-sm text-slate-400">Card Number</p>
                  <p className="mt-2 text-xl font-bold">{card.number}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6">
              <h2 className="mb-6 text-3xl font-bold">Nifty Value™</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <p className="text-sm text-slate-400">Raw Value</p>
                  <p className="mt-3 text-3xl font-black text-violet-300">
                    {card.rawValue}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <p className="text-sm text-slate-400">PSA 9 Value</p>
                  <p className="mt-3 text-3xl font-black text-blue-300">
                    {card.psa9Value}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
                  <p className="text-sm text-slate-400">PSA 10 Value</p>
                  <p className="mt-3 text-3xl font-black text-green-300">
                    {card.psa10Value}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-300">
                Values are estimates and can change quickly. Always check recent
                sold listings before buying, selling or submitting a card for
                grading.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-3xl font-bold">
                Should You Grade {card.name} {card.number}?
              </h2>

              <p className="mb-4 text-slate-300">
                This depends on condition, centering, surface quality, edge wear,
                corner sharpness and current market demand. A card with strong
                PSA 10 upside may be worth grading, but cards with whitening,
                scratches or poor centering can lose much of that upside.
              </p>

              <p className="text-slate-300">
                Nifty Scan™ can analyse front and back images, assess photo
                quality, estimate the likely grade and compare the potential
                graded value against raw value.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-violet-500/30 bg-violet-500/10 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                Scan Your Own Copy
              </h2>

              <p className="mb-6 text-slate-300">
                Upload front and back images of your card to get an AI grading
                estimate, photo quality score and value analysis.
              </p>

              <a
                href="/grader"
                className="block rounded-xl bg-violet-600 px-5 py-3 text-center font-bold text-white hover:bg-violet-500"
              >
                Start Free Scan
              </a>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                What Nifty Checks
              </h2>

              <ul className="space-y-3 text-sm text-slate-300">
                <li>• Card identification</li>
                <li>• Front and back image quality</li>
                <li>• Centering</li>
                <li>• Corner wear</li>
                <li>• Edge wear</li>
                <li>• Surface marks</li>
                <li>• Whitening</li>
                <li>• PSA 10 probability</li>
                <li>• Market value spread</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}