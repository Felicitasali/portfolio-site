import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Consultorios Plaza",
    category: "Branding · Identidad Visual",
    span: 7,
    aspectRatio: "aspect-[4/3]",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Pilar Golf",
    category: "Branding · Diseño Editorial",
    span: 5,
    aspectRatio: "aspect-[4/3]",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=700&auto=format&fit=crop&q=80",
  },
  {
    title: "Labado Suar Estudio de arquitectura",
    category: "Identidad · Web Design",
    span: 5,
    aspectRatio: "aspect-[4/3]",
    image:
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?w=700&auto=format&fit=crop&q=80",
  },
  {
    title: "El Pilar Obras",
    category: "Branding · Motion",
    span: 7,
    aspectRatio: "aspect-[4/3]",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&auto=format&fit=crop&q=80",
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

export default function SelectedWorks() {
  return (
    <section
      id="works"
      className="py-12 md:py-16"
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
                Selected Work
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-body font-light mb-4"
              style={{ color: "hsl(var(--text))", lineHeight: 1.1 }}
            >
              Featured{" "}
              <em className="font-display italic not-italic" style={{ fontStyle: "italic" }}>
                projects
              </em>
            </h2>
            <p
              className="max-w-md text-sm md:text-base"
              style={{ color: "hsl(var(--muted))" }}
            >
              Una selección de proyectos de branding, animación, diseño visual y
              experiencias digitales.
            </p>
          </div>

          <GradientHoverLink className="hidden md:inline-flex mt-6 md:mt-0">
            View all work →
          </GradientHoverLink>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`md:col-span-${project.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${project.aspectRatio}`}
      style={{
        backgroundColor: "hsl(var(--surface))",
        border: "1px solid hsl(var(--stroke))",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: hovered ? "hsla(var(--bg), 0.7)" : "transparent",
          backdropFilter: hovered ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: hovered ? "blur(8px)" : "blur(0px)",
        }}
      />

      {/* Hover label */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="relative">
          {/* Gradient border */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient" />
          <div
            className="relative rounded-full px-5 py-2.5 flex items-center gap-2"
            style={{ backgroundColor: "white" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "#0a0a0a" }}
            >
              View —{" "}
              <em className="font-display" style={{ fontStyle: "italic" }}>
                {project.title}
              </em>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom info (always visible) */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <p
          className="text-xs mb-1"
          style={{ color: "hsl(var(--muted))" }}
        >
          {project.category}
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "hsl(var(--text))" }}
        >
          {project.title}
        </p>
      </div>
    </div>
  );
}

function GradientHoverLink({
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
        <span className="absolute inset-[-2px] rounded-full accent-gradient" style={{ zIndex: 0 }} />
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
