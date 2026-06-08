import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves } from "./ui/wave-background";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felicitas-ali/" },
];

const WA_LINK =
  "https://wa.me/5491131558217?text=Hola%2C%20quisiera%20diseñar%20un%2Fa...";

const phrases = [
  "¿Hablamos?",
  "¡Creemos Algo!",
  "¿Empezamos?",
  "Tu Idea, Mi Diseño",
];

const PHRASE_DURATION = 3200;
const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function ContactFooter() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, PHRASE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden pt-20 md:pt-28 pb-8 md:pb-12"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Wave background — same language as Hero, more subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <Waves
          strokeColor="rgba(255,255,255,0.05)"
          backgroundColor="transparent"
          lineSpacing={12}
          pointerSize={0.3}
        />
        {/* Vignette to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(var(--bg) / 0.65) 100%)",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16 md:mb-20">

          {/* Rotating phrase */}
          <div className="h-14 md:h-16 flex items-center justify-center mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                className="font-handsome block"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
                  color: "hsl(var(--turquoise))",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.5, ease: easing }}
              >
                {phrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easing }}
            className="font-light tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 4.5rem)",
              color: "hsl(var(--text))",
              lineHeight: 1.05,
            }}
          >
            Comencemos a Diseñar Juntos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-light mb-10 whitespace-nowrap"
            style={{ color: "hsl(var(--muted))" }}
          >
            Disponible para nuevos proyectos. Escribime y empecemos.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: easing }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            {/* WhatsApp — primary */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02] whitespace-nowrap"
              style={{
                backgroundColor: "hsl(var(--turquoise))",
                color: "#0a0a0a",
                textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribime por WhatsApp
            </a>

            {/* Email — secondary */}
            <a
              href="mailto:felicitasali12@gmail.com"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-light transition-all duration-300 hover:opacity-70 whitespace-nowrap"
              style={{
                border: "1px solid hsl(var(--stroke))",
                color: "hsl(var(--text))",
                textDecoration: "none",
              }}
            >
              felicitasali12@gmail.com ↗
            </a>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-8"
          style={{ borderTop: "1px solid hsl(var(--stroke))" }}
        >
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wide transition-colors duration-200"
                style={{ color: "hsl(var(--muted))", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "hsl(var(--text))")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "hsl(var(--muted))")
                }
              >
                {s.label}
              </a>
            ))}
          </div>

        </div>

        <p
          className="text-center text-xs mt-8"
          style={{ color: "hsl(var(--muted) / 0.4)" }}
        >
          © 2026 Felicitas Ali. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
