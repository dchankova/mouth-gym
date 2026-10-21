export default function RepStars({ total, done, groupSize }) {
  return (
    <div className="rep-stars">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`rep-star ${i < done ? 'on' : ''} ${groupSize && i > 0 && i % groupSize === 0 ? 'gap' : ''}`}
        >
          {i < done ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  )
}
