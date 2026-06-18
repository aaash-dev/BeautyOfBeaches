import { useEffect } from "react";
import $ from "jquery";
import jsPDF from "jspdf";

const ORG = {
  name: "BeautyOfBeaches Digital",
  tagline: "Bringing the world's finest shores to your screen",
  email: "info@beautyofbeaches.com",
  phone: "+1 (305) 555-0199",
  address: "123 Ocean Drive, Coastal Hub,\nMiami, FL 33101, USA",
  website: "www.beautyofbeaches.com",
  founded: "2022",
  team: "12 passionate beach explorers",
  mission:
    "Our mission is to inspire travellers worldwide by curating authentic, in-depth information about the planet's most stunning beaches — organised by zone, culture, and season — so every visitor can plan their perfect coastal escape.",
  vision:
    "A world where every person has experienced the healing power of the ocean at least once in their lifetime.",
};

const teamMembers = [
  { name: "Alex Monroe",    role: "Founder & CEO",        emoji: "👔" },
  { name: "Priya Sharma",   role: "Head of Content",      emoji: "✍️" },
  { name: "Luca Ferretti",  role: "Lead Developer",       emoji: "💻" },
  { name: "Aisha Kamara",   role: "UX / Design Lead",     emoji: "🎨" },
];

// ── Download helpers ────────────────────────────────────────────────────────

function downloadPDF() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header bar
  doc.setFillColor(10, 37, 64);
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("BEAUTY OF BEACHES", W / 2, 12, { align: "center" });

  y = 28;
  doc.setTextColor(0, 0, 0);

  const section = (title: string) => {
    doc.setFillColor(232, 244, 253);
    doc.rect(14, y - 4, W - 28, 9, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 37, 64);
    doc.text(title, 16, y + 2);
    y += 11;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
  };

  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", 16, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 55, y);
    y += 7;
  };

  const para = (text: string) => {
    const lines = doc.splitTextToSize(text, W - 30);
    doc.text(lines, 16, y);
    y += lines.length * 6 + 4;
  };

  // Organisation Info
  section("Organisation Information");
  row("Name",      ORG.name);
  row("Email",     ORG.email);
  row("Phone",     ORG.phone);
  row("Address",   ORG.address.replace("\n", ", "));
  row("Website",   ORG.website);
  row("Founded",   ORG.founded);
  y += 2;

  // Mission & Vision
  section("Mission");
  para(ORG.mission);
  section("Vision");
  para(ORG.vision);

  // Beach Zones summary
  section("Beach Zones Covered");
  const zones = [
    ["NORTH", "Reynisfjara (Iceland), Lofoten (Norway), White Beach (Alaska)"],
    ["SOUTH", "Whitehaven (Australia), Anse Source d'Argent (Seychelles), Boulders (S. Africa)"],
    ["WEST",  "Maya Bay (Thailand), Praia da Marinha (Portugal), Tulum (Mexico)"],
    ["EAST",  "Navagio (Greece), Radhanagar (India), El Nido (Philippines)"],
  ];
  zones.forEach(([zone, beaches]) => row(zone, beaches));
  y += 2;

  // Activities
  section("Activities Offered");
  para("Surfing · Snorkelling · Kayaking · Beach Volleyball · Sunset Walks · Shell Collecting");

  // Footer
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(10, 37, 64);
  doc.rect(0, pageH - 12, W, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(`Generated on ${new Date().toDateString()} | ${ORG.website}`, W / 2, pageH - 4, { align: "center" });

  doc.save("BeautyOfBeaches.pdf");
}

