import type { Metadata } from 'next';
import { InnerPage } from '@/components/site-footer';
import { influenceTools, sectors } from '@/lib/esi-content';

export const metadata: Metadata = {
  title: 'Programmes & Insights | The European Strategy Institute',
  description:
    'ESI programmes, strategic influence tools and priority sectors.',
};

export default function ProjectsPage() {
  return (
    <InnerPage
      eyebrow="Programmes & insights"
      title={
        <>
          Strategic influence.
          <br />
          <em>Practical instruments.</em>
        </>
      }
      intro="ESI connects leaders from business, finance and public institutions across Poland, Benelux and Central and Eastern Europe."
    >
      <section className="content-section tools-section">
        <div className="content-heading">
          <p className="section-number">01 / How we work</p>
          <h2>Built on trust, confidentiality and long-term relationships.</h2>
        </div>
        <div className="tool-grid">
          {influenceTools.map((tool) => (
            <article key={tool.number}>
              <span>{tool.number}</span>
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section sectors-section" id="sectors">
        <div className="content-heading">
          <p className="section-number">02 / Priority sectors</p>
          <h2>Where European rules have a direct impact on competitiveness.</h2>
        </div>
        <div className="sector-detail-list">
          {sectors.map((sector, index) => (
            <article key={sector.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{sector.title}</h3>
              <p>{sector.topics}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section programmes-section">
        <div className="content-heading">
          <p className="section-number">03 / Flagship programmes</p>
          <h2>Two forums for Europe’s defining questions.</h2>
        </div>
        <div className="programme-grid">
          <article>
            <span>Programme 01</span>
            <h3>Future of Europe</h3>
            <p>
              A platform for senior dialogue on Europe’s economic direction,
              competitiveness and capacity to act.
            </p>
            <small>Detailed programme information to be confirmed.</small>
          </article>
          <article>
            <span>Programme 02</span>
            <h3>Challenges for Europe &amp; the World</h3>
            <p>
              A forum examining the geopolitical, industrial and societal forces
              redefining Europe’s place in the world.
            </p>
            <small>Detailed programme information to be confirmed.</small>
          </article>
        </div>
      </section>

      <section className="page-cta">
        <p className="eyebrow">Work with us</p>
        <h2>Bring your sector expertise into the European conversation.</h2>
        <a className="cta" href="/partnership">
          Discuss a partnership <span aria-hidden="true">→</span>
        </a>
      </section>
    </InnerPage>
  );
}
