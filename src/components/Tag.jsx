export default function Tag({ children }) {
  return (
    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
      {children}
    </span>
  );
}
