import { useState } from 'react';
import { motion } from 'framer-motion';

type ServiceData = {
  number: string;
  text: string;
  images: { src: string; alt: string }[];
};

const services: ServiceData[] = [
  {
    number: '01',
    text: 'Diseño Web',
    images: [
      { src: '/images/services/diseno-web-back.png',  alt: 'Diseño web' },
      { src: '/images/services/diseno-web-front.png', alt: 'Diseño web detalle' },
    ],
  },
  {
    number: '02',
    text: 'Identidad Visual',
    images: [
      { src: '/images/services/identidad-front.png', alt: 'Identidad visual' },
      { src: '/images/services/identidad-back.png',  alt: 'Branding' },
    ],
  },
  {
    number: '03',
    text: 'Fotografía y Video',
    images: [
      { src: '/images/services/foto-back.jpg',  alt: 'Fotografía' },
      { src: '/images/services/foto-front.jpg', alt: 'Fotografía detalle' },
    ],
  },
  {
    number: '04',
    text: 'Mailing',
    images: [
      { src: '/images/services/mailing-front.png', alt: 'Mailing' },
      { src: '/images/services/mailing-back.png',  alt: 'Email marketing' },
    ],
  },
  {
    number: '05',
    text: 'Redes Sociales',
    images: [
      { src: '/images/services/redes-front.jpg', alt: 'Redes sociales' },
      { src: '/images/services/redes-back.png',  alt: 'Social media' },
    ],
  },
  {
    number: '06',
    text: 'Diseño Editorial',
    images: [
      { src: '/images/services/editorial-front.jpg', alt: 'Diseño editorial' },
      { src: '/images/services/editorial-back.jpg',  alt: 'Manual de marca' },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.05,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function ServicesSection() {
  // Tracks which service row's back image is being directly hovered (desktop)
  const [hoveredBackIdx, setHoveredBackIdx] = useState<number | null>(null);
  // Tracks which row is being hovered (desktop) — drives image reveal
  const [hoveredRowIdx, setHoveredRowIdx] = useState<number | null>(null);
  // Tracks which row is "active" via tap on mobile
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleRowTap = (i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="services"
      style={{ backgroundColor: 'hsl(var(--bg))' }}
      className="py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px" style={{ backgroundColor: 'hsl(var(--stroke))' }} />
            <span
              className="font-handsome text-[50px] tracking-[0.03em]"
              style={{ color: 'hsl(var(--turquoise))' }}
            >
              Servicios
            </span>
          </div>
        </motion.div>

        {/* Services list */}
        <div>
          {services.map((service, i) => {
            const backOnTop = hoveredBackIdx === i;
            const isActive = hoveredRowIdx === i || activeIdx === i;

            return (
              <motion.div
                key={service.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <div
                  className="group relative overflow-visible cursor-default"
                  style={{ borderTop: '1px solid hsl(var(--stroke))' }}
                  onMouseEnter={() => setHoveredRowIdx(i)}
                  onMouseLeave={() => setHoveredRowIdx(null)}
                  onClick={() => handleRowTap(i)}
                >
                  <div className="relative flex items-center py-6 md:py-8 gap-5 md:gap-8">

                    {/* Index */}
                    <span
                      className="font-handsome flex-shrink-0 hidden md:block select-none leading-none"
                      style={{
                        fontSize: 'clamp(3rem, 6.5vw, 8rem)',
                        color: 'hsl(var(--turquoise))',
                        minWidth: '6rem',
                      }}
                    >
                      {service.number}
                    </span>

                    {/* Title */}
                    <h2
                      className="flex-1 font-light tracking-tight leading-none select-none transition-opacity duration-500 ease-out"
                      style={{
                        fontSize: 'clamp(3rem, 6.5vw, 8rem)',
                        color: 'hsl(var(--text))',
                        opacity: isActive ? 0.2 : 1,
                      }}
                    >
                      {service.text}
                    </h2>

                    {/* Image reveal — desktop hover OR mobile tap */}
                    <div
                      aria-hidden="true"
                      className="flex absolute inset-y-0 right-[8%] md:right-[12%] w-36 md:w-44 items-center"
                    >
                      <div className="relative w-36 md:w-44 h-48 md:h-56">

                        {/* Back image */}
                        <div
                          className="absolute inset-0 overflow-hidden rounded-xl cursor-pointer
                            transition-all duration-300 ease-out delay-150"
                          style={{
                            zIndex: backOnTop ? 5 : 1,
                            transform: isActive ? 'scale(1) translateX(3.5rem) translateY(0.75rem) rotate(8deg)' : 'scale(0)',
                            opacity: isActive ? 0.9 : 0,
                          }}
                          onMouseEnter={() => setHoveredBackIdx(i)}
                          onMouseLeave={() => setHoveredBackIdx(null)}
                        >
                          <img
                            src={service.images[1].src}
                            alt={service.images[1].alt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>

                        {/* Front image */}
                        <div
                          className="absolute inset-0 overflow-hidden rounded-xl cursor-pointer
                            transition-all duration-500 ease-out delay-75"
                          style={{
                            zIndex: backOnTop ? 1 : 2,
                            transform: isActive ? 'scale(1)' : 'scale(0)',
                            opacity: isActive ? 1 : 0,
                            boxShadow: isActive ? '0 25px 50px rgba(0,0,0,0.5)' : 'none',
                          }}
                          onMouseEnter={() => setHoveredBackIdx(null)}
                        >
                          <img
                            src={service.images[0].src}
                            alt={service.images[0].alt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom border */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ borderTop: '1px solid hsl(var(--stroke))' }}
          />
        </div>

      </div>
    </section>
  );
}
