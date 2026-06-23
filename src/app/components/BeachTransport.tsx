import { useEffect, useState } from "react";
import $ from "jquery";

// Restrict transport mode values to the supported tab options.
// This ensures the mode state can only select data present in transportData.
type TransportMode = "flights" | "buses";

// JSON data for transport
const transportData: Record<TransportMode, {
  id: string;
  from: string;
  to: string;
  beach: string;
  zone: string;
  provider: string;
  duration: string;
  frequency: string;
  priceRange: string;
  tips: string;
  logo: string;
}[]> = {
  flights: [
    { id: "f1", from: "New York (JFK)",      to: "Reykjavík (KEF)",       beach: "Reynisfjara Beach",       zone: "NORTH", provider: "Icelandair / Delta",    duration: "~6h 30m",  frequency: "Daily",       priceRange: "$420–$850",  tips: "Book 3–4 months ahead for summer. Rent a car at KEF for the 3-hour drive to Reynisfjara.", logo: "✈️" },
    { id: "f2", from: "London (LHR)",        to: "Whitsunday Coast (PPP)", beach: "Whitehaven Beach",         zone: "SOUTH", provider: "Qantas / Emirates",     duration: "~24h",     frequency: "Daily",       priceRange: "$900–$1,800", tips: "Fly to Proserpine or Mackay, then take a ferry or seaplane to the island.", logo: "✈️" },
    { id: "f3", from: "Bangkok (BKK)",       to: "Krabi (KBV)",           beach: "Maya Bay",                 zone: "WEST",  provider: "AirAsia / Bangkok Air", duration: "~1h 10m",  frequency: "2–3×/day",    priceRange: "$35–$120",   tips: "Fly to Krabi or Phuket. Speedboat tours to Maya Bay depart from Ao Nang pier daily.", logo: "✈️" },
    { id: "f4", from: "Mumbai (BOM)",        to: "Port Blair (IXZ)",      beach: "Radhanagar Beach",         zone: "EAST",  provider: "Air India / IndiGo",   duration: "~2h 15m",  frequency: "Daily",       priceRange: "$80–$200",   tips: "Book Havelock ferry tickets in advance. Government ferries and private speedboats available.", logo: "✈️" },
    { id: "f5", from: "Athens (ATH)",        to: "Zakynthos (ZTH)",       beach: "Navagio Beach",            zone: "EAST",  provider: "Sky Express / Ryanair", duration: "~50m",     frequency: "Daily (Jun–Oct)", priceRange: "$45–$140",  tips: "Short boat tours from Zakynthos port reach Navagio in about 25 minutes.", logo: "✈️" },
    { id: "f6", from: "Cancún (CUN)",        to: "Tulum Bus Terminal",    beach: "Tulum Beach",              zone: "WEST",  provider: "ADO Bus from Cancún",  duration: "~2h",      frequency: "Every hour",  priceRange: "$12–$18",    tips: "Fly into Cancún and take the direct ADO coach to Tulum. Taxis to the beach coast ~$5.", logo: "🚌" },
  ],
  buses: [
    { id: "b1", from: "Reykjavík Bus Terminal", to: "Vík Village",         beach: "Reynisfjara Beach",       zone: "NORTH", provider: "Strætó / Reykjavík Excursions", duration: "~3h 30m", frequency: "Daily (summer)", priceRange: "$35–$60",  tips: "Bus 51 from BSÍ terminal. Services run Jun–Aug. Book online to guarantee a seat.", logo: "🚌" },
    { id: "b2", from: "Bodø Bus Station",       to: "Å i Lofoten",         beach: "Lofoten Islands",         zone: "NORTH", provider: "Nordland Buss",        duration: "~4h",      frequency: "2–3×/day",    priceRange: "$22–$45",    tips: "Take the ferry from Bodø to Moskenes (3h 15m), then local bus through the island chain.", logo: "🚌" },
    { id: "b3", from: "Cape Town Central",      to: "Simon's Town",        beach: "Boulders Beach",          zone: "SOUTH", provider: "Golden Arrow Bus",     duration: "~1h 15m",  frequency: "Every 30 min", priceRange: "$2–$5",     tips: "Take the suburban train (Metrorail) or bus. Walk 500 m from Simon's Town station.", logo: "🚌" },
    { id: "b4", from: "Lisbon Oriente",         to: "Faro Bus Station",    beach: "Praia da Marinha",        zone: "WEST",  provider: "Rede Expressos / EVA", duration: "~3h 45m",  frequency: "Hourly",      priceRange: "$18–$35",    tips: "From Faro take a local bus to Lagoa, then taxi (~15 min) or hire a bicycle to the beach.", logo: "🚌" },
    { id: "b5", from: "Puerto Princesa",        to: "El Nido Terminal",    beach: "El Nido Beach",           zone: "EAST",  provider: "Cherry Bus / Roro",    duration: "~5–6h",    frequency: "Multiple daily", priceRange: "$8–$15",   tips: "Book seats on the air-conditioned Cherry Bus in advance. El Nido island tours start here.", logo: "🚌" },
    { id: "b6", from: "Cancún ADO Station",     to: "Tulum Bus Terminal",  beach: "Tulum Beach",             zone: "WEST",  provider: "ADO Bus",              duration: "~2h",      frequency: "Every hour",  priceRange: "$12–$18",    tips: "One of the most reliable and affordable bus routes on the Riviera Maya.", logo: "🚌" },
  ],
};

