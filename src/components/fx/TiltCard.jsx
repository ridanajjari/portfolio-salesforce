import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

// 3D tilt toward the pointer + spotlight (see .spotlight in index.css)
export default function TiltCard({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (reduce || e.pointerType === "touch") return;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set(-(py - 0.5) * 2 * max);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}
