import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  category: string;
  img: string;
  description: string;
  services: string[];
  tools: string[];
  additionalImages: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Lavado Suar",
    category: "Identidad Visual",
    img: "/images/projects/suar-main.png",
    description:
      "Desarrollo completo de identidad visual para Lavado Suar. El proyecto incluyó la creación del logotipo, definición del sistema gráfico y elaboración de un manual de marca para garantizar consistencia visual en todos los puntos de contacto.",
    services: ["Diseño de Logotipo", "Identidad Visual", "Manual de Marca"],
    tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
    additionalImages: [
      "/images/projects/suar-2.png",
      "/images/projects/suar-3.jpg",
    ],
  },
  {
    id: 3,
    title: "Grupo Morada",
    category: "Comunicación Visual",
    img: "/images/projects/morada-3.png",
    description:
      "Desarrollo de identidad visual y comunicación gráfica para Grupo Morada. Se diseñaron piezas para redes sociales, cartelería institucional, agendas y calendarios corporativos, manteniendo coherencia visual en todos los soportes.",
    services: ["Diseño de Logotipo", "Redes Sociales", "Cartelería", "Diseño Editorial", "Calendarios", "Agendas"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    additionalImages: [
      "/images/projects/morada-main.jpg",
      "/images/projects/morada-2.png",
    ],
  },
  {
    id: 4,
    title: "El Pilar Obras",
    category: "Producción Audiovisual",
    img: "/images/projects/pilar-2.jpg",
    description:
      "Rediseño de identidad visual y producción audiovisual enfocada en la comunicación profesional de desarrollos inmobiliarios. Se realizaron grabaciones, edición de video y contenido visual para mostrar edificios y proyectos de forma atractiva y profesional.",
    services: ["Rediseño de Logotipo", "Producción Audiovisual", "Edición de Video", "Redes Sociales"],
    tools: ["Premiere Pro", "After Effects", "Lightroom", "Photoshop", "Illustrator"],
    additionalImages: [
      "/images/projects/pilar-main.jpg",
      "/images/projects/pilar-3.jpg",
    ],
  },
  {
    id: 5,
    title: "Pilar Golf",
    category: "Redes Sociales",
    img: "/images/projects/golf-main.jpg",
    description:
      "Creación de contenido digital para redes sociales, enfocado en fortalecer la presencia online del club y comunicar eventos, actividades y novedades de manera visualmente atractiva.",
    services: ["Redes Sociales", "Diseño de Contenido", "Community Content"],
    tools: ["Photoshop", "Lightroom", "Canva", "Premiere Pro"],
    additionalImages: [
      "/images/projects/golf-2.png",
      "/images/projects/golf-3.png",
    ],
  },
  {
    id: 6,
    title: "Consultorios Plaza",
    category: "Comunicación Digital",
    img: "/images/projects/consul-3.png",
    description:
      "Gestión y diseño de contenido para redes sociales orientado a mejorar la comunicación institucional y la presencia digital del centro médico.",
    services: ["Redes Sociales", "Diseño Gráfico", "Comunicación Digital"],
    tools: ["Photoshop", "Illustrator", "Canva"],
    additionalImages: [
      "/images/projects/consul-main.png",
      "/images/projects/consul-2.png",
    ],
  },
  {
    id: 7,
    title: "Veterinaria Verdu",
    category: "Fotografía y Diseño para Redes",
    img: "/images/projects/verdu-main.png",
    description:
      "Producción de contenido visual para redes sociales mediante fotografía profesional y diseño de piezas digitales. El objetivo fue fortalecer la identidad visual y la comunicación de la clínica veterinaria.",
    services: ["Redes Sociales", "Fotografía", "Diseño de Contenido"],
    tools: ["Lightroom", "Photoshop", "Illustrator"],
    additionalImages: [
      "/images/projects/verdu-2.png",
      "/images/projects/verdu-3.png",
    ],
  },
];

/* ── Lightbox ── */

type LightboxState = { images: string[]; idx: number };

