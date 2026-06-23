import { useEffect } from "react";
import $ from "jquery";
import { BeachLogo } from "./BeachLogo";

const sitemapData = [
  {
    section: "🏠 Home",
    id: "hero",
    color: "var(--ocean-500)",
    children: ["Hero Banner", "Tagline & CTA", "Navigation"],
  },
  {
    section: "🧭 Zones",
    id: "zones",
    color: "#10B981",
    children: ["North Zone", "South Zone", "West Zone", "East Zone"],
  },
  {
    section: "🏄 Activities",
    id: "activities",
    color: "#F59E0B",
    children: ["Surfing", "Snorkelling", "Kayaking", "Volleyball", "Sunset Walk", "Shell Collecting"],
  },
  {
    section: "🖼️ Gallery",
    id: "gallery",
    color: "#8B5CF6",
    children: ["Photo Grid", "Lightbox Viewer", "Caption Labels"],
  },
  {
    section: "📊 Facts",
    id: "facts",
    color: "#EC4899",
    children: ["Ocean Facts", "Biodiversity", "Wave Records", "Sand Stats", "Health Benefits", "Tidal Info"],
  },
  {
    section: "✈️ Transport",
    id: "transport",
    color: "#0EA5E9",
    children: ["Flight Routes", "Bus Services", "Zone-wise Travel", "Booking Info"],
  },
  {
    section: "💬 Feedback",
    id: "feedback",
    color: "#14B8A6",
    children: ["Star Ratings", "Aspect Reviews", "Viewer Comments", "Submit Form"],
  },
  {
    section: "📧 Contact",
    id: "contact",
    color: "#F97316",
    children: ["Contact Form", "Beach Stats Bar"],
  },
  {
    section: "❓ Queries",
    id: "queries",
    color: "#6366F1",
    children: ["FAQ Accordion", "Send Query Form"],
  },
  {
    section: "ℹ️ About Us",
    id: "about",
    color: "var(--sand-500)",
    children: ["Organisation Info", "Contact Details", "Meet the Team", "PDF / DOC Download"],
  },
];

export function BeachSitemap() {
  useEffect(() => {
    // ── Visual sitemap polish ──
    // Give the section nodes hover feedback and staggered fade-in for a more dynamic navigation overview.
    // jQuery: node hover glow
    $(".sitemap-node")
      .on("mouseenter", function () {
        $(this).css({ transform: "scale(1.03)", boxShadow: "0 6px 24px rgba(0,119,182,0.18)" });
      })
      .on("mouseleave", function () {
        $(this).css({ transform: "scale(1)", boxShadow: "0 2px 10px rgba(10,37,64,0.07)" });
      });

    // jQuery: animate node children in sequence
    $(".sitemap-node").each(function (i) {
      $(this).hide().delay(i * 60).fadeIn(280);
    });

    return () => { $(".sitemap-node").off("mouseenter mouseleave"); };
  }, []);

  // Smooth scroll to section anchors, keeping the header offset consistent.
  const scrollTo = (id: string) => {
    const el = $(`#${id}`);
    if (el.length) $("html, body").animate({ scrollTop: el.offset()!.top - 70 }, 600, "swing");
  };

  return (
    <section
      id="sitemap"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--ocean-10)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>Navigation Overview</p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>Site Map</h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
          <p className="mt-3 text-sm" style={{ color: "#6b7280" }}>
            Click any section to navigate directly to it.
          </p>
        </div>

        {/* Root node */}
        <div className="flex justify-center mb-8">
          <div
            className="px-8 py-4 rounded-2xl text-center"
            style={{
              background: "var(--ocean-900)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 4px 24px rgba(10,37,64,0.25)",
              minWidth: 180,
            }}
          >
            <div className="flex justify-center mb-1">
              <BeachLogo size={32} textColor="#fff" accentColor="#C9A96E" />
            </div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
              www.beautyofbeaches.com
            </div>
          </div>
        </div>

        {/* Connector line */}
        <div className="flex justify-center mb-8">
          <div style={{ width: 2, height: 28, background: "var(--ocean-500)", opacity: 0.4 }} />
        </div>

        {/* Section nodes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {sitemapData.map(({ section, id, color, children }) => (
            <div
              key={id}
              className="sitemap-node rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                background: "#fff",
                border: `1px solid ${color}30`,
                boxShadow: "0 2px 10px rgba(10,37,64,0.07)",
              }}
              onClick={() => scrollTo(id)}
            >
              {/* Section header */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: color + "15", borderBottom: `1px solid ${color}25` }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-xs font-bold" style={{ color: "var(--ocean-900)" }}>{section}</span>
              </div>
              {/* Children list */}
              <ul className="px-4 py-3 flex flex-col gap-1.5">
                {children.map((child) => (
                  <li key={child} className="flex items-center gap-1.5 text-xs" style={{ color: "#6b7280" }}>
                    <span style={{ color, fontSize: "0.5rem" }}>◆</span>
                    {child}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {sitemapData.map(({ section, color, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: color + "15",
                color: "var(--ocean-900)",
                border: `1px solid ${color}35`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = color + "30")}
              onMouseLeave={(e) => (e.currentTarget.style.background = color + "15")}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
              {section.split(" ").slice(1).join(" ")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