// Map zone keys to accent colors used throughout the transport cards and badges.
const ZONE_COLORS: Record<string, string> = {
  NORTH: "#4A90D9",
  SOUTH: "#F59E0B",
  WEST:  "#10B981",
  EAST:  "#EC4899",
};

export function BeachTransport() {
  const [mode, setMode] = useState<TransportMode>("flights");

  // ── Mode switch animation ──
  // Reflow the current transport cards with fade and hover animation whenever the selected mode changes.
  useEffect(() => {
    // jQuery: fade in cards on tab switch
    $(".transport-card").hide().each(function (i) {
      $(this).delay(i * 70).fadeIn(280);
    });

    // jQuery: card hover lift
    if (window.matchMedia("(hover: hover)").matches) {
      $(".transport-card")
        .on("mouseenter", function () { $(this).stop(true).animate({ marginTop: "-4px" }, 160); })
        .on("mouseleave", function () { $(this).stop(true).animate({ marginTop: "0px"  }, 160); });
    }

    return () => { $(".transport-card").off("mouseenter mouseleave"); };
  }, [mode]);

  function switchMode(m: TransportMode) {
    // Animate the grid out before switching the transport mode to make the tab change feel smoother.
    $("#transport-grid").fadeOut(160, () => {
      setMode(m);
      setTimeout(() => $("#transport-grid").fadeIn(220), 0);
    });
  }

  const rows = transportData[mode];

  return (
    <section
      id="transport"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--sand-100)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>Getting There</p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>Transport &amp; Travel Guide</h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
          <p className="mt-3 text-sm" style={{ color: "#6b7280" }}>Flights and bus routes to reach the world's finest beaches.</p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-3 justify-center mb-10">
          {(["flights", "buses"] as TransportMode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-220"
              style={{
                background: mode === m ? "var(--ocean-900)" : "var(--ocean-10)",
                color:      mode === m ? "#fff" : "var(--ocean-900)",
                border:     mode === m ? "1px solid transparent" : "1px solid rgba(0,119,182,0.2)",
                boxShadow:  mode === m ? "0 4px 16px rgba(10,37,64,0.2)" : "none",
              }}
            >
              <span>{m === "flights" ? "✈️" : "🚌"}</span>
              <span className="capitalize">{m}</span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div id="transport-grid" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {rows.map((r) => (
            <div
              key={r.id}
              className="transport-card rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,119,182,0.1)",
                boxShadow: "0 2px 12px rgba(10,37,64,0.07)",
              }}
            >
              {/* Header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ background: "var(--ocean-10)", borderBottom: "1px solid rgba(0,119,182,0.1)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{r.logo}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--ocean-900)" }}>{r.beach}</p>
                    <p className="text-xs" style={{ color: "var(--ocean-500)" }}>{r.provider}</p>
                  </div>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: ZONE_COLORS[r.zone] + "20", color: ZONE_COLORS[r.zone], border: `1px solid ${ZONE_COLORS[r.zone]}40` }}
                >
                  {r.zone}
                </span>
              </div>

              {/* Route */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-4 overflow-hidden">
                  <span className="text-xs font-medium shrink-0" style={{ color: "var(--ocean-900)", maxWidth: "42%" }}>{r.from}</span>
                  <div className="flex-1 flex items-center gap-1 overflow-hidden">
                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "var(--ocean-500)", opacity: 0.4 }} />
                    <span className="text-xs shrink-0" style={{ color: "var(--ocean-500)" }}>
                      {mode === "flights" ? "✈" : "🚌"}
                    </span>
                    <div className="flex-1 border-t border-dashed" style={{ borderColor: "var(--ocean-500)", opacity: 0.4 }} />
                  </div>
                  <span className="text-xs font-medium shrink-0 text-right" style={{ color: "var(--ocean-900)", maxWidth: "42%" }}>{r.to}</span>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Duration",   value: r.duration    },
                    { label: "Frequency",  value: r.frequency   },
                    { label: "Est. Price", value: r.priceRange  },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-2 text-center" style={{ background: "var(--ocean-10)" }}>
                      <p className="text-xs font-semibold" style={{ color: "var(--ocean-900)", fontSize: "0.65rem" }}>{value}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.6rem", marginTop: 2 }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Travel tip */}
                <div className="rounded-xl p-3" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "#92400e" }}>
                    <span className="font-semibold">💡 Tip: </span>{r.tips}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs mt-8" style={{ color: "#9ca3af" }}>
          Prices and schedules are indicative and subject to change. Always verify with the operator before booking.
        </p>
      </div>
    </section>
  );
}
