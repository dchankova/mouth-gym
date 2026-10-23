import { groups, keyPose } from '../data/exercises'
import Face from './Face'
import ChipButton from './ChipButton'

export default function MapScreen({
  session,
  done,
  doneCount: count,
  unlockedIndex,
  withTrainer,
  onWithTrainerChange,
  onOpen,
  onRestart,
}) {
  const total = session.length

  return (
    <div className="screen map">
      <header className="map-header">
        <img className="mascot" src={`${import.meta.env.BASE_URL}mouth.svg`} alt="" />
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

      <label className="trainer-toggle">
        <span className="trainer-toggle-icon">🏋️</span>
        <span className="trainer-toggle-text">
          <b>Упражнения с трейнер</b>
          <small>{withTrainer ? 'Включени в днешната тренировка' : 'Включи ги, ако трейнерът е под ръка'}</small>
        </span>
        <input
          type="checkbox"
          className="toggle toggle-secondary toggle-lg border-white/60 bg-white/15 text-white"
          checked={withTrainer}
          onChange={(e) => onWithTrainerChange(e.target.checked)}
        />
      </label>

      {groups.map((g) => (
        <section key={g.id} className="map-group" style={{ '--accent': g.color }}>
          <h2 className="map-group-title">
            <Face pose={g.pose} size={36} /> {g.title}
          </h2>
          <div className="map-path">
            {session.map((ex, i) => {
              if (ex.group !== g.id) return null
              const isDone = done.has(ex.id)
              const isCurrent = i === unlockedIndex
              return (
                <button
                  key={ex.id}
                  className={`stone ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => onOpen(i)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  title={ex.title}
                >
                  <span className="stone-face">
                    <Face pose={keyPose(ex)} size={64} zoom />
                  </span>
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
          <ChipButton icon="play" tone="green" size="lg" attention onClick={() => onOpen(unlockedIndex)}>
            {count === 0 ? 'Започни!' : 'Продължи!'}
          </ChipButton>
        )}
        {count > 0 && (
          <ChipButton icon="reset" tone="violet" size="sm" onClick={onRestart}>
            Започни отначало
          </ChipButton>
        )}
      </div>
    </div>
  )
}
