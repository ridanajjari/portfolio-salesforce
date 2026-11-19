import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../data/certifications";
import { SKILLS } from "../data/skills";
import { pick } from "../i18n/lang";
import TiltCard from "./fx/TiltCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const chips = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };
const chip = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 20 } },
};

export default function Skills({ t, lang }) {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.skills.kicker} title={t.skills.title} />
        </Reveal>

        {/* Certifications */}
        <div className="mb-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.en} from="scale" delay={i * 0.08} className="h-full">
              <TiltCard
                max={12}
                className="group h-full overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900/60 to-violet-500/10 p-6 text-center transition-colors hover:border-sky-400/60"
              >
                {/* sheen that sweeps across on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative mx-auto grid h-16 w-16 place-items-center">
                  <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-sky-400/40" />
                  <BadgeCheck className="h-8 w-8 text-sky-400 transition-transform duration-500 group-hover:scale-125" />
                </span>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{t.certs.label}</p>
                <p className="mt-1 font-semibold text-white">{pick(c, lang)}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            const wide = i === 0 ? "lg:col-span-2" : "";
            return (
              <Reveal key={s.title.en} className={wide}>
                <div className="spotlight group h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-sky-500/40">
                  <h3 className="flex items-center gap-3 font-semibold text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-500/10 text-sky-400 transition-transform duration-500 group-hover:rotate-12">
                      <Icon className="h-5 w-5" />
                    </span>
                    {pick(s.title, lang)}
                  </h3>
                  <motion.ul
                    key={lang}
                    variants={chips}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {pick(s.items, lang).map((item) => (
                      <motion.li
                        key={item}
                        variants={chip}
                        whileHover={reduce ? undefined : { y: -3, scale: 1.06 }}
                        className="cursor-default rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-sky-500/60 hover:bg-sky-500/10 hover:text-white"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
