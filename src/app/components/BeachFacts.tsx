import { useEffect, useState } from "react";
import $ from "jquery";

const beachFactsJSON = [
  { id: 1, category: "Ocean",        emoji: "🌊", stat: "70%",      fact: "The ocean covers more than 70% of Earth's surface and holds about 97% of all water on the planet." },
  { id: 2, category: "Biodiversity", emoji: "🐠", stat: "230K+",    fact: "More than 230,000 known marine species live in the ocean, with millions more still undiscovered." },
  { id: 3, category: "Waves",        emoji: "🏄", stat: "24 m",     fact: "The tallest wave ever surfed was 24.38 m — as tall as an 8-story building — off Nazaré, Portugal." },
  { id: 4, category: "Sand",         emoji: "⏳", stat: "7.5×10¹⁸", fact: "There are approximately 7.5 quintillion grains of sand on Earth's beaches." },
  { id: 5, category: "Health",       emoji: "💙", stat: "1 km",     fact: "Living within 1 km of the coast is linked to better mental health and lower stress levels." },
  { id: 6, category: "Tides",        emoji: "🌙", stat: "2×/day",   fact: "Tides are caused by the Moon and Sun's gravity. Most coastlines see two highs and two lows per day." },
];

const categories = ["All", "Ocean", "Biodiversity", "Waves", "Sand", "Health", "Tides"];

export function BeachFacts() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter facts by the selected category without mutating the original dataset.
  const filtered = activeCategory === "All"
    ? beachFactsJSON
    : beachFactsJSON.filter((f) => f.category === activeCategory);

  // Animate stat values each time the category changes to reinforce the content update.
  useEffect(() => {
    $(".stat-number").css("opacity", 0).animate({ opacity: 1 }, 500);
  }, [activeCategory]);

  return (
    <section
      id="facts"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--sand-100)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>
            Did You Know?
          </p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>
            Beach &amp; Ocean Facts
          </h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        {/* Horizontally scrollable pill row — no wrapping needed on mobile */}
        <div
          className="pills-scroll flex gap-2 overflow-x-auto pb-2 mb-8 sm:mb-12 sm:flex-wrap sm:justify-center"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm transition-all duration-200 shrink-0"
              style={{
                background: activeCategory === cat ? "var(--ocean-500)" : "var(--ocean-10)",
                color: activeCategory === cat ? "#fff" : "var(--ocean-900)",
                fontWeight: activeCategory === cat ? 600 : 400,
                border: "1px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-5 sm:p-7 flex flex-col gap-3"
              style={{
                background: "var(--ocean-10)",
                border: "1px solid rgba(0,119,182,0.12)",
                boxShadow: "0 2px 12px rgba(10,37,64,0.06)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.emoji}</span>
                <span className="stat-number" style={{ color: "var(--ocean-500)", fontWeight: 700, fontSize: "1.05rem" }}>
                  {item.stat}
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider" style={{ color: "var(--sand-500)", fontWeight: 600 }}>
                {item.category}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ocean-900)" }}>
                {item.fact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
