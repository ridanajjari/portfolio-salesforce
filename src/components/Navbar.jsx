import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Menu, Moon, Sun, X } from "lucide-react";
import { PROFILE, SECTIONS } from "../data/profile";

function LangSwitch({ lang, setLang }) {
  return (
    <div
      className="flex rounded-full border border-ink-700 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {["en", "fr"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
            lang === l ? "bg-brand-500 text-white" : "text-ink-400 hover:text-heading"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ t, theme, onToggle }) {
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
      title={theme === "dark" ? t.theme.toLight : t.theme.toDark}
      className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-brand-400 hover:text-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar({ t, lang, setLang, active, onBook, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-ink-800 bg-ink-950/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-bold text-heading" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-500 text-sm text-white shadow-lg shadow-brand-500/30 transition-transform duration-500 hover:rotate-[360deg]">
            RN
          </span>
          <span className="hidden sm:inline xl:hidden 2xl:inline">{PROFILE.name}</span>
        </a>

        <div className="hidden items-center gap-0.5 xl:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                active === id ? "text-heading" : "text-ink-400 hover:text-heading"
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-brand-500/15 ring-1 ring-brand-500/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t.nav[id]}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <ThemeToggle t={t} theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={onBook}
            className="btn-primary ml-1 hidden items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 xl:inline-flex"
          >
            <CalendarPlus className="h-4 w-4" />
            {t.book.button}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-ink-300 hover:bg-ink-800 xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-800 px-4 pb-4 xl:hidden">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 font-medium ${
                active === id ? "bg-ink-800 text-brand-400" : "text-ink-300 hover:bg-ink-800"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="btn-primary mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold"
          >
            <CalendarPlus className="h-4 w-4" />
            {t.book.button}
          </button>
        </div>
      )}
    </header>
  );
}