function downloadDOC() {
  const html = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Beauty of Beaches</title>
<style>
  body { font-family: Calibri, sans-serif; color: #1a1a1a; margin: 40px; }
  h1 { color: #0A2540; font-size: 22pt; border-bottom: 3px solid #0077B6; padding-bottom: 6px; }
  h2 { color: #0077B6; font-size: 14pt; margin-top: 22px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  td { padding: 6px 10px; border: 1px solid #ddd; }
  td:first-child { font-weight: bold; color: #0A2540; width: 140px; background: #E8F4FD; }
  .footer { margin-top: 30px; font-size: 9pt; color: #888; border-top: 1px solid #ddd; padding-top: 8px; }
  .highlight { background: #E8F4FD; padding: 10px 14px; border-left: 4px solid #0077B6; margin: 10px 0; }
</style></head><body>
<h1>🌊 Beauty of Beaches — Complete Information</h1>

<h2>Organisation Information</h2>
<table>
  <tr><td>Name</td><td>${ORG.name}</td></tr>
  <tr><td>Email</td><td>${ORG.email}</td></tr>
  <tr><td>Phone</td><td>${ORG.phone}</td></tr>
  <tr><td>Address</td><td>${ORG.address.replace("\n", ", ")}</td></tr>
  <tr><td>Website</td><td>${ORG.website}</td></tr>
  <tr><td>Founded</td><td>${ORG.founded}</td></tr>
  <tr><td>Team</td><td>${ORG.team}</td></tr>
</table>

<h2>Mission</h2>
<div class="highlight">${ORG.mission}</div>

<h2>Vision</h2>
<div class="highlight">${ORG.vision}</div>

<h2>Beaches by Zone</h2>
<table>
  <tr><td>NORTH</td><td>Reynisfjara (Iceland), Lofoten (Norway), White Beach (Alaska)</td></tr>
  <tr><td>SOUTH</td><td>Whitehaven (Australia), Anse Source d'Argent (Seychelles), Boulders (South Africa)</td></tr>
  <tr><td>WEST</td><td>Maya Bay (Thailand), Praia da Marinha (Portugal), Tulum (Mexico)</td></tr>
  <tr><td>EAST</td><td>Navagio (Greece), Radhanagar (India), El Nido (Philippines)</td></tr>
</table>

<h2>Beach Activities</h2>
<table>
  <tr><td>Surfing</td><td>Best time: Early Morning. Ride the perfect wave on iconic surf breaks.</td></tr>
  <tr><td>Snorkelling</td><td>Best time: Mid Morning. Explore coral reefs and vibrant sea life.</td></tr>
  <tr><td>Kayaking</td><td>Best time: Afternoon. Glide through calm coves and sea caves.</td></tr>
  <tr><td>Beach Volleyball</td><td>Best time: Late Afternoon. Social sport with ocean breeze backdrop.</td></tr>
  <tr><td>Sunset Walk</td><td>Best time: Evening. Stroll along the shore as skies turn gold.</td></tr>
  <tr><td>Shell Collecting</td><td>Best time: Low Tide. Discover nature's tiny masterpieces washed ashore.</td></tr>
</table>

<h2>Contact &amp; Support</h2>
<table>
  <tr><td>Email</td><td>${ORG.email}</td></tr>
  <tr><td>Phone</td><td>${ORG.phone}</td></tr>
  <tr><td>Address</td><td>${ORG.address.replace("\n", ", ")}</td></tr>
</table>

<div class="footer">Generated on ${new Date().toDateString()} by ${ORG.name} | ${ORG.website}</div>
</body></html>`;

  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "BeautyOfBeaches.doc";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Component ───────────────────────────────────────────────────────────────

export function BeachAbout() {
  useEffect(() => {
    // jQuery: hover glow on contact cards
    $(".contact-card")
      .on("mouseenter", function () {
        $(this).css({ borderColor: "var(--ocean-500)", boxShadow: "0 0 0 2px rgba(0,119,182,0.2)" });
      })
      .on("mouseleave", function () {
        $(this).css({ borderColor: "rgba(0,119,182,0.15)", boxShadow: "none" });
      });

    // jQuery: download buttons press effect
    $(".dl-btn").on("mousedown", function () {
      $(this).animate({ paddingTop: "10px", paddingBottom: "10px" }, 80);
    }).on("mouseup mouseleave", function () {
      $(this).animate({ paddingTop: "12px", paddingBottom: "12px" }, 80);
    });

    return () => {
      $(".contact-card").off("mouseenter mouseleave");
      $(".dl-btn").off("mousedown mouseup mouseleave");
    };
  }, []);

  return (
    <section
      id="about"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--ocean-10)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>Who We Are</p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>About Us</h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Org info */}
          <div>
            <h3 className="mb-1" style={{ color: "var(--ocean-900)", fontWeight: 700, fontSize: "1.2rem" }}>{ORG.name}</h3>
            <p className="text-sm mb-5" style={{ color: "var(--ocean-500)", fontStyle: "italic" }}>{ORG.tagline}</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4b5563" }}>{ORG.mission}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              <strong style={{ color: "var(--ocean-900)" }}>Our Vision:</strong> {ORG.vision}
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              {[
                { label: "Founded", value: ORG.founded },
                { label: "Team",    value: ORG.team },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl px-4 py-3 text-center" style={{ background: "var(--ocean-10)", border: "1px solid rgba(0,119,182,0.15)" }}>
                  <div style={{ color: "var(--ocean-500)", fontWeight: 700 }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <h3 className="mb-1" style={{ color: "var(--ocean-900)", fontWeight: 700 }}>Contact Information</h3>
            {[
              { icon: "📧", label: "Email Address", value: ORG.email, href: `mailto:${ORG.email}` },
              { icon: "📞", label: "Phone Number",  value: ORG.phone, href: `tel:${ORG.phone.replace(/\s/g,"")}` },
              { icon: "📍", label: "Office Address", value: ORG.address, href: undefined },
              { icon: "🌐", label: "Website",        value: ORG.website, href: undefined },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="contact-card rounded-xl p-4 flex items-start gap-3 transition-all duration-200"
                style={{ background: "#fff", border: "1px solid rgba(0,119,182,0.15)", cursor: "default" }}
              >
                <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                <div className="min-w-0">
                  <p className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium break-all" style={{ color: "var(--ocean-500)" }}>{value}</a>
                  ) : (
                    <p className="text-sm font-medium whitespace-pre-line" style={{ color: "var(--ocean-900)" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-center mb-6" style={{ color: "var(--ocean-900)", fontWeight: 700 }}>Meet the Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {teamMembers.map(({ name, role, emoji }) => (
              <div key={name} className="rounded-2xl p-5 text-center" style={{ background: "#fff", border: "1px solid rgba(0,119,182,0.1)", boxShadow: "0 2px 10px rgba(10,37,64,0.05)" }}>
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="text-sm font-semibold" style={{ color: "var(--ocean-900)" }}>{name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--ocean-500)" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download section */}
        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center"
          style={{ background: "var(--ocean-900)", border: "1px solid rgba(0,119,182,0.2)" }}
        >
          <h3 className="mb-2" style={{ color: "#fff", fontWeight: 700 }}>Download Complete Details</h3>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.6)" }}>
            Get the full beach guide — zones, activities, facts, and organisation info — as a PDF or DOC file.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="dl-btn flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ background: "#DC2626", color: "#fff", boxShadow: "0 4px 16px rgba(220,38,38,0.3)" }}
              onClick={downloadPDF}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: "1.1rem" }}>📄</span> Download PDF
            </button>
            <button
              className="dl-btn flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ background: "#2563EB", color: "#fff", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}
              onClick={downloadDOC}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: "1.1rem" }}>📝</span> Download DOC
            </button>
          </div>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            PDF generated client-side with jsPDF · DOC opens in Microsoft Word
          </p>
        </div>
      </div>
    </section>
  );
}
