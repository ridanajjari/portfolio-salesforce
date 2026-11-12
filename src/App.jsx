import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { SECTIONS } from "./data/profile";
import { getInitialLang } from "./i18n/lang";
import { UI } from "./i18n/ui";

// App

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [active, setActive] = useState("home");
  const t = UI[lang];

  // save language choice
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      
    }
  }, [lang]);

  // highlight active section in the navbar
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-300 selection:bg-sky-500/30 selection:text-white">
      <Navbar t={t} lang={lang} setLang={setLang} active={active} />
      <main>
        <Hero t={t} lang={lang} />
        <Experience t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
