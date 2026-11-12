import { useState } from "react";
import { ExternalLink, Mail, Send } from "lucide-react";
import { PROFILE } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
    setSent(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.errEmail;
    if (form.message.trim().length < 10) next.message = t.contact.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `${t.contact.subject} ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30";

  const links = [
    { href: `mailto:${PROFILE.email}`, label: "Email", value: PROFILE.email, Icon: Mail },
    { href: PROFILE.linkedin, label: "LinkedIn", value: "linkedin.com/in/rida-najjari", Icon: LinkedinIcon },
    { href: PROFILE.github, label: "GitHub", value: "github.com/ridanajjari", Icon: GithubIcon },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.contact.kicker} title={t.contact.title} subtitle={t.contact.text} />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-4">
              {links.map(({ href, label, value, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-[0_0_30px_-10px_rgba(14,165,233,0.5)]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-400 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-slate-500">{label}</span>
                    <span className="block truncate font-medium text-white">{value}</span>
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-600 group-hover:text-sky-400" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">
                  {t.contact.name}
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={`${field} ${errors.name ? "border-rose-500" : "border-slate-700"}`}
                  />
                  {errors.name && <span className="mt-1 block text-xs text-rose-400">{errors.name}</span>}
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  {t.contact.email}
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={`${field} ${errors.email ? "border-rose-500" : "border-slate-700"}`}
                  />
                  {errors.email && <span className="mt-1 block text-xs text-rose-400">{errors.email}</span>}
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-slate-300">
                {t.contact.message}
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  className={`${field} resize-y ${errors.message ? "border-rose-500" : "border-slate-700"}`}
                />
                {errors.message && <span className="mt-1 block text-xs text-rose-400">{errors.message}</span>}
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {t.contact.send}
              </button>

              <p className="mt-3 text-xs text-slate-500" aria-live="polite">
                {sent ? <span className="text-emerald-300">{t.contact.success}</span> : t.contact.note}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
