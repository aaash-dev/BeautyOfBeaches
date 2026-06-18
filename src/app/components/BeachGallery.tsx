import { useEffect, useState } from "react";
import $ from "jquery";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Seashore during golden hour",               label: "Golden Hour"   },
  { id: 2, src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Aerial photo of seashore",                label: "Aerial View"   },
  { id: 3, src: "https://images.unsplash.com/photo-1513553404607-988bf2703777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Waves meeting sand",                      label: "Wave Dance"    },
  { id: 4, src: "https://images.unsplash.com/photo-1610045058619-8c37e8913c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Palm tree at sunset",                    label: "Palm Sunset"   },
  { id: 5, src: "https://images.unsplash.com/photo-1491378630646-3440efa57c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Seashore under blue sky",                label: "Blue Horizon"  },
  { id: 6, src: "https://images.unsplash.com/photo-1581609836630-9007630f7a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", alt: "Palm tree on beach shore at sunset",     label: "Tropical Dusk" },
];

export function BeachGallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) {
      $(".gallery-img-wrap")
        .on("mouseenter", function () { $(this).find(".gallery-overlay").stop(true).fadeIn(220); })
        .on("mouseleave", function () { $(this).find(".gallery-overlay").stop(true).fadeOut(200); });
    }
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="fade-section py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "var(--ocean-10)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: "var(--ocean-500)", letterSpacing: "0.2em" }}>
            Captured Moments
          </p>
          <h2 style={{ color: "var(--ocean-900)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700 }}>
            Beach Gallery
          </h2>
          <div className="mx-auto mt-3" style={{ width: 52, height: 3, background: "var(--sand-500)", borderRadius: 2 }} />
        </div>

        {/* Responsive grid: 1 col on xs, 2 on sm+, 3 on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="gallery-img-wrap relative overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: "4/3", boxShadow: "0 2px 16px rgba(10,37,64,0.12)" }}
              onClick={() => setLightbox({ src: img.src, alt: img.alt })}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              {/* Overlay: always visible on touch, hover-only on desktop (jQuery) */}
              <div
                className="gallery-overlay absolute inset-0 flex items-end p-3 sm:p-4 md:hidden"
                style={{ background: "linear-gradient(to top, rgba(10,37,64,0.65) 0%, transparent 60%)" }}
              >
                <span className="text-xs sm:text-sm font-medium" style={{ color: "#fff" }}>
                  {img.label}
                </span>
              </div>
              {/* Desktop hover overlay — starts hidden, jQuery fades it */}
              <div
                className="gallery-overlay absolute inset-0 items-end p-4 hidden md:flex"
                style={{ display: "none", background: "linear-gradient(to top, rgba(10,37,64,0.65) 0%, transparent 60%)" }}
              >
                <span className="text-sm font-medium" style={{ color: "#fff" }}>
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,37,64,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full rounded-xl sm:rounded-2xl"
              style={{ maxHeight: "82vh", objectFit: "contain" }}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm"
              style={{ background: "var(--sand-500)", color: "#fff" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
