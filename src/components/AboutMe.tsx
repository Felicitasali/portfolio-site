import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Premiere Pro",
  "Figma",
  "Canva",
  "Cupcut",
  "Meta Business Suite",
  "Salesforce Marketing Cloud",
  "Brandwatch",
  "Veeva Vault",
];

const experience = [
  {
    role: "Diseñadora Digital & Content Creator Freelance",
    company: "dBlend",
    period: "2025 – Actualidad",
    description:
      "Diseño y desarrollo de digital content para múltiples cuentas de redes sociales. Creación de piezas visuales alineadas a brand guidelines y objetivos de marketing. Fotografía y video editing para cobertura de eventos y contenido promocional.",
  },
  {
    role: "Digital Marketing Assistant LATAM Training",
    company: "Zoetis Argentina",
    period: "2024 – 2025",
    description:
      "Soporte en estrategias de digital marketing para mercados LATAM en empresa farmacéutica multinacional. Gestión y control de materiales visuales asegurando consistencia con la brand identity. Implementación de campañas de email marketing mediante Salesforce Marketing Cloud.",
  },
  {
    role: "Diseñadora Digital y Community Manager",
    company: "Grupo Morada",
    period: "2023 – 2024",
    description:
      "Diseño de piezas digitales para redes sociales, campañas publicitarias y branding. Gestión de redes sociales, content planning y engagement con la comunidad. Video editing para contenido promocional y publicitario.",
  },
  {
    role: "Diseñadora Digital & Community Manager",
    company: "Fundación el Potrero · Voluntariado",
    period: "2021",
    description:
      "Gestión de redes sociales y community management. Diseño de materiales visuales para campañas y comunicación digital. Optimización de la presencia digital y fortalecimiento de la identidad institucional.",
  },
];

