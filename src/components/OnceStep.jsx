import Face from './Face'
import DemoStrip from './DemoStrip'
import { useLoop } from '../useLoop'

export default function OnceStep({ exercise, done, onComplete }) {
  const { steps } = exercise.demo
  const loopIndex = useLoop(steps.length, !done)

  return (
    <div className="trainer">
      <DemoStrip steps={steps} active={done ? -1 : loopIndex} />
      <button className={`tap-button ${done ? 'finished' : ''}`} onClick={onComplete} disabled={done}>
        <span className="tap-face">
          <Face pose={done ? 'happy' : steps[loopIndex][0]} size={116} />
        </span>
        <span className="tap-count">{done ? 'Браво!' : 'Направих го!'}</span>
      </button>
    </div>
  )
}
