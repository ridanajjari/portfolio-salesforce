import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data/profile";

export default function Footer({ t }) {
  return (
    <footer className="border-t border-slate-800 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · {t.footer.built}
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 hover:text-sky-400">
          {t.footer.top}
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
