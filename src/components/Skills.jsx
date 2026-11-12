import { SKILLS } from "../data/skills";
import { pick } from "../i18n/lang";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills({ t, lang }) {
  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.skills.kicker} title={t.skills.title} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            const wide = i === 0 ? "lg:col-span-2" : "";
            return (
              <Reveal key={s.title.en} className={wide}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-sky-500/40">
                  <h3 className="flex items-center gap-3 font-semibold text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-500/10 text-sky-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    {pick(s.title, lang)}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {pick(s.items, lang).map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-sky-500/50 hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
