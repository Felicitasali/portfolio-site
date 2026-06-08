import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Sobre Mí", id: "about" },
  { label: "Servicios", id: "services" },
  { label: "Proyectos", id: "works" },
  { label: "Contacto", id: "contact" },
];

const sectionToNav: Record<string, string> = {
  about: "Sobre Mí",
  services: "Servicios",
  works: "Proyectos",
  motion: "Proyectos",
  contact: "Contacto",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);

      const threshold = window.innerHeight * 0.42;
      let current = "";

      for (const [id, label] of Object.entries(sectionToNav)) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = label;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (label: string, id: string | null) => {
    setActive(label);
    if (!id) window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <motion.div
        className="inline-flex items-center rounded-full border pointer-events-auto"
        style={{
          backdropFilter: "blur(14px)",
          backgroundColor: isDark ? "rgba(20,20,20,0.88)" : "rgba(242,242,242,0.90)",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          padding: "6px 8px",
          boxShadow: scrolled
            ? isDark ? "0 4px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.12)"
            : "none",
          transition: "box-shadow 0.3s ease, background-color 0.4s ease",
        }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {navLinks.map((link) => {
          const isActive = active === link.label;
          return (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.label, link.id)}
              className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200"
              style={{
                color: isActive
                  ? "hsl(var(--turquoise))"
                  : isDark ? "rgba(140,140,140,1)" : "rgba(100,100,100,1)",
                backgroundColor: isActive
                  ? "hsl(var(--turquoise) / 0.10)"
                  : "transparent",
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit",
                fontWeight: isActive ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = isDark ? "rgba(245,245,245,1)" : "rgba(15,15,15,1)";
                  el.style.backgroundColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = isDark ? "rgba(140,140,140,1)" : "rgba(100,100,100,1)";
                  el.style.backgroundColor = "transparent";
                }
              }}
            >
              {link.label}
            </button>
          );
        })}

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark((v) => !v)}
          className="ml-1 inline-flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: 32,
            height: 32,
            border: "none",
            backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
            color: isDark ? "rgba(140,140,140,1)" : "rgba(100,100,100,1)",
            cursor: "pointer",
            flexShrink: 0,
          }}
          title={isDark ? "Modo claro" : "Modo oscuro"}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = isDark ? "rgba(245,245,245,1)" : "rgba(15,15,15,1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = isDark ? "rgba(140,140,140,1)" : "rgba(100,100,100,1)";
          }}
        >
          {isDark ? (
            /* Sun icon — switch to light */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon — switch to dark */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
}
