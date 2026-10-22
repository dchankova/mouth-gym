// Нощно небе – звезди, луна и от време на време падаща звезда.
// Позициите са „псевдослучайни“, но едни и същи при всяко зареждане.
const stars = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 47.3) % 100,
  top: (i * 29.7) % 100,
  size: 1 + ((i * 7) % 3),
  delay: -((i * 0.37) % 4),
  duration: 2 + ((i * 3) % 4),
}))

export default function SpaceBackground() {
  return (
    <div className="space" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      <div className="moon" />
      <span className="shooting-star" />
    </div>
  )
}
