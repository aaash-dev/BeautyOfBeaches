import { useEffect } from "react";
import $ from "jquery";

const activitiesData = [
  { id: 1, icon: "🏄", title: "Surfing",          bestTime: "Early Morning", description: "Ride the perfect wave. Whether you're a beginner or a pro, the ocean offers endless thrills and the purest form of freedom." },
  { id: 2, icon: "🤿", title: "Snorkeling",        bestTime: "Mid Morning",   description: "Dive into a world of vibrant coral reefs and exotic sea life. Discover hidden wonders beneath the sparkling surface." },
  { id: 3, icon: "🚣", title: "Kayaking",           bestTime: "Afternoon",    description: "Glide through calm coastal waters and sea caves. Explore hidden coves and breathtaking coastal scenery." },
  { id: 4, icon: "🏖️", title: "Beach Volleyball",  bestTime: "Late Afternoon",description: "Spike, serve and dive in the sand. Beach volleyball is the ultimate social sport with the ocean breeze as your backdrop." },
  { id: 5, icon: "🌅", title: "Sunset Walk",        bestTime: "Evening",      description: "Stroll along the water's edge as the sky turns gold and crimson. A sunset beach walk is pure magic for the soul." },
  { id: 6, icon: "🐚", title: "Shell Collecting",   bestTime: "Low Tide",     description: "Discover nature's tiny masterpieces washed ashore. Each shell tells the story of the sea — a beautiful treasure hunt." },
];

export function BeachActivities() {
  useEffect(() => {
    // jQuery: card hover lift — only on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
      $(".activity-card")
        .on("mouseenter", function () { $(this).stop(true).animate({ marginTop: "-6px" }, 180); })
        .on("mouseleave", function () { $(this).stop(true).animate({ marginTop: "0px"  }, 180); });
    }
  }, []);

  return (
    <section
      id="activities"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--sand-100)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>
            Things To Do
          </p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>
            Beach Activities
          </h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {activitiesData.map((act) => (
            <div
              key={act.id}
              className="activity-card rounded-2xl p-6 sm:p-8 cursor-default"
              style={{
                background: "#fff",
                border: "1px solid var(--ocean-10)",
                boxShadow: "0 2px 16px rgba(10,37,64,0.07)",
              }}
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full mb-4 text-xl sm:text-2xl"
                style={{ background: "var(--ocean-10)" }}
              >
                {act.icon}
              </div>
              <h3 className="mb-2" style={{ color: "var(--ocean-900)", fontWeight: 700 }}>
                {act.title}
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#6b7280" }}>
                {act.description}
              </p>
              <span
                className="inline-block text-xs px-3 py-1 rounded-full"
                style={{ background: "var(--ocean-10)", color: "var(--ocean-500)", fontWeight: 600 }}
              >
                ⏰ {act.bestTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
