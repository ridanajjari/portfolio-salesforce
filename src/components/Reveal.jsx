import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = { up: { y: 36 }, left: { x: -48 }, right: { x: 48 }, scale: { scale: 0.9 } };

// fade / slide / unblur on scroll
export default function Reveal({ children, className = "", delay = 0, from = "up" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", ...OFFSETS[from] }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
