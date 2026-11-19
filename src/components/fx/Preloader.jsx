import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// intro curtain, shown once per browser session
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    let timer = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0" />
      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          className="glow-border mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 font-display text-2xl font-bold text-white shadow-[0_0_60px_rgba(14,165,233,0.6)]"
        >
          RN
        </motion.div>
        <p className="mt-8 font-mono text-sm text-slate-500">
          <span className="text-sky-400">sf</span> org open --target-org portfolio
        </p>
        <div className="mx-auto mt-4 h-1 w-56 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-300 to-violet-400"
            style={{ width: `${n}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs tabular-nums text-slate-400">{n}%</p>
      </div>
    </motion.div>
  );
}
