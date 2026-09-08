'use client';

/* oxlint-disable next/no-img-element */

import { useEffect, useState } from 'react';

const Arrow = () => <span aria-hidden="true">→</span>;

export function SiteHeader() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.querySelector<HTMLElement>('.bridge-opening');
        setIsPastHero(
          Boolean(hero && hero.getBoundingClientRect().bottom <= 84),
        );
      });
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  return (
    <header
      className={`site-header inverse${isPastHero ? ' is-scrolled' : ''}`}
    >
      <a
        className="brand-link"
        href="#home"
        aria-label="European Strategy Institute home"
      >
        <span className="logo-crop" aria-hidden="true">
          <img
            className="logo-image logo-image-white"
            src="/assets/esi-white.png"
            alt=""
            width="680"
            height="231"
          />
          <img
            className="logo-image logo-image-navy"
            src="/assets/esi-navy.png"
            alt=""
            width="468"
            height="159"
          />
        </span>
      </a>
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
