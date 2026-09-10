/* oxlint-disable next/no-img-element */

import { SiteHeader } from './site-header';

const links = [
  ['Mission', '/mission'],
  ['Programmes & insights', '/projects'],
  ['Partnerships', '/partnership'],
  ['Membership', '/member'],
  ['Contact', '/contact'],
  ['Privacy', '/privacy'],
];

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-lead">
        <img
          className="footer-logo"
          src="/assets/esi-white.png"
          alt="The European Strategy Institute"
          width="680"
          height="231"
        />
        <p>
          An independent Brussels-based think tank connecting Central and
          Eastern European business with European policymaking.
        </p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {links.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="footer-contact">
        <p>Brussels · Warsaw</p>
        <a href="mailto:partnerships@esi-eu.com">
          partnerships@esi-eu.com <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-base">
        <span>© 2026 The European Strategy Institute</span>
        <span>Think Tank · European Leadership · Strategic Solutions</span>
      </div>
    </footer>
  );
}

export function InnerPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="website inner-page">
      <a className="skip" href="#main-content">
        Skip to content
      </a>
      <SiteHeader solid />
      <main id="main-content">
        <header className="page-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
        </header>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
