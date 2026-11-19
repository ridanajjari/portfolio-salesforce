import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Target, Trophy, X } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudies";
import { PROFILE } from "../data/profile";
import { PROJECT_FILTERS, PROJECTS } from "../data/projects";
import { pick } from "../i18n/lang";
import { GithubIcon } from "./BrandIcons";
import TiltCard from "./fx/TiltCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tag from "./Tag";

const githubBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-ink-700 px-4 py-3 text-sm font-semibold text-heading transition-colors hover:border-brand-400 hover:text-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300";

function CaseStudy({ project, t, lang, onClose }) {
  const study = CASE_STUDIES[project.repo];
  const Icon = project.icon;
  const panel = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const blocks = [
    { Icon: Target, title: t.projects.problem, body: <p>{pick(study.problem, lang)}</p> },
    {
      Icon: Lightbulb,
      title: t.projects.built,
      body: (
        <ul className="space-y-2.5">
          {pick(study.built, lang).map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className="flex gap-3"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
      ),
    },
    {
      Icon: Trophy,
      title: t.projects.result,
      body: <p className="font-semibold text-accent-300">{pick(project.metric, lang)}</p>,
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex justify-end bg-ink-950/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative h-full w-full max-w-xl overflow-y-auto border-l border-ink-700 bg-ink-900 p-6 shadow-2xl outline-none sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.book.close}
          className="absolute right-4 top-4 rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-800 hover:text-heading"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/40">
          <Icon className="h-7 w-7" />
        </span>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-brand-400">
          {t.projects.caseStudy} · {project.cloud}
        </p>
        <h2 id="case-title" className="mt-2 font-display text-3xl font-black text-heading sm:text-4xl">
          {pick(project.title, lang)}
        </h2>

        <div className="mt-8 space-y-7">
          {blocks.map(({ Icon: BlockIcon, title, body }, i) => (
            <motion.section
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-heading">
                <BlockIcon className="h-5 w-5 text-brand-400" />
                {title}
              </h3>
              <div className="text-sm leading-relaxed text-ink-300">{body}</div>
            </motion.section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold"
        >
          <GithubIcon className="h-4 w-4" />
          {t.projects.github}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </motion.aside>
    </motion.div>
  );
}

export default function Projects({ t, lang }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [openRepo, setOpenRepo] = useState(null);
  const shown = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  const opened = PROJECTS.find((p) => p.repo === openRepo);

  return (
    <section id="projects" className="scroll-mt-20 px-4 py-24 sm:px-6">
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
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    filter === f ? "text-white" : "border border-ink-700 bg-ink-900/60 text-ink-400 hover:text-heading"
                  }`}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-brand-600 shadow-lg shadow-brand-500/30"
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
                  <TiltCard className="group flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-900/80 p-6 shadow-lg shadow-brand-600/5 backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-brand-400/60 hover:shadow-[0_0_50px_-10px_rgb(var(--brand-500)/0.5)]">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink-500">
                        {p.cloud}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold text-heading">{pick(p.title, lang)}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">
                      {pick(CASE_STUDIES[p.repo].problem, lang)}
                    </p>

                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      {pick(p.metric, lang)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>

                    <div className="relative mt-6 grid grid-cols-[1fr_auto] gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenRepo(p.repo)}
                        className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                      >
                        {t.projects.caseStudy}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.projects.github}: ${pick(p.title, lang)}`}
                        className={githubBtn}
                      >
                        <GithubIcon className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>
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
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300"
          >
            {t.projects.all}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {opened && <CaseStudy project={opened} t={t} lang={lang} onClose={() => setOpenRepo(null)} />}
      </AnimatePresence>
    </section>
  );
}
