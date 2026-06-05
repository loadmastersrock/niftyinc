import Navbar from "@/components/Navbar";

const scanChecks = [
  "Centering",
  "Corner Wear",
  "Edge Wear",
  "Surface Scratches",
  "Whitening",
  "Print Lines",
  "Dents & Creases",
  "Eye Appeal",
];

const collectorBenefits = [
  {
    title: "Pre-screen raw cards",
    text: "Check whether a card looks worth submitting before paying grading fees.",
  },
  {
    title: "Compare multiple copies",
    text: "Upload several cards and choose the strongest candidate for PSA, CGC, Beckett or TAG.",
  },
  {
    title: "Buy smarter",
    text: "Use AI condition reports to avoid overpaying for raw cards with hidden flaws.",
  },
];

const comingSoon = [
  "Collection Tracking",
  "Market Price Alerts",
  "PSA Submission Assistant",
  "Population Data",
  "Dealer Dashboard",
  "Portfolio Analytics",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="absolute left-20 top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-20 top-60 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
              Nifty Scan™
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Know Before
              <br />
              You Grade
            </h1>

            <p className="mb-10 max-w-2xl text-xl text-slate-300">
              AI-powered pre-grading for collectors. Upload your Pokémon cards
              and receive a professional condition report before spending money
              on PSA submissions.
            </p>
<div className="mt-24">
  <div className="mb-10 text-center">
    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
      How Nifty Scan™ Works
    </p>

    <h2 className="text-4xl font-bold">
      Multi-Stage AI Card Analysis
    </h2>

    <p className="mx-auto mt-4 max-w-3xl text-slate-400">
      Nifty Scan™ uses multiple AI analysis stages to identify, assess and
      value Pokémon cards from front and back images.
    </p>
  </div>


  <div className="mt-10 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 text-center">
      <p className="text-3xl font-black text-violet-300">40+</p>
      <p className="mt-2 text-sm text-slate-300">
        Analysis Checks
      </p>
    </div>

    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 text-center">
      <p className="text-3xl font-black text-blue-300">2-Sided</p>
      <p className="mt-2 text-sm text-slate-300">
        Front & Back Review
      </p>
    </div>

    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center">
      <p className="text-3xl font-black text-green-300">
        AI + Market Data
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Grade & Value Analysis
      </p>
    </div>
  </div>
</div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/grader"
                className="rounded-xl bg-violet-600 px-6 py-4 text-center font-semibold text-white hover:bg-violet-500"
              >
                Start Free Scan
              </a>

              <a
                href="#demo"
                className="rounded-xl border border-slate-700 px-6 py-4 text-center font-semibold text-white hover:border-slate-500"
              >
                View Demo Report
              </a>
            </div>
          </div>

          <div
            id="demo"
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl"
          >
            <p className="mb-4 text-sm text-slate-400">Example AI Report</p>

            <h3 className="mb-1 text-2xl font-bold">Charizard ex</h3>
            <p className="mb-6 text-sm text-slate-400">
              Obsidian Flames · 223/197
            </p>

            <div className="mb-6 rounded-2xl bg-slate-950/70 p-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Predicted Grade</span>
                <span className="font-bold text-green-400">PSA 9</span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-slate-400">PSA 10 Chance</span>
                <span className="font-bold text-violet-400">38%</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                ["Centering", "9.4"],
                ["Corners", "8.8"],
                ["Edges", "9.1"],
                ["Surface", "8.6"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
                >
                  <span className="text-slate-300">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
              <p className="text-sm text-slate-300">
                Main issue: minor whitening on rear bottom-left corner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
            What We Check
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Stop Wasting Grading Fees
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            Nifty Scan™ helps collectors spot visible issues before submitting
            cards for grading.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scanChecks.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                ✓
              </div>
              <h3 className="font-semibold text-white">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {collectorBenefits.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
              <p className="text-slate-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-violet-500/20 bg-violet-500/10 p-8 md:p-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-300">
            Coming Soon
          </p>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            More than a grading estimate.
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-violet-400/20 bg-slate-950/40 px-5 py-4 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
          <p className="mb-6 text-center text-sm uppercase tracking-[0.25em] text-slate-500">
            Built for collectors submitting to
          </p>

          <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            {["PSA", "CGC", "Beckett", "TAG"].map((company) => (
              <div
                key={company}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 px-6 py-5 text-2xl font-black tracking-widest text-slate-200"
              >
                {company}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">
            Nifty Inc provides AI-powered pre-grading estimates only. We are not
            affiliated with PSA, CGC, Beckett or TAG.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950/80 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold tracking-wider">
              NIFTY<span className="text-violet-400">INC</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              AI pre-grading tools for serious collectors.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}