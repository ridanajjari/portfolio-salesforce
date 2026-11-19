// endless horizontal strip; the list is rendered twice so the loop is seamless
export default function Marquee({ items, reverse = false, renderItem }) {
  return (
    <div className="fade-edges group flex overflow-hidden">
      <ul
        className={`flex shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
