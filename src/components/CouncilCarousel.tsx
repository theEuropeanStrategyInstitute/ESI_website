import { useEffect, useRef, useState } from "react";

type CouncilMember = {
  name: string;
  role: string;
};

type QueuedMember = CouncilMember & { originalIndex: number };

export function CouncilCarousel({ council }: { council: CouncilMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [items, setItems] = useState<QueuedMember[]>(() =>
    council.map((person, i) => ({ ...person, originalIndex: i })),
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) advance();
    }, 2000);
    return () => clearInterval(id);
  }, []);

  function advance() {
    const track = trackRef.current;
    const next = track?.children[1] as HTMLElement | undefined;
    if (!track || !next || items.length < 2) return;

    track.scrollTo({
      left: next.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    // Only one of "real scrollend" or "safety timeout" is allowed to fire —
    // whichever comes first wins and the other is a guaranteed no-op, so a
    // slow smooth-scroll can never trigger a second, duplicate rotation.
    let handled = false;
    const rotate = () => {
      if (handled) return;
      handled = true;
      track.removeEventListener("scrollend", rotate);
      clearTimeout(fallback);

      // The card that just scrolled off the front moves to the back of the
      // queue and disappears from the start for good, instead of looping.
      setItems((prev) => {
        const [first, ...rest] = prev;
        return first ? [...rest, first] : prev;
      });

      // Wait for the new order to actually paint before snapping the scroll
      // back to 0, so the reset lands on the card that just slid into view
      // instead of flashing the outgoing one for a frame.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.scrollTo({ left: 0, behavior: "instant" });
        });
      });
    };
    track.addEventListener("scrollend", rotate, { once: true });
    const fallback = setTimeout(rotate, 800);
  }

  return (
    <div
      className="council-carousel"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={() => {
        pausedRef.current = false;
      }}
    >
      <div
        className="council-carousel-track"
        ref={trackRef}
        aria-label="Strategic Council profiles, auto-rotating"
      >
        {items.map((person) => (
          <article
            className="council-carousel-card"
            tabIndex={0}
            key={person.name}
          >
            <span className="index">
              {String(person.originalIndex + 1).padStart(2, "0")}
            </span>
            <div className="council-carousel-photo" aria-hidden="true" />
            <div className="council-carousel-info">
              <h3>{person.name}</h3>
              <div className="council-carousel-role">
                <p>{person.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
