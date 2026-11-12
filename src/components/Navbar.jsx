import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PROFILE, SECTIONS } from "../data/profile";

export default function Navbar({ t, lang, setLang, active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = () => (
    <div
      className="flex rounded-full border border-slate-700 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {["en", "fr"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            lang === l ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-bold text-white" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 text-sm text-white shadow-lg shadow-sky-500/30">
            RN
          </span>
          <span className="hidden sm:inline">{PROFILE.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === id ? "text-sky-400" : "text-slate-400 hover:text-white"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
          <div className="ml-3">
            <LangSwitch />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-800 px-4 pb-4 md:hidden">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 font-medium ${
                active === id ? "bg-slate-800 text-sky-400" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
