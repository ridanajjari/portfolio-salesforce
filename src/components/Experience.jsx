import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/experience";
import { pick } from "../i18n/lang";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// vertical line that fills in as the list scrolls through the viewport
function Timeline({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <ol ref={ref} className="relative space-y-8 pl-6 sm:pl-8">
      <span className="absolute bottom-0 left-0 top-0 w-px bg-slate-800" />
      <motion.span
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-sky-400 via-cyan-300 to-violet-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      />
      {children}
    </ol>
  );
}

function Dot({ live }) {
  return (
    <span className="absolute -left-[31px] top-6 grid h-3.5 w-3.5 place-items-center sm:-left-[39px]">
      {live && <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />}
      <span
        className={`relative h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
          live ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" : "bg-slate-500"
        }`}
      />
    </span>
  );
}

export default function Experience({ t, lang }) {
  return (
    <section id="experience" className="relative scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.exp.kicker} title={t.exp.title} />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Work */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="h-5 w-5 text-sky-400" />
              {t.exp.work}
            </h3>
            <Timeline>
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="relative">
                  <Dot live={job.current} />
                  <Reveal from="left">
                    <div className="spotlight group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_0_40px_-12px_rgba(14,165,233,0.5)] sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{pick(job.role, lang)}</h4>
                          <p className="text-sm text-sky-300">
                            {job.company} · <span className="text-slate-400">{pick(job.place, lang)}</span>
                          </p>
                        </div>
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 font-mono text-xs font-medium ${
                            job.current ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {pick(job.period, lang)}
                          {job.current && ` – ${t.exp.present}`}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {pick(job.points, lang).map((p) => (
                          <li key={p} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500/70" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </Timeline>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <GraduationCap className="h-5 w-5 text-sky-400" />
              {t.exp.edu}
            </h3>
            <Timeline>
              {EDUCATION.map((e) => (
                <li key={e.school} className="relative">
                  <Dot />
                  <Reveal from="right">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40">
                      <span className="font-mono text-xs font-medium text-slate-500">{pick(e.period, lang)}</span>
                      <h4 className="mt-1 font-semibold text-white">{pick(e.degree, lang)}</h4>
                      <p className="text-sm text-sky-300">{e.school}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </section>
  );
}
