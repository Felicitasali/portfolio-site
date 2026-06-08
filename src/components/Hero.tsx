import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Waves } from "./ui/wave-background";

const words = [
  "Marca",
  "Página Web",
  "Producto",
  "Identidad",
  "Contenido",
  "Proyecto",
  "Campaña",
];

const WORD_DURATION = 2600;
const easing: [number, number, number, number] = [0.32, 0.1, 0.25, 1];

// Pool of 24 portfolio images that rotate randomly through the 4 floating slots
const IMAGE_POOL = [
  "/images/hero-float/h-01.jpg",
  "/images/hero-float/h-02.jpg",
  "/images/hero-float/h-03.jpg",
  "/images/hero-float/h-04.jpg",
  "/images/hero-float/h-05.jpg",
  "/images/hero-float/h-06.jpg",
  "/images/hero-float/h-07.jpg",
  "/images/hero-float/h-08.png",
  "/images/hero-float/h-09.png",
  "/images/hero-float/h-10.png",
  "/images/hero-float/h-11.png",
  "/images/hero-float/h-12.png",
  "/images/hero-float/h-13.jpg",
  "/images/hero-float/h-14.png",
  "/images/hero-float/h-15.png",
  "/images/hero-float/h-16.jpg",
  "/images/hero-float/h-17.jpg",
  "/images/hero-float/h-18.png",
  "/images/hero-float/h-19.png",
  "/images/hero-float/h-20.png",
  "/images/hero-float/h-21.png",
  "/images/hero-float/h-22.png",
  "/images/hero-float/h-23.png",
  "/images/hero-float/h-24.png",
];

function randomPick(pool: string[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// 4 fixed slots — positions and directions, images rotate randomly
const SLOTS = [
  { style: { top: "14%",  left: "2.5%",  width: 148, height: 198 }, rotate: -6, direction: "up"   as const, initialDelay: 0   },
  { style: { top: "10%",  right: "2.5%", width: 190, height: 134 }, rotate:  5, direction: "down" as const, initialDelay: 1.9 },
  { style: { top: "56%",  left: "1.5%",  width: 142, height: 190 }, rotate:  4, direction: "up"   as const, initialDelay: 3.5 },
  { style: { top: "58%",  right: "1.5%", width: 184, height: 128 }, rotate: -4, direction: "down" as const, initialDelay: 5.1 },
];

/* ── FloatingSlot — each slot independently cycles through random pool images ── */
function FloatingSlot({
  pool,
  slotStyle,
  rotate,
  direction,
  initialDelay,
}: {
  pool: string[];
  slotStyle: React.CSSProperties;
  rotate: number;
  direction: "up" | "down";
  initialDelay: number;
}) {
  const [src, setSrc]         = useState(() => randomPick(pool));
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const isUp     = direction === "up";
  // Start below (up slots) or above (down slots), settle, drift off
  const yFrames  = isUp ? [40, 0, -35, -72] : [-40, 0, 35, 72];
  const opFrames = [0, 0.62, 0.55, 0];

  // Called when one full animation cycle ends
  const handleComplete = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setSrc(randomPick(pool));        // pick a different image
      setAnimKey((k) => k + 1);       // key change remounts → restarts animation
    }, 2500);
  }, [pool]);

  return (
    <motion.div
      key={animKey}
      className="absolute z-[5] hidden lg:block pointer-events-none"
      style={{
        ...slotStyle,
        borderRadius: 12,
        overflow: "hidden",
        rotate,
        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
      }}
      animate={{ y: yFrames, opacity: opFrames }}
      transition={{
        duration: 6.5,
        times: [0, 0.18, 0.72, 1],
        delay: animKey === 0 ? initialDelay : 0, // initial stagger only on first cycle
        ease: "easeInOut",
      }}
      onAnimationComplete={handleComplete}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </motion.div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), WORD_DURATION);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains("light"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: "100svh", minHeight: "620px", backgroundColor: "hsl(var(--bg))" }}
    >
      {/* ── Wave background ── */}
      <div className="absolute inset-0">
        <Waves
          strokeColor={isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.09)"}
          backgroundColor={isLight ? "#f7f7f7" : "#0a0a0a"}
          lineSpacing={10}
          pointerSize={0.4}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(var(--bg)), transparent)" }}
        />
      </div>

      {/* ── Floating images — 4 slots, each cycles randomly through 24 images ── */}
      {SLOTS.map((slot, i) => (
        <FloatingSlot
          key={i}
          pool={IMAGE_POOL}
          slotStyle={slot.style}
          rotate={slot.rotate}
          direction={slot.direction}
          initialDelay={slot.initialDelay}
        />
      ))}

      {/* ── Top-left label block ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        className="absolute top-0 left-0 z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
      >
        <p className="text-xs tracking-[0.28em] uppercase font-light" style={{ color: "hsl(var(--muted))" }}>
          Portfolio 2026
        </p>
        <p
          className="font-handsome mt-0.5"
          style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.3rem)", color: "hsl(var(--muted) / 0.55)", letterSpacing: "0.04em" }}
        >
          Felicitas Ali
        </p>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-center px-4 md:px-12 lg:px-20">

        {/* "Diseñemos tu  PALABRA" — gap increased, word centered in its slot */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: easing }}
          className="flex items-baseline justify-center gap-[0.28em] flex-wrap"
        >
          {/* Static text */}
          <span
            className="font-light leading-none tracking-tight whitespace-nowrap"
            style={{ fontSize: "clamp(1.6rem, 4vw, 5rem)", color: "hsl(var(--text) / 0.75)" }}
          >
            Diseñemos tu
          </span>

          {/* Rotating word — container sized to longest word, word centered inside */}
          <div style={{ position: "relative" }}>
            {/* Invisible sizer: always "Página Web" width so no layout jumps */}
            <span
              aria-hidden
              className="font-handsome leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(2.6rem, 7.5vw, 9rem)", visibility: "hidden", display: "block", lineHeight: 0.95 }}
            >
              Página Web
            </span>

            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: easing }}
                className="font-handsome leading-none whitespace-nowrap absolute top-0 left-0"
                style={{ fontSize: "clamp(2.6rem, 7.5vw, 9rem)", color: "hsl(var(--turquoise))", lineHeight: 0.95 }}
              >
                {words[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Description — two lines */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: easing }}
          className="mt-10 md:mt-12 text-base md:text-lg font-light leading-relaxed"
          style={{ color: "hsl(var(--muted))", maxWidth: "540px" }}
        >
          Transformo ideas en soluciones visuales y digitales
          <br />
          que ayudan a las marcas a crecer.
        </motion.p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-10"
      >
        <span className="text-xs tracking-[0.35em] uppercase font-light" style={{ color: "hsl(var(--muted) / 0.6)" }}>
          scroll
        </span>
        <div className="w-px h-8 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--stroke))" }}>
          <div className="absolute inset-x-0 h-full accent-gradient animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  );
}
