import { useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";

/**
 * HOW TO ADD YOUR REAL LOGOS:
 * 1. Save each logo file to:  public/images/logos/<filename>.png  (or .svg / .webp)
 * 2. Update the `img` field below to match the filename you used.
 * 3. Logos can be ANY color — they are automatically converted to white via CSS filter.
 * 4. Ideal format: PNG or SVG with transparent background, at least 200px wide.
 *
 * If a logo file is missing, the client name is shown as text fallback.
 */
// Logos numbered 2–10 copied from your CV folder.
// The filter below converts any logo color to white automatically.
const clients = [
  { id: "1",  name: "Consultorios Plaza", img: "/images/logos/2.png"  },
  { id: "2",  name: "Pilar Golf",          img: "/images/logos/3.png"  },
  { id: "3",  name: "El Pilar Obras",      img: "/images/logos/4.png"  },
  { id: "4",  name: "Labado Suar",         img: "/images/logos/5.png"  },
  { id: "5",  name: "Grupo Morada",        img: "/images/logos/6.png"  },
  { id: "6",  name: "Ali Propiedades",     img: "/images/logos/7.png"  },
  { id: "7",  name: "Veterinaria Verdu",   img: "/images/logos/8.png"  },
  { id: "8",  name: "",                    img: "/images/logos/9.png"  },
  { id: "9",  name: "",                    img: "/images/logos/10.png" },
];

type Client = (typeof clients)[0];

function LogoItem({ client }: { client: Client }) {
  return (
    <div
      className="flex items-center justify-center select-none"
      style={{ height: 80, minWidth: 80, padding: "0 20px" }}
    >
      <ImgWithFallback client={client} />
    </div>
  );
}

function ImgWithFallback({ client }: { client: Client }) {
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains("light")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains("light"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Dark mode → white logos; light mode → black logos
  const filter = isLight ? "brightness(0)" : "brightness(0) invert(1)";

  return (
    <img
      src={client.img}
      alt={client.name}
      draggable={false}
      style={{
        height: 64,
        width: "auto",
        maxWidth: 220,
        objectFit: "contain",
        filter,
        opacity: 0.5,
        transition: "opacity 0.3s ease, filter 0.4s ease",
      }}
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
        const fallback = target.nextElementSibling as HTMLElement | null;
        if (fallback) fallback.style.display = "block";
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.8"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.5"; }}
    />
  );
}

export default function ClientLogos() {
  const plugin = useRef(
    AutoScroll({ playOnInit: true, speed: 0.9, stopOnInteraction: false })
  );

  // Triple for a seamless infinite loop at different viewport widths
  const items = [...clients, ...clients, ...clients];

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--stroke)) 30%, hsl(var(--stroke)) 70%, transparent 100%)",
        }}
      />
      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--stroke)) 30%, hsl(var(--stroke)) 70%, transparent 100%)",
        }}
      />

      {/* Eyebrow */}
      <motion.div
        className="text-center mb-10 md:mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        }}
      >
        <span
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: "hsl(var(--muted))" }}
        >
          Marcas con las que trabajé
        </span>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--bg)), transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--bg)), transparent)" }}
        />

        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="ml-0 items-center">
            {items.map((client, i) => (
              <CarouselItem key={`${client.id}-${i}`} className="pl-0 basis-auto flex-shrink-0">
                <div className="relative flex items-center gap-0">
                  <LogoItem client={client} />

                  {/* Text fallback — hidden by default, shown by onError above */}
                  <span
                    style={{
                      display: "none",
                      fontSize: "13px",
                      letterSpacing: "0.06em",
                      color: "hsl(var(--muted))",
                      whiteSpace: "nowrap",
                      padding: "0 20px",
                    }}
                  >
                    {client.name}
                  </span>

                  {/* Separator dot */}
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "hsl(var(--turquoise) / 0.3)",
                      flexShrink: 0,
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
