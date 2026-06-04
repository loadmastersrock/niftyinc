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

type Scan = {
id: string;
card_name: string | null;
set_name: string | null;
card_number: string | null;
predicted_grade: string | null;
psa_10_probability: string | null;
grade_recommendation: string | null;
created_at: string;
};

export default function AdminDashboard() {
const [feedback, setFeedback] = useState<Feedback[]>([]);
const [scans, setScans] = useState<Scan[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

async function loadDashboard() {
setLoading(true);
setError("");

```
const [feedbackResult, scansResult] = await Promise.all([
  supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false }),
  supabase
    .from("scans")
    .select("*")
    .order("created_at", { ascending: false }),
]);

if (feedbackResult.error) {
  setError(feedbackResult.error.message);
} else {
  setFeedback(feedbackResult.data || []);
}

if (scansResult.error) {
  setError(scansResult.error.message);
} else {
  setScans(scansResult.data || []);
}

setLoading(false);
```

}

useEffect(() => {
loadDashboard();
}, []);

const stats = useMemo(() => {
const totalFeedback = feedback.length;
const totalScans = scans.length;

```
const feedbackRate =
  totalScans > 0 ? Math.round((totalFeedback / totalScans) * 100) : 0;

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

return {
  totalScans,
  totalFeedback,
  feedbackRate,
  helpfulPercent,
  identificationPercent,
};
```

}, [feedback, scans]);

return ( <main className="min-h-screen bg-[#050816] text-white"> <Navbar />

```
  <section className="mx-auto max-w-7xl px-6 pb-24 pt-40">
    <div className="mb-12 flex items-end justify-between">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
          Nifty Admin
        </p>

        <h1 className="text-5xl font-black">
          Analytics Dashboard
        </h1>
      </div>

      <button
        onClick={loadDashboard}
        className="rounded-xl bg-violet-600 px-5 py-3 font-bold"
      >
        Refresh
      </button>
    </div>

    <div className="grid gap-4 md:grid-cols-5">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-sm text-slate-400">Total Scans</p>
        <p className="mt-3 text-4xl font-black">
          {stats.totalScans}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-sm text-slate-400">Feedback</p>
        <p className="mt-3 text-4xl font-black">
          {stats.totalFeedback}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-sm text-slate-400">Feedback Rate</p>
        <p className="mt-3 text-4xl font-black text-yellow-300">
          {stats.feedbackRate}%
        </p>
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
    </div>

    {error && (
      <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {error}
      </div>
    )}

    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Latest Scans
        </h2>

        {loading && <p>Loading...</p>}

        <div className="space-y-4">
          {scans.slice(0, 10).map((scan) => (
            <div
              key={scan.id}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <p className="font-bold">
                {scan.card_name || "Unknown Card"}
              </p>

              <p className="text-sm text-slate-400">
                Grade: {scan.predicted_grade || "N/A"}
              </p>

              <p className="text-sm text-slate-400">
                PSA10: {scan.psa_10_probability || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Latest Feedback
        </h2>

        {loading && <p>Loading...</p>}

        <div className="space-y-4">
          {feedback.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <p className="font-bold">
                {item.card_name || "Unknown Card"}
              </p>

              <p className="text-sm text-slate-400">
                User Grade: {item.user_grade || "N/A"}
              </p>

              {item.comment && (
                <p className="mt-2 text-sm text-slate-300">
                  {item.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
</main>
```

);
}
