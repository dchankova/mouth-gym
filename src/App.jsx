import { useCallback, useEffect, useMemo, useState } from 'react'
import { exercises } from './data/exercises'
import { setMuted } from './sound'
import SpaceBackground from './components/SpaceBackground'
import MapScreen from './components/MapScreen'
import ExerciseScreen from './components/ExerciseScreen'
import FinishScreen from './components/FinishScreen'

const STORAGE_KEY = 'mouth-gym-progress'
const today = () => new Date().toISOString().slice(0, 10)

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today(), done: [...done] }))
    } catch {
      // браузърът не позволява запис
    }
  }, [done])

  useEffect(() => setMuted(muted), [muted])

  // Първото неизпълнено упражнение – подчертано на картата като следващо.
  const unlockedIndex = useMemo(() => {
    const i = exercises.findIndex((ex) => !done.has(ex.id))
    return i === -1 ? exercises.length : i
  }, [done])

  const markDone = useCallback((id) => setDone((d) => (d.has(id) ? d : new Set(d).add(id))), [])

  const open = (i) => {
    setIndex(i)
    setScreen('exercise')
  }

  const next = () => {
    if (index === exercises.length - 1) setScreen('finish')
    else setIndex(index + 1)
  }

  const restart = () => {
    setDone(new Set())
    setIndex(0)
    setScreen('map')
  }

  const exercise = exercises[index]

  return (
    <div className="app">
      <SpaceBackground />
      <button
        className="btn btn-circle btn-lg fixed top-3 right-3 z-10 border-white/70 bg-white/50 text-xl shadow-lg backdrop-blur-md"
        onClick={() => setMutedState((m) => !m)}
        aria-label="Звук"
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {screen === 'map' && <MapScreen done={done} unlockedIndex={unlockedIndex} onOpen={open} onRestart={restart} />}

      {screen === 'exercise' && (
        <ExerciseScreen
          exercise={exercise}
          index={index}
          total={exercises.length}
          done={done.has(exercise.id)}
          onComplete={markDone}
          onNext={next}
          onPrev={() => setIndex(Math.max(0, index - 1))}
          onHome={() => setScreen('map')}
        />
      )}

      {screen === 'finish' && (
        <FinishScreen count={done.size} total={exercises.length} onHome={() => setScreen('map')} onRestart={restart} />
      )}
    </div>
  )
}
