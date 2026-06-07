import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-amber-500/10 bg-[#03040a]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/">
          <Logo />
        </a>

        <div className="hidden gap-8 md:flex">
          <a href="/" className="text-slate-300 hover:text-white">
            Home
          </a>

          <a href="/card-values" className="text-slate-300 hover:text-white">
            Card Values
          </a>

          <a href="/grader" className="text-slate-300 hover:text-white">
            AI Grader
          </a>

          <a href="/history" className="text-slate-300 hover:text-white">
            History
          </a>

          <a href="/admin" className="text-slate-300 hover:text-white">
            Admin
          </a>
        </div>

        <a
          href="#valuation"
          className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 font-medium text-amber-200 hover:bg-amber-400/20"
        >
          Sell Your Card
        </a>
      </div>
    </nav>
  );
}