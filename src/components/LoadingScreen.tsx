import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const DURATION = 2700;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      if (startTimeRef.current === null) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      const currentCount = Math.floor(eased * 100);
      setCount(currentCount);

      if (progress >= 1 && !doneRef.current) {
        doneRef.current = true;
        setCount(100);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => onComplete(), 400);
      }
    }, 16);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      startTimeRef.current = null;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "hsl(var(--bg))" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Centered counter */}
      <span
        className="font-display tabular-nums"
        style={{
          fontSize: "clamp(5rem, 18vw, 14rem)",
          color: "hsl(var(--turquoise))",
          lineHeight: 1,
        }}
      >
        {String(count).padStart(3, "0")}
      </span>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: "hsl(var(--stroke) / 0.5)" }}
      >
        <motion.div
          className="h-full accent-gradient origin-left"
          style={{
            scaleX: count / 100,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}
