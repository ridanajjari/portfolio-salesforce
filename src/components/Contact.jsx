import { useRef, useState } from "react";
import { CalendarPlus, CheckCircle2, ExternalLink, Loader2, Mail, Send } from "lucide-react";
import { PROFILE } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { confettiFrom } from "./fx/confetti";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact({ t, onBook }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  // idle | sending | sent | failed
  const [status, setStatus] = useState("idle");
  const [trap, setTrap] = useState("");
  const submitBtn = useRef(null);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  // Netlify Forms: the site itself receives the POST and emails the submission to the owner.
  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.errEmail;
    if (form.message.trim().length < 10) next.message = t.contact.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          "bot-field": trap,
          subject: `${t.contact.subject} ${form.name.trim()}`,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      confettiFrom(submitBtn.current);
    } catch {
      // network error, or the form backend is not available (e.g. local development)
      setStatus("failed");
    }
  };

  const field =
    "mt-2 w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-heading placeholder-ink-500 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

  const links = [
    { href: `mailto:${PROFILE.email}`, label: "Email", value: PROFILE.email, Icon: Mail },
    { href: PROFILE.linkedin, label: "LinkedIn", value: "linkedin.com/in/rida-najjari", Icon: LinkedinIcon },
    { href: PROFILE.github, label: "GitHub", value: "github.com/ridanajjari", Icon: GithubIcon },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-ink-900/30 px-4 py-24 sm:px-6">
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
                  className="group flex items-center gap-4 rounded-2xl border border-ink-800 bg-ink-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-[0_0_30px_-10px_rgba(1,118,211,0.5)]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-500">{label}</span>
                    <span className="block truncate font-medium text-heading">{value}</span>
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-ink-600 group-hover:text-brand-400" />
                </a>
              ))}
              <button
                type="button"
                onClick={onBook}
                className="glow-border group flex w-full items-center gap-4 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 text-left transition-all hover:-translate-y-0.5 hover:bg-brand-500/20"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                  <CalendarPlus className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-brand-300">{t.book.kicker}</span>
                  <span className="block font-medium text-heading">{t.book.button}</span>
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-ink-800 bg-ink-900/60 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink-300">
                  {t.contact.name}
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={`${field} ${errors.name ? "border-brand-500" : "border-ink-700"}`}
                  />
                  {errors.name && <span className="mt-1 block text-xs text-brand-400">{errors.name}</span>}
                </label>
                <label className="block text-sm font-medium text-ink-300">
                  {t.contact.email}
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={`${field} ${errors.email ? "border-brand-500" : "border-ink-700"}`}
                  />
                  {errors.email && <span className="mt-1 block text-xs text-brand-400">{errors.email}</span>}
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-ink-300">
                {t.contact.message}
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  className={`${field} resize-y ${errors.message ? "border-brand-500" : "border-ink-700"}`}
                />
                {errors.message && <span className="mt-1 block text-xs text-brand-400">{errors.message}</span>}
              </label>

              {/* honeypot: hidden from people, filled in by spam bots */}
              <label className="hidden" aria-hidden="true">
                Leave this field empty
                <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </label>

              <button
                ref={submitBtn}
                type="submit"
                disabled={status === "sending"}
                className="mt-6 disabled:cursor-wait disabled:opacity-70 inline-flex w-full items-center justify-center gap-2 rounded-xl btn-primary px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 sm:w-auto"
              >
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {status === "sending" ? t.contact.sending : t.contact.send}
              </button>

              <div className="mt-4 min-h-[2.5rem] text-sm" aria-live="polite">
                {status === "sent" && (
                  <p className="flex items-center gap-2 rounded-xl border border-accent-400/40 bg-accent-400/10 px-4 py-3 font-medium text-accent-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    {t.contact.success}
                  </p>
                )}
                {status === "failed" && (
                  <p className="rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-ink-300">
                    {t.contact.failed}{" "}
                    <a href={`mailto:${PROFILE.email}`} className="font-semibold text-brand-400 underline">
                      {PROFILE.email}
                    </a>
                  </p>
                )}
                {(status === "idle" || status === "sending") && (
                  <p className="text-xs text-ink-500">{t.contact.note}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
