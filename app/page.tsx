export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <header className="site-header">
        <a href="/" className="logo">
          <span className="logo-mark">N</span>
          <span className="logo-text">NiftyInc</span>
        </a>

        <a
          href="https://t.me/niftyinc"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          Telegram
        </a>
      </header>

      <section className="hero">
        <div className="badge">
          NFT Gaming • Web3 Marketing • Community Growth
        </div>

        <h1>
          Crypto Gaming Strategy
          <br />
          From an OG Who Has Been There
        </h1>

        <p>
          I help Web3 games build stronger communities, better launches and
          smarter player ecosystems based on real experience across major NFT
          and crypto gaming projects.
        </p>

        <div className="buttons">
          <a
            href="https://t.me/niftyinc"
            target="_blank"
            rel="noopener noreferrer"
            className="primary"
          >
            Contact Me
          </a>

          <a href="#services" className="secondary">
            What I Do
          </a>
        </div>
      </section>

      <section className="section" id="about">
        <h2>Built From Real Web3 Gaming Experience</h2>

        <p>
          I've been involved in NFT and crypto gaming since the early days,
          helping projects grow communities, launch successfully and build
          stronger player engagement.
        </p>

        <p>
          My experience includes marketing leadership, Discord management,
          Telegram communities, partnerships, launch support and long-term
          community growth strategies.
        </p>
      </section>

      <section className="cards" id="services">
        <div className="card">
          <h3>Community Building</h3>
          <p>
            Discord setup, moderation systems, onboarding flows, clan
            structures and player retention.
          </p>
        </div>

        <div className="card">
          <h3>Marketing Strategy</h3>
          <p>
            Positioning, messaging, campaign planning and growth strategies
            designed specifically for Web3 games.
          </p>
        </div>

        <div className="card">
          <h3>Launch Support</h3>
          <p>
            NFT launches, game launches, whitelist campaigns, community growth
            and partnership development.
          </p>
        </div>

        <div className="card">
          <h3>Advisory</h3>
          <p>
            Strategic advice for founders and teams looking to build stronger
            crypto gaming projects.
          </p>
        </div>
      </section>

      <section className="section dark">
        <h2>Not Another Hype Website</h2>

        <p>
          The crypto gaming industry doesn't need more recycled news and empty
          promises. It needs projects that understand players, communities and
          sustainable growth.
        </p>
      </section>

      <section className="contact" id="contact">
        <h2>Let's Build Something Great</h2>

        <p>
          Whether you're launching a new NFT game, growing a community,
          building a Discord or looking for strategic advice, I'd love to hear
          about your project.
        </p>

        <a
          href="https://t.me/niftyinc"
          target="_blank"
          rel="noopener noreferrer"
          className="primary"
        >
          Message Me On Telegram
        </a>
      </section>
    </main>
  );
}