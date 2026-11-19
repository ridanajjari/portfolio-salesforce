import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BadgeCheck, CalendarPlus, CheckCircle2, Cloud, Download, MapPin, Zap } from "lucide-react";
import { PROFILE } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Magnetic from "./fx/Magnetic";
import Typewriter from "./fx/Typewriter";

// three.js is only downloaded when the hero mounts, in its own chunk
const CloudScene = lazy(() => import("./fx/CloudScene"));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const wordUp = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

// shown until the 3D scene has loaded, and instead of it when WebGL is unavailable
function CloudFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <Cloud className="h-40 w-40 animate-float text-brand-400/50" strokeWidth={1} />
    </div>
  );
}

function Chip({ className, icon: Icon, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 16 }}
      className={`absolute ${className}`}
    >
      <span className="inline-flex animate-float-slow items-center gap-2 whitespace-nowrap rounded-xl border border-ink-700 bg-ink-900/90 px-4 py-2.5 text-sm font-semibold text-heading shadow-xl shadow-brand-600/20 backdrop-blur">
        <Icon className="h-5 w-5 text-brand-400" />
        {children}
      </span>
    </motion.div>
  );
}

export default function Hero({ t, ready, onBook, theme }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);
  const cloudScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.5]);
  const [first, last] = PROFILE.name.split(" ");
  const shown = reduce || ready;
  const state = shown ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[-10%] h-[520px] w-[520px] animate-aurora rounded-full bg-brand-500/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[380px] w-[380px] animate-aurora rounded-full bg-accent-400/10 blur-[120px] [animation-delay:-9s]" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <motion.div
        style={{ y, opacity: fade }}
        className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_1fr]"
      >
        {/* text */}
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate={state}>
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-4 py-1.5 text-sm font-medium text-accent-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
            </span>
            {t.hero.available}
          </motion.span>

          <motion.p variants={item} className="mt-7 font-mono text-sm text-brand-300">
            {t.hero.hello}
          </motion.p>

          <h1
            className="mt-1 font-display text-7xl font-black leading-[0.92] tracking-tight text-heading sm:text-8xl xl:text-9xl"
            aria-label={PROFILE.name}
          >
            <span className="block overflow-hidden pb-2" aria-hidden="true">
              <motion.span variants={wordUp} className="inline-block origin-bottom-left">
                {first}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-4" aria-hidden="true">
              <motion.span variants={wordUp} className="text-shimmer inline-block origin-bottom-left">
                {last}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={item}
            className="mt-4 min-h-[3.2em] font-display text-2xl font-bold text-heading sm:min-h-[1.6em] sm:text-3xl"
          >
            {t.hero.build} <Typewriter words={t.hero.roles} className="text-brand-400" />
          </motion.p>

          <motion.p variants={item} className="mt-2 text-sm font-medium text-ink-400">
            {t.hero.title}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-ink-300">
            {t.hero.pitch}
          </motion.p>

          <motion.p variants={item} className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-400">
            <MapPin className="h-4 w-4 text-brand-400" />
            {t.hero.location}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href={PROFILE.cv}
                download
                className="btn-primary group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 sm:w-auto"
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-700 bg-ink-900/70 px-6 py-3.5 font-semibold text-heading backdrop-blur transition-colors hover:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 sm:w-auto"
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
                  className="rounded-xl border border-ink-700 bg-ink-900/70 p-3 text-ink-400 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-400 hover:text-brand-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p variants={item} className="mt-6 hidden items-center gap-2 text-xs text-ink-500 lg:flex">
            <kbd className="rounded border border-ink-700 bg-ink-900/70 px-1.5 py-0.5 font-mono text-ink-300">Ctrl</kbd>
            <kbd className="rounded border border-ink-700 bg-ink-900/70 px-1.5 py-0.5 font-mono text-ink-300">K</kbd>
            {t.palette.hint}
          </motion.p>
        </motion.div>

        {/* 3D cloud */}
        <motion.div
          style={{ scale: cloudScale }}
          className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none"
        >
          {shown && (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <CloudFallback />
              <Suspense fallback={null}>
                <CloudScene theme={theme} animate={!reduce} />
              </Suspense>
            </motion.div>
          )}
          {shown && (
            <>
              <Chip className="left-0 top-[12%]" icon={BadgeCheck} delay={0.9}>
                {t.hero.chipCerts}
              </Chip>
              <Chip className="right-0 top-[30%]" icon={Zap} delay={1.1}>
                Apex · LWC · Flow
              </Chip>
              <Chip className="bottom-[12%] left-[8%]" icon={CheckCircle2} delay={1.3}>
                {t.hero.chipTests}
              </Chip>
            </>
          )}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-500 hover:text-brand-400 sm:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
