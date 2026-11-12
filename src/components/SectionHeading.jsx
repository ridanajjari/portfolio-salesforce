export default function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}
