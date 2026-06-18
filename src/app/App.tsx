import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { BeachHero }      from "./components/BeachHero";
import { BeachZones }     from "./components/BeachZones";
import { BeachActivities} from "./components/BeachActivities";
import { BeachGallery }   from "./components/BeachGallery";
import { BeachFacts }     from "./components/BeachFacts";
import { BeachTransport } from "./components/BeachTransport";
import { BeachFeedback }  from "./components/BeachFeedback";
import { BeachContact }   from "./components/BeachContact";
import { BeachQueries }   from "./components/BeachQueries";
import { BeachAbout }     from "./components/BeachAbout";
import { BeachSitemap }   from "./components/BeachSitemap";
import { BeachTicker }    from "./components/BeachTicker";
import { BeachLogo }      from "./components/BeachLogo";

/* MARKER-MAKE-KIT-INVOKED */
/* MARKER-MAKE-KIT-DISCOVERY-READ */

// ── Nav structure ────────────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { label: "Home",       href: "#hero"       },
  { label: "Zones",      href: "#zones"      },
  { label: "Activities", href: "#activities" },
  { label: "Gallery",    href: "#gallery"    },
  { label: "Facts",      href: "#facts"      },
];

const DROPDOWN_EXPLORE = [
  { label: "✈️ Transport",  href: "#transport" },
  { label: "💬 Feedback",   href: "#feedback"  },
  { label: "❓ Queries",    href: "#queries"   },
];

const DROPDOWN_INFO = [
  { label: "ℹ️ About Us",   href: "#about"    },
  { label: "📧 Contact",    href: "#contact"  },
  { label: "🗺️ Site Map",   href: "#sitemap"  },
];

