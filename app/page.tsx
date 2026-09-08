/* oxlint-disable next/no-img-element */

const Arrow = () => <span aria-hidden="true">→</span>;

function Logo({ white = false }: { white?: boolean }) {
  return (
    <img
      className="logo"
      src={`/assets/esi-${white ? 'white' : 'navy'}.png`}
      alt="The European Strategy Institute"
      width="680"
      height="231"
    />
  );
}

function Header() {
  return (
    <header className="site-header inverse">
      <a
        className="brand-link"
        href="#home"
        aria-label="European Strategy Institute home"
      >
        <Logo white />
      </a>
      <span className="header-tagline">
        Empowering European Business
        <br /> Navigate for a Better Future
      </span>
      <nav aria-label="Primary navigation">
        <a href="#institute">Institute</a>
        <a href="#work">Our work</a>
        <a href="#people">Our people</a>
        <a href="#contact" className="nav-contact">
          Get in touch <Arrow />
        </a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">
          <a href="#institute">Institute</a>
          <a href="#work">Our work</a>
          <a href="#people">Our people</a>
          <a href="#contact">Get in touch</a>
        </nav>
      </details>
    </header>
  );
}

function CTA({ text, href }: { text: string; href: string }) {
  return (
    <a className="cta" href={href}>
      {text}
      <Arrow />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const pillars = [
  {
    number: '01',
    title: 'Insight',
    body: 'Understand the regulatory and geopolitical developments shaping your business.',
  },
  {
    number: '02',
    title: 'Dialogue',
    body: 'Connect business experience with European policy through trusted, long-term relationships.',
  },
  {
    number: '03',
    title: 'Influence',
    body: 'Build cross-border coalitions and contribute evidence to the European debate.',
  },
];

const work = [
  {
    title: 'Executive round tables',
    body: 'Closed-door conversations in Brussels, bringing business and public institutions together.',
  },
  {
    title: 'Flagship programmes',
    body: 'Future of Europe and Challenges for Europe & the World: two forums for strategic dialogue.',
  },
  {
    title: 'Reports & briefings',
    body: 'Industry reports and tailored executive briefings that connect policy developments to business decisions.',
  },
  {
    title: 'Industry coalitions',
    body: 'Cross-border partnerships that bring sector expertise into European policy discussions.',
  },
];

function Pillars() {
  return (
    <div className="pillars">
      {pillars.map((pillar) => (
        <article key={pillar.number}>
          <span className="index">{pillar.number}</span>
          <h3>{pillar.title}</h3>
          <p>{pillar.body}</p>
        </article>
      ))}
    </div>
  );
}

function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-heading">
        <Eyebrow>Our work</Eyebrow>
        <h2>
          Ideas that move
          <br />
          Europe forward.
        </h2>
        <p>
          Independent analysis. Strategic dialogue. Practical collaboration
          across borders.
        </p>
      </div>
      <div className="work-list">
        {work.map((item, index) => (
          <details key={item.title} open={index === 0}>
            <summary>
              <span className="index">0{index + 1}</span>
              <span>{item.title}</span>
              <span className="plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{item.body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function People() {
  return (
    <section className="section people" id="people">
      <Eyebrow>The people behind ESI</Eyebrow>
      <div className="people-intro">
        <h2>
          Experience.
          <br />A European perspective.
        </h2>
        <p>
          ESI brings together experience from business, European institutions
          and academia. Its Strategic Council helps shape the Institute’s
          direction.
        </p>
      </div>
      <div className="people-grid">
        <article>
          <span className="person-kind">Leadership</span>
          <h3>
            Agnieszka
            <br />
            Sitek-Kobosko
          </h3>
          <p>Founder &amp; Executive Director</p>
        </article>
        <article>
          <span className="person-kind">
            Strategic Council · selected profile
          </span>
          <h3>
            Elżbieta
            <br />
            Bieńkowska
          </h3>
          <p>
            Former European Commissioner for the Internal Market and Industry
          </p>
        </article>
        <article>
          <span className="person-kind">
            Strategic Council · selected profile
          </span>
          <h3>
            Dominika
            <br />
            Bettman
          </h3>
          <p>Former President of Microsoft Poland</p>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <section id="contact" className="contact">
        <Eyebrow>Brussels · Warsaw</Eyebrow>
        <h2>
          Let’s co-create a better
          <br />
          future for Europe.
        </h2>
        <a className="email" href="mailto:partnerships@esi-eu.com">
          partnerships@esi-eu.com <span aria-hidden="true">↗</span>
        </a>
        <a
          className="download"
          href="/assets/esi-overview.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Read the ESI overview <span>PDF ↗</span>
        </a>
      </section>
      <footer className="site-footer">
        <Logo white />
        <p>Think Tank · European Leadership · Strategic Solutions</p>
        <span>© 2026 ESI</span>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <div className="website bridge" id="home">
      <a className="skip" href="#institute">
        Skip to content
      </a>
      <section className="bridge-opening" aria-labelledby="hero-title">
        <img
          className="bridge-bg"
          src="/assets/bridge.jpg"
          alt=""
          width="1536"
          height="1099"
          fetchPriority="high"
        />
        <Header />
        <div className="bridge-hero">
          <Eyebrow>Central &amp; Eastern Europe ↔ Brussels</Eyebrow>
          <h1 id="hero-title">
            Build the connection.
            <br />
            <em>Shape the future.</em>
          </h1>
          <p>
            Empowering European business to move
            <br />
            from regulatory reaction to strategic influence.
          </p>
          <CTA text="Discover the Institute" href="#institute" />
        </div>
        <div className="bridge-bottom">
          <span>Think Tank / European Leadership / Strategic Solutions</span>
          <a href="#institute">
            Explore our purpose <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <main>
        <section className="section bridge-story" id="institute">
          <Eyebrow>Our purpose</Eyebrow>
          <div>
            <h2>
              Europe moves forward
              <br />
              when <em>we connect.</em>
            </h2>
            <p>
              ESI connects the ambition of Central and Eastern European
              companies with the European policy debate. We create the
              conditions for meaningful dialogue, informed decisions and
              long-term partnerships.
            </p>
          </div>
        </section>

        <section className="bridge-pillar-wrap" aria-label="How ESI works">
          <Pillars />
        </section>
        <Work />
        <People />
      </main>
      <Footer />
    </div>
  );
}
