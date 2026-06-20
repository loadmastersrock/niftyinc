export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="hero">
        <div className="badge">NFT Gaming • Web3 Marketing • Community Growth</div>

        <h1>Crypto Gaming Strategy From an OG Who Has Been There</h1>

        <p>
          I help Web3 games build stronger communities, better launches, and
          smarter player ecosystems based on real experience across major NFT
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
          I have worked hands-on in NFT and crypto gaming since the early days,
          helping with game communities, marketing, Discords, Telegram groups,
          launches, partnerships and player growth.
        </p>
      </section>

      <section className="cards" id="services">
        <div className="card">
          <h3>Community Strategy</h3>
          <p>Discord, Telegram, player onboarding and engagement.</p>
        </div>

        <div className="card">
          <h3>Game Launch Support</h3>
          <p>Launch planning, hype building, partnerships and growth.</p>
        </div>

        <div className="card">
          <h3>Web3 Game Reviews</h3>
          <p>Gameplay, economy, retention and project potential.</p>
        </div>

        <div className="card">
          <h3>Advisory</h3>
          <p>Support for teams building serious NFT and crypto games.</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Want help with your Web3 game?</h2>
        <p>
          I am open to advisory, community builds, launch planning and project reviews.
        </p>

        <a href="mailto:jamesashwell68@gmail.com" className="primary">
          Email James
        </a>
      </section>
    </main>
  );
}