function Lightbox({
  state,
  onClose,
  onNav,
}: {
  state: LightboxState;
  onClose: () => void;
  onNav: (idx: number) => void;
}) {
  const { images, idx } = state;
  const hasPrev = idx > 0;
  const hasNext = idx < images.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNav(idx - 1);
      if (e.key === 'ArrowRight' && hasNext) onNav(idx + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [idx, hasPrev, hasNext, onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }} />

      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
        onClick={onClose}
      >
        <X size={16} color="white" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          className="absolute left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); onNav(idx - 1); }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          className="absolute right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); onNav(idx + 1); }}
        >
          <ChevronRight size={20} color="white" />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt=""
          className="relative z-[5] max-w-[90vw] max-h-[88vh] rounded-xl object-contain"
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, di) => (
            <button
              key={di}
              onClick={(e) => { e.stopPropagation(); onNav(di); }}
              style={{
                width: di === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: di === idx ? 'hsl(var(--turquoise))' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── Mobile Carousel ── */

function MobileProjectCarousel({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const project = projects[current];

  return (
    <div className="px-5 pb-10">
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ aspectRatio: '3/4', backgroundColor: 'hsl(var(--surface))', border: '1px solid hsl(var(--stroke))' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => onSelect(project)}
      >
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs mb-1" style={{ color: 'hsl(var(--turquoise))' }}>{project.category}</p>
          <h3 className="text-xl font-medium" style={{ color: 'white' }}>{project.title}</h3>
          <div className="mt-2">
            <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--turquoise))', color: '#0a0a0a', fontWeight: 600 }}>
              Ver proyecto →
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={prev}
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid hsl(var(--stroke))', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--muted))', fontSize: 18 }}
        >←</button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: i === current ? 'hsl(var(--turquoise))' : 'hsl(var(--stroke))',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid hsl(var(--stroke))', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--muted))', fontSize: 18 }}
        >→</button>
      </div>
    </div>
  );
}

/* ── Main Section ── */

export default function RadialWorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((images: string[], idx: number) => {
    setLightbox({ images, idx });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const navLightbox = useCallback((idx: number) => setLightbox((prev) => prev ? { ...prev, idx } : null), []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedProject || lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject, lightbox]);

  // Close project modal on ESC (lightbox handles its own ESC)
  useEffect(() => {
    if (!lightbox) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      if (selectedProject) document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [selectedProject, lightbox]);

  return (
    <section
      id="works"
      style={{ backgroundColor: 'hsl(var(--bg))' }}
      className="relative"
    >
      {/* Section header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-0 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
          <span
            className="font-handsome text-[50px] tracking-[0.03em]"
            style={{ color: 'hsl(var(--turquoise))' }}
          >
            Proyectos
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
        </div>

        <p className="text-sm md:text-base mx-auto mb-1 whitespace-nowrap" style={{ color: 'hsl(var(--muted))' }}>
          <span className="hidden md:inline">Hacé click en cualquier proyecto para ver más detalles &nbsp;↓</span>
          <span className="inline md:hidden">Deslizá o usá las flechas para navegar &nbsp;↓</span>
        </p>
      </div>

      {/* Mobile carousel */}
      <div className="block md:hidden mt-8">
        <MobileProjectCarousel onSelect={(p) => setSelectedProject(p)} />
      </div>

      {/* Radial gallery — desktop only */}
      <div className="hidden md:block">
      <RadialScrollGallery
        baseRadius={480}
        mobileRadius={200}
        visiblePercentage={48}
        scrollDuration={2200}
        startTrigger="top top"
        onItemSelect={(i) => setSelectedProject(projects[i] ?? null)}
        centerLabel="seguí scrolleando"
      >
        {(hoveredIndex) =>
          projects.map((project, index) => {
            const isActive = hoveredIndex === index;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={isActive}
                onSelect={() => setSelectedProject(project)}
              />
            );
          })
        }
      </RadialScrollGallery>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && !lightbox && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenLightbox={openLightbox}
          />
        )}
      </AnimatePresence>

      {/* Lightbox — on top of project modal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox state={lightbox} onClose={closeLightbox} onNav={navLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Project Card ── */

function ProjectCard({
  project,
  isActive,
  onSelect,
}: {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onSelect}
      style={{
        width: 'clamp(160px, 22vw, 240px)',
        height: 'clamp(220px, 30vw, 330px)',
        border: isActive
          ? '1px solid rgba(137,170,204,0.5)'
          : '1px solid hsl(var(--stroke))',
        backgroundColor: 'hsl(var(--surface))',
        boxShadow: isActive
          ? '0 0 40px rgba(137,170,204,0.12), 0 20px 60px rgba(0,0,0,0.5)'
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          className="h-full w-full object-cover"
          style={{
            transform: isActive ? 'scale(1.08)' : 'scale(1)',
            filter: isActive ? 'none' : 'grayscale(20%) brightness(0.85)',
            transition: 'transform 0.7s ease, filter 0.5s ease',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isActive
              ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
            transition: 'background 0.4s ease',
          }}
        />
      </div>

      {/* Bottom: title */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          transform: isActive ? 'translateY(0)' : 'translateY(4px)',
          transition: 'transform 0.4s ease',
        }}
      >
        <h3
          className="font-body font-medium leading-tight"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'hsl(var(--text))' }}
        >
          {project.title}
        </h3>
        <div
          className="h-px mt-2 accent-gradient"
          style={{
            width: isActive ? '100%' : '0%',
            opacity: isActive ? 1 : 0,
            transition: 'width 0.5s ease, opacity 0.3s ease',
          }}
        />
      </div>

      {/* Click hint */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isActive ? 0.9 : 0, pointerEvents: 'none' }}
      >
        <span
          className="text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full"
          style={{
            backgroundColor: 'hsl(var(--turquoise))',
            color: '#0a0a0a',
            fontWeight: 600,
          }}
        >
          Ver proyecto
        </span>
      </div>
    </div>
  );
}

