import { useEffect, useState } from "react";
import $ from "jquery";

const faqData = [
  { id: 1, q: "What is the best time of year to visit tropical beaches?",       a: "Generally, the dry season (Nov–Apr for South-East Asian and Indian Ocean beaches, Jun–Sep for European coasts) offers calm waters and sunny skies. However, the best time varies by destination — our Zones section lists the ideal season for each beach." },
  { id: 2, q: "Which zone has the most family-friendly beaches?",                a: "The SOUTH zone — particularly Whitehaven Beach (Australia) and Boulders Beach (South Africa) — is renowned for calm, shallow waters and fascinating wildlife such as African penguins, making it ideal for families with children." },
  { id: 3, q: "Are the northern beaches safe to swim at?",                       a: "Northern beaches like Reynisfjara (Iceland) have notoriously dangerous sneaker waves and cold water. Swimming is not advised. However, they are breathtaking for hiking and photography. Always read local safety notices before entering the water anywhere." },
  { id: 4, q: "How do I reach remote beaches like Maya Bay or El Nido?",        a: "Most remote beaches are accessible by boat tours or ferry services. Our Transport section lists bus and flight routes to the nearest major hub, from where local boat operators provide transfers. Advance booking is strongly recommended during peak season." },
  { id: 5, q: "Can I download the beach information for offline use?",           a: "Yes! Visit our About Us section and click 'Download PDF' or 'Download DOC' to save the complete beach guide — including all zones, activities, and contact details — directly to your device." },
  { id: 6, q: "How do I submit feedback about a beach I visited?",              a: "Scroll to our Feedback section, rate your experience across five aspects (Beach Quality, Water Clarity, Facilities, Accessibility, and Overall Experience), add your comments, and hit Submit. Your review appears instantly on the page." },
  { id: 7, q: "Is this website suitable for viewing on mobile devices?",        a: "Absolutely. BeautyOfBeaches is fully responsive and tested across smartphones, tablets, and desktops. The layout adapts automatically to give you the best reading and navigation experience on any screen size." },
  { id: 8, q: "How can I contact the BeautyOfBeaches team?",                    a: "You can reach us by email at info@beautyofbeaches.com, call us at +1 (305) 555-0199, or use the Contact Us form on this page. We typically respond within 24 hours on weekdays." },
];

export function BeachQueries() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [queryForm, setQueryForm] = useState({ name: "", email: "", question: "" });
  const [querySent, setQuerySent] = useState(false);

  // ── FAQ accordion logic ──
  // Manage one expanded FAQ item at a time and animate its answer pane.
  function toggleFaq(id: number) {
    if (openId === id) {
      // jQuery: slide up
      $(`#faq-ans-${id}`).slideUp(220, () => setOpenId(null));
    } else {
      if (openId !== null) $(`#faq-ans-${openId}`).slideUp(180);
      setOpenId(id);
      setTimeout(() => $(`#faq-ans-${id}`).hide().slideDown(260), 0);
    }
  }

  function handleQuerySubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuerySent(true);
    setQueryForm({ name: "", email: "", question: "" });
    setTimeout(() => setQuerySent(false), 3500);
  }

  // ── FAQ hover styling ──
  // Apply subtle border highlights when hovering FAQ cards for desktop polish.
  useEffect(() => {
    // jQuery: FAQ item hover highlight
    $(".faq-item")
      .on("mouseenter", function () { if (!$(this).hasClass("faq-open")) $(this).css("borderColor", "rgba(0,119,182,0.35)"); })
      .on("mouseleave", function () { if (!$(this).hasClass("faq-open")) $(this).css("borderColor", "rgba(0,119,182,0.12)"); });
    return () => { $(".faq-item").off("mouseenter mouseleave"); };
  }, []);

  return (
    <section
      id="queries"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--sand-100)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>Help &amp; Support</p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>Queries &amp; FAQs</h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* FAQ accordion — 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`faq-item${isOpen ? " faq-open" : ""} rounded-2xl overflow-hidden transition-colors duration-200`}
                  style={{
                    border: isOpen ? "1px solid var(--ocean-500)" : "1px solid rgba(0,119,182,0.12)",
                    background: "#fff",
                    boxShadow: isOpen ? "0 4px 16px rgba(0,119,182,0.1)" : "0 1px 4px rgba(10,37,64,0.05)",
                  }}
                >
                  <button
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                    onClick={() => toggleFaq(item.id)}
                  >
                    <span className="text-sm font-medium pr-2" style={{ color: isOpen ? "var(--ocean-500)" : "var(--ocean-900)" }}>
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-250"
                      style={{
                        background: isOpen ? "var(--ocean-500)" : "var(--ocean-10)",
                        color: isOpen ? "#fff" : "var(--ocean-900)",
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {/* jQuery slideDown / slideUp controls display */}
                  <div id={`faq-ans-${item.id}`} style={{ display: isOpen ? "block" : "none" }}>
                    <div className="px-5 pb-4">
                      <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Send a query form — 2 cols */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 sticky top-24"
              style={{ background: "var(--ocean-900)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="mb-1" style={{ color: "#fff", fontWeight: 700 }}>Still have a question?</h3>
              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                We'll reply within 24 hours on weekdays.
              </p>

              {querySent ? (
                <div className="py-6 text-center">
                  <div className="text-3xl mb-3">✅</div>
                  <p className="text-sm font-medium" style={{ color: "#4ade80" }}>Query received!</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleQuerySubmit} className="flex flex-col gap-4">
                  {[
                    { key: "name",     label: "Your Name",    type: "text",  placeholder: "John Doe"          },
                    { key: "email",    label: "Email Address", type: "email", placeholder: "john@example.com"  },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</label>
                      <input
                        type={type}
                        className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                        placeholder={placeholder}
                        value={queryForm[key as keyof typeof queryForm]}
                        onChange={(e) => setQueryForm({ ...queryForm, [key]: e.target.value })}
                        required
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Your Question</label>
                    <textarea
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                      rows={4}
                      placeholder="Type your question here…"
                      value={queryForm.question}
                      onChange={(e) => setQueryForm({ ...queryForm, question: e.target.value })}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ background: "var(--sand-500)", color: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ocean-500)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sand-500)")}
                  >
                    Send Query →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
