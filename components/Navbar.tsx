export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-500/10 shadow-[0_0_35px_rgba(139,92,246,0.45)]">
        <div className="absolute h-6 w-6 rotate-45 rounded-sm border border-blue-300/70" />
        <span className="relative text-sm font-black tracking-tight text-white">
          N
        </span>
      </div>

      <div className="leading-none">
        <div className="text-lg font-black tracking-[0.18em] text-white">
          NIFTY
        </div>
        <div className="text-[10px] font-semibold tracking-[0.45em] text-violet-300">
          INC
        </div>
      </div>
    </div>
  );
}