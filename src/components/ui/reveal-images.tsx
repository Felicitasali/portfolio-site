import { cn } from '@/lib/utils';

export interface ImageSource {
  src: string;
  alt: string;
}

export interface ServiceItemProps {
  number: string;
  text: string;
  label: string;
  images: [ImageSource, ImageSource];
}

function RevealImageListItem({ number, text, label, images }: ServiceItemProps) {
  return (
    <div
      className="group relative overflow-visible cursor-default"
      style={{ borderTop: '1px solid hsl(var(--stroke))' }}
    >
      <div className="relative flex items-center py-7 md:py-9 gap-5 md:gap-8">

        {/* Index number — Comico, muted */}
        <span
          className="font-handsome text-[16px] tracking-[0.25em] w-12 flex-shrink-0 hidden md:block select-none"
          style={{ color: 'hsl(var(--muted))' }}
        >
          {number}
        </span>

        {/* Service title — Work Sans light, huge */}
        <h2
          className="flex-1 font-light tracking-tight leading-none select-none
            transition-opacity duration-500 ease-out
            group-hover:opacity-25"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
            color: 'hsl(var(--text))',
          }}
        >
          {text}
        </h2>

        {/* Category label — Comico, right-aligned, muted */}
        <span
          className="font-handsome text-[16px] tracking-[0.2em] flex-shrink-0 hidden lg:block select-none"
          style={{ color: 'hsl(var(--muted))' }}
        >
          {label}
        </span>

        {/* ── Image reveal area (desktop only) ─────────────────────── */}
        {/* Outer wrapper: spans full row height, used for vertical centering */}
        <div
          aria-hidden="true"
          className="hidden md:flex absolute inset-y-0 right-[12%] w-44 items-center pointer-events-none"
        >
          {/* Inner: fixed-size container for the two images */}
          <div className="relative w-44 h-60">

            {/* Image 2 — behind, shifts + rotates on hover */}
            <div
              className={cn(
                'absolute inset-0 overflow-hidden rounded-xl',
                'scale-0 opacity-0',
                'transition-all duration-300 ease-out delay-150',
                'group-hover:scale-100 group-hover:opacity-70',
                'group-hover:translate-x-9 group-hover:translate-y-5 group-hover:rotate-12',
              )}
            >
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* Image 1 — front, appears straight */}
            <div
              className={cn(
                'absolute inset-0 overflow-hidden rounded-xl',
                'scale-0 opacity-0',
                'transition-all duration-500 ease-out delay-75',
                'group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-2xl',
              )}
            >
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>

          </div>
        </div>
        {/* ── end image reveal ─────────────────────────────────────── */}

      </div>
    </div>
  );
}

export interface RevealImageListProps {
  items: ServiceItemProps[];
}

function RevealImageList({ items }: RevealImageListProps) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <RevealImageListItem key={index} {...item} />
      ))}
      {/* Bottom border after last item */}
      <div style={{ borderTop: '1px solid hsl(var(--stroke))' }} />
    </div>
  );
}

export { RevealImageList };
