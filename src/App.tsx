import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientLogos from "./components/ClientLogos";
import AboutMe from "./components/AboutMe";
import ZoomParallax from "./components/ui/zoom-parallax";
import ServicesSection from "./components/ServicesSection";
import RadialWorksSection from "./components/RadialWorksSection";
import MotionVideo from "./components/MotionVideo";
import ContactFooter from "./components/ContactFooter";

// ── Canvas cursor trail ──
// Single smooth bezier path → no dots. Linear gradient tail→tip → no ghost.
// Two-layer (glow + core). Fades out when mouse is idle.
function useCursorTrail() {
  useEffect(() => {
    const canvas = document.getElementById("cursor-trail-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type Pt = { x: number; y: number };
    const pts: Pt[] = [];
    const MAX = 22; // shorter trail = follows cursor more closely
    let fade = 0;
    let lastMoveTime = 0;

    const onMove = (e: MouseEvent) => {
      lastMoveTime = performance.now();
      if (fade < 1) fade = 1;
      const last = pts[pts.length - 1];
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 3) return;
      pts.push({ x: e.clientX, y: e.clientY });
      if (pts.length > MAX) pts.shift();
    };

    // Build one continuous smooth bezier path through all points
    const buildPath = (): boolean => {
      if (pts.length < 2) return false;
      ctx.beginPath();
      ctx.moveTo(
        (pts[0].x + pts[1].x) / 2,
        (pts[0].y + pts[1].y) / 2,
      );
      for (let i = 1; i < pts.length - 1; i++) {
        ctx.quadraticCurveTo(
          pts[i].x, pts[i].y,
          (pts[i].x + pts[i + 1].x) / 2,
          (pts[i].y + pts[i + 1].y) / 2,
        );
      }
      // Extend all the way to the current cursor — eliminates lag/ghost
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      return true;
    };

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out after 45 ms of inactivity — faster response, less visual lag
      if (performance.now() - lastMoveTime > 45 && fade > 0) {
        fade = Math.max(0, fade - 0.08);
        if (fade === 0) pts.length = 0;
      }

      if (pts.length > 1 && fade > 0) {
        const tail = {
          x: (pts[0].x + pts[1].x) / 2,
          y: (pts[0].y + pts[1].y) / 2,
        };
        const tip = pts[pts.length - 1];

        // Layer 1 — wide soft glow
        if (buildPath()) {
          const g1 = ctx.createLinearGradient(tail.x, tail.y, tip.x, tip.y);
          g1.addColorStop(0, `rgba(48,176,184,0)`);
          g1.addColorStop(1, `rgba(48,176,184,${0.18 * fade})`);
          ctx.strokeStyle = g1;
          ctx.lineWidth = 10;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Layer 2 — narrow sharp core
        if (buildPath()) {
          const g2 = ctx.createLinearGradient(tail.x, tail.y, tip.x, tip.y);
          g2.addColorStop(0, `rgba(48,176,184,0)`);
          g2.addColorStop(0.2, `rgba(48,176,184,${0.25 * fade})`);
          g2.addColorStop(1, `rgba(48,176,184,${0.82 * fade})`);
          ctx.strokeStyle = g2;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useCursorTrail();

  return (
    <div
      style={{
        backgroundColor: "hsl(var(--bg))",
        color: "hsl(var(--text))",
        minHeight: "100vh",
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      {/* Canvas cursor trail — always mounted */}
      <canvas
        id="cursor-trail-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <ClientLogos />
            <AboutMe />
            <ZoomParallax />
            <ServicesSection />
            <MotionVideo />
            <RadialWorksSection />
          </main>
          <ContactFooter />

          {/* WhatsApp floating button */}
          <a
            href="https://wa.me/5491131558217?text=Hola%2C%20quisiera%20diseñar%20un%2Fa..."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribime por WhatsApp"
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: "#25D366",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "scale(1.1)";
              el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "scale(1)";
              el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}
