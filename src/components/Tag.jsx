export default function Tag({ children }) {
  return (
    <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300">
      {children}
    </span>
  );
}
