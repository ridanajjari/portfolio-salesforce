import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, ExternalLink, Grip, Headset, RotateCcw, UserPlus, X, Zap } from "lucide-react";
import { CASE_RULES, LEAD_COUNTRIES, LEAD_INDUSTRIES, LEAD_RULES, SAMPLE_CASES, matchLeadRule } from "../data/demo";
import { pick } from "../i18n/lang";
import { GithubIcon } from "./BrandIcons";
import { confettiFrom } from "./fx/confetti";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/*
  This section imitates the Salesforce Lightning look on purpose, so its colours are
  fixed (Lightning Design System values) and do not follow the site's light/dark theme.
*/

const REPOS = {
  lead: "https://github.com/ridanajjari/lead-auto-assignment",
  cases: "https://github.com/ridanajjari/case-escalation-automation",
};

const PRIORITY_STYLE = {
  Low: "bg-[#ecebea] text-[#444]",
  Medium: "bg-[#fff1c2] text-[#5c4000]",
  High: "bg-[#fe9339] text-[#3e1c00]",
  Critical: "bg-[#ba0517] text-white",
};

const card = "rounded-lg border border-[#c9c9c9] bg-white shadow-sm";
const brandBtn =
  "inline-flex items-center justify-center gap-2 rounded bg-[#0176d3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#014486] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0176d3] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
const neutralBtn =
  "inline-flex items-center justify-center rounded border border-[#c9c9c9] bg-white p-2 text-[#0176d3] transition-colors hover:bg-[#f3f3f3]";
const field =
  "mt-1 w-full rounded border border-[#c9c9c9] bg-white px-3 py-2 text-sm text-[#181818] outline-none focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3]";

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

