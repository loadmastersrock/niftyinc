"use client";

import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

type EbaySoldResult = {
  source: "cache" | "soldcomps";
  average_price: number | null;
  median_price: number | null;
  lowest_price: number | null;
  highest_price: number | null;
  sales_count: number;
  currency: string;
  items: {
    title: string;
    soldPrice: string;
    soldCurrency: string;
    shippingPrice: string;
    endedAt: string;
    url: string;
  }[];
};

type AnalysisResult = {
  card_name: string;
  set_name: string;
  card_number: string;
  language: string;
  rarity: string;
  era: string;
  identification_confidence: string;
  predicted_grade: string;
  psa_10_probability: string;
  confidence: string;
  scores: {
    centering: string;
    corners: string;
    edges: string;
    surface: string;
  };
  detected_issues: string[];
  recommendation: string;
  disclaimer: string;
  value: {
    raw_value: string;
    psa9_value: string;
    psa10_value: string;
    submission_cost: string;
    expected_profit: string;
    grade_recommendation: "GRADE" | "DO NOT GRADE" | "REVIEW";
    decision_title: string;
    decision_reason: string;
    value_summary: string;
    sources?: {
      ebay?: string;
      pricecharting?: string;
      tcgplayer?: string;
      cardmarket?: string;
    };
  };
};

