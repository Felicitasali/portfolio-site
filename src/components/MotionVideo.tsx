import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const reels = [
  {
    id: 1,
    title: "Consultorios Plaza",
    category: "Motion · Reel",
    year: "2025",
    src: "/videos/consul-paneo.mp4",
  },
  {
    id: 2,
    title: "Consultorios Plaza",
    category: "Reel",
    year: "2025",
    src: "/videos/consul-13-3.mp4",
  },
  {
    id: 3,
    title: "Pilar Golf",
    category: "Motion · Reel",
    year: "2025",
    src: "/videos/golf-29-4.mp4",
  },
  {
    id: 4,
    title: "Pilar Golf",
    category: "Reel",
    year: "2025",
    src: "/videos/golf-11-2.mp4",
  },
  {
    id: 5,
    title: "Pilar Golf",
    category: "Reel",
    year: "2025",
    src: "/videos/golf-15-1.mp4",
  },
  {
    id: 6,
    title: "Veterinaria Verdu",
    category: "Caso Clínico",
    year: "2024",
    src: "/videos/verdu-orejitas.mp4",
  },
  {
    id: 7,
    title: "Pilar Golf",
    category: "Reel",
    year: "2025",
    src: "/videos/golf-27-1.mp4",
  },
  {
    id: 8,
    title: "Reel",
    category: "Reel",
    year: "2025",
    src: "/videos/23-5.mp4",
  },
  {
    id: 9,
    title: "Reel",
    category: "Reel",
    year: "2025",
    src: "/videos/27-5.mp4",
  },
  {
    id: 10,
    title: "Reel",
    category: "Reel",
    year: "2025",
    src: "/videos/19-5.mp4",
  },
];

const N = reels.length;
const CARD_W = 230;
const CARD_H = 409; // 9:16
const STEP = 256;

const easing: [number, number, number, number] = [0.32, 0.1, 0.25, 1];

export default function MotionVideo() {
  const [selected, setSelected] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<Map<number, HTMLVideoElement | null>>(new Map());
  // Once the user plays/pauses, halt the auto-scroll until they navigate manually
  const userInteracted = useRef(false);

  const setRef = useCallback(
    (id: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current.set(id, el);
    },
    []
  );

  const go = (i: number) => {
    const next = ((i % N) + N) % N;
    const cur = videoRefs.current.get(reels[selected].id);
    if (cur) { cur.pause(); cur.currentTime = 1; }
    userInteracted.current = false; // manual navigation resets interaction state
    setPlaying(false);
    setProgress(0);
    setSelected(next);
  };

  const toggleMute = () => {
    const vid = videoRefs.current.get(reels[selected].id);
    const next = !muted;
    setMuted(next);
    if (vid) vid.muted = next;
  };

  // Auto-scroll hacia la izquierda cada 3.5 s — se pausa si el usuario interactuó
  useEffect(() => {
    const id = setInterval(() => {
      if (userInteracted.current) return; // user played/paused → don't auto-advance
      setSelected((prev) => {
        const next = (prev + 1) % N;
        const cur = videoRefs.current.get(reels[prev].id);
        if (cur) { cur.pause(); cur.currentTime = 1; }
        setPlaying(false);
        setProgress(0);
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="motion"
      style={{ backgroundColor: "hsl(var(--bg))" }}
      className="py-24 md:py-36 overflow-hidden"
    >
      {/* Header — centrado igual que Proyectos */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-0 pb-0 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easing }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
          <span
            className="font-handsome text-[50px] tracking-[0.03em]"
            style={{ color: "hsl(var(--turquoise))" }}
          >
            Edición de Video
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
        </motion.div>
      </div>

      {/* Carousel stage */}
      <div style={{ position: "relative", height: CARD_H + 80, overflow: "hidden" }}>
        {reels.map((reel, i) => {
          let d = ((i - selected) % N + N) % N;
          if (d > N / 2) d -= N;
          const absD = Math.abs(d);
          const isCenter = absD === 0;

          const scale   = isCenter ? 1 : absD === 1 ? 0.84 : absD === 2 ? 0.70 : 0.60;
          const opacity = isCenter ? 1 : absD === 1 ? 0.65 : absD === 2 ? 0.35 : 0;
          const zIndex  = 20 - absD * 4;

          return (
            <motion.div
              key={reel.id}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: CARD_W,
                height: CARD_H,
                marginTop: -(CARD_H / 2),
                marginLeft: -(CARD_W / 2),
                zIndex,
                cursor: "pointer",
                borderRadius: 18,
                overflow: "hidden",
                backgroundColor: "hsl(var(--surface))",
                border: isCenter
                  ? "1px solid hsl(var(--turquoise) / 0.35)"
                  : "1px solid hsl(var(--stroke))",
                boxShadow: isCenter
                  ? "0 24px 60px rgba(0,0,0,0.55)"
                  : "0 8px 24px rgba(0,0,0,0.3)",
              }}
              animate={{ x: d * STEP, scale, opacity }}
              transition={{ duration: 0.45, ease: easing }}
              onClick={() => {
                if (!isCenter) { go(i); return; }
                userInteracted.current = true; // user is controlling → stop auto-scroll
                const vid = videoRefs.current.get(reel.id);
                if (!vid) return;
                if (vid.paused) { vid.muted = muted; vid.play().catch(() => {}); }
                else { vid.pause(); }
              }}
            >
              {/* Video */}
              <video
                ref={setRef(reel.id)}
                src={reel.src}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => {
                  // Seek to 1s so a real frame shows as "poster"
                  e.currentTarget.currentTime = 1;
                }}
                onPlay={() => { if (isCenter) setPlaying(true); }}
                onPause={() => { if (isCenter) setPlaying(false); }}
                onEnded={() => { if (isCenter) setPlaying(false); }}
                onTimeUpdate={(e) => {
                  if (isCenter) {
                    const v = e.currentTarget;
                    if (v.duration) setProgress(v.currentTime / v.duration);
                  }
                }}
              />

              {/* Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Mute button — always visible on center card */}
              {isCenter && (
                <button
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                >
                  {muted ? (
                    /* Muted icon */
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    /* Unmuted icon */
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                      <path d="M19.07,4.93a10,10 0 0,1 0,14.14" />
                      <path d="M15.54,8.46a5,5 0 0,1 0,7.07" />
                    </svg>
                  )}
                </button>
              )}

              {/* Play hint — only when center AND paused */}
              {isCenter && !playing && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Progress bar — center card only */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    zIndex: 11,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress * 100}%`,
                      backgroundColor: "hsl(var(--turquoise))",
                      transition: "width 0.15s linear",
                    }}
                  />
                </div>
              )}

            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <NavButton onClick={() => go(selected - 1)}>←</NavButton>

        <div className="flex items-center gap-2">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === selected ? 22 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === selected ? "hsl(var(--turquoise))" : "hsl(var(--stroke))",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        <NavButton onClick={() => go(selected + 1)}>→</NavButton>
      </div>
    </section>
  );
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid hsl(var(--stroke))",
        backgroundColor: "transparent",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "hsl(var(--muted))",
        fontSize: "16px",
        fontFamily: "inherit",
        transition: "border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "hsl(var(--turquoise))";
        el.style.color = "hsl(var(--turquoise))";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "hsl(var(--stroke))";
        el.style.color = "hsl(var(--muted))";
      }}
    >
      {children}
    </button>
  );
}
