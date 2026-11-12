import { CheckCircle2, ExternalLink } from "lucide-react";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { pick } from "../i18n/lang";
import { GithubIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Tag from "./Tag";

export default function Projects({ t, lang }) {
  return (
    <section id="projects" className="scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.repo} className="h-full">
                <article className="group relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-[0_0_40px_-8px_rgba(14,165,233,0.45)]">
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20 transition-colors group-hover:bg-sky-500/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{p.cloud}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">{pick(p.title, lang)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{pick(p.desc, lang)}</p>

                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
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
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-sky-400 hover:text-white hover:shadow-lg hover:shadow-sky-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <GithubIcon className="h-4 w-4" />
                    {t.projects.github}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

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
