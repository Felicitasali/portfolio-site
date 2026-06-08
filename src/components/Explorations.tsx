import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    rotation: -3,
    label: "Tipografía Experimental",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&auto=format&fit=crop&q=80",
    rotation: 2,
    label: "Exploración de Color",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
    rotation: -1,
    label: "Composición Abstracta",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    rotation: 3,
    label: "Texturas y Materiales",
  },
  {
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    rotation: -2,
    label: "Motion Design",
  },
  {
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    rotation: 1,
    label: "Collage Digital",
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const col1Items = galleryItems.slice(0, 3);
  const col2Items = galleryItems.slice(3, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      if (contentRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }

      // Parallax for column 1 (moves up)
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Parallax for column 2 (moves down)
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{
          minHeight: "300vh",
          backgroundColor: "hsl(var(--bg))",
        }}
      >
        {/* Pinned center content (z-10) */}
        <div
          ref={contentRef}
          className="relative z-10 flex items-center justify-center"
          style={{ height: "100vh" }}
        >
          <div className="text-center px-6 pointer-events-none">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "hsl(var(--stroke))" }}
              />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "hsl(var(--muted))" }}
              >
                Explorations
              </span>
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "hsl(var(--stroke))" }}
              />
            </div>
            <h2
              className="text-4xl md:text-6xl font-body font-light mb-4"
              style={{ color: "hsl(var(--text))", lineHeight: 1.1 }}
            >
              Visual{" "}
              <em className="font-display" style={{ fontStyle: "italic" }}>
                experiments
              </em>
            </h2>
            <p
              className="max-w-sm mx-auto text-sm mb-8"
              style={{ color: "hsl(var(--muted))" }}
            >
              Experimentos visuales y exploraciones creativas fuera del cliente.
            </p>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-200 pointer-events-auto"
              style={{
                border: "1px solid hsl(var(--stroke))",
                color: "hsl(var(--text))",
                backgroundColor: "hsl(var(--surface))",
                textDecoration: "none",
              }}
            >
              Ver en Behance ↗
            </a>
          </div>
        </div>

        {/* Parallax columns (z-20, absolute) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ paddingTop: "10vh" }}
        >
          <div className="w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40">
            {/* Column 1 */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-8 items-end"
            >
              {col1Items.map((item, i) => (
                <GalleryCard
                  key={i}
                  item={item}
                  onClick={() => setLightbox(item.image)}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-8 items-start mt-32"
            >
              {col2Items.map((item, i) => (
                <GalleryCard
                  key={i}
                  item={item}
                  onClick={() => setLightbox(item.image)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Exploration"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <button
              className="absolute top-6 right-6 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryCard({
  item,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative aspect-square max-w-[280px] w-full rounded-2xl overflow-hidden cursor-pointer pointer-events-auto transition-all duration-500"
      style={{
        transform: `rotate(${item.rotation}deg) ${hovered ? "scale(1.04)" : "scale(1)"}`,
        border: "1px solid hsl(var(--stroke))",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 flex items-end p-4 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span
          className="text-xs font-medium"
          style={{ color: "white" }}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
}