function RecordHeader({ icon: Icon, color, kicker, title, children }) {
  return (
    <div className={`${card} flex flex-wrap items-center justify-between gap-3 p-4`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded text-white" style={{ background: color }}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-[#444]">{kicker}</p>
          <p className="text-lg font-bold leading-tight text-[#181818]">{title}</p>
        </div>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

// the chevron "Path" component from a Salesforce record page
function Path({ steps, current }) {
  return (
    <ol className={`${card} flex gap-1 overflow-hidden p-3`}>
      {steps.map((label, i) => {
        const done = current > i || current === steps.length - 1;
        const active = current === i && !done;
        return (
          <li
            key={label}
            className={`relative flex min-w-0 flex-1 items-center justify-center gap-1.5 px-4 py-2 text-center text-xs font-semibold transition-colors duration-300 ${
              done ? "bg-[#3ba755] text-white" : active ? "bg-[#014486] text-white" : "bg-[#ecebea] text-[#444]"
            }`}
            style={{
              clipPath:
                i === 0
                  ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
                  : "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)",
              borderRadius: i === 0 ? "999px 0 0 999px" : 0,
            }}
          >
            {done && <Check className="h-3.5 w-3.5 shrink-0" />}
            <span className="truncate">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

// Lead auto-assignment

function LeadDemo({ t }) {
  const d = t.demo.lead;
  const timers = useTimers();
  const toast = useRef(null);
  const [industry, setIndustry] = useState(LEAD_INDUSTRIES[0]);
  const [country, setCountry] = useState(LEAD_COUNTRIES[0]);
  // step: -1 idle, 0..3 path stage; checked: how many rules have been evaluated
  const [run, setRun] = useState({ step: -1, checked: 0, match: -1 });
  const busy = run.step >= 0 && run.step < 3;
  const rule = LEAD_RULES[run.match];

  useEffect(() => {
    if (run.step === 3) confettiFrom(toast.current);
  }, [run.step]);

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

  return (
    <div className="space-y-3">
      <RecordHeader icon={UserPlus} color="#f88962" kicker="Lead" title={d.new}>
        <button type="button" onClick={insert} disabled={busy} className={brandBtn}>
          {d.create}
        </button>
      </RecordHeader>

      <Path steps={d.steps} current={run.step} />

      <div className="grid gap-3 lg:grid-cols-[1fr_1.6fr]">
        <div className={`${card} p-4`}>
          <h4 className="border-b border-[#e5e5e5] pb-2 text-sm font-bold text-[#181818]">{t.demo.details}</h4>
          <label className="mt-3 block text-xs text-[#444]">
            {d.industry}
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                reset();
              }}
              className={field}
            >
              {LEAD_INDUSTRIES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-xs text-[#444]">
            {d.country}
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                reset();
              }}
              className={field}
            >
              {LEAD_COUNTRIES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <p className="mt-4 text-xs text-[#747474]">{d.idle}</p>
        </div>

        <div className={`${card} p-4`}>
          <h4 className="border-b border-[#e5e5e5] pb-2 text-sm font-bold text-[#181818]">{d.rules}</h4>
          <ul className="divide-y divide-[#e5e5e5]">
            {LEAD_RULES.map((r, i) => {
              const evaluated = run.checked > i;
              const hit = evaluated && i === run.match;
              return (
                <li
                  key={r.name}
                  className={`flex items-center gap-3 px-2 py-2.5 text-sm transition-colors duration-300 ${
                    hit ? "bg-[#ebf7e6]" : evaluated ? "opacity-50" : ""
                  }`}
                >
                  <span className="w-8 font-mono text-xs text-[#747474]">{r.priority}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[#0176d3]">{r.name}</span>
                    <span className="block text-xs text-[#444]">
                      {d.industry}: {r.industry ?? d.any} · {d.country}: {r.country ?? d.any}
                    </span>
                  </span>
                  <span className="grid h-6 w-6 place-items-center">
                    {evaluated && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={hit ? "text-[#2e844a]" : "text-[#747474]"}
                      >
                        {hit ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
                      </motion.span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* success toast */}
          <div className="mt-3 min-h-[60px]" aria-live="polite">
            <AnimatePresence>
              {run.step === 3 && rule && (
                <motion.div
                  ref={toast}
                  initial={{ opacity: 0, y: -14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="flex items-center gap-3 rounded bg-[#2e844a] px-4 py-3 text-white shadow-lg"
                >
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <span>
                    <span className="block text-sm font-bold">
                      {d.result} {rule.owner}
                    </span>
                    <span className="block font-mono text-xs opacity-90">
                      {d.by}: {rule.name}
                    </span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// SLA case escalation

const freshCases = () => SAMPLE_CASES.map((c) => ({ ...c }));

function CaseDemo({ t, lang }) {
  const d = t.demo.cases;
  const timers = useTimers();
  const runBtn = useRef(null);
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
    setScan(0);
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
        if (hit) setCases((cs) => cs.map((x, j) => (j === i ? { ...x, priority: rule.to, age: 0 } : x)));
      });
    });
    timers.after(350 + list.length * 520, () => {
      setScan(-1);
      setRuns((n) => n + 1);
      setLog((l) => [...l, { text: d.done(escalated, list.length - escalated), tone: "info" }]);
      if (escalated) confettiFrom(runBtn.current);
    });
  };

  return (
    <div className="space-y-3">
      <RecordHeader icon={Headset} color="#f2cf5b" kicker="Cases" title={d.listView}>
        <button ref={runBtn} type="button" onClick={runBatch} disabled={running} className={brandBtn}>
          <Zap className="h-4 w-4" />
          {running ? d.running : runs ? d.again : d.run}
        </button>
        <button type="button" onClick={reset} aria-label={d.reset} title={d.reset} className={neutralBtn}>
          <RotateCcw className="h-4 w-4" />
        </button>
      </RecordHeader>

      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <div className={`${card} overflow-hidden`}>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f3f3f3] text-xs uppercase tracking-wide text-[#444]">
              <tr>
                <th className="px-4 py-2 font-semibold">{d.colCase}</th>
                <th className="px-4 py-2 font-semibold">{d.colAge}</th>
                <th className="px-4 py-2 text-right font-semibold">{d.colPriority}</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c, i) => (
                <tr
                  key={c.id}
                  className={`border-t border-[#e5e5e5] transition-colors duration-300 ${
                    scan === i && running ? "bg-[#d8e6fe]" : ""
                  }`}
                >
                  <td className="px-4 py-2.5">
                    <span className="block font-mono text-xs text-[#0176d3]">{c.id}</span>
                    <span className="block text-[#181818]">{pick(c.subject, lang)}</span>
                  </td>
                  <td className="px-4 py-2.5 font-mono tabular-nums text-[#444]">{c.age}h</td>
                  <td className="px-4 py-2.5 text-right">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={c.priority}
                        initial={{ opacity: 0, y: 12, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${PRIORITY_STYLE[c.priority]}`}
                      >
                        {c.priority}
                      </motion.span>
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-[#e5e5e5] bg-[#fafaf9] px-4 py-2 text-xs text-[#444]">
            <span className="font-mono">{d.rules}</span>
            <br />
            {d.hint}
          </p>
        </div>

        <div className={`${card} flex flex-col`}>
          <h4 className="border-b border-[#e5e5e5] px-4 py-2.5 text-sm font-bold text-[#181818]">{d.log}</h4>
          <div className="min-h-[240px] flex-1 space-y-2 p-4 font-mono text-xs leading-relaxed" aria-live="polite">
            {log.length === 0 && <p className="text-[#747474]">{d.idle}</p>}
            {log.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  l.tone === "ok"
                    ? "font-semibold text-[#2e844a]"
                    : l.tone === "info"
                      ? "text-[#0176d3]"
                      : "text-[#747474]"
                }
              >
                {l.text}
              </motion.p>
            ))}
            {running && <span className="inline-block h-3.5 w-2 animate-blink bg-[#0176d3]" />}
          </div>
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
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.demo.kicker} title={t.demo.title} subtitle={t.demo.subtitle} />
        </Reveal>

        <Reveal from="scale">
          {/* browser window */}
          <div className="glow-border overflow-hidden rounded-2xl border border-ink-700 shadow-2xl shadow-brand-600/20">
            <div className="flex items-center gap-2 bg-[#dfe3e8] px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate rounded-full bg-white px-4 py-1 text-center font-mono text-xs text-[#444]">
                demo.lightning.force.com · {t.demo.simulation}
              </span>
            </div>

            {/* app header with tabs */}
            <div className="flex flex-wrap items-center gap-x-4 border-b-[3px] border-[#0176d3] bg-white px-4">
              <span className="flex items-center gap-2 py-3 text-[#181818]">
                <Grip className="h-5 w-5 text-[#747474]" />
                <span className="text-lg font-bold">{t.demo.app}</span>
              </span>
              <div role="tablist" className="flex">
                {tabs.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`relative px-4 py-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0176d3] ${
                      tab === id ? "bg-[#d8e6fe]/60 font-bold text-[#181818]" : "text-[#444] hover:bg-[#f3f3f3]"
                    }`}
                  >
                    {tab === id && (
                      <motion.span
                        layoutId="demo-tab"
                        className="absolute inset-x-0 top-0 h-[3px] bg-[#0176d3]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                ))}
              </div>
              <a
                href={REPOS[tab]}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 py-3 text-sm font-semibold text-[#0176d3] hover:underline"
              >
                <GithubIcon className="h-4 w-4" />
                {t.demo.repo}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="bg-[#f3f3f3] p-3 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {tab === "lead" ? <LeadDemo t={t} /> : <CaseDemo t={t} lang={lang} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
