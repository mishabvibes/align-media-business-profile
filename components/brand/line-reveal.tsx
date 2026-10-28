// Headline lines rise out of a mask, one after another (design.md §6):
// 600ms, cubic-bezier(.2,.7,.1,1), 80ms stagger. Per line, not per letter.
// Pure CSS (.line-reveal in globals.css) so the headline paints with the
// first render instead of waiting for hydration.

type LineRevealProps = {
  lines: readonly React.ReactNode[]
  /** Seconds before the first line starts. */
  delay?: number
}

export function LineReveal({ lines, delay = 0.1 }: LineRevealProps) {
  return lines.map((line, i) => (
    // Bottom padding keeps descenders inside the mask at line-height 0.92;
    // the negative margin gives the space back so the leading is unchanged.
    <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <span
        className="line-reveal block"
        style={{ "--i": i, "--line-reveal-delay": `${delay}s` } as React.CSSProperties}
      >
        {line}
      </span>
      {/* Keeps a word gap between lines in the heading's text (screen readers, search). */}
      {i < lines.length - 1 && " "}
    </span>
  ))
}
