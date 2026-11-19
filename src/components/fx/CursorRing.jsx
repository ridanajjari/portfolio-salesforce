import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, select, input, textarea, [role='tab'], [role='option']";

// A ring that trails the mouse and grows over anything clickable (desktop pointers only).
// The normal cursor stays visible.
export default function CursorRing() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 24 });
  const sy = useSpring(y, { stiffness: 260, damping: 24 });

  useEffect(() => {
    if (reduce || !window.matchMedia?.("(pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e) => {
      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
      setHot(!!e.target.closest?.(INTERACTIVE));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{ scale: hot ? 1.7 : 1, opacity: hot ? 0.9 : 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 rounded-full border-2 ${
        hot ? "border-accent-400 bg-accent-400/10" : "border-brand-400"
      }`}
    />
  );
}
