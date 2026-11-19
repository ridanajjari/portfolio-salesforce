import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";

// Ctrl/Cmd + K menu: type to filter, arrows to move, Enter to run.
export default function CommandPalette({ t, commands, onClose }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef(null);
  const list = useRef(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [query, commands]);
  const current = Math.min(index, Math.max(shown.length - 1, 0));

  useEffect(() => {
    input.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const run = (cmd) => {
    onClose();
    cmd?.run();
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((current + 1) % Math.max(shown.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((current - 1 + shown.length) % Math.max(shown.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(shown[current]);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[92] grid grid-cols-[minmax(0,1fr)] items-start justify-items-center bg-ink-950/70 p-4 pt-[14vh] backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t.palette.title}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKey}
        initial={{ opacity: 0, y: -24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="glow-border w-full max-w-xl overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl"
      >
        <label className="flex items-center gap-3 border-b border-ink-800 px-4 py-3.5">
          <Search className="h-5 w-5 shrink-0 text-brand-400" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder={t.palette.placeholder}
            aria-label={t.palette.placeholder}
            className="w-full bg-transparent text-heading placeholder-ink-500 outline-none"
          />
          <kbd className="rounded border border-ink-700 px-1.5 py-0.5 font-mono text-[10px] text-ink-400">Esc</kbd>
        </label>

        <ul ref={list} role="listbox" aria-label={t.palette.title} className="max-h-[50vh] overflow-y-auto p-2">
          {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-500">{t.palette.empty}</li>}
          {shown.map((c, i) => {
            const Icon = c.icon;
            const active = i === current;
            return (
              <li key={c.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => run(c)}
                  onMouseMove={() => setIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active ? "bg-brand-500/15 text-heading" : "text-ink-300"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                      active ? "bg-brand-500 text-white" : "bg-ink-800 text-brand-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">{c.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">{c.group}</span>
                  {active && <CornerDownLeft className="h-3.5 w-3.5 text-ink-500" />}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
