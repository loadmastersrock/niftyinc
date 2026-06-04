"use client";

import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";

type Feedback = {
  id: string;
  card_name: string | null;
  set_name: string | null;
  card_number: string | null;
  predicted_grade: string | null;
  psa_10_probability: string | null;
  helpful: boolean | null;
  identification_correct: boolean | null;
  user_grade: string | null;
  comment: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFeedback() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setFeedback(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  const stats = useMemo(() => {
    const total = feedback.length;

    const helpfulAnswers = feedback.filter((item) => item.helpful !== null);
    const helpfulYes = feedback.filter((item) => item.helpful === true).length;

    const idAnswers = feedback.filter(
      (item) => item.identification_correct !== null
    );
    const idYes = feedback.filter(
      (item) => item.identification_correct === true
    ).length;

    const helpfulPercent = helpfulAnswers.length
      ? Math.round((helpfulYes / helpfulAnswers.length) * 100)
      : 0;

    const identificationPercent = idAnswers.length
      ? Math.round((idYes / idAnswers.length) * 100)
      : 0;

    const gradeCounts: Record<string, number> = {};

    feedback.forEach((item) => {
      if (item.user_grade) {
        gradeCounts[item.user_grade] = (gradeCounts[item.user_grade] || 0) + 1;
      }
    });

    const mostCommonGrade =
      Object.entries(gradeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "No data yet";

    return {
      total,
      helpfulPercent,
      identificationPercent,
      mostCommonGrade,
    };
  }, [feedback]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="absolute left-10 top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-10 top-60 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
              Nifty Admin
            </p>

            <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">
              Feedback Dashboard
            </h1>

            <p className="max-w-3xl text-lg text-slate-300">
              Track how collectors rate Nifty Scan™ results and use their
              feedback to improve the grading system.
            </p>
          </div>

          <button
            onClick={loadFeedback}
            className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-500"
          >
            Refresh
          </button>
        </div>

        <div className="relative z-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm text-slate-400">Total Feedback</p>
            <p className="mt-3 text-4xl font-black">{stats.total}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm text-slate-400">Helpful</p>
            <p className="mt-3 text-4xl font-black text-green-300">
              {stats.helpfulPercent}%
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm text-slate-400">ID Correct</p>
            <p className="mt-3 text-4xl font-black text-blue-300">
              {stats.identificationPercent}%
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm text-slate-400">Common User Grade</p>
            <p className="mt-3 text-3xl font-black text-violet-300">
              {stats.mostCommonGrade}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="mb-6 text-2xl font-bold">Latest Feedback</h2>

          {loading && <p className="text-slate-400">Loading feedback...</p>}

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && feedback.length === 0 && (
            <p className="text-slate-400">No feedback yet.</p>
          )}

          <div className="space-y-4">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
              >
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {item.card_name || "Unknown Card"}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {item.set_name || "Unknown Set"} ·{" "}
                      {item.card_number || "Unknown Number"}
                    </p>
                  </div>

                  <p className="text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xs text-slate-500">AI Grade</p>
                    <p className="font-bold text-green-300">
                      {item.predicted_grade || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xs text-slate-500">User Grade</p>
                    <p className="font-bold text-violet-300">
                      {item.user_grade || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xs text-slate-500">Helpful</p>
                    <p className="font-bold">
                      {item.helpful === null
                        ? "N/A"
                        : item.helpful
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="text-xs text-slate-500">ID Correct</p>
                    <p className="font-bold">
                      {item.identification_correct === null
                        ? "N/A"
                        : item.identification_correct
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                </div>

                {item.comment && (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-300">{item.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}