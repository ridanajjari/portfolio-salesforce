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

const HEXAGON = "polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

// a drawn badge (not the official Salesforce artwork)
function Badge() {
  return (
    <span className="relative mx-auto grid h-32 w-32 place-items-center">
      <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-brand-400/40" />
      <span
        className="absolute inset-3 bg-gradient-to-br from-brand-400 to-brand-600 shadow-xl"
        style={{ clipPath: HEXAGON }}
      />
      <span
        className="absolute inset-[18px] bg-gradient-to-br from-brand-600 to-[#032d60]"
        style={{ clipPath: HEXAGON }}
      />
      <BadgeCheck className="relative h-12 w-12 text-white transition-transform duration-500 group-hover:scale-125" />
    </span>
  );
}

export default function Skills({ t, lang }) {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-20 bg-ink-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.certs.kicker} title={t.certs.title} />
        </Reveal>

        {/* Certifications */}
        <div className="mb-24 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.en} from="scale" delay={i * 0.1} className="h-full">
              <TiltCard
                max={14}
                className="group h-full overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/80 px-6 py-9 text-center shadow-lg shadow-brand-600/5 backdrop-blur transition-colors hover:border-brand-400/70"
              >
                {/* sheen that sweeps across on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <Badge />
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">{t.certs.label}</p>
                <p className="mt-1 font-display text-xl font-bold text-heading">{pick(c, lang)}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SectionHeading kicker={t.skills.kicker} title={t.skills.title} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            const wide = i === 0 ? "lg:col-span-2" : "";
            return (
              <Reveal key={s.title.en} className={wide}>
                <div className="spotlight group h-full rounded-2xl border border-ink-800 bg-ink-900/70 p-6 backdrop-blur transition-colors hover:border-brand-400/50">
                  <h3 className="flex items-center gap-3 font-semibold text-heading">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/10 text-brand-400 transition-transform duration-500 group-hover:rotate-12">
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
                        className="cursor-default rounded-lg border border-ink-700 bg-ink-800/50 px-3 py-1.5 text-sm text-ink-300 transition-colors hover:border-brand-400 hover:bg-brand-500/10 hover:text-heading"
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
