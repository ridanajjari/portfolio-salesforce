import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// types, pauses, deletes, moves to the next word
export default function Typewriter({ words, className = "" }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ words, index: 0, text: "", deleting: false });

  // language switch: restart on the new word list
  const s = state.words === words ? state : { words, index: 0, text: "", deleting: false };
  const word = words[s.index % words.length];

  useEffect(() => {
    if (reduce) return;
    let delay = s.deleting ? 35 : 70;
    if (!s.deleting && s.text === word) delay = 1600;
    if (s.deleting && s.text === "") delay = 300;
    const id = setTimeout(() => {
      if (!s.deleting && s.text === word) setState({ ...s, deleting: true });
      else if (s.deleting && s.text === "") setState({ ...s, deleting: false, index: (s.index + 1) % words.length });
      else setState({ ...s, text: word.slice(0, s.text.length + (s.deleting ? -1 : 1)) });
    }, delay);
    return () => clearTimeout(id);
    // `s` is rebuilt every render; its fields below are what matter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.text, s.deleting, s.index, word, words, reduce]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {reduce ? words[0] : s.text}
        <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 animate-blink bg-brand-400" />
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
