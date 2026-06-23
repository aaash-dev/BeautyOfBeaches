import { useEffect, useState } from "react";
import $ from "jquery";

const ASPECTS = ["Beach Quality", "Water Clarity", "Facilities", "Accessibility", "Overall Experience"];

interface FeedbackEntry {
  id: number;
  name: string;
  beach: string;
  rating: number;
  comment: string;
  date: string;
}

const sampleFeedback: FeedbackEntry[] = [
  { id: 1, name: "Arjun S.",   beach: "Radhanagar Beach", rating: 5, comment: "Absolutely breathtaking! The sunset was magical and the waters were crystal clear. Will visit again!", date: "12 Jun 2026" },
  { id: 2, name: "Maria L.",   beach: "Maya Bay",          rating: 5, comment: "A dream come true. The limestone cliffs are majestic and the water colour is unreal.", date: "08 Jun 2026" },
  { id: 3, name: "James K.",   beach: "Navagio Beach",     rating: 4, comment: "The boat ride to reach it is worth every second. The shipwreck adds a dramatic touch.", date: "01 Jun 2026" },
];

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{
            fontSize: "1.5rem",
            color: s <= (hovered || value) ? "#F59E0B" : "rgba(255,255,255,0.2)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 2px",
            transition: "color 0.15s",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function BeachFeedback() {
  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(ASPECTS.map((a) => [a, 0]))
  );
  const [form, setForm] = useState({ name: "", beach: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState<FeedbackEntry[]>(sampleFeedback);

  // Live aggregate score based on all five feedback aspects.
  // This derived score is used for both the visual summary and the form submission payload.
  const overallRating = Math.round(
    Object.values(ratings).reduce((a, b) => a + b, 0) / ASPECTS.length
  );

  // ── Initial UI animation ──
  // Fade in review cards after the section mounts to give the reviews a polished entrance.
  useEffect(() => {
    // jQuery: animate review cards in on mount
    $(".review-card").hide().each(function (i) {
      $(this).delay(i * 100).fadeIn(350);
    });
  }, []);

  // ── Feedback submission ──
  // Build a new review entry and provide instant response feedback while resetting the form state.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (overallRating === 0) return;
    const newEntry: FeedbackEntry = {
      id: Date.now(),
      name: form.name || "Anonymous",
      beach: form.beach || "Beach Visit",
      rating: overallRating,
      comment: form.comment,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    // jQuery: flash the submit button
    $("#feedback-btn").animate({ opacity: 0.3 }, 150).animate({ opacity: 1 }, 200);
    setEntries((prev) => [newEntry, ...prev]);
    setSubmitted(true);
    setForm({ name: "", beach: "", comment: "" });
    setRatings(Object.fromEntries(ASPECTS.map((a) => [a, 0])));
    setTimeout(() => setSubmitted(false), 3200);
  }

  return (
    <section
      id="feedback"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--ocean-900)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--sand-500)", letterSpacing: "0.2em" }}>Share Your Experience</p>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>Viewer Feedback</h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Form */}
          <div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
          >
            <h3 className="mb-6" style={{ color: "#fff", fontWeight: 700 }}>Rate Your Beach Visit</h3>

            {submitted && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                ✓ Thank you! Your feedback has been submitted.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Aspect ratings */}
              <div className="flex flex-col gap-3">
                {ASPECTS.map((aspect) => (
                  <div key={aspect} className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{aspect}</span>
                    <StarPicker value={ratings[aspect]} onChange={(v) => setRatings((r) => ({ ...r, [aspect]: v }))} />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Overall Rating:</span>
                <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: "1.1rem" }}>
                  {overallRating > 0 ? "★".repeat(overallRating) + " " + overallRating + ".0" : "—"}
                </span>
              </div>

              {[
                { key: "name",    label: "Your Name",    placeholder: "John Doe"                 },
                { key: "beach",   label: "Beach Visited", placeholder: "e.g. Radhanagar Beach"   },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</label>
                  <input
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Your Comments</label>
                <textarea
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                  rows={3}
                  placeholder="Tell us about your beach experience…"
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  required
                />
              </div>

              <button
                id="feedback-btn"
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ background: "var(--sand-500)", color: "#fff", boxShadow: "0 4px 16px rgba(201,169,110,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ocean-500)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sand-500)")}
              >
                Submit Feedback 🌊
              </button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="review-card rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: "var(--ocean-500)", color: "#fff" }}
                    >
                      {entry.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#fff" }}>{entry.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{entry.beach}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p style={{ color: "#F59E0B", fontSize: "0.8rem" }}>{"★".repeat(entry.rating)}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{entry.date}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{entry.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
