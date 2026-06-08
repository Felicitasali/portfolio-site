import { motion } from "framer-motion";

const stats = [
  { value: "30", label: "Proyectos\ncompletados" },
  { value: "15", label: "Marcas\ntrabajadas" },
  { value: "6", label: "Años de\nexperiencia" },
];

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Stats() {
  return (
    <section style={{ backgroundColor: "hsl(var(--bg))" }} className="py-24 md:py-32">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easing }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <div className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
          <span
            className="font-handsome text-[50px] tracking-[0.03em]"
            style={{ color: "hsl(var(--muted))" }}
          >
            En Números
          </span>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ backgroundColor: "hsl(var(--stroke))" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easing }}
              className="flex flex-col justify-between p-8 md:p-10"
              style={{ backgroundColor: "hsl(var(--bg))" }}
            >
              {/* Number in Jimmy Script */}
              <div
                className="font-handsome leading-none mb-5"
                style={{
                  fontSize: "clamp(6rem, 12vw, 11rem)",
                  color: "hsl(var(--text))",
                  lineHeight: 1,
                }}
              >
                <span style={{ color: "hsl(var(--turquoise))" }}>+</span>
                {stat.value}
              </div>

              {/* Label */}
              <p
                className="text-sm font-light leading-snug"
                style={{ color: "hsl(var(--muted))", whiteSpace: "pre-line" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 text-xs text-center"
          style={{ color: "hsl(var(--muted) / 0.4)", letterSpacing: "0.12em" }}
        >
          y seguimos creciendo
        </motion.p>
      </div>
    </section>
  );
}
