"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

type ScanHistoryItem = {
  id: string;
  card_name: string;
  set_name: string;
  card_number: string;
  predicted_grade: string;
  psa_10_probability: string;
  grade_recommendation: string;
  created_at: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("nifty_scan_history");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  function clearHistory() {
    localStorage.removeItem("nifty_scan_history");
    setHistory([]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="absolute left-10 top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-10 top-60 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
              Nifty History
            </p>

            <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">
              Recent Scans
            </h1>

            <p className="max-w-3xl text-lg text-slate-300">
              Your latest card scans are saved on this device so you can review
              previous grading estimates.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 font-bold text-red-200 hover:bg-red-500/20"
            >
              Clear History
            </button>
          )}
        </div>

        <div className="relative z-10">
          {history.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <h2 className="mb-3 text-2xl font-bold">No scans yet</h2>
              <p className="mb-6 text-slate-400">
                Scan your first card and it will appear here.
              </p>
              <a
                href="/grader"
                className="inline-block rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-500"
              >
                Start Free Scan
              </a>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-violet-400">
                    Scan Result
                  </p>

                  <h2 className="mb-1 text-2xl font-bold">
                    {item.card_name || "Unknown Card"}
                  </h2>

                  <p className="mb-5 text-sm text-slate-400">
                    {item.set_name || "Unknown Set"} ·{" "}
                    {item.card_number || "Unknown Number"}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <span className="text-slate-400">Predicted Grade</span>
                      <span className="font-bold text-green-300">
                        {item.predicted_grade || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <span className="text-slate-400">PSA 10 Chance</span>
                      <span className="font-bold text-violet-300">
                        {item.psa_10_probability || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <span className="text-slate-400">Decision</span>
                      <span className="font-bold text-blue-300">
                        {item.grade_recommendation || "REVIEW"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}