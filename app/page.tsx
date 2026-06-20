import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <section className="hero">
        <div className="badge">NFT Gaming • Web3 Marketing • Community Growth</div>

        <h1>
          Crypto Gaming Strategy
          <br />
          From an OG Who’s Been There
        </h1>

        <p>
          I help Web3 games build stronger communities, better launches, and
          smarter player ecosystems — based on real experience across major NFT
          and crypto gaming projects.
        </p>

        <div className="buttons">
          <a href="#contact" className="primary">Work With Me</a>
          <a href="#services" className="secondary">What I Do</a>
        </div>
      </section>

      <section className="section" id="about">
        <h2>Built from real Web3 gaming experience</h2>
        <p>
          I’ve worked hands-on in NFT and crypto gaming since the early days,
          helping with game communities, marketing, Discords, Telegram groups,
          launches, partnerships and player growth.
        </p>
      </section>

      <section className="cards" id="services">
        <div className="card">
          <h3>Community Strategy</h3>
          <p>Discord, Telegram, player onboarding, moderation structure and long-term engagement.</p>
        </div>

        <div className="card">
          <h3>Game Launch Support</h3>
          <p>Positioning, launch planning, community hype, partnerships and early-user growth.</p>
        </div>

        <div className="card">
          <h3>Web3 Game Reviews</h3>
          <p>Honest breakdowns of gameplay, token economy, player retention and project potential.</p>
        </div>

        <div className="card">
          <h3>Advisory</h3>
          <p>For teams building NFT games who need someone who understands both players and crypto.</p>
        </div>
      </section>

      <section className="section dark">
        <h2>Not another hype site</h2>
        <p>
          This is for serious Web3 gaming projects that want real community,
          better retention, smarter marketing and stronger player trust.
        </p>
      </section>

      <section className="contact" id="contact">
        <h2>Want help with your Web3 game?</h2>
        <p>
          I’m open to advisory, community builds, launch planning and project reviews.
        </p>

        <a href="mailto:jamesashwell68@gmail.com" className="primary">
          Email James
        </a>
      </section>
    </main>
  );
}