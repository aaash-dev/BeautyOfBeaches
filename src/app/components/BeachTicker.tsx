import { useEffect, useState } from "react";
import $ from "jquery";

function useLiveClock() {
  // ── Live clock hook ──
  // Keep the ticker time updated every second.
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useGeolocation() {
  const [location, setLocation] = useState("Locating…");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Unknown city";
          const country = data.address?.country ?? "";
          setLocation(`${city}${country ? ", " + country : ""}`);
        } catch {
          setLocation(`${latitude.toFixed(3)}°N ${longitude.toFixed(3)}°E`);
        }
      },
      () => setLocation("Location access denied"),
      { timeout: 8000 }
    );
  }, []);

  return location;
}

export function BeachTicker() {
  const now      = useLiveClock();
  const location = useGeolocation();

  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const items = [
    { icon: "📅", label: "Date",     value: dateStr   },
    { icon: "⏰", label: "Time",     value: timeStr   },
    { icon: "📍", label: "Location", value: location  },
    { icon: "🌊", label: "Tip",      value: "The ocean is calling — answer it!" },
    { icon: "☀️", label: "Note",     value: "Beach therapy: free, open daily."  },
    { icon: "🐚", label: "Fact",     value: "No two waves are exactly alike — just like you." },
  ];

  // ── Hover interaction ──
  // Pause the scrolling ticker on desktop hover so users can read the live items clearly.
  useEffect(() => {
    // jQuery: pause ticker on hover
    $("#ticker-bar")
      .on("mouseenter", () => $(".ticker-track").css("animation-play-state", "paused"))
      .on("mouseleave", () => $(".ticker-track").css("animation-play-state", "running"));
    return () => { $("#ticker-bar").off("mouseenter mouseleave"); };
  }, []);

  const renderItems = (list: typeof items) =>
    list.map((item, idx) => (
      <span key={idx} className="inline-flex items-center gap-1.5 mx-5 sm:mx-8 shrink-0">
        <span>{item.icon}</span>
        <span style={{ color: "var(--sand-500)", fontWeight: 600 }}>{item.label}:</span>
        <span style={{ color: "var(--ocean-10)" }}>{item.value}</span>
        <span style={{ color: "rgba(255,255,255,0.18)", marginLeft: 12 }}>◆</span>
      </span>
    ));

  return (
    <div
      id="ticker-bar"
      className="overflow-hidden"
      style={{
        background: "var(--ocean-900)",
        borderTop: "2px solid var(--ocean-500)",
        borderBottom: "2px solid var(--ocean-500)",
        cursor: "default",
      }}
    >
      <div className="flex items-stretch">
        {/* LIVE badge */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2.5"
          style={{
            background: "var(--ocean-500)",
            color: "#fff",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            zIndex: 2,
            boxShadow: "4px 0 14px rgba(0,119,182,0.4)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6, height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 0 2px rgba(74,222,128,0.3)",
              animation: "livePulse 1.2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span className="hidden xs:inline">LIVE</span>
        </div>

        {/* Ticker content — duplicated for seamless loop */}
        <div
          className="ticker-track flex items-center text-xs py-2.5"
          style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)" }}
        >
          {renderItems(items)}
          {renderItems(items)}
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.72); }
        }
        .ticker-track {
          white-space: nowrap;
          animation: tickerScroll 34s linear infinite;
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
