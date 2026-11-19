import { FileCheck2, Layers, SlidersHorizontal } from "lucide-react";
import { STACK_ROW_1, STACK_ROW_2, STATS } from "../data/profile";
import Counter from "./fx/Counter";
import Marquee from "./fx/Marquee";
import TiltCard from "./fx/TiltCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const HOW_ICONS = [Layers, SlidersHorizontal, FileCheck2];

const chip = (label) => (
  <span className="whitespace-nowrap rounded-full border border-ink-800 bg-ink-900/70 px-5 py-2 text-sm font-medium text-ink-300">
    <span className="mr-2 text-brand-400">◆</span>
    {label}
  </span>
);

export default function About({ t }) {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      {/* tech strip */}
      <div className="mb-24 space-y-4">
        <Marquee items={STACK_ROW_1} renderItem={chip} />
        <Marquee items={STACK_ROW_2} renderItem={chip} reverse />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker={t.about.kicker} title={t.about.title} />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal from="left">
            <div className="space-y-5 text-lg leading-relaxed text-ink-300">
              <p>{t.about.p1}</p>
              <p className="text-ink-400">{t.about.p2}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.key} from="scale" delay={i * 0.08}>
                <TiltCard className="h-full rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
                  <p className="text-shimmer font-display text-5xl font-bold sm:text-6xl">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-ink-400">{t.about.stats[s.key]}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20">
          <h3 className="text-center font-display text-2xl font-semibold text-heading">{t.about.howTitle}</h3>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.about.how.map((h, i) => {
            const Icon = HOW_ICONS[i];
            return (
              <Reveal key={h.title} delay={i * 0.1} className="h-full">
                <TiltCard className="group h-full rounded-2xl border border-ink-800 bg-ink-900/60 p-6 transition-colors hover:border-brand-500/40">
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-4xl font-bold text-ink-800 transition-colors group-hover:text-brand-500/30">
                      0{i + 1}
                    </span>
                  </span>
                  <h4 className="mt-5 text-lg font-semibold text-heading">{h.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{h.text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
