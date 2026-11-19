import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({ kicker, title, subtitle }) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  return (
    <div className="mb-14 text-center">
      <p className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-sky-400">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-sky-400" />
        {kicker}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-sky-400" />
      </p>
      {/* the trigger sits on the h2: the words start clipped, so they can't observe themselves */}
      <motion.h2
        className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl"
        aria-label={title}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.07 }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden="true">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}