/* ── Project Modal ── */

function ProjectModal({
  project,
  onClose,
  onOpenLightbox,
}: {
  project: Project;
  onClose: () => void;
  onOpenLightbox: (images: string[], idx: number) => void;
}) {
  const easing2: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
  // All images for this project: main + additional
  const allImages = [project.img, ...project.additionalImages];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
      />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          maxWidth: '900px',
          backgroundColor: 'hsl(var(--surface))',
          border: '1px solid hsl(var(--stroke))',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        }}
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ duration: 0.32, ease: easing2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: 'hsl(var(--bg))',
            border: '1px solid hsl(var(--stroke))',
            cursor: 'pointer',
          }}
          onClick={onClose}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'hsl(var(--turquoise))';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'hsl(var(--bg))';
          }}
        >
          <X size={15} color="hsl(var(--text))" />
        </button>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">

          {/* Left: images — click any to open lightbox */}
          <div className="p-5 md:p-6 flex flex-col gap-3">
            {/* Main image */}
            <div
              className="overflow-hidden rounded-xl cursor-zoom-in"
              style={{ aspectRatio: '4/3' }}
              onClick={() => onOpenLightbox(allImages, 0)}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Additional images */}
            {project.additionalImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {project.additionalImages.map((src, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="overflow-hidden rounded-xl cursor-zoom-in"
                    style={{ aspectRatio: '4/3' }}
                    onClick={() => onOpenLightbox(allImages, imgIdx + 1)}
                  >
                    <img
                      src={src}
                      alt={`${project.title} — detalle ${imgIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: info */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h2
                className="font-light tracking-tight leading-tight mb-6"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: 'hsl(var(--text))',
                }}
              >
                {project.title}
              </h2>

              {/* Description */}
              <p
                className="text-sm font-light leading-relaxed mb-8"
                style={{ color: 'hsl(var(--muted))' }}
              >
                {project.description}
              </p>

              {/* Services */}
              <div className="mb-6">
                <p
                  className="font-handsome text-[17px] tracking-[0.03em] mb-3"
                  style={{ color: 'hsl(var(--muted))' }}
                >
                  Servicios
                </p>
                <ul className="flex flex-col gap-1.5">
                  {project.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2.5 text-sm font-light"
                      style={{ color: 'hsl(var(--text))' }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: 'hsl(var(--turquoise))',
                          flexShrink: 0,
                        }}
                      />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div>
                <p
                  className="font-handsome text-[17px] tracking-[0.03em] mb-3"
                  style={{ color: 'hsl(var(--muted))' }}
                >
                  Herramientas
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: 'hsl(var(--bg))',
                        color: 'hsl(var(--muted))',
                        border: '1px solid hsl(var(--stroke))',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div
              className="mt-8 h-px accent-gradient"
              style={{ opacity: 0.4 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
