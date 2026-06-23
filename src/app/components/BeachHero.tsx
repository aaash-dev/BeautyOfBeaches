import { useEffect } from "react";
import $ from "jquery";

export function BeachHero() {
  // ── Animated hero messaging ──
  // Cycle through a set of hero phrases with a typing effect to keep the landing section engaging.
  // This effect is intentionally simple and persistent because the hero section remains mounted for the app lifespan.
  useEffect(() => {
    const phrases = [
      "Where the waves meet the soul.",
      "Feel the sand between your toes.",
      "Let the ocean heal you.",
    ];
    let current = 0, charIndex = 0, typing = true;

    function tick() {
      const el = $("#hero-typewriter");
      if (typing) {
        el.text(phrases[current].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === phrases[current].length) {
          typing = false;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        el.text(phrases[current].slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          typing = true;
          current = (current + 1) % phrases.length;
        }
      }
      setTimeout(tick, typing ? 55 : 28);
    }
    tick();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: "100svh",
        background: `linear-gradient(to bottom, var(--ocean-900) 0%, var(--ocean-500) 60%, var(--sand-500) 100%)`,
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(10,37,64,0.38)" }} />

      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        alt="Beautiful beach at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: "overlay", opacity: 0.55 }}
      />

      <div className="relative z-10 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        <p
          className="uppercase text-xs mb-3 sm:mb-4"
          style={{ color: "var(--sand-500)", letterSpacing: "0.25em" }}
        >
          Welcome to
        </p>
        <h1
          className="mb-3 sm:mb-4"
          style={{
            color: "#fff",
            fontSize: "clamp(2.2rem, 8vw, 5.5rem)",
            lineHeight: 1.08,
            fontWeight: 700,
            textShadow: "0 4px 32px rgba(10,37,64,0.5)",
          }}
        >
          <span>Beauty</span>
          <span style={{ color: "#C9A96E" }}>Of</span>
          <span>Beaches</span>
        </h1>
        <p
          id="hero-typewriter"
          className="min-h-[2em] text-base sm:text-lg"
          style={{ color: "var(--ocean-10)", opacity: 0.95 }}
        />
        <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center flex-wrap px-2">
          <a
            href="#activities"
            className="nav-link px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--ocean-500)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(0,119,182,0.45)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sand-500)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ocean-500)")}
          >
            Explore Activities
          </a>
          <a
            href="#gallery"
            className="nav-link px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            View Gallery
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(36px,5vw,64px)" }}>
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="var(--sand-100)" />
        </svg>
      </div>
    </section>
  );
}
