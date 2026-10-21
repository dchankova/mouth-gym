export default function OnceStep({ exercise, done, onComplete }) {
  return (
    <div className="trainer">
      <button className={`tap-button ${done ? 'finished' : ''}`} onClick={onComplete} disabled={done}>
        <span className="tap-face">{done ? '🤩' : exercise.emoji}</span>
        <span className="tap-count">{done ? 'Браво!' : 'Направих го!'}</span>
      </button>
    </div>
  )
}