const ALL_SECTION_IDS = [
  "hero","zones","activities","gallery","facts",
  "transport","feedback","queries","about","contact","sitemap",
];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection]   = useState("hero");
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [exploreOpen, setExploreOpen]       = useState(false);
  const [infoOpen, setInfoOpen]             = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  const [visitors] = useState(() => {
    const prev = parseInt(localStorage.getItem("bob_visitors") ?? "0", 10);
    const next  = prev + 1;
    localStorage.setItem("bob_visitors", String(next));
    return next;
  });

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    $(document).on("click", "a.nav-link", function (e) {
      e.preventDefault();
      const target = $(this).attr("href") as string;
      const offset = $(target).offset()?.top ?? 0;
      $("html, body").animate({ scrollTop: offset - 64 }, 680, "swing");
      setExploreOpen(false);
      setInfoOpen(false);
      if (mobileOpen) $("#mobile-menu").fadeOut(220, () => setMobileOpen(false));
    });
    return () => { $(document).off("click", "a.nav-link"); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    $(window).on("scroll.navbar", () => {
      $(window).scrollTop()! > 60
        ? $("#main-nav").addClass("nav-scrolled")
        : $("#main-nav").removeClass("nav-scrolled");
    });

    $(window).on("scroll.active", () => {
      const scrollY = $(window).scrollTop()! + 120;
      let current = "hero";
      ALL_SECTION_IDS.forEach((id) => {
        const el = $(`#${id}`);
        if (el.length && el.offset()!.top <= scrollY) current = id;
      });
      setActiveSection(current);
    });

    // IntersectionObserver: fade sections
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) $(e.target).addClass("visible"); }),
      { threshold: 0.08 }
    );
    $(".fade-section").each(function () { observer.observe(this); });

    // Wave dots
    const waveInterval = setInterval(() => {
      $(".wave-dot").each(function (i) {
        setTimeout(() => {
          $(this).addClass("wave-pulse").delay(300).queue(function (next) {
            $(this).removeClass("wave-pulse"); next();
          });
        }, i * 130);
      });
    }, 1100);

    return () => {
      $(window).off("scroll.navbar").off("scroll.active");
      clearInterval(waveInterval);
      observer.disconnect();
    };
  }, []);

  // ── Click-outside: close dropdowns ────────────────────────────────────────
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) setExploreOpen(false);
      if (infoRef.current    && !infoRef.current.contains(e.target as Node))    setInfoOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Mobile toggle ──────────────────────────────────────────────────────────
  const toggleMobile = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
      setTimeout(() => $("#mobile-menu").hide().fadeIn(260), 0);
    } else {
      $("#mobile-menu").fadeOut(220, () => setMobileOpen(false));
    }
  };

  // ── Dropdown toggle helpers ────────────────────────────────────────────────
  const toggleExplore = () => {
    if (!exploreOpen) {
      setInfoOpen(false);
      setExploreOpen(true);
      setTimeout(() => $("#dd-explore").hide().fadeIn(180), 0);
    } else {
      $("#dd-explore").fadeOut(150, () => setExploreOpen(false));
    }
  };
  const toggleInfo = () => {
    if (!infoOpen) {
      setExploreOpen(false);
      setInfoOpen(true);
      setTimeout(() => $("#dd-info").hide().fadeIn(180), 0);
    } else {
      $("#dd-info").fadeOut(150, () => setInfoOpen(false));
    }
  };

  const isActive = (hrefs: string[]) => hrefs.includes(`#${activeSection}`);

  return (
    <div className="min-h-screen" style={{ background: "var(--sand-100)" }}>
      <style>{`
        :root {
          --ocean-900: #0A2540;
          --ocean-500: #0077B6;
          --ocean-10:  #E8F4FD;
          --sand-100:  #FEF9F0;
          --sand-500:  #C9A96E;
        }

        /* Navbar */
        #main-nav {
          position: fixed; top:0; left:0; right:0; z-index:100;
          transition: background 0.35s, box-shadow 0.35s;
        }
        #main-nav.nav-scrolled {
          background: var(--ocean-900);
          box-shadow: 0 2px 18px rgba(10,37,64,0.22);
        }

        /* Nav links */
        .nav-link {
          position: relative; color: rgba(255,255,255,0.78);
          text-decoration: none; padding: 4px 2px;
          font-size: 0.78rem; letter-spacing: 0.05em;
          text-transform: capitalize; transition: color 0.2s;
          white-space: nowrap; background: none; border: none; cursor: pointer;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:-2px; left:0; right:0;
          height:2px; background:var(--sand-500); transform:scaleX(0);
          transform-origin:left; transition:transform 0.25s; border-radius:2px;
        }
        .nav-link:hover        { color: var(--sand-500) !important; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.nav-active   { color: #fff !important; }
        .nav-link.nav-active::after { transform: scaleX(1); }

        /* Dropdown */
        .dd-menu {
          position:absolute; top:calc(100% + 8px); left:50%;
          transform:translateX(-50%);
          background:var(--ocean-900);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; overflow:hidden;
          box-shadow:0 8px 30px rgba(10,37,64,0.35);
          min-width:170px; z-index:200;
        }
        .dd-item {
          display:block; padding:10px 16px;
          color:rgba(255,255,255,0.75); font-size:0.8rem;
          text-decoration:none; transition:background 0.15s, color 0.15s;
          border-bottom:1px solid rgba(255,255,255,0.05);
          white-space:nowrap;
        }
        .dd-item:last-child { border-bottom:none; }
        .dd-item:hover { background:rgba(255,255,255,0.08); color:#fff; }

        /* Fade sections */
        .fade-section { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .fade-section.visible { opacity:1; transform:translateY(0); }

        /* Wave dots */
        .wave-dot { display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--ocean-500); margin:0 3px; transition:transform 0.28s; }
        .wave-dot.wave-pulse { transform:translateY(-6px); }

        /* Ticker */
        .ticker-track { white-space:nowrap; animation:tickerScroll 34s linear infinite; }
        @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* Pills scroll */
        .pills-scroll { scrollbar-width:none; }
        .pills-scroll::-webkit-scrollbar { display:none; }
      `}</style>

      {/* ── Navbar ── */}
      <nav id="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">

          {/* Logo + visitor */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <BeachLogo size={28} textColor="#fff" accentColor="#C9A96E" />
            <span
              className="text-xs px-2 py-0.5 rounded-full shrink-0"
              style={{ background:"rgba(201,169,110,0.22)", color:"var(--sand-500)", border:"1px solid rgba(201,169,110,0.38)" }}
              title="Visitor count"
            >
              👁 {visitors.toLocaleString()}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {PRIMARY_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`nav-link${activeSection === href.slice(1) ? " nav-active" : ""}`}
                onMouseEnter={(e) => $(e.currentTarget).css("color","var(--sand-500)")}
                onMouseLeave={(e) => $(e.currentTarget).css("color", activeSection === href.slice(1) ? "#fff" : "rgba(255,255,255,0.78)")}
              >
                {label}
              </a>
            ))}

            {/* Explore dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                className={`nav-link flex items-center gap-1${isActive(DROPDOWN_EXPLORE.map(l=>l.href)) ? " nav-active" : ""}`}
                onClick={toggleExplore}
                onMouseEnter={(e) => $(e.currentTarget).css("color","var(--sand-500)")}
                onMouseLeave={(e) => $(e.currentTarget).css("color", isActive(DROPDOWN_EXPLORE.map(l=>l.href)) ? "#fff" : "rgba(255,255,255,0.78)")}
              >
                Explore
                <span style={{ fontSize:"0.6rem", marginLeft:2, transition:"transform 0.2s", display:"inline-block", transform: exploreOpen?"rotate(180deg)":"none" }}>▼</span>
              </button>
              {exploreOpen && (
                <div id="dd-explore" className="dd-menu">
                  {DROPDOWN_EXPLORE.map(({ label, href }) => (
                    <a key={href} href={href} className="dd-item nav-link">{label}</a>
                  ))}
                </div>
              )}
            </div>

            {/* Info dropdown */}
            <div ref={infoRef} className="relative">
              <button
                className={`nav-link flex items-center gap-1${isActive(DROPDOWN_INFO.map(l=>l.href)) ? " nav-active" : ""}`}
                onClick={toggleInfo}
                onMouseEnter={(e) => $(e.currentTarget).css("color","var(--sand-500)")}
                onMouseLeave={(e) => $(e.currentTarget).css("color", isActive(DROPDOWN_INFO.map(l=>l.href)) ? "#fff" : "rgba(255,255,255,0.78)")}
              >
                Info
                <span style={{ fontSize:"0.6rem", marginLeft:2, transition:"transform 0.2s", display:"inline-block", transform: infoOpen?"rotate(180deg)":"none" }}>▼</span>
              </button>
              {infoOpen && (
                <div id="dd-info" className="dd-menu">
                  {DROPDOWN_INFO.map(({ label, href }) => (
                    <a key={href} href={href} className="dd-item nav-link">{label}</a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 shrink-0"
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => <span key={i} className="block w-5 h-0.5 rounded" style={{ background:"#fff" }} />)}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden"
            style={{ background:"var(--ocean-900)", borderTop:"1px solid rgba(255,255,255,0.08)", maxHeight:"80vh", overflowY:"auto" }}
          >
            {[...PRIMARY_LINKS, ...DROPDOWN_EXPLORE, ...DROPDOWN_INFO].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav-link block px-5 py-3 border-b text-sm"
                style={{ borderColor:"rgba(255,255,255,0.06)", color: activeSection===href.slice(1) ? "#fff" : "rgba(255,255,255,0.75)" }}
                onMouseEnter={(e) => $(e.currentTarget).css("background","rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => $(e.currentTarget).css("background","transparent")}
              >
                {activeSection === href.slice(1) ? "▸ " : ""}{label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Page sections ── */}
      <BeachHero />
      <BeachZones />
      <BeachActivities />
      <BeachGallery />
      <BeachFacts />
      <BeachTransport />
      <BeachFeedback />
      <BeachContact />
      <BeachQueries />
      <BeachAbout />
      <BeachSitemap />

      {/* ── Ticker ── */}
      <BeachTicker />

      {/* ── Footer ── */}
      <footer style={{ background:"var(--ocean-900)" }} className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            {[
              { heading: "Explore",  links: PRIMARY_LINKS                                          },
              { heading: "Discover", links: DROPDOWN_EXPLORE                                       },
              { heading: "Info",     links: DROPDOWN_INFO                                          },
              { heading: "Contact",  links: [
                  { label:"📧 info@beautyofbeaches.com", href:"mailto:info@beautyofbeaches.com" },
                  { label:"📞 +1 (305) 555-0199",        href:"tel:+13055550199"                },
                  { label:"📍 Miami, FL 33101, USA",      href:"#about"                          },
              ]},
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color:"var(--sand-500)", letterSpacing:"0.15em" }}>{heading}</p>
                <ul className="flex flex-col gap-2">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="nav-link text-xs"
                        style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.75rem" }}
                        onMouseEnter={(e) => $(e.currentTarget).css("color","var(--sand-500)")}
                        onMouseLeave={(e) => $(e.currentTarget).css("color","rgba(255,255,255,0.55)")}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
            style={{ borderTop:"1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <BeachLogo size={22} textColor="rgba(255,255,255,0.45)" accentColor="#C9A96E" />
            </div>
            <div className="flex items-center gap-1">
              <span className="wave-dot" /><span className="wave-dot" /><span className="wave-dot" />
            </div>
            <span className="text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>Built with ❤️ for beach lovers worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
