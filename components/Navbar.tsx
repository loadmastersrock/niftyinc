import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/">
          <Logo />
        </a>

        <div className="hidden gap-8 md:flex">
          <a href="/" className="text-slate-300 hover:text-white">
            Home
          </a>
          <a href="/grader" className="text-slate-300 hover:text-white">
            Grader
          </a>
          <a href="/history" className="text-slate-300 hover:text-white">
            History
          </a>
          <a href="/#features" className="text-slate-300 hover:text-white">
            Features
          </a>
        </div>

        <a
          href="/grader"
          className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-500"
        >
          Start Free
        </a>
      </div>
    </nav>
  );
}