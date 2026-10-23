import { useCallback, useEffect, useMemo, useState } from 'react'
import { exercises } from './data/exercises'
import { setMuted } from './sound'
import GymBackground from './components/GymBackground'
import MapScreen from './components/MapScreen'
import ExerciseScreen from './components/ExerciseScreen'
import FinishScreen from './components/FinishScreen'

const STORAGE_KEY = 'mouth-gym-progress'
const SETTINGS_KEY = 'mouth-gym-settings'
const today = () => new Date().toISOString().slice(0, 10)

// Настройките (напр. дали има трейнер) се помнят за постоянно, не само за деня.
function loadWithTrainer() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY))?.withTrainer === true
  } catch {
    return false
  }
}

// Прогресът се пази за деня – на следващия ден картата започва на чисто.
function loadDone() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved?.date === today()) return new Set(saved.done)
  } catch {
    // няма запазен прогрес
  }
  return new Set()
}

export default function App() {
  const [done, setDone] = useState(loadDone)
  const [screen, setScreen] = useState('map')
  const [index, setIndex] = useState(0)
  const [muted, setMutedState] = useState(false)
  const [withTrainer, setWithTrainer] = useState(loadWithTrainer)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today(), done: [...done] }))
    } catch {
      // браузърът не позволява запис
    }
  }, [done])

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ withTrainer }))
    } catch {
      // браузърът не позволява запис
    }
  }, [withTrainer])

  useEffect(() => setMuted(muted), [muted])

  // Упражненията за днешната тренировка – тези с трейнер само ако са включени.
  const session = useMemo(() => exercises.filter((ex) => withTrainer || !ex.optional), [withTrainer])
  const doneCount = session.filter((ex) => done.has(ex.id)).length

  // Първото неизпълнено упражнение – подчертано на картата като следващо.
  const unlockedIndex = useMemo(() => {
    const i = session.findIndex((ex) => !done.has(ex.id))
    return i === -1 ? session.length : i
  }, [session, done])

  const markDone = useCallback((id) => setDone((d) => (d.has(id) ? d : new Set(d).add(id))), [])

  const open = (i) => {
    setIndex(i)
    setScreen('exercise')
  }

  const next = () => {
    if (index === session.length - 1) setScreen('finish')
    else setIndex(index + 1)
  }

  const restart = () => {
    setDone(new Set())
    setIndex(0)
    setScreen('map')
  }

  const exercise = session[index]

  return (
    <div className="app">
      <GymBackground />
      <button
        className="btn btn-circle btn-lg fixed top-3 right-3 z-10 border-white/70 bg-white/50 text-xl shadow-lg backdrop-blur-md"
        onClick={() => setMutedState((m) => !m)}
        aria-label="Звук"
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {screen === 'map' && (
        <MapScreen
          session={session}
          done={done}
          doneCount={doneCount}
          unlockedIndex={unlockedIndex}
          withTrainer={withTrainer}
          onWithTrainerChange={setWithTrainer}
          onOpen={open}
          onRestart={restart}
        />
      )}

      {screen === 'exercise' && (
        <ExerciseScreen
          exercise={exercise}
          index={index}
          total={session.length}
          done={done.has(exercise.id)}
          onComplete={markDone}
          onNext={next}
          onPrev={() => setIndex(Math.max(0, index - 1))}
          onHome={() => setScreen('map')}
        />
      )}

      {screen === 'finish' && (
        <FinishScreen count={doneCount} total={session.length} onHome={() => setScreen('map')} onRestart={restart} />
      )}
    </div>
  )
}
