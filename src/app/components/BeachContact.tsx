import { useEffect, useState } from "react";
import $ from "jquery";

export function BeachContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    $(".beach-input")
      .on("focus", function () { $(this).css("border-color", "var(--ocean-500)"); })
      .on("blur",  function () { $(this).css("border-color", "rgba(0,119,182,0.2)"); });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    $("#contact-btn").animate({ opacity: 0 }, 200, function () {
      setSent(true);
      $("#contact-btn").animate({ opacity: 1 }, 300);
    });
  }

  return (
    <section
      id="contact"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: `linear-gradient(135deg, var(--ocean-900) 0%, var(--ocean-500) 100%)` }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-10 sm:mb-14">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--sand-500)", letterSpacing: "0.2em" }}>
            Get In Touch
          </p>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>
            Plan Your Beach Visit
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--ocean-10)", opacity: 0.85 }}>
            Have questions or need beach trip recommendations? We'd love to hear from you.
          </p>
        </div>

        <div
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          {sent ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-4xl sm:text-5xl mb-4">🌊</div>
              <h3 style={{ color: "#fff", fontWeight: 700 }}>Message Sent!</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--ocean-10)", opacity: 0.8 }}>
                Thank you, {form.name}! We'll get back to you soon.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-5 px-6 py-2 rounded-full text-sm"
                style={{ background: "var(--sand-500)", color: "#fff" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              {[
                { label: "Your Name",      type: "text",  key: "name",    placeholder: "John Doe"             },
                { label: "Email Address",  type: "email", key: "email",   placeholder: "john@example.com"     },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs" style={{ color: "var(--ocean-10)", opacity: 0.7 }}>{label}</label>
                  <input
                    type={type}
                    className="beach-input w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      border: "1px solid rgba(0,119,182,0.2)",
                      color: "#fff",
                      background: "rgba(255,255,255,0.07)",
                      transition: "border-color 0.2s",
                    }}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "var(--ocean-10)", opacity: 0.7 }}>Message</label>
                <textarea
                  className="beach-input w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{
                    border: "1px solid rgba(0,119,182,0.2)",
                    color: "#fff",
                    background: "rgba(255,255,255,0.07)",
                    transition: "border-color 0.2s",
                  }}
                  rows={4}
                  placeholder="Tell us about your dream beach trip…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button
                id="contact-btn"
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-medium mt-1 transition-all duration-300"
                style={{
                  background: "var(--sand-500)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(201,169,110,0.35)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ocean-500)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sand-500)")}
              >
                Send Message 🌊
              </button>
            </form>
          )}
        </div>

        {/* Stats bar — 3 cols on sm+, stacked on xs */}
        <div
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center rounded-2xl py-5 px-3 sm:px-4"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { stat: "372K", label: "km of Coastline" },
            { stat: "1M+",  label: "Beach Types"     },
            { stat: "∞",    label: "Memories Made"   },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div style={{ color: "var(--sand-500)", fontWeight: 700, fontSize: "clamp(1rem,3.5vw,1.4rem)" }}>
                {stat}
              </div>
              <div className="text-xs mt-1 leading-tight" style={{ color: "var(--ocean-10)", opacity: 0.7 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
