import { useEffect, useState } from "react";
import esiNavy from "../../assets/esi-navy.png";
import esiWhite from "../../assets/esi-white.png";

const Arrow = () => <span aria-hidden="true">→</span>;

const navLinks: { href: string; label: string }[] = [
  { href: "/about-us", label: "About us" },
  { href: "/mission", label: "Mission" },
  { href: "/projects", label: "Our work" },
  { href: "/council-experts", label: "Council & Experts" },
  { href: "/partnership", label: "Partner with us" },
];

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname.replace(/\/+$/, "") || "/");
  }, []);

  const isActive = (href: string): boolean => currentPath === href;

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
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
        <a href="/member" className="nav-contact">
          Become a member <Arrow />
        </a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a href="/member" className="nav-contact">
            Become a member <Arrow />
          </a>
        </nav>
      </details>
    </header>
  );
}
