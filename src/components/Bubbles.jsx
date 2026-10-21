const bubbles = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 20 + ((i * 53) % 60),
  duration: 12 + ((i * 7) % 14),
  delay: -((i * 3.1) % 20),
}))

// Плуващи балончета на фона
export default function Bubbles() {
  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
