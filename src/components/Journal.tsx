import { useState } from "react";
import { motion } from "framer-motion";

const entries = [
  {
    title: "El proceso creativo detrás de una identidad visual",
    topic: "Proceso creativo",
    readTime: "5 min",
    date: "Mar 2026",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=80",
  },
  {
    title: "¿Cómo construir una marca que perdure?",
    topic: "Branding",
    readTime: "8 min",
    date: "Feb 2026",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200&auto=format&fit=crop&q=80",
  },
  {
    title: "Producción de video: del concepto a la pantalla",
    topic: "Producción y edición de video",
    readTime: "6 min",
    date: "Ene 2026",
    image:
      "https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=200&auto=format&fit=crop&q=80",
  },
  {
    title: "Principios de UX que todo diseñador debe conocer",
    topic: "Diseño Web UX UI",
    readTime: "7 min",
    date: "Dic 2025",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&auto=format&fit=crop&q=80",
  },
];

const viewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Journal() {
  return (
    <section
      id="journal"
      className="py-16 md:py-24"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={viewVariants}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "hsl(var(--stroke))" }}
              />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "hsl(var(--muted))" }}
              >
                Journal
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-body font-light mb-4"
              style={{ color: "hsl(var(--text))", lineHeight: 1.1 }}
            >
              Recent{" "}
              <em className="font-display" style={{ fontStyle: "italic" }}>
                thoughts
              </em>
            </h2>
            <p
              className="max-w-md text-sm md:text-base"
              style={{ color: "hsl(var(--muted))" }}
            >
              Reflexiones sobre diseño, proceso creativo y el mundo visual.
            </p>
          </div>

          <ViewAllButton className="hidden md:inline-flex mt-6 md:mt-0">
            View all →
          </ViewAllButton>
        </motion.div>

        {/* Journal entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <JournalEntry entry={entry} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalEntry({ entry }: { entry: (typeof entries)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: hovered
          ? "hsl(var(--surface))"
          : "hsl(var(--surface) / 0.3)",
        border: "1px solid hsl(var(--stroke))",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: "1px solid hsl(var(--stroke))" }}
      >
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs mb-1 uppercase tracking-wide"
          style={{ color: "hsl(var(--muted))" }}
        >
          {entry.topic}
        </p>
        <p
          className="text-sm sm:text-base font-medium truncate"
          style={{ color: "hsl(var(--text))" }}
        >
          {entry.title}
        </p>
      </div>

      {/* Meta */}
      <div
        className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0"
        style={{ color: "hsl(var(--muted))" }}
      >
        <span className="text-xs">{entry.readTime} read</span>
        <span className="text-xs">{entry.date}</span>
      </div>

      {/* Arrow */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: hovered
            ? "hsl(var(--text))"
            : "hsl(var(--stroke))",
          color: hovered ? "hsl(var(--bg))" : "hsl(var(--muted))",
        }}
      >
        <span style={{ fontSize: "12px" }}>→</span>
      </div>
    </div>
  );
}

function ViewAllButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`relative rounded-full text-sm px-6 py-3 transition-all duration-200 ${className}`}
      style={{
        border: "none",
        fontFamily: "inherit",
        cursor: "pointer",
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          className="absolute inset-[-2px] rounded-full accent-gradient"
          style={{ zIndex: 0 }}
        />
      )}
      <span
        className="relative z-10 rounded-full px-4 py-2"
        style={{
          backgroundColor: "hsl(var(--surface))",
          color: "hsl(var(--text))",
          border: !hovered ? "1px solid hsl(var(--stroke))" : "none",
          display: "inline-block",
        }}
      >
        {children}
      </span>
    </button>
  );
}
