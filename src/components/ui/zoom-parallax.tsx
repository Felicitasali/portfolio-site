import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScaleKey = "scale4" | "scale5" | "scale6" | "scale7" | "scale8" | "scale9";

type PictureFlex = { src: string; scale: ScaleKey; layout: "flex"; width: string };
type PictureAbs  = {
  src: string; scale: ScaleKey; layout: "abs";
  width: string; height: string; top: string; left: string;
};
type PictureEntry = PictureFlex | PictureAbs;

/**
 * Surrounding images: top/left are viewport-% coordinates of the image CENTER
 * (transform: translate(-50%,-50%) is applied so those coords = image midpoint).
 * Kept within ~20–80% range so they cluster around the center image.
 */
const pictures: PictureEntry[] = [
  // CENTER — natural rectangle, slowest zoom (auto-width from img)
  {
    src: "/images/zoom/zoom-center.jpg",
    scale: "scale4",
    layout: "flex",
    width: "34vw",      // height is auto → preserves original landscape ratio
  },

  // Top-left
  {
    src: "/images/zoom/zoom-01.png",
    scale: "scale5",
    layout: "abs",
    width: "22vw",
    height: "26vh",
    top: "22%",
    left: "24%",
  },
  // Top-right
  {
    src: "/images/zoom/zoom-02.jpg",
    scale: "scale6",
    layout: "abs",
    width: "20vw",
    height: "28vh",
    top: "20%",
    left: "76%",
  },
  // Left
  {
    src: "/images/zoom/zoom-03.png",
    scale: "scale5",
    layout: "abs",
    width: "14vw",
    height: "34vh",
    top: "50%",
    left: "14%",
  },
  // Right
  {
    src: "/images/zoom/zoom-04.png",
    scale: "scale6",
    layout: "abs",
    width: "16vw",
    height: "22vh",
    top: "48%",
    left: "82%",
  },
  // Bottom-left
  {
    src: "/images/zoom/zoom-05.png",
    scale: "scale7",
    layout: "abs",
    width: "18vw",
    height: "22vh",
    top: "76%",
    left: "24%",
  },
  // Bottom-right
  {
    src: "/images/zoom/zoom-06.png",
    scale: "scale7",
    layout: "abs",
    width: "18vw",
    height: "22vh",
    top: "76%",
    left: "74%",
  },
  // Left-edge small
  {
    src: "/images/zoom/zoom-07.png",
    scale: "scale8",
    layout: "abs",
    width: "11vw",
    height: "13vh",
    top: "32%",
    left: "19%",
  },
  // Right-edge small
  {
    src: "/images/zoom/zoom-08.jpg",
    scale: "scale8",
    layout: "abs",
    width: "11vw",
    height: "13vh",
    top: "32%",
    left: "80%",
  },
  // Bottom-center small
  {
    src: "/images/zoom/zoom-09.png",
    scale: "scale9",
    layout: "abs",
    width: "10vw",
    height: "12vh",
    top: "80%",
    left: "50%",
  },
];

export default function ZoomParallax() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scaleMap: Record<ScaleKey, typeof scale4> = {
    scale4, scale5, scale6, scale7, scale8, scale9,
  };

  // All images flat for the mobile grid (center first, then surrounding)
  const allSrcs = pictures.map((p) => p.src);

  return (
    <>
      {/* ── DESKTOP: scroll zoom parallax ── */}
      <div ref={container} className="hidden md:block" style={{ height: "200vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pictures.map((pic, i) => (
            <motion.div
              key={i}
              style={{
                scale: pic.layout === "flex" ? scaleCenter : scaleMap[pic.scale],
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pic.layout === "flex" ? (
                <div style={{ position: "relative", width: pic.width, flexShrink: 0 }}>
                  <img
                    src={pic.src}
                    alt=""
                    draggable={false}
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: 14 }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: pic.top,
                    left: pic.left,
                    width: pic.width,
                    height: pic.height,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={pic.src}
                    alt=""
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10, display: "block" }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: responsive image grid ── */}
      <div className="block md:hidden px-4 py-10" style={{ backgroundColor: "hsl(var(--bg))" }}>
        {/* Center image full width */}
        <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <img
            src={allSrcs[0]}
            alt=""
            draggable={false}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        {/* Surrounding images in a 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {allSrcs.slice(1).map((src, i) => (
            <div
              key={i}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                aspectRatio: "4/5",
              }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
