import { useCallback } from 'react'
import { groups } from '../data/exercises'
import { sounds } from '../sound'
import { stepConfetti } from '../celebrate'
import HoldTimer from './HoldTimer'
import RepCounter from './RepCounter'
import OnceStep from './OnceStep'
import ChipButton from './ChipButton'
import Face from './Face'

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
        <button
          className="group btn btn-circle btn-lg btn-secondary border-2 border-white/40 shadow-lg shadow-secondary/40"
          onClick={onHome}
          aria-label="Към картата"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-7 transition-transform duration-500 ease-[var(--spring)] group-hover:-translate-y-0.5 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 11 12 4l8.5 7" />
            <path d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1V9.5" />
          </svg>
        </button>
        <div className="ex-step">
          <span className="ex-group">
            <Face pose={group.pose} size={26} /> {group.title}
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
