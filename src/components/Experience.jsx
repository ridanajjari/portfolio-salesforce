import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/experience";
import { pick } from "../i18n/lang";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience({ t, lang }) {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-24 sm:px-6">
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
            <ol className="relative space-y-8 border-l border-slate-800 pl-6 sm:pl-8">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="relative">
                  <span
                    className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 sm:-left-[39px] ${
                      job.current ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" : "bg-slate-600"
                    }`}
                  />
                  <Reveal>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-white">{pick(job.role, lang)}</h4>
                          <p className="text-sm text-sky-300">
                            {job.company} · <span className="text-slate-400">{pick(job.place, lang)}</span>
                          </p>
                        </div>
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
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
            </ol>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <GraduationCap className="h-5 w-5 text-sky-400" />
              {t.exp.edu}
            </h3>
            <ol className="relative space-y-6 border-l border-slate-800 pl-6 sm:pl-8">
              {EDUCATION.map((e) => (
                <li key={e.school} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-slate-600 sm:-left-[39px]" />
                  <Reveal>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700">
                      <span className="text-xs font-medium text-slate-500">{pick(e.period, lang)}</span>
                      <h4 className="mt-1 font-semibold text-white">{pick(e.degree, lang)}</h4>
                      <p className="text-sm text-sky-300">{e.school}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
