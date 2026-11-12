import { BadgeCheck, Download, Mail, MapPin } from "lucide-react";
import { CERTIFICATIONS } from "../data/certifications";
import { PROFILE } from "../data/profile";
import { pick } from "../i18n/lang";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";

export default function Hero({ t, lang }) {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      {/* background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-60 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-300">
            <BadgeCheck className="h-4 w-4" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {PROFILE.name.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {PROFILE.name.split(" ")[1]}
            </span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-slate-200 sm:text-xl">{t.hero.title}</p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">{t.hero.pitch}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-sky-400" />
              {t.hero.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {t.hero.available}
            </span>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Download className="h-5 w-5" />
              {t.hero.download}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-sky-500/60 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Mail className="h-5 w-5" />
              {t.hero.contact}
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {[
              { href: PROFILE.github, label: "GitHub", Icon: GithubIcon },
              { href: PROFILE.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-sky-500/50 hover:text-sky-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.certs.title}</p>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.en}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left transition-colors hover:border-sky-500/40"
              >
                <BadgeCheck className="h-6 w-6 shrink-0 text-sky-400" />
                <span className="text-sm font-medium text-slate-200">{pick(c, lang)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
