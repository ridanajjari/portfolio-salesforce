import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Play, RotateCcw, UserCheck, X, Zap } from "lucide-react";
import { CASE_RULES, LEAD_COUNTRIES, LEAD_INDUSTRIES, LEAD_RULES, SAMPLE_CASES, matchLeadRule } from "../data/demo";
import { pick } from "../i18n/lang";
import { GithubIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const REPOS = {
  lead: "https://github.com/ridanajjari/lead-auto-assignment",
  cases: "https://github.com/ridanajjari/case-escalation-automation",
};

const PRIORITY_STYLE = {
  Low: "bg-slate-700/60 text-slate-300",
  Medium: "bg-amber-400/15 text-amber-300",
  High: "bg-orange-500/20 text-orange-300",
  Critical: "bg-rose-500/20 text-rose-300",
};

// runs queued timeouts and clears them on unmount
function useTimers() {
  const ids = useRef([]);
  useEffect(() => () => ids.current.forEach(clearTimeout), []);
  return {
    after: (ms, fn) => ids.current.push(setTimeout(fn, ms)),
    clear: () => {
      ids.current.forEach(clearTimeout);
      ids.current = [];
    },
  };
}

const select =
  "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

// Lead auto-assignment

function LeadDemo({ t }) {
  const d = t.demo.lead;
  const timers = useTimers();
  const [industry, setIndustry] = useState(LEAD_INDUSTRIES[0]);
  const [country, setCountry] = useState(LEAD_COUNTRIES[0]);
  // step: -1 idle, 0..3 pipeline stage; checked: how many rules have been evaluated
  const [run, setRun] = useState({ step: -1, checked: 0, match: -1 });
  const busy = run.step >= 0 && run.step < 3;

  const reset = () => {
    timers.clear();
    setRun({ step: -1, checked: 0, match: -1 });
  };

  const insert = () => {
    timers.clear();
    const match = matchLeadRule(industry, country);
    setRun({ step: 0, checked: 0, match });
    timers.after(500, () => setRun((r) => ({ ...r, step: 1 })));
    timers.after(1000, () => setRun((r) => ({ ...r, step: 2 })));
    for (let i = 0; i <= match; i++) timers.after(1350 + i * 450, () => setRun((r) => ({ ...r, checked: i + 1 })));
    timers.after(1500 + (match + 1) * 450, () => setRun((r) => ({ ...r, step: 3 })));
  };

  const rule = LEAD_RULES[run.match];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      {/* form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h4 className="font-semibold text-white">{d.new}</h4>
        <label className="mt-5 block text-sm font-medium text-slate-300">
          {d.industry}
          <select
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              reset();
            }}
            className={select}
          >
            {LEAD_INDUSTRIES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-300">
          {d.country}
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              reset();
            }}
            className={select}
          >
            {LEAD_COUNTRIES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={insert} disabled={busy} className={`${primaryBtn} mt-6 w-full`}>
          <Play className="h-4 w-4" />
          {d.create}
        </button>
      </div>

      {/* pipeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {d.steps.map((label, i) => {
            const on = run.step >= i;
            return (
              <li
                key={label}
                className={`relative overflow-hidden rounded-xl border px-3 py-3 text-center text-xs font-medium transition-colors duration-300 ${
                  on ? "border-sky-500/60 bg-sky-500/10 text-sky-200" : "border-slate-800 text-slate-500"
                }`}
              >
                {run.step === i && i < 3 && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 animate-pulse bg-sky-400" />
                )}
                <span className="mb-1 block font-mono text-[10px] opacity-60">0{i + 1}</span>
                {label}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 font-mono text-xs text-slate-500">{d.rules}</p>
        <ul className="mt-3 space-y-2">
          {LEAD_RULES.map((r, i) => {
            const evaluated = run.checked > i;
            const hit = evaluated && i === run.match;
            return (
              <li
                key={r.name}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-300 ${
                  hit
                    ? "border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_30px_-10px_rgba(52,211,153,0.7)]"
                    : evaluated
                      ? "border-slate-800 opacity-50"
                      : "border-slate-800"
                }`}
              >
                <span className="font-mono text-xs text-slate-500">{r.priority}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-white">{r.name}</span>
                  <span className="block text-xs text-slate-400">
                    {d.industry}: {r.industry ?? d.any} · {d.country}: {r.country ?? d.any}
                  </span>
                </span>
                <span className="grid h-6 w-6 place-items-center">
                  {evaluated &&
                    (hit ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-300">
                        <Check className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-slate-500">
                        <X className="h-5 w-5" />
                      </motion.span>
                    ))}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 min-h-[76px]" aria-live="polite">
          <AnimatePresence mode="wait">
            {run.step === 3 && rule ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex items-center gap-4 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                  <UserCheck className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-emerald-200/70">{d.result}</span>
                  <span className="block font-semibold text-white">{rule.owner}</span>
                  <span className="block font-mono text-xs text-slate-400">
                    {d.by}: {rule.name}
                  </span>
                </span>
              </motion.div>
            ) : (
              run.step === -1 && (
                <motion.p key="idle" exit={{ opacity: 0 }} className="pt-4 text-sm text-slate-500">
                  {d.idle}
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// SLA case escalation

const freshCases = () => SAMPLE_CASES.map((c) => ({ ...c, flash: false }));

function CaseDemo({ t, lang }) {
  const d = t.demo.cases;
  const timers = useTimers();
  const [cases, setCases] = useState(freshCases);
  const [scan, setScan] = useState(-1);
  const [log, setLog] = useState([]);
  const [runs, setRuns] = useState(0);
  const running = scan >= 0;

  const reset = () => {
    timers.clear();
    setCases(freshCases());
    setScan(-1);
    setLog([]);
    setRuns(0);
  };

  const runBatch = () => {
    timers.clear();
    const list = cases;
    let escalated = 0;
    setLog([{ text: d.start, tone: "info" }]);
    list.forEach((c, i) => {
      const rule = CASE_RULES[c.priority];
      const hit = rule && c.age >= rule.hours;
      if (hit) escalated++;
      timers.after(350 + i * 520, () => {
        setScan(i);
        const line = hit
          ? { text: `${c.id}: ${c.priority} → ${rule.to} (${c.age}h ≥ ${rule.hours}h) · ${d.escalated}`, tone: "ok" }
          : { text: `${c.id}: ${c.priority}, ${c.age}h · ${rule ? d.skipped : d.noRule}`, tone: "muted" };
        setLog((l) => [...l, line]);
        // age restarts at 0 after an escalation, which is what prevents a double escalation
        if (hit) setCases((cs) => cs.map((x, j) => (j === i ? { ...x, priority: rule.to, age: 0, flash: true } : x)));
      });
    });
    timers.after(350 + list.length * 520, () => {
      setScan(-1);
      setRuns((n) => n + 1);
      setLog((l) => [...l, { text: d.done(escalated, list.length - escalated), tone: "info" }]);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-slate-500">{d.rules}</p>
          <div className="flex gap-2">
            <button type="button" onClick={runBatch} disabled={running} className={`${primaryBtn} px-4 py-2 text-sm`}>
              <Zap className="h-4 w-4" />
              {running ? d.running : runs ? d.again : d.run}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label={d.reset}
              title={d.reset}
              className="rounded-xl border border-slate-700 p-2.5 text-slate-400 transition-colors hover:border-sky-500/50 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <table className="mt-5 w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="pb-2 font-medium">{d.colCase}</th>
              <th className="pb-2 font-medium">{d.colAge}</th>
              <th className="pb-2 text-right font-medium">{d.colPriority}</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr
                key={c.id}
                className={`relative border-t border-slate-800 transition-colors duration-300 ${
                  scan === i ? "bg-sky-500/10" : ""
                }`}
              >
                <td className="py-3 pr-2">
                  <span className="block font-mono text-xs text-sky-300">{c.id}</span>
                  <span className="block text-slate-200">{pick(c.subject, lang)}</span>
                </td>
                <td className="py-3 font-mono tabular-nums text-slate-400">{c.age}h</td>
                <td className="py-3 text-right">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={c.priority}
                      initial={{ opacity: 0, y: 12, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${PRIORITY_STYLE[c.priority]} ${
                        c.flash ? "ring-2 ring-current" : ""
                      }`}
                    >
                      {c.priority}
                    </motion.span>
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-slate-500">{d.hint}</p>
      </div>

      {/* log */}
      <div className="flex flex-col rounded-2xl border border-slate-800 bg-black/50">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs text-slate-500">{d.log}</span>
        </div>
        <div className="min-h-[260px] flex-1 space-y-2 p-4 font-mono text-xs leading-relaxed" aria-live="polite">
          {log.length === 0 && <p className="text-slate-600">{d.idle}</p>}
          {log.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={l.tone === "ok" ? "text-emerald-300" : l.tone === "info" ? "text-sky-300" : "text-slate-500"}
            >
              <span className="mr-2 text-slate-600">&gt;</span>
              {l.text}
            </motion.p>
          ))}
          {running && <span className="inline-block h-3.5 w-2 animate-blink bg-sky-400" />}
        </div>
      </div>
    </div>
  );
}

export default function Demo({ t, lang }) {
  const [tab, setTab] = useState("lead");
  const tabs = [
    { id: "lead", label: t.demo.tabLead },
    { id: "cases", label: t.demo.tabCase },
  ];

  return (
    <section id="demo" className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.demo.kicker} title={t.demo.title} subtitle={t.demo.subtitle} />
        </Reveal>

        <Reveal>
          <div className="glow-border rounded-3xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div role="tablist" className="flex rounded-xl border border-slate-800 bg-slate-950/60 p-1">
                {tabs.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      tab === id ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === id && (
                      <motion.span
                        layoutId="demo-tab"
                        className="absolute inset-0 rounded-lg bg-sky-500/20 ring-1 ring-sky-500/40"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                ))}
              </div>
              <a
                href={REPOS[tab]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300"
              >
                <GithubIcon className="h-4 w-4" />
                {t.demo.repo}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {tab === "lead" ? <LeadDemo t={t} /> : <CaseDemo t={t} lang={lang} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
