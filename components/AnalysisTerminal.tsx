"use client";

const terminalLines = [
  "Loading front image...",
  "Loading rear image...",
  "Checking image sharpness...",
  "Detecting glare and lighting...",
  "Reading card name and number...",
  "Matching Pokémon card layout...",
  "Inspecting centering...",
  "Checking corners...",
  "Scanning edge wear...",
  "Looking for whitening...",
  "Checking surface marks...",
  "Estimating PSA probability...",
  "Running Nifty Value engine...",
  "Preparing final report...",
];

export default function AnalysisTerminal() {
  return (
    <div className="mt-6 rounded-2xl border border-green-500/20 bg-black/70 p-5 font-mono text-sm shadow-[0_0_35px_rgba(34,197,94,0.12)]">
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

      <div className="space-y-2">
        {terminalLines.map((line, index) => (
          <p
            key={line}
            className="animate-pulse text-green-300"
            style={{
              animationDelay: `${index * 120}ms`,
            }}
          >
            <span className="text-green-500">&gt;</span> {line}
          </p>
        ))}

        <p className="pt-2 text-green-400">
          <span className="text-green-500">&gt;</span> Analysis running
          <span className="animate-pulse">_</span>
        </p>
      </div>
    </div>
  );
}