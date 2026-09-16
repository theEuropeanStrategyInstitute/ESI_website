import { useEffect, useState } from "react";
import esiNavy from "../../assets/esi-navy.png";
import esiWhite from "../../assets/esi-white.png";

const Arrow = () => <span aria-hidden="true">→</span>;

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.querySelector<HTMLElement>(
          ".bridge-opening, .page-hero",
        );
        setIsPastHero(
          Boolean(hero && hero.getBoundingClientRect().bottom <= 84),
        );
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header
      className={`site-header inverse${solid ? " is-solid" : ""}${isPastHero ? " is-scrolled" : ""}`}
    >
      <a
        className="brand-link"
        href="/"
        aria-label="European Strategy Institute home"
      >
        <span className="logo-crop" aria-hidden="true">
          <img
            className="logo-image logo-image-white"
            src={esiWhite.src}
            alt=""
            width={esiWhite.width}
            height={esiWhite.height}
          />
          <img
            className="logo-image logo-image-navy"
            src={esiNavy.src}
            alt=""
            width={esiNavy.width}
            height={esiNavy.height}
          />
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/mission">Institute</a>
        <a href="/projects">Our work</a>
        <a href="/our-experts">Our Experts</a>
        <a href="/partnership">Partner with us</a>
        <a href="/member" className="nav-contact">
          Become a member <Arrow />
        </a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">
          <a href="/mission">Institute</a>
          <a href="/projects">Our work</a>
          <a href="/our-experts">Our Experts</a>
          <a href="/partnership">Partner with us</a>
          <a href="/member">Become a member</a>
        </nav>
      </details>
    </header>
  );
}
