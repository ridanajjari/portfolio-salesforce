import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BadgeCheck, CalendarPlus, CheckCircle2, Download, MapPin } from "lucide-react";
import photo from "../assets/rida.jpg";
import { PROFILE } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Magnetic from "./fx/Magnetic";
import ParticleField from "./fx/ParticleField";
import TiltCard from "./fx/TiltCard";
import Typewriter from "./fx/Typewriter";

// the real trigger from the lead-auto-assignment repo, as [text, colour] tokens
const K = "text-violet-300";
const T = "text-sky-300";
const P = "text-slate-400";
const CODE = [
  [
    ["trigger ", K],
    ["LeadAssignmentTrigger ", T],
    ["on ", K],
    ["Lead", T],
    ["(", P],
  ],
  [
    ["    before insert", K],
    [", ", P],
    ["before update", K],
  ],
  [[") {", P]],
  [
    ["  LeadAssignmentHandler", T],
    [".", P],
    ["handle", "text-amber-200"],
    ["(", P],
  ],
  [
    ["    Trigger", T],
    [".new, ", P],
    ["Trigger", T],
    [".oldMap", P],
  ],
  [["  );", P]],
  [["}", P]],
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const wordUp = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ t, ready, onBook }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);
  const [first, last] = PROFILE.name.split(" ");
  const state = reduce || ready ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6"
    >
      {/* background: aurora blobs, grid, particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[-10%] h-[520px] w-[520px] animate-aurora rounded-full bg-sky-500/25 blur-[130px]" />
        <div className="absolute right-[5%] top-[20%] h-[420px] w-[420px] animate-aurora rounded-full bg-violet-500/20 blur-[130px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[380px] w-[380px] animate-aurora rounded-full bg-cyan-400/15 blur-[120px] [animation-delay:-12s]" />
        <div className="bg-grid absolute inset-0" />
        <ParticleField />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <motion.div
        style={{ y, opacity: fade }}
        className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]"
      >
        {/* text */}
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate={state}>
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {t.hero.available}
          </motion.span>

          <motion.p variants={item} className="mt-7 font-mono text-sm text-sky-300">
            {t.hero.hello}
          </motion.p>

          <h1
            className="mt-2 font-display text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl xl:text-8xl"
            aria-label={PROFILE.name}
          >
            <span className="block overflow-hidden pb-2" aria-hidden="true">
              <motion.span variants={wordUp} className="inline-block origin-bottom-left">
                {first}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3" aria-hidden="true">
              <motion.span variants={wordUp} className="text-shimmer inline-block origin-bottom-left">
                {last}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={item}
            className="mt-5 min-h-[3.2em] text-xl sm:min-h-[1.6em] font-semibold text-slate-100 sm:text-2xl"
          >
            {t.hero.build} <Typewriter words={t.hero.roles} className="text-sky-300" />
          </motion.p>

          <motion.p variants={item} className="mt-2 text-sm font-medium text-slate-400">
            {t.hero.title}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-slate-400">
            {t.hero.pitch}
          </motion.p>

          <motion.p variants={item} className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-sky-400" />
            {t.hero.location}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href={PROFILE.cv}
                download
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition-shadow hover:shadow-sky-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Download className="relative h-5 w-5" />
                <span className="relative">{t.hero.download}</span>
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={onBook}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-sky-500/60 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:w-auto"
              >
                <CalendarPlus className="h-5 w-5" />
                {t.book.button}
              </button>
            </Magnetic>
            <div className="flex justify-center gap-3 sm:ml-2">
              {[
                { href: PROFILE.github, label: "GitHub", Icon: GithubIcon },
                { href: PROFILE.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-slate-400 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky-500/50 hover:text-sky-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* visual: tilting code window, portrait, floating chips */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: 4 }}
          animate={state === "show" ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <TiltCard
            max={9}
            className="glow-border rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-2xl shadow-sky-950/60 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 truncate font-mono text-xs text-slate-500">LeadAssignmentTrigger.trigger</span>
            </div>
            <pre className="overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-6 sm:text-sm sm:leading-7">
              {CODE.map((line, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -14 }}
                  animate={state === "show" ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.9 + i * 0.13, duration: 0.4 }}
                  className="flex"
                >
                  <span className="mr-4 w-4 select-none text-right text-slate-600">{i + 1}</span>
                  <span>
                    {line.map(([text, color], j) => (
                      <span key={j} className={color}>
                        {text}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </pre>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={state === "show" ? { opacity: 1 } : undefined}
              transition={{ delay: 2.1, duration: 0.5 }}
              className="border-t border-slate-800 px-4 py-3 font-mono text-xs text-slate-400"
            >
              <span className="text-sky-400">$</span> sf apex run test
              <span className="mt-1 flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t.hero.chipTests} · bulk 200
              </span>
            </motion.div>
          </TiltCard>

          {/* portrait */}
          <div className="absolute -right-3 -top-12 animate-float sm:-right-6 sm:-top-14">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <span className="absolute -inset-1 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#a78bfa,#67e8f9,#38bdf8)] blur-[2px]" />
              <img
                src={photo}
                alt={t.hero.photoAlt}
                width="112"
                height="112"
                className="relative h-full w-full rounded-full border-4 border-slate-950 object-cover"
              />
            </div>
          </div>

          {/* chip */}
          <div className="absolute -bottom-12 -left-2 animate-float-slow sm:-left-8">
            <span className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-slate-900/90 px-4 py-2.5 text-sm font-semibold text-white shadow-xl shadow-sky-950/60 backdrop-blur">
              <BadgeCheck className="h-5 w-5 text-sky-400" />
              {t.hero.chipCerts}
            </span>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:text-sky-400 sm:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
