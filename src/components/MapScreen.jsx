import { exercises, groups } from '../data/exercises'

export default function MapScreen({ done, unlockedIndex, onOpen, onRestart }) {
  const count = done.size
  const total = exercises.length

  return (
    <div className="screen map">
      <header className="map-header">
        <div className="mascot">🦷</div>
        <h1 className="map-title">Гимнастика за устата</h1>
        <p className="map-sub">
          {count === 0 ? 'Хайде да тренираме!' : count === total ? 'Всичко е готово днес! 🏆' : 'Продължавай, супер си!'}
        </p>
        <div className="big-progress">
          <div className="big-progress-bar" style={{ width: `${(count / total) * 100}%` }} />
          <span className="big-progress-text">
            ⭐ {count} / {total}
          </span>
        </div>
      </header>

      {groups.map((g) => (
        <section key={g.id} className="map-group" style={{ '--accent': g.color }}>
          <h2 className="map-group-title">
            <span>{g.emoji}</span> {g.title}
          </h2>
          <div className="map-path">
            {exercises.map((ex, i) => {
              if (ex.group !== g.id) return null
              const isDone = done.has(ex.id)
              const isCurrent = i === unlockedIndex
              const locked = !isDone && i > unlockedIndex
              return (
                <button
                  key={ex.id}
                  className={`stone ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${locked ? 'locked' : ''}`}
                  disabled={locked}
                  onClick={() => onOpen(i)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  title={ex.title}
                >
                  <span className="stone-emoji">{locked ? '🔒' : ex.emoji}</span>
                  <span className="stone-num">{i + 1}</span>
                  {isDone && <span className="stone-star">⭐</span>}
                </button>
              )
            })}
          </div>
        </section>
      ))}

      <div className="map-actions">
        {unlockedIndex < total && (
          <button className="play-btn" onClick={() => onOpen(unlockedIndex)}>
            ▶ {count === 0 ? 'Започни!' : 'Продължи!'}
          </button>
        )}
        {count > 0 && (
          <button className="link-btn" onClick={onRestart}>
            ↺ Започни отначало
          </button>
        )}
      </div>
    </div>
  )
}
