import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import {
  Briefcase,
  CalendarPlus,
  Download,
  FolderGit2,
  Home,
  Languages,
  Mail,
  PlayCircle,
  SunMoon,
  User,
  Wrench,
} from "lucide-react";
import About from "./components/About";
import BookCall from "./components/BookCall";
import { GithubIcon, LinkedinIcon } from "./components/BrandIcons";
import CommandPalette from "./components/CommandPalette";
import Contact from "./components/Contact";
import Cta from "./components/Cta";
import Demo from "./components/Demo";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import CursorRing from "./components/fx/CursorRing";
import Preloader from "./components/fx/Preloader";
import ScrollProgress from "./components/fx/ScrollProgress";
import SkyBackground from "./components/fx/SkyBackground";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { PROFILE, SECTIONS } from "./data/profile";
import { getInitialLang } from "./i18n/lang";
import { UI } from "./i18n/ui";

const SECTION_ICONS = {
  home: Home,
  about: User,
  experience: Briefcase,
  demo: PlayCircle,
  projects: FolderGit2,
  skills: Wrench,
  contact: Mail,
};

const prefersReducedMotion = () => !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// the intro plays once per browser session and never for reduced-motion users
function shouldPlayIntro() {
  try {
    if (prefersReducedMotion()) return false;
    return !sessionStorage.getItem("introSeen");
  } catch {
    // storage unavailable (e.g. private mode): just play it
    return true;
  }
}

function savedTheme() {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    // storage unavailable: behave as if nothing was saved
    return null;
  }
}

// App

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [active, setActive] = useState("home");
  const [intro, setIntro] = useState(shouldPlayIntro);
  const [booking, setBooking] = useState(false);
  const [palette, setPalette] = useState(false);
  // index.html sets data-theme before first paint (saved choice, else the device setting)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const t = UI[lang];

  const openBooking = useCallback(() => setBooking(true), []);
  const closeBooking = useCallback(() => setBooking(false), []);
  const closePalette = useCallback(() => setPalette(false), []);

  const endIntro = useCallback(() => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      // storage unavailable: the intro simply plays again next time
    }
    setIntro(false);
  }, []);

  const applyTheme = useCallback((next) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  // manual switch: remembered, and revealed as a circle growing from the click point
  const toggleTheme = useCallback(
    (e) => {
      const next = theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // storage unavailable: the choice lasts for this visit only
      }
      const root = document.documentElement;
      if (e?.clientX) {
        root.style.setProperty("--reveal-x", `${e.clientX}px`);
        root.style.setProperty("--reveal-y", `${e.clientY}px`);
      }
      if (document.startViewTransition && !prefersReducedMotion())
        document.startViewTransition(() => flushSync(() => applyTheme(next)));
      else applyTheme(next);
    },
    [theme, applyTheme],
  );

  // until the visitor picks a theme, keep following the device setting
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq?.addEventListener) return;
    const onChange = (e) => !savedTheme() && applyTheme(e.matches ? "light" : "dark");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [applyTheme]);

  // save language choice
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // storage unavailable (e.g. private mode): the choice just isn't persisted
    }
  }, [lang]);

  // highlight active section in the navbar
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Ctrl/Cmd + K opens the command menu
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = useMemo(() => {
    const p = UI[lang].palette;
    const open = (url) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...SECTIONS.map((id) => ({
        id,
        group: p.go,
        label: UI[lang].nav[id],
        icon: SECTION_ICONS[id],
        run: () => document.getElementById(id)?.scrollIntoView(),
      })),
      { id: "book", group: p.action, label: UI[lang].book.button, icon: CalendarPlus, run: openBooking },
      { id: "theme", group: p.action, label: p.theme, icon: SunMoon, run: () => toggleTheme() },
      {
        id: "lang",
        group: p.action,
        label: p.lang,
        icon: Languages,
        run: () => setLang(lang === "en" ? "fr" : "en"),
      },
      {
        id: "cv",
        group: p.action,
        label: UI[lang].hero.download,
        icon: Download,
        run: () => Object.assign(document.createElement("a"), { href: PROFILE.cv, download: "" }).click(),
      },
      { id: "github", group: p.link, label: "GitHub", icon: GithubIcon, run: open(PROFILE.github) },
      { id: "linkedin", group: p.link, label: "LinkedIn", icon: LinkedinIcon, run: open(PROFILE.linkedin) },
    ];
  }, [lang, openBooking, toggleTheme]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip font-sans text-ink-300 selection:bg-brand-500/30 selection:text-heading">
        <SkyBackground />
        <AnimatePresence>{intro && <Preloader onDone={endIntro} />}</AnimatePresence>
        <ScrollProgress />
        <CursorRing />
        <Navbar
          t={t}
          lang={lang}
          setLang={setLang}
          active={active}
          onBook={openBooking}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <AnimatePresence>{booking && <BookCall t={t} lang={lang} onClose={closeBooking} />}</AnimatePresence>
        <AnimatePresence>
          {palette && <CommandPalette t={t} commands={commands} onClose={closePalette} />}
        </AnimatePresence>
        <main>
          <Hero t={t} ready={!intro} onBook={openBooking} theme={theme} />
          <About t={t} />
          <Experience t={t} lang={lang} />
          <Demo t={t} lang={lang} />
          <Projects t={t} lang={lang} />
          <Skills t={t} lang={lang} />
          <Cta t={t} onBook={openBooking} />
          <Contact t={t} onBook={openBooking} />
        </main>
        <Footer t={t} />
      </div>
    </MotionConfig>
  );
}
