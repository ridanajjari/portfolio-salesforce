import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { PROFILE } from "../data/profile";
import { PROJECT_FILTERS, PROJECTS } from "../data/projects";
import { pick } from "../i18n/lang";
import { GithubIcon } from "./BrandIcons";
import TiltCard from "./fx/TiltCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tag from "./Tag";

export default function Projects({ t, lang }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const shown = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
        </Reveal>

        {/* filters */}
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label={t.projects.title}>
            {PROJECT_FILTERS.map((f) => {
              const count = f === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    filter === f ? "text-white" : "border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {t.projects.filters[f]} <span className="ml-1 font-mono text-xs opacity-70">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.repo}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.85, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <TiltCard className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-[border-color,box-shadow] duration-300 hover:border-sky-500/50 hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.5)]">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-500">
                        {p.cloud}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">{pick(p.title, lang)}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{pick(p.desc, lang)}</p>

                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      {pick(p.metric, lang)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>

                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-sky-400 hover:text-white hover:shadow-lg hover:shadow-sky-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    >
                      <GithubIcon className="h-4 w-4" />
                      {t.projects.github}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 text-center">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            {t.projects.all}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
