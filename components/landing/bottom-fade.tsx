// Progressive blur: a masked backdrop-blur layer whose opacity ramps from
// 0 at the top to full at the bottom, so the photo stays crisp up top and
// smoothly dissolves into a frosted, legible surface behind the card text.
export function BottomFade() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[85%] backdrop-blur-2xl bg-black/35"
      style={{
        maskImage: "linear-gradient(to top, black 35%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 35%, transparent 100%)",
      }}
      aria-hidden
    />
  )
}
