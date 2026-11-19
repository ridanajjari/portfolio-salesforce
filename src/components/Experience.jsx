import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, GraduationCap, MoveRight } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/experience";
import { pick } from "../i18n/lang";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const period = (job, lang, t) => `${pick(job.period, lang)}${job.current ? ` – ${t.exp.present}` : ""}`;

function Points({ job, lang }) {
  return (
    <ul className="space-y-3">
      {pick(job.points, lang).map((p) => (
        <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

// Desktop: the section pins to the screen and the jobs slide past horizontally as you scroll.
function Film({ t, lang }) {
  const ref = useRef(null);
  const n = EXPERIENCE.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], ["0%", `-${((n - 1) * 100) / n}%`]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.round(v * (n - 1))));

  return (
    <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand-400">{t.exp.kicker}</p>
          <div className="mt-2 flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl font-black text-heading">{t.exp.work}</h2>
            <p className="flex items-center gap-2 pb-2 text-sm text-ink-400">
              {t.exp.filmHint}
              <MoveRight className="h-4 w-4 animate-pulse text-brand-400" />
            </p>
          </div>

          {/* progress rail */}
          <ol className="relative mt-8 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
            <span className="absolute left-0 right-0 top-[7px] h-0.5 bg-ink-800" />
            <motion.span
              style={{ scaleX: smooth }}
              className="absolute left-0 right-0 top-[7px] h-0.5 origin-left bg-gradient-to-r from-brand-500 to-accent-400"
            />
            {EXPERIENCE.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  className={`block h-4 w-4 rounded-full border-2 border-ink-950 transition-all duration-500 ${
                    i <= active ? "scale-125 bg-brand-400 shadow-[0_0_14px_rgb(var(--brand-400))]" : "bg-ink-700"
                  }`}
                />
                <span
                  className={`mt-3 block font-mono text-xs transition-colors duration-500 ${
                    i === active ? "text-heading" : "text-ink-500"
                  }`}
                >
                  {period(job, lang, t)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* film strip */}
        <motion.div style={{ x, width: `${n * 100}%` }} className="mt-10 flex">
          {EXPERIENCE.map((job, i) => (
            <div key={job.company} style={{ width: `${100 / n}%` }}>
              <motion.div
                animate={{ opacity: i === active ? 1 : 0.25, scale: i === active ? 1 : 0.92 }}
                transition={{ duration: 0.5 }}
                className="mx-auto grid w-full max-w-6xl grid-cols-[0.9fr_1.3fr] items-center gap-10 px-6"
              >
                <div>
                  <p className="text-shimmer font-display text-[9rem] font-black leading-none">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-heading">{pick(job.role, lang)}</h3>
                  <p className="mt-2 text-lg text-brand-400">{job.company}</p>
                  <p className="text-sm text-ink-400">{pick(job.place, lang)}</p>
                </div>
                <div className="glow-border rounded-3xl border border-ink-800 bg-ink-900/80 p-8 shadow-2xl shadow-brand-600/10 backdrop-blur">
                  <Points job={job} lang={lang} />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Phones, tablets and reduced motion: a plain vertical timeline.
function Stack({ t, lang }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
      <Reveal>
        <SectionHeading kicker={t.exp.kicker} title={t.exp.work} />
      </Reveal>
      <ol className="relative space-y-8 border-l border-ink-700 pl-6 sm:pl-8">
        {EXPERIENCE.map((job) => (
          <li key={job.company} className="relative">
            <span
              className={`absolute -left-[31px] top-6 h-3.5 w-3.5 rounded-full border-2 border-ink-950 sm:-left-[39px] ${
                job.current ? "bg-brand-400 shadow-[0_0_12px_rgb(var(--brand-400))]" : "bg-ink-500"
              }`}
            />
            <Reveal from="left">
              <div className="rounded-2xl border border-ink-800 bg-ink-900/70 p-5 sm:p-6">
                <span className="font-mono text-xs text-ink-400">{period(job, lang, t)}</span>
                <h3 className="mt-1 text-lg font-semibold text-heading">{pick(job.role, lang)}</h3>
                <p className="mb-4 text-sm text-brand-400">
                  {job.company} · <span className="text-ink-400">{pick(job.place, lang)}</span>
                </p>
                <Points job={job} lang={lang} />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience({ t, lang }) {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative scroll-mt-0 bg-ink-900/30">
      {reduce ? (
        <Stack t={t} lang={lang} />
      ) : (
        <>
          <div className="hidden lg:block">
            <Film t={t} lang={lang} />
          </div>
          <div className="lg:hidden">
            <Stack t={t} lang={lang} />
          </div>
        </>
      )}

      {/* Education */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6">
        <Reveal>
          <h3 className="mb-8 flex items-center justify-center gap-2 font-display text-2xl font-bold text-heading">
            <GraduationCap className="h-6 w-6 text-brand-400" />
            {t.exp.edu}
          </h3>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1} className="h-full">
              <div className="spotlight h-full rounded-2xl border border-ink-800 bg-ink-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60">
                <span className="font-mono text-xs font-medium text-ink-400">{pick(e.period, lang)}</span>
                <h4 className="mt-2 font-semibold text-heading">{pick(e.degree, lang)}</h4>
                <p className="mt-1 text-sm text-brand-400">{e.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
