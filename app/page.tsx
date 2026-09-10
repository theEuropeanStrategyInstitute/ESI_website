/* oxlint-disable next/no-img-element */

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { council, founders, influenceTools, sectors } from '@/lib/esi-content';

const Arrow = () => <span aria-hidden="true">→</span>;

function LinkButton({ text, href }: { text: string; href: string }) {
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
        <SiteHeader />
        <div className="bridge-hero">
          <Eyebrow>Central &amp; Eastern Europe ↔ Brussels</Eyebrow>
          <h1 id="hero-title">
            Empowering European Business
            <br />
            <em>Navigating for a better future</em>
          </h1>
          <LinkButton text="Discover the Institute" href="#institute" />
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
          <Eyebrow>Our mission</Eyebrow>
          <div>
            <h2>
              The missing voice of Central and Eastern Europe in Brussels.
            </h2>
            <p>
              The European Strategy Institute is an independent, Brussels-based
              think tank and platform for strategic dialogue. We help European
              companies move from reacting to regulation to contributing
              expertise while policy is being shaped.
            </p>
            <a className="text-link" href="/mission">
              Read about our mission <Arrow />
            </a>
          </div>
        </section>

        <section className="bridge-pillar-wrap" aria-label="How ESI works">
          <div className="pillars">
            {[
              [
                '01',
                'Insight',
                'Independent analysis of regulatory and geopolitical change.',
              ],
              [
                '02',
                'Dialogue',
                'Trusted conversations between business and European institutions.',
              ],
              [
                '03',
                'Influence',
                'Cross-border coalitions grounded in evidence and expertise.',
              ],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span className="index">{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-heading">
            <Eyebrow>Programmes &amp; insights</Eyebrow>
            <h2>
              Strategic influence,
              <br />
              built over time.
            </h2>
            <p>
              ESI convenes leaders across business, finance and public
              institutions through trusted, long-term relationships.
            </p>
            <a className="text-link" href="/projects">
              Explore our work <Arrow />
            </a>
          </div>
          <div className="work-list">
            {influenceTools.map((item, index) => (
              <details key={item.title} open={index === 0}>
                <summary>
                  <span className="index">{item.number}</span>
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

        <section className="section sector-preview">
          <div className="sector-heading">
            <Eyebrow>Priority sectors</Eyebrow>
            <h2>Where regulation shapes competitiveness.</h2>
          </div>
          <div className="sector-list">
            {sectors.map((sector, index) => (
              <a href="/projects#sectors" key={sector.title}>
                <span className="index">0{index + 1}</span>
                <strong>{sector.title}</strong>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="section people" id="people">
          <Eyebrow>The people behind ESI</Eyebrow>
          <div className="people-intro">
            <h2>
              Experience.
              <br />A European perspective.
            </h2>
            <p>
              The Institute brings together experience from business, European
              institutions, academia and technology.
            </p>
          </div>
          <div className="founder-grid">
            {founders.map((person) => (
              <article key={person.name}>
                <span className="person-kind">Founding team</span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </article>
            ))}
          </div>
          <div className="council-heading">
            <div>
              <Eyebrow>Strategic Council</Eyebrow>
              <p>
                Independent perspectives from public life, business, academia
                and technology.
              </p>
            </div>
            <span>01—{String(council.length).padStart(2, '0')}</span>
          </div>
          <div
            className="council-strip"
            tabIndex={0}
            aria-label="Strategic Council profiles"
          >
            {council.map((person, index) => (
              <article key={person.name}>
                <span className="index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="partnership-call">
          <div>
            <Eyebrow>Partnerships</Eyebrow>
            <h2>Build a credible European presence.</h2>
          </div>
          <div>
            <p>
              We work with companies, investors and institutions that have the
              ambition and capacity to operate at European scale.
            </p>
            <div className="button-row">
              <LinkButton text="Partner with ESI" href="/partnership" />
              <a className="text-link light" href="/member">
                Explore membership <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
