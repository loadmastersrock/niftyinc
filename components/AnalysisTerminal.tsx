"use client";

import { useEffect, useState } from "react";

const steps = [
  "Loading front image",
  "Loading rear image",
  "Checking image sharpness",
  "Detecting glare and lighting",
  "Reading card name and number",
  "Matching Pokémon card layout",
  "Inspecting centering",
  "Checking corners",
  "Scanning edge wear",
  "Looking for whitening",
  "Checking surface marks",
  "Estimating PSA probability",
  "Running Nifty Value engine",
  "Preparing final report",
];

export default function AnalysisTerminal() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= steps.length - 1) {
          return previous;
        }

        return previous + 1;
      });
    }, 650);

    return () => clearInterval(timer);
  }, []);

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="mt-6 rounded-2xl border border-green-500/20 bg-black/80 p-5 font-mono text-sm shadow-[0_0_35px_rgba(34,197,94,0.14)]">
      <div className="mb-4 flex items-center justify-between border-b border-green-500/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-green-400">
          Nifty Engine
        </span>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex justify-between text-xs text-green-300">
          <span>Analysis Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-green-950">
          <div
            className="h-full rounded-full bg-green-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {steps.slice(0, currentStep + 1).map((step, index) => {
          const isCurrent = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <p
              key={step}
              className={
                isCurrent
                  ? "text-green-300"
                  : isComplete
                  ? "text-green-500"
                  : "text-slate-500"
              }
            >
              <span className="mr-2">
                {isComplete ? "✓" : isCurrent ? ">" : "·"}
              </span>
              {step}
              {isCurrent && <span className="animate-pulse">_</span>}
            </p>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-green-300">
          ✓ Analysis complete. Generating report...
        </div>
      )}
    </div>
  );
}