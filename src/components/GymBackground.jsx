// Фон за тренировка на устата – тъмен графит с диагонални ивици (в index.css)
// и бледи контури на устни, език, зъбче, издути бузи…
const icons = {
  lips: (
    <>
      <path d="M2.5 12c2.5-3.5 5-4.5 7-3.3.9.5 1.6.5 2.5 0 .9.5 1.6.5 2.5 0 2-1.2 4.5-.2 7 3.3-2.5 3.5-5.5 5-9.5 5s-7-1.5-9.5-5z" />
      <path d="M4.5 12c3 .9 12 .9 15 0" />
    </>
  ),
  smile: (
    <>
      <path d="M3.5 9c2.5 7.5 14.5 7.5 17 0-5.5 2-11.5 2-17 0z" />
      <path d="M6 11.2l.6 2M10 11.8v2.2M14 11.8v2.2M18 11.2l-.6 2" />
    </>
  ),
  tongue: (
    <>
      <path d="M4 9h16a8 8 0 0 1-16 0z" />
      <path d="M9 12.5v3a3 3 0 0 0 6 0v-3M12 13v2.5" />
    </>
  ),
  tooth: (
    <path d="M7.5 3C5 3 4 5 4 7c0 3 1.3 4.5 1.8 7.5C6.3 17.7 6.8 21 8.5 21s1.6-4.5 3.5-4.5 1.8 4.5 3.5 4.5 2.2-3.3 2.7-6.5C18.7 11.5 20 10 20 7c0-2-1-4-3.5-4-2 0-2.8 1-4.5 1S9.5 3 7.5 3z" />
  ),
  kiss: (
    <>
      <path d="M4 14c1.5-2 3-2.6 4.2-2 .6.3 1 .3 1.6 0 .6.3 1 .3 1.6 0 1.2-.6 2.7 0 4.2 2-1.5 2-3.5 3-5.8 3S5.5 16 4 14z" />
      <path d="M18 9.5s-3-1.9-3-4.2A1.7 1.7 0 0 1 18 4.2a1.7 1.7 0 0 1 3 1.1c0 2.3-3 4.2-3 4.2z" />
    </>
  ),
  puffed: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M5.5 10a3.5 3.5 0 0 0 0 5M18.5 10a3.5 3.5 0 0 1 0 5" />
      <circle cx="9.5" cy="10" r=".6" />
      <circle cx="14.5" cy="10" r=".6" />
      <path d="M10.5 15h3" />
    </>
  ),
  openMouth: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="8" />
      <ellipse cx="12" cy="15" rx="3" ry="2" />
    </>
  ),
  speech: (
    <>
      <path d="M4 5h16v10h-9l-4 4v-4H4z" />
      <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" />
    </>
  ),
  air: <path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M3 16h7" />,
}

// Позиции около ръбовете, за да не пречат на картите в средата.
const placed = [
  ['lips', 4, 6, 64, -12],
  ['tooth', 84, 4, 50, 12],
  ['air', 88, 30, 46, 0],
  ['puffed', 2, 34, 58, -8],
  ['kiss', 86, 56, 56, 10],
  ['tongue', 3, 62, 58, -10],
  ['openMouth', 90, 82, 44, 8],
  ['smile', 6, 88, 60, 14],
  ['speech', 46, 94, 44, -6],
]

export default function GymBackground() {
  return (
    <div className="gym" aria-hidden="true">
      {placed.map(([name, left, top, size, rotate], i) => (
        <svg
          key={i}
          className="gym-icon"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          style={{ left: `${left}%`, top: `${top}%`, rotate: `${rotate}deg`, animationDelay: `${-i * 1.7}s` }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[name]}
        </svg>
      ))}
    </div>
  )
}
