import { useCallback } from 'react'
import { groups } from '../data/exercises'
import { sounds } from '../sound'
import { stepConfetti } from '../celebrate'
import HoldTimer from './HoldTimer'
import RepCounter from './RepCounter'
import OnceStep from './OnceStep'
import ChipButton from './ChipButton'

const trainers = { hold: HoldTimer, count: RepCounter, once: OnceStep }

export default function ExerciseScreen({ exercise, index, total, done, onComplete, onNext, onPrev, onHome }) {
  const group = groups.find((g) => g.id === exercise.group)
  const Trainer = trainers[exercise.type]
  const isLast = index === total - 1

  const complete = useCallback(() => {
    sounds.fanfare()
    stepConfetti()
    onComplete(exercise.id)
  }, [exercise.id, onComplete])

  return (
    <div className="screen exercise" style={{ '--accent': group.color }}>
      <header className="ex-header">
        <button className="icon-btn" onClick={onHome} aria-label="Към картата">
          🗺️
        </button>
        <div className="ex-step">
          <span className="ex-group">
            {group.emoji} {group.title}
          </span>
          <span className="ex-count">
            Стъпка {index + 1} от {total}
          </span>
        </div>
        <div className="mini-progress">
          <div className="mini-progress-bar" style={{ width: `${((index + (done ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </header>

      <main className="ex-main" key={exercise.id}>
        <h1 className="ex-title">{exercise.title}</h1>
        <p className="ex-text">{exercise.text}</p>
        {group.tip && <p className="ex-tip">💡 {group.tip}</p>}

        <Trainer exercise={exercise} done={done} onComplete={complete} />
      </main>

      <footer className="ex-nav">
        <ChipButton icon="back" onClick={onPrev} disabled={index === 0}>
          Назад
        </ChipButton>
        <ChipButton icon={isLast ? '🏆' : 'next'} tone="pink" attention={done} onClick={onNext}>
          {isLast ? 'Финал' : 'Напред'}
        </ChipButton>
      </footer>
    </div>
  )
}
