import { ArrowRight, CalendarPlus } from "lucide-react";
import Magnetic from "./fx/Magnetic";
import Reveal from "./Reveal";

// closing call to action above the footer
export default function Cta({ t, onBook }) {
  return (
    <section className="relative overflow-hidden px-4 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-sky-500/15 blur-[130px]" />
        <div className="bg-grid absolute inset-0" />
      </div>
      <Reveal from="scale" className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          {t.cta.line1}
          <br />
          <span className="text-shimmer">{t.cta.line2}</span>
        </h2>
        <Magnetic className="mt-10 inline-block" strength={0.4}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_60px_-10px_rgba(56,189,248,0.8)] transition-colors hover:bg-sky-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {t.cta.button}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </a>
        </Magnetic>
        <div className="mt-5">
          <button
            type="button"
            onClick={onBook}
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 underline-offset-4 hover:text-white hover:underline"
          >
            <CalendarPlus className="h-4 w-4" />
            {t.book.button}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
