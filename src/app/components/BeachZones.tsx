import { useEffect, useState } from "react";
import $ from "jquery";

// ── JSON data ──────────────────────────────────────────────────────────────
const zonesData = {
  NORTH: {
    label: "North",
    icon: "🧭",
    tagline: "Wild coasts, aurora skies & icy splendour",
    color: "#4A90D9",
    bg: "linear-gradient(135deg,#0A2540 0%,#1a4a7a 100%)",
    beaches: [
      {
        id: "n1",
        name: "Reynisfjara Beach",
        country: "Iceland",
        flag: "🇮🇸",
        rating: 4.9,
        bestSeason: "Jun – Aug",
        highlights: ["Black volcanic sand", "Basalt columns", "Puffin sightings"],
        description:
          "One of the world's most dramatic beaches, framed by towering basalt stacks and powerful Atlantic waves. A hauntingly beautiful landscape unlike any other.",
        image:
          "https://images.unsplash.com/photo-1780590128863-4c1b4a087fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "n2",
        name: "Lofoten Islands",
        country: "Norway",
        flag: "🇳🇴",
        rating: 4.8,
        bestSeason: "Jun – Sep",
        highlights: ["Midnight sun", "Mountain backdrops", "Clear arctic waters"],
        description:
          "Where jagged peaks plunge into glittering fjords. Lofoten's beaches glow under the midnight sun, offering solitude and jaw-dropping Arctic scenery.",
        image:
          "https://images.unsplash.com/photo-1531386450450-969f935bd522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "n3",
        name: "White Beach, Alaska",
        country: "USA",
        flag: "🇺🇸",
        rating: 4.6,
        bestSeason: "Jul – Aug",
        highlights: ["Wildlife spotting", "Glacier views", "Untouched wilderness"],
        description:
          "Remote Alaskan beaches offer raw wilderness, where brown bears fish and bald eagles soar above pristine, untouched shorelines.",
        image:
          "https://images.unsplash.com/photo-1556103727-777acb371272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
    ],
  },
  SOUTH: {
    label: "South",
    icon: "🌴",
    tagline: "Sun-drenched sands, warm waters & vibrant culture",
    color: "#F59E0B",
    bg: "linear-gradient(135deg,#7c3206 0%,#C9A96E 100%)",
    beaches: [
      {
        id: "s1",
        name: "Whitehaven Beach",
        country: "Australia",
        flag: "🇦🇺",
        rating: 5.0,
        bestSeason: "Apr – Oct",
        highlights: ["Silica white sand", "Swirling tidal patterns", "Snorkelling"],
        description:
          "Consistently rated the world's finest beach. Its 98% pure silica sand stays cool underfoot and swirls into mesmerising patterns at Hill Inlet.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "s2",
        name: "Anse Source d'Argent",
        country: "Seychelles",
        flag: "🇸🇨",
        rating: 4.9,
        bestSeason: "Apr – May",
        highlights: ["Giant granite boulders", "Pink sand", "Shallow lagoons"],
        description:
          "Pink-tinged sand weaves between colossal granite boulders while turquoise lagoons lap gently at the shore — paradise distilled into one bay.",
        image:
          "https://images.unsplash.com/photo-1629271997643-6a1099968839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "s3",
        name: "Boulders Beach",
        country: "South Africa",
        flag: "🇿🇦",
        rating: 4.7,
        bestSeason: "Nov – Feb",
        highlights: ["African penguins", "Sheltered coves", "Indian Ocean views"],
        description:
          "Home to a colony of African penguins, Boulders Beach is a sheltered gem where warm, calm waters meet boulder-enclosed sandy coves.",
        image:
          "https://images.unsplash.com/photo-1534250617995-d16425086b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
    ],
  },
  WEST: {
    label: "West",
    icon: "🌊",
    tagline: "Atlantic shores, surf culture & golden cliffs",
    color: "#10B981",
    bg: "linear-gradient(135deg,#064e3b 0%,#0d9488 100%)",
    beaches: [
      {
        id: "w1",
        name: "Maya Bay",
        country: "Thailand",
        flag: "🇹🇭",
        rating: 4.8,
        bestSeason: "Nov – Apr",
        highlights: ["Limestone cliffs", "Emerald waters", "Film location"],
        description:
          "Made world-famous by 'The Beach', Maya Bay is a breathtaking cove enclosed by soaring limestone cliffs with jade-green waters within.",
        image:
          "https://images.unsplash.com/photo-1579622754173-e2a9aad270e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "w2",
        name: "Praia da Marinha",
        country: "Portugal",
        flag: "🇵🇹",
        rating: 4.8,
        bestSeason: "Jun – Sep",
        highlights: ["Golden limestone cliffs", "Sea caves", "Snorkelling"],
        description:
          "Hidden between dramatic ochre cliffs along the Algarve, Marinha's crystal-clear Atlantic waters and sea caves make it Portugal's finest secret.",
        image:
          "https://images.unsplash.com/photo-1506186773396-2a6370e52c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "w3",
        name: "Tulum Beach",
        country: "Mexico",
        flag: "🇲🇽",
        rating: 4.7,
        bestSeason: "Dec – Apr",
        highlights: ["Maya ruins", "Caribbean blue water", "Wellness retreats"],
        description:
          "Mayan ruins crown the cliffs above turquoise Caribbean waters. Tulum blends ancient history, bohemian culture and powdery white sand.",
        image:
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
    ],
  },
  EAST: {
    label: "East",
    icon: "🌸",
    tagline: "Mystical shores, vivid reefs & ancient traditions",
    color: "#EC4899",
    bg: "linear-gradient(135deg,#4a1942 0%,#be185d 100%)",
    beaches: [
      {
        id: "e1",
        name: "Navagio Beach",
        country: "Greece",
        flag: "🇬🇷",
        rating: 4.9,
        bestSeason: "May – Oct",
        highlights: ["Shipwreck landmark", "Ionian blue water", "Limestone cliffs"],
        description:
          "Accessible only by boat, this hidden cove shelters a rusting shipwreck against ivory cliffs and the impossibly blue Ionian Sea.",
        image:
          "https://images.unsplash.com/photo-1513553404607-988bf2703777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "e2",
        name: "Radhanagar Beach",
        country: "India",
        flag: "🇮🇳",
        rating: 4.8,
        bestSeason: "Oct – May",
        highlights: ["Sunset views", "Dense forest backdrop", "Sea turtles"],
        description:
          "Asia's best beach. Radhanagar stretches for miles along Havelock Island, backed by emerald forest and lapped by the Bay of Bengal.",
        image:
          "https://images.unsplash.com/photo-1610045058619-8c37e8913c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
      {
        id: "e3",
        name: "El Nido Beach",
        country: "Philippines",
        flag: "🇵🇭",
        rating: 4.9,
        bestSeason: "Nov – May",
        highlights: ["Limestone karst islands", "Hidden lagoons", "Diving"],
        description:
          "El Nido's dramatic karst cliffs rise from a turquoise sea hiding secret lagoons, pristine coral gardens and stunning island-hopping routes.",
        image:
          "https://images.unsplash.com/photo-1623320005077-ba1f8c74c506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
      },
    ],
  },
} as const;

type ZoneKey = keyof typeof zonesData;
const ZONES: ZoneKey[] = ["NORTH", "SOUTH", "WEST", "EAST"];

// ── Beach rating utility ──
// Render small star ratings for each beach card and detail panel.
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= Math.round(rating) ? "#F59E0B" : "rgba(255,255,255,0.25)",
            fontSize: "0.7rem",
          }}
        >
          ★
        </span>
      ))}
      <span className="text-xs ml-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function BeachZones() {
  const [activeZone, setActiveZone] = useState<ZoneKey>("NORTH");
  const [activeBeachId, setActiveBeachId] = useState<string>("n1");

  const zone = zonesData[activeZone];
  // Fallback to the first beach in the zone if the currently selected beach id is missing.
  const beach = zone.beaches.find((b) => b.id === activeBeachId) ?? zone.beaches[0];

  // ── Zone selection logic ──
  // Switch the active region and reset the selected beach for the newly chosen zone.
  function switchZone(z: ZoneKey) {
    // jQuery: fade out content, switch, fade in
    $("#zone-detail").fadeOut(180, () => {
      setActiveZone(z);
      setActiveBeachId(zonesData[z].beaches[0].id);
      setTimeout(() => $("#zone-detail").fadeIn(220), 0);
    });
  }

  function switchBeach(id: string) {
    // Animate the beach detail panel when the user chooses a different beach within the same zone.
    $("#beach-card").fadeOut(150, () => {
      setActiveBeachId(id);
      setTimeout(() => $("#beach-card").fadeIn(200), 0);
    });
  }

  // ── Tab hover styling ──
  // Highlight non-active zone buttons on hover without affecting the active zone state.
  useEffect(() => {
    // jQuery: zone tab hover colour flash
    $(".zone-tab")
      .on("mouseenter", function () {
        if (!$(this).hasClass("zone-tab-active")) {
          $(this).css({ background: "rgba(255,255,255,0.1)", color: "#fff" });
        }
      })
      .on("mouseleave", function () {
        if (!$(this).hasClass("zone-tab-active")) {
          $(this).css({ background: "transparent", color: "rgba(255,255,255,0.65)" });
        }
      });
    return () => { $(".zone-tab").off("mouseenter mouseleave"); };
  }, [activeZone]);

  return (
    <section
      id="zones"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: zone.bg, transition: "background 0.5s ease" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.2em" }}>
            Explore by Region
          </p>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>
            Beaches by Zone
          </h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
        </div>

        {/* Zone tabs */}
        <div
          className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-10 sm:mb-12"
        >
          {ZONES.map((z) => {
            const isActive = z === activeZone;
            const zd = zonesData[z];
            return (
              <button
                key={z}
                className={`zone-tab${isActive ? " zone-tab-active" : ""} px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-250 flex items-center gap-2`}
                style={{
                  background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  border: isActive ? "1px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: isActive ? "blur(8px)" : "none",
                  boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
                }}
                onClick={() => switchZone(z)}
              >
                <span>{zd.icon}</span>
                <span>{zd.label}</span>
              </button>
            );
          })}
        </div>

        {/* Zone content — fades in/out via jQuery */}
        <div id="zone-detail">

          {/* Tagline */}
          <p className="text-center text-sm mb-8 sm:mb-10" style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
            {zone.tagline}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Beach list (left) */}
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {zone.beaches.map((b) => {
                const isSelected = b.id === activeBeachId;
                return (
                  <button
                    key={b.id}
                    onClick={() => switchBeach(b.id)}
                    className="shrink-0 lg:shrink text-left rounded-2xl p-4 transition-all duration-220 w-52 sm:w-60 lg:w-auto"
                    style={{
                      background: isSelected ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                      border: isSelected ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                        style={{ border: isSelected ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent" }}
                      >
                        <img src={b.image} alt={b.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#fff" }}>{b.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {b.flag} {b.country}
                        </p>
                        <StarRating rating={b.rating} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Beach detail card (right, 2 cols) */}
            <div id="beach-card" className="lg:col-span-2">
              <div
                className="rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                }}
              >
                {/* Beach image */}
                <div className="relative" style={{ height: "clamp(180px,30vw,280px)" }}>
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(6px)" }}
                    >
                      ⭐ {beach.rating.toFixed(1)}
                    </span>
                  </div>
                  {/* Country flag + name overlay */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5">
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {beach.flag} {beach.country}
                    </p>
                    <h3
                      className="mt-0.5"
                      style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(1.1rem,2.5vw,1.5rem)", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                    >
                      {beach.name}
                    </h3>
                  </div>
                </div>

                {/* Beach info */}
                <div className="p-5 sm:p-7">
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {beach.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
                    >
                      📅 Best: {beach.bestSeason}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
                    >
                      🌐 {activeZone} Zone
                    </span>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}>
                      Highlights
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {beach.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: "rgba(255,255,255,0.14)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