const education = [
  {
    degree: "Licenciatura en Arte y Diseño Digital",
    institution: "Universidad del Salvador — Campus Pilar",
    period: "2023 – 2025",
    description:
      "Diseño y desarrollo de videojuegos, diseño de interfaz web y de aplicación UX/UI, diseño 3D, animación y edición digital.",
  },
  {
    degree: "Licenciatura en Diseño",
    institution: "Universidad Austral — Sede Pilar",
    period: "2021 – 2022",
    description:
      "Diseño de producto e indumentaria. Diseño de marca/branding y estrategias digitales.",
  },
];

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function AboutMe() {
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [openEdu, setOpenEdu] = useState<number | null>(null);
  const [showExpEdu, setShowExpEdu] = useState(false);
  const [photoColor, setPhotoColor] = useState(false);

  return (
    <section
      id="about"
      style={{ backgroundColor: "hsl(var(--bg))" }}
      className="py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easing }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <div className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
          <span
            className="font-handsome text-[50px] tracking-[0.03em]"
            style={{ color: "hsl(var(--turquoise))" }}
          >
            Sobre Mí
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-28 items-start">

          {/* ── Left: portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: easing }}
            className="relative"
          >
            {/* Photo container — B&W by default, color on hover or tap */}
            <div
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ aspectRatio: "3/4", maxWidth: "420px", backgroundColor: "hsl(var(--surface))" }}
              onClick={() => setPhotoColor((v) => !v)}
            >
              {/* Color photo underneath */}
              <img
                src="/images/fotocolor.png"
                alt="Felicitas Ali"
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
              />
              {/* B&W photo on top — fades out on hover or when tapped */}
              <img
                src="/images/foto.png"
                alt="Felicitas Ali — Diseñadora Digital"
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                style={{ opacity: photoColor ? 0 : undefined }}
                draggable={false}
              />

              {/* Bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
                }}
              />

              {/* Caption */}
              <div className="absolute bottom-5 left-5 z-10">
                <p
                  className="font-handsome"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                    letterSpacing: "0.12em",
                    lineHeight: 1.3,
                  }}
                >
                  Felicitas Ali
                </p>
                <p
                  className="text-xs tracking-[0.15em] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Buenos Aires · 2026
                </p>
              </div>
            </div>

            {/* Decorative turquoise circles */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
              style={{ border: "1px solid hsl(var(--turquoise) / 0.2)" }}
            />
            <div
              className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full pointer-events-none"
              style={{ border: "1px solid hsl(var(--turquoise) / 0.12)" }}
            />

            {/* CV download — below photo */}
            <div className="mt-8">
              <a
                href="/cv-felicitas-ali.pdf"
                download="CV - Felicitas Ali.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
                style={{
                  backgroundColor: "hsl(var(--turquoise))",
                  color: "#0a0a0a",
                  textDecoration: "none",
                  border: "none",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19,12 12,19 5,12" />
                </svg>
                Descargar CV
              </a>
            </div>
          </motion.div>

          {/* ── Right: content ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: easing }}
            className="flex flex-col gap-10"
          >
            {/* Headline */}
            <div>
              <h2
                className="font-light leading-tight tracking-tight mb-5"
                style={{
                  fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                  color: "hsl(var(--text))",
                }}
              >
                Hola, soy{" "}
                <span
                  className="font-handsome"
                  style={{ color: "hsl(var(--turquoise))" }}
                >
                  Felicitas Ali
                </span>
              </h2>
              <p
                className="text-base md:text-lg font-light leading-relaxed"
                style={{ color: "hsl(var(--muted))", maxWidth: "520px" }}
              >
                Diseñadora Digital con experiencia en marketing, branding y gestión de
                contenidos. Me especializo en crear contenido digital alineado a la
                identidad de marca, optimizando la presencia digital de las marcas y
                acompañando objetivos de negocio.
              </p>

              {/* Languages */}
              <div className="flex flex-wrap gap-4 mt-5">
                {[
                  ["Español", "Nativo"],
                  ["Inglés", "Avanzado"],
                  ["Francés", "Básico"],
                ].map(([lang, level]) => (
                  <div key={lang} className="flex items-center gap-1.5">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "hsl(var(--text))" }}
                    >
                      {lang}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "hsl(var(--muted))" }}
                    >
                      · {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p
                className="font-handsome text-[22px] tracking-[0.03em] mb-4"
                style={{ color: "hsl(var(--muted))" }}
              >
                Herramientas
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <ToolBadge key={tool} label={tool} />
                ))}
              </div>
            </div>

            {/* Exp + Edu — single expand toggle */}
            <div>
              <button
                onClick={() => setShowExpEdu((v) => !v)}
                className="group/exp flex items-center gap-3 transition-opacity duration-300 hover:opacity-70"
                style={{ border: "none", background: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
              >
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "hsl(var(--turquoise))",
                    color: "#0a0a0a",
                    fontSize: "1.25rem",
                    transform: showExpEdu ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.35s ease",
                  }}
                >
                  ↓
                </span>
                <span
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "hsl(var(--text))" }}
                >
                  {showExpEdu ? "Ocultar" : "Ver experiencia laboral y estudios"}
                </span>
              </button>

              <AnimatePresence>
                {showExpEdu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: easing }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 flex flex-col gap-8">
                      {/* Experiencia */}
                      <div>
                        <p
                          className="font-handsome text-[22px] tracking-[0.03em] mb-3"
                          style={{ color: "hsl(var(--muted))" }}
                        >
                          Experiencia
                        </p>
                        {experience.map((item, i) => (
                          <AccordionItem
                            key={i}
                            title={item.role}
                            subtitle={item.company}
                            meta={item.period}
                            body={item.description}
                            isOpen={openExp === i}
                            onToggle={() => setOpenExp(openExp === i ? null : i)}
                          />
                        ))}
                        <div style={{ borderTop: "1px solid hsl(var(--stroke))" }} />
                      </div>

                      {/* Educación */}
                      <div>
                        <p
                          className="font-handsome text-[22px] tracking-[0.03em] mb-3"
                          style={{ color: "hsl(var(--muted))" }}
                        >
                          Educación
                        </p>
                        {education.map((item, i) => (
                          <AccordionItem
                            key={i}
                            title={item.degree}
                            subtitle={item.institution}
                            meta={item.period}
                            body={item.description}
                            isOpen={openEdu === i}
                            onToggle={() => setOpenEdu(openEdu === i ? null : i)}
                          />
                        ))}
                        <div style={{ borderTop: "1px solid hsl(var(--stroke))" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function ToolBadge({ label }: { label: string }) {
  return (
    <span
      className="text-xs px-3 py-1.5 rounded-full cursor-default select-none transition-all duration-200"
      style={{
        backgroundColor: "hsl(var(--surface))",
        color: "hsl(var(--muted))",
        border: "1px solid hsl(var(--stroke))",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "hsl(var(--turquoise) / 0.5)";
        el.style.color = "hsl(var(--turquoise))";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "hsl(var(--stroke))";
        el.style.color = "hsl(var(--muted))";
      }}
    >
      {label}
    </span>
  );
}

function AccordionItem({
  title,
  subtitle,
  meta,
  body,
  isOpen,
  onToggle,
}: {
  title: string;
  subtitle: string;
  meta: string;
  body?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderTop: "1px solid hsl(var(--stroke))" }}>
      <button
        className="w-full flex items-center justify-between py-4 text-left transition-opacity duration-200 hover:opacity-70"
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0 pr-4">
          <p
            className="text-sm font-medium leading-snug"
            style={{ color: "hsl(var(--text))" }}
          >
            {title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted))" }}>
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className="text-xs tracking-wide hidden sm:block"
            style={{ color: "hsl(var(--muted))" }}
          >
            {meta}
          </span>
          <span
            className="text-base leading-none transition-all duration-300"
            style={{
              color: isOpen ? "hsl(var(--turquoise))" : "hsl(var(--muted))",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              display: "inline-block",
            }}
          >
            +
          </span>
        </div>
      </button>

      {body && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easing }}
              className="overflow-hidden"
            >
              <p
                className="text-sm font-light leading-relaxed pb-5"
                style={{ color: "hsl(var(--muted))" }}
              >
                {body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
