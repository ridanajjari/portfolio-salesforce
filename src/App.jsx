import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import About from "./components/About";
import BookCall from "./components/BookCall";
import Contact from "./components/Contact";
import Cta from "./components/Cta";
import Demo from "./components/Demo";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import CursorGlow from "./components/fx/CursorGlow";
import Preloader from "./components/fx/Preloader";
import ScrollProgress from "./components/fx/ScrollProgress";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { SECTIONS } from "./data/profile";
import { getInitialLang } from "./i18n/lang";
import { UI } from "./i18n/ui";

// the intro plays once per browser session and never for reduced-motion users
function shouldPlayIntro() {
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem("introSeen");
  } catch {
    // storage unavailable (e.g. private mode): just play it
    return true;
  }
}

// App

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [active, setActive] = useState("home");
  const [intro, setIntro] = useState(shouldPlayIntro);
  const [booking, setBooking] = useState(false);
  const openBooking = useCallback(() => setBooking(true), []);
  const closeBooking = useCallback(() => setBooking(false), []);
  const t = UI[lang];

  const endIntro = useCallback(() => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      // storage unavailable: the intro simply plays again next time
    }
    setIntro(false);
  }, []);

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

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-300 selection:bg-sky-500/30 selection:text-white">
        <AnimatePresence>{intro && <Preloader onDone={endIntro} />}</AnimatePresence>
        <ScrollProgress />
        <CursorGlow />
        <Navbar t={t} lang={lang} setLang={setLang} active={active} onBook={openBooking} />
        <AnimatePresence>{booking && <BookCall t={t} lang={lang} onClose={closeBooking} />}</AnimatePresence>
        <main>
          <Hero t={t} ready={!intro} onBook={openBooking} />
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
