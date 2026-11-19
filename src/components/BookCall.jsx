import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CalendarPlus, Clock, Mail, Video, X } from "lucide-react";
import { PROFILE } from "../data/profile";

const SLOTS = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "17:00"];
const DURATION_MIN = 30;
const TIMEZONE = "Europe/Paris";

const pad = (n) => String(n).padStart(2, "0");

// the next 10 working days, starting tomorrow
function nextWorkingDays(count = 10) {
  const days = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

// "20261123T093000" (wall-clock time, the time zone is passed separately)
function stamp(day, time, addMinutes = 0) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + addMinutes;
  return `${day.getFullYear()}${pad(day.getMonth() + 1)}${pad(day.getDate())}T${pad(Math.floor(total / 60))}${pad(total % 60)}00`;
}

// No backend: the visitor's own calendar or email app sends the invitation.
export default function BookCall({ t, lang, onClose }) {
  const b = t.book;
  const days = useMemo(() => nextWorkingDays(), []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(null);
  const [name, setName] = useState("");
  const panel = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const fmtDay = (d, opts) => new Intl.DateTimeFormat(lang, opts).format(d);
  const chosen = days[day];
  const when = slot && `${fmtDay(chosen, { weekday: "long", day: "numeric", month: "long" })} · ${slot}`;
  const title = `${b.eventTitle}${name.trim() ? ` · ${name.trim()}` : ""}`;

  const googleUrl =
    slot &&
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(chosen, slot)}/${stamp(chosen, slot, DURATION_MIN)}&ctz=${encodeURIComponent(TIMEZONE)}&add=${encodeURIComponent(PROFILE.email)}&details=${encodeURIComponent(b.eventDetails)}`;
  const mailUrl =
    slot &&
    `mailto:${PROFILE.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${b.mailBody}\n\n${when} (${b.paris})\n\n${name.trim()}`)}`;

  const action =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300";
  const off = "pointer-events-none opacity-40";

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid grid-cols-[minmax(0,1fr)] place-items-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="glow-border relative w-full max-w-2xl rounded-3xl border border-slate-700/70 bg-slate-900 p-6 shadow-2xl shadow-sky-950 outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={b.close}
          className="absolute right-4 top-4 z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">{b.kicker}</p>
        <h2 id="book-title" className="mt-2 pr-10 font-display text-2xl font-bold text-white sm:text-3xl">
          {b.title}
        </h2>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-sky-400" />
            {DURATION_MIN} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Video className="h-4 w-4 text-sky-400" />
            {b.where}
          </span>
        </p>

        {/* day */}
        <h3 className="mt-7 text-sm font-semibold text-white">{b.pickDay}</h3>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2" role="group" aria-label={b.pickDay}>
          {days.map((d, i) => (
            <motion.button
              key={d.toDateString()}
              type="button"
              onClick={() => setDay(i)}
              aria-pressed={day === i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.03 }}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                day === i
                  ? "border-sky-400 bg-sky-500/20 text-white shadow-[0_0_24px_-6px_rgba(56,189,248,0.8)]"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              <span className="block text-[11px] uppercase tracking-wider">{fmtDay(d, { weekday: "short" })}</span>
              <span className="block font-display text-xl font-bold">{d.getDate()}</span>
              <span className="block text-[11px]">{fmtDay(d, { month: "short" })}</span>
            </motion.button>
          ))}
        </div>

        {/* time */}
        <h3 className="mt-5 text-sm font-semibold text-white">
          {b.pickTime} <span className="font-normal text-slate-500">({b.paris})</span>
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-label={b.pickTime}>
          {SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              aria-pressed={slot === s}
              className={`rounded-xl border px-3 py-2.5 font-mono text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                slot === s
                  ? "scale-105 border-sky-400 bg-sky-500 text-white shadow-lg shadow-sky-500/40"
                  : "border-slate-700 text-slate-300 hover:border-sky-500/60 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="mt-5 block text-sm font-semibold text-white">
          {b.name} <span className="font-normal text-slate-500">({b.optional})</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 font-normal text-white outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
          />
        </label>

        <p className="mt-5 flex min-h-[1.5rem] items-center gap-2 text-sm" aria-live="polite">
          {slot ? (
            <>
              <CalendarCheck className="h-4 w-4 shrink-0 text-emerald-300" />
              <span className="font-medium capitalize text-emerald-300">{when}</span>
            </>
          ) : (
            <span className="text-slate-500">{b.hint}</span>
          )}
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={googleUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!slot}
            className={`${action} bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 hover:shadow-sky-500/50 ${slot ? "" : off}`}
          >
            <CalendarPlus className="h-4 w-4" />
            {b.google}
          </a>
          <a
            href={mailUrl || undefined}
            aria-disabled={!slot}
            className={`${action} border border-slate-700 text-white hover:border-sky-500/60 hover:bg-slate-800 ${slot ? "" : off}`}
          >
            <Mail className="h-4 w-4" />
            {b.email}
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-500">{b.note}</p>
      </motion.div>
    </motion.div>
  );
}
