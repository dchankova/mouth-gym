import { useEffect, useRef, useState } from 'react'
import { sounds } from '../sound'
import { smallBurst } from '../celebrate'
import Stopwatch from './Stopwatch'
import RepStars from './RepStars'

export default function RepCounter({ exercise, done, onComplete }) {
  const { reps, sets = 1, emoji } = exercise
  const total = reps * sets
  const [count, setCount] = useState(done ? total : 0)
  const [bump, setBump] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [autoStart, setAutoStart] = useState(0)
  const buttonRef = useRef(null)

  const finished = count >= total
  const set = Math.min(sets, Math.floor(count / reps) + 1)
  const setJustEnded = count > 0 && count % reps === 0 && !finished

  useEffect(() => {
    if (count === total && count > 0 && !done) onComplete()
  }, [count, total, done, onComplete])

  const tap = () => {
    if (finished) return
    const next = count + 1
    setCount(next)
    setBump((b) => b + 1)
    setAutoStart((a) => a + 1)
    if (next % reps === 0) sounds.ding()
    else sounds.pop()
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) smallBurst((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight)
  }

  const reset = () => {
    setCount(0)
    setResetKey((k) => k + 1)
  }

  return (
    <div className="trainer">
      <button
        ref={buttonRef}
        className={`tap-button ${finished ? 'finished' : ''}`}
        onClick={tap}
        disabled={finished}
      >
        <span className="tap-face" key={bump}>
          {finished ? '🤩' : emoji}
        </span>
        <span className="tap-count" key={`c${bump}`}>
          {finished ? 'Браво!' : count}
        </span>
        {!finished && <span className="tap-hint">Натисни след всеки път!</span>}
      </button>

      {sets > 1 && (
        <p className="set-caption">
          Серия <b>{set}</b> от {sets}
          {setJustEnded && <span className="set-rest"> · Почивка 😌</span>}
        </p>
      )}

      <RepStars total={total} done={count} groupSize={sets > 1 ? reps : 0} />
      <p className="rep-caption">
        {sets > 1 ? `${sets} серии по ${reps} пъти` : `${reps} пъти`}
      </p>

      <Stopwatch key={resetKey} startSignal={autoStart} stop={finished} onReset={reset} />
    </div>
  )
}
