import { useEffect, useRef, useState } from 'react'
import { sounds } from '../sound'
import { smallBurst } from '../celebrate'
import RepStars from './RepStars'
import ChipButton from './ChipButton'
import Face from './Face'
import DemoStrip from './DemoStrip'
import { useLoop } from '../useLoop'

export default function RepCounter({ exercise, done, onComplete }) {
  const { reps, sets = 1, demo } = exercise
  const total = reps * sets
  const [count, setCount] = useState(done ? total : 0)
  const [bump, setBump] = useState(0)
  const buttonRef = useRef(null)

  const finished = count >= total
  const set = Math.min(sets, Math.floor(count / reps) + 1)
  const setJustEnded = count > 0 && count % reps === 0 && !finished
  const loopIndex = useLoop(demo.steps.length, !finished)

  useEffect(() => {
    if (count === total && count > 0 && !done) onComplete()
  }, [count, total, done, onComplete])

  const tap = () => {
    if (finished) return
    const next = count + 1
    setCount(next)
    setBump((b) => b + 1)
    if (next % reps === 0) sounds.ding()
    else sounds.pop()
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) smallBurst((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight)
  }

  return (
    <div className="trainer">
      <DemoStrip steps={demo.steps} active={finished ? -1 : loopIndex} />
      <button
        ref={buttonRef}
        className={`tap-button ${finished ? 'finished' : ''}`}
        onClick={tap}
        disabled={finished}
      >
        <span className="tap-face" key={bump}>
          <Face pose={finished ? 'happy' : demo.steps[loopIndex][0]} size={116} />
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

      <div className="controls">
        <ChipButton icon="reset" tone="violet" onClick={() => setCount(0)} disabled={count === 0}>
          {finished ? 'Още веднъж' : 'Отначало'}
        </ChipButton>
      </div>
    </div>
  )
}