function getDecisionColour(decision: string) {
  if (decision === "GRADE") {
    return "border-green-500/30 bg-green-500/10 text-green-300";
  }

  if (decision === "DO NOT GRADE") {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
}

function saveScanToHistory(result: AnalysisResult) {
  const existing = localStorage.getItem("nifty_scan_history");
  const history = existing ? JSON.parse(existing) : [];

  const newItem = {
    id: crypto.randomUUID(),
    card_name: result.card_name,
    set_name: result.set_name,
    card_number: result.card_number,
    predicted_grade: result.predicted_grade,
    psa_10_probability: result.psa_10_probability,
    grade_recommendation: result.value.grade_recommendation,
    created_at: new Date().toISOString(),
  };

  const updatedHistory = [newItem, ...history].slice(0, 20);

  localStorage.setItem("nifty_scan_history", JSON.stringify(updatedHistory));
}

async function saveScanToSupabase(result: AnalysisResult) {
  const { error } = await supabase.from("scans").insert({
    card_name: result.card_name,
    set_name: result.set_name,
    card_number: result.card_number,
    predicted_grade: result.predicted_grade,
    psa_10_probability: result.psa_10_probability,
    grade_recommendation: result.value?.grade_recommendation,
  });

  if (error) {
    console.error("Scan save error:", error.message);
  }
}

function formatEbayPrice(value: number | null, currency: string) {
  if (value === null) return "N/A";
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "";
  return `${symbol}${value.toFixed(2)}`;
}

export default function GraderPage() {
  const [cardName, setCardName] = useState("");
  const [setName, setSetName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const [ebayLoading, setEbayLoading] = useState(false);
  const [ebayError, setEbayError] = useState("");
  const [ebayResult, setEbayResult] = useState<EbaySoldResult | null>(null);

  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [identificationCorrect, setIdentificationCorrect] =
    useState<boolean | null>(null);
  const [userGrade, setUserGrade] = useState("");
  const [comment, setComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  function handleImage(file: File, side: "front" | "back") {
    const previewUrl = URL.createObjectURL(file);

    if (side === "front") {
      setFrontImage(file);
      setFrontPreview(previewUrl);
    } else {
      setBackImage(file);
      setBackPreview(previewUrl);
    }
  }

  async function analyseCard() {
    setError("");
    setResult(null);
    setEbayResult(null);
    setEbayError("");
    setFeedbackMessage("");
    setHelpful(null);
    setIdentificationCorrect(null);
    setUserGrade("");
    setComment("");

    if (!frontImage || !backImage) {
      setError("Please upload both front and back images.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cardName", cardName);
      formData.append("setName", setName);
      formData.append("cardNumber", cardNumber);
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);

      const response = await fetch("/api/analyse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
      saveScanToHistory(data);
      await saveScanToSupabase(data);

      if (data.card_name) setCardName(data.card_name);
      if (data.set_name) setSetName(data.set_name);
      if (data.card_number) setCardNumber(data.card_number);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function checkEbaySoldPrices() {
    if (!result) return;

    const todayKey = `nifty_ebay_lookup_${new Date()
      .toISOString()
      .slice(0, 10)}`;

    const alreadyUsedToday = localStorage.getItem(todayKey);

    if (alreadyUsedToday && !ebayResult) {
      setEbayError(
        "Free users get one fresh eBay sold-price lookup per day. Cached results may still appear when available."
      );
      return;
    }

    setEbayLoading(true);
    setEbayError("");

    try {
      const response = await fetch("/api/ebay-sold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardName: result.card_name,
          setName: result.set_name,
          cardNumber: result.card_number,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "eBay sold lookup failed.");
      }

      setEbayResult(data);

      if (data.source === "soldcomps") {
        localStorage.setItem(todayKey, "true");
      }
    } catch (err) {
      setEbayError(
        err instanceof Error ? err.message : "Could not check eBay sold prices."
      );
    } finally {
      setEbayLoading(false);
    }
  }

  async function submitFeedback() {
    if (!result) return;

    setFeedbackMessage("");
    setFeedbackLoading(true);

    try {
      const { error: feedbackError } = await supabase.from("feedback").insert({
        card_name: result.card_name,
        set_name: result.set_name,
        card_number: result.card_number,
        predicted_grade: result.predicted_grade,
        psa_10_probability: result.psa_10_probability,
        helpful,
        identification_correct: identificationCorrect,
        user_grade: userGrade,
        comment,
      });

      if (feedbackError) {
        throw feedbackError;
      }

      setFeedbackMessage("Thank you — your feedback has been saved.");
    } catch (err) {
      setFeedbackMessage(
        err instanceof Error
          ? `Feedback error: ${err.message}`
          : "Could not save feedback."
      );
    } finally {
      setFeedbackLoading(false);
    }
  }

  const marketSources = result?.value?.sources
    ? [
        ["eBay Sold", result.value.sources.ebay],
        ["PriceCharting", result.value.sources.pricecharting],
        ["TCGplayer", result.value.sources.tcgplayer],
        ["Cardmarket", result.value.sources.cardmarket],
      ].filter((source) => Boolean(source[1]))
    : [];

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40">
        <div className="absolute left-10 top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-10 top-60 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 mb-12 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            Nifty Scan™
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Upload Your Card
          </h1>

          <p className="text-lg text-slate-300">
            Upload clear front and back images. Nifty Scan™ will identify the
            card, analyse condition and prepare a grading decision report.
          </p>
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
            <div className="mb-4 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4 text-sm text-slate-300">
              Card details are optional. Leave them blank and Nifty Scan™ will
              try to identify the card automatically.
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Card Name
                </label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                  placeholder="Auto-detected"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Set Name
                </label>
                <input
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  type="text"
                  placeholder="Auto-detected"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Card Number
                </label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  type="text"
                  placeholder="Auto-detected"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="group flex min-h-[320px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center hover:border-violet-500 hover:bg-violet-500/5">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImage(file, "front");
                  }}
                />

                {frontPreview ? (
                  <img
                    src={frontPreview}
                    alt="Front preview"
                    className="max-h-[280px] rounded-2xl object-contain"
                  />
                ) : (
                  <>
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl text-violet-300">
                      +
                    </div>

                    <h3 className="mb-2 text-xl font-bold">Front Image</h3>
                    <p className="max-w-xs text-sm text-slate-400">
                      Upload a sharp photo showing the name, artwork and card
                      number.
                    </p>

                    <span className="mt-5 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 group-hover:border-violet-500">
                      Choose File
                    </span>
                  </>
                )}
              </label>

              <label className="group flex min-h-[320px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center hover:border-blue-500 hover:bg-blue-500/5">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImage(file, "back");
                  }}
                />

                {backPreview ? (
                  <img
                    src={backPreview}
                    alt="Back preview"
                    className="max-h-[280px] rounded-2xl object-contain"
                  />
                ) : (
                  <>
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl text-blue-300">
                      +
                    </div>

                    <h3 className="mb-2 text-xl font-bold">Back Image</h3>
                    <p className="max-w-xs text-sm text-slate-400">
                      Upload the back so whitening, edges and corners can be
                      checked.
                    </p>

                    <span className="mt-5 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 group-hover:border-blue-500">
                      Choose File
                    </span>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              onClick={analyseCard}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-violet-600 px-6 py-4 text-lg font-bold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Identifying & Analysing..." : "Analyse Card"}
            </button>

            <a
              href="/history"
              className="mt-4 block text-center text-sm text-slate-400 hover:text-white"
            >
              View scan history
            </a>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            {!result ? (
              <>
                <h2 className="mb-6 text-2xl font-bold">What We Analyse</h2>

                <div className="space-y-3">
                  {[
                    "Card identification",
                    "Set and card number",
                    "Centering",
                    "Corner wear",
                    "Edge wear",
                    "Surface marks",
                    "Whitening",
                    "Print lines",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-sm text-violet-300">
                        ✓
                      </span>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
                  <h3 className="mb-2 font-bold">Photo Tips</h3>
                  <p className="text-sm text-slate-300">
                    Use natural light, avoid glare, keep the card flat, and make
                    sure the card name and number are readable.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`mb-6 rounded-3xl border p-5 ${getDecisionColour(
                    result.value.grade_recommendation
                  )}`}
                >
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] opacity-80">
                    Nifty Grade Decision™
                  </p>
                  <h2 className="mb-3 text-3xl font-black">
                    {result.value.decision_title}
                  </h2>
                  <p className="text-sm text-slate-200">
                    {result.value.decision_reason}
                  </p>
                </div>

                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-400">
                  Identified Card
                </p>

                <h2 className="mb-1 text-3xl font-bold">
                  {result.card_name || "Card Analysis"}
                </h2>

                <p className="mb-6 text-sm text-slate-400">
                  {result.set_name} · {result.card_number}
                </p>

                <div className="mb-6 grid gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Language</span>
                      <span>{result.language}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rarity</span>
                      <span>{result.rarity}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Identification Confidence
                      </span>
                      <span>{result.identification_confidence}</span>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-400">
                  Grade Estimate
                </p>

                <div className="mb-6 rounded-2xl bg-slate-950/70 p-5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Predicted Grade</span>
                    <span className="font-bold text-green-400">
                      {result.predicted_grade}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-slate-400">PSA 10 Chance</span>
                    <span className="font-bold text-violet-400">
                      {result.psa_10_probability}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-slate-400">Condition Confidence</span>
                    <span className="font-bold text-blue-300">
                      {result.confidence}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Centering", result.scores?.centering],
                    ["Corners", result.scores?.corners],
                    ["Edges", result.scores?.edges],
                    ["Surface", result.scores?.surface],
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

                <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                  <p className="mb-3 text-sm uppercase tracking-[0.25em] text-blue-300">
                    Nifty Value™
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Raw Value</span>
                      <span>{result.value.raw_value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">PSA 9 Value</span>
                      <span>{result.value.psa9_value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">PSA 10 Value</span>
                      <span>{result.value.psa10_value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Submission Cost</span>
                      <span>{result.value.submission_cost}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected Profit</span>
                      <span>{result.value.expected_profit}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-300">
                    {result.value.value_summary}
                  </p>

                  <button
                    onClick={checkEbaySoldPrices}
                    disabled={ebayLoading}
                    className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-60"
                  >
                    {ebayLoading
                      ? "Checking eBay Sold Prices..."
                      : "Check Real eBay Sold Prices"}
                  </button>

                  {ebayError && (
                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                      {ebayError}
                    </div>
                  )}

                  {ebayResult && (
                    <div className="mt-5 rounded-2xl border border-blue-400/20 bg-slate-950/40 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blue-300">
  eBay UK Sold Results
</p>

<p className="mb-4 rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-sm text-blue-100">
  {ebayResult.source === "cache"
    ? "Using recent saved eBay sold data — no new SoldComps credit was used."
    : "Live SoldComps lookup used — this result has now been saved for future users."}
</p>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Average</span>
                          <span className="font-bold text-white">
                            {formatEbayPrice(
                              ebayResult.average_price,
                              ebayResult.currency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Median</span>
                          <span className="font-bold text-white">
                            {formatEbayPrice(
                              ebayResult.median_price,
                              ebayResult.currency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Low / High</span>
                          <span className="font-bold text-white">
                            {formatEbayPrice(
                              ebayResult.lowest_price,
                              ebayResult.currency
                            )}{" "}
                            -{" "}
                            {formatEbayPrice(
                              ebayResult.highest_price,
                              ebayResult.currency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Sales Used</span>
                          <span className="font-bold text-white">
                            {ebayResult.sales_count}
                          </span>
                        </div>
                      </div>

                      {ebayResult.items.length > 0 && (
                        <div className="mt-5 space-y-3">
                          <p className="text-sm font-bold text-white">
                            Recent Sold Listings
                          </p>

                          {ebayResult.items.slice(0, 5).map((item, index) => (
                            <a
                              key={`${item.title}-${index}`}
                              href={item.url || "#"}
                              target="_blank"
                              className="block rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:border-blue-400/40"
                            >
                              <p className="line-clamp-2 text-sm text-white">
                                {item.title}
                              </p>
                              <p className="mt-2 text-sm font-bold text-blue-300">
                                {item.soldCurrency === "GBP" ? "£" : ""}
                                {item.soldPrice}
                              </p>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {marketSources.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-blue-400/20 bg-slate-950/40 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blue-300">
                        Market Sources
                      </p>

                      <div className="space-y-3">
                        {marketSources.map(([label, source]) => (
                          <div
                            key={label}
                            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                          >
                            <p className="text-sm font-bold text-white">
                              {label}
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                              {source}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
                  <h3 className="mb-3 font-bold">Detected Issues</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {result.detected_issues?.length ? (
                      result.detected_issues.map((issue) => (
                        <li key={issue}>• {issue}</li>
                      ))
                    ) : (
                      <li>• No major visible issues detected from the images.</li>
                    )}
                  </ul>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <h3 className="mb-2 font-bold">AI Recommendation</h3>
                  <p className="text-sm text-slate-300">
                    {result.recommendation}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
                  <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-300">
                    Help Improve Nifty
                  </p>

                  <div className="space-y-5">
                    <div>
                      <p className="mb-2 text-sm text-slate-300">
                        Was this analysis helpful?
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setHelpful(true)}
                          className={`rounded-xl border px-4 py-2 text-sm ${
                            helpful === true
                              ? "border-green-400 bg-green-500/20"
                              : "border-slate-700 bg-slate-950/40"
                          }`}
                        >
                          👍 Helpful
                        </button>
                        <button
                          onClick={() => setHelpful(false)}
                          className={`rounded-xl border px-4 py-2 text-sm ${
                            helpful === false
                              ? "border-red-400 bg-red-500/20"
                              : "border-slate-700 bg-slate-950/40"
                          }`}
                        >
                          👎 Not Helpful
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-sm text-slate-300">
                        Was the card identified correctly?
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIdentificationCorrect(true)}
                          className={`rounded-xl border px-4 py-2 text-sm ${
                            identificationCorrect === true
                              ? "border-green-400 bg-green-500/20"
                              : "border-slate-700 bg-slate-950/40"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setIdentificationCorrect(false)}
                          className={`rounded-xl border px-4 py-2 text-sm ${
                            identificationCorrect === false
                              ? "border-red-400 bg-red-500/20"
                              : "border-slate-700 bg-slate-950/40"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">
                        What grade do you think it is?
                      </label>
                      <select
                        value={userGrade}
                        onChange={(e) => setUserGrade(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-400"
                      >
                        <option value="">Select a grade</option>
                        <option value="PSA 10">PSA 10</option>
                        <option value="PSA 9">PSA 9</option>
                        <option value="PSA 8">PSA 8</option>
                        <option value="PSA 7 or below">PSA 7 or below</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">
                        Comments
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Example: It got the card right, but I think the grade is too harsh."
                        className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-green-400"
                      />
                    </div>

                    <button
                      onClick={submitFeedback}
                      disabled={feedbackLoading}
                      className="w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-500 disabled:opacity-60"
                    >
                      {feedbackLoading ? "Saving..." : "Submit Feedback"}
                    </button>

                    {feedbackMessage && (
                      <p className="text-sm text-slate-300">
                        {feedbackMessage}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-slate-500">
                  {result.disclaimer}
                </p>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}