import { useEffect, useRef, useState } from 'react'
import ChipButton from './ChipButton'

const fmt = (ms) => {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// Хронометър с старт/пауза/отначало. Стартира сам при първото натискане на брояча.
export default function Stopwatch({ startSignal, stop, onReset }) {
  const [elapsed, setElapsed] = useState(0)
  const [startedAt, setStartedAt] = useState(null)
  const running = startedAt !== null

  const lastSignal = useRef(startSignal)
  useEffect(() => {
    if (startSignal === lastSignal.current) return
    lastSignal.current = startSignal
    setStartedAt((s) => s ?? Date.now() - elapsed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSignal])

  useEffect(() => {
    if (stop && running) {
      setElapsed(Date.now() - startedAt)
      setStartedAt(null)
    }
  }, [stop, running, startedAt])

  const [, force] = useState(0)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => force((n) => n + 1), 250)
    return () => clearInterval(id)
  }, [running])

  const shown = running ? Date.now() - startedAt : elapsed

  const toggle = () => {
    if (running) {
      setElapsed(Date.now() - startedAt)
      setStartedAt(null)
    } else {
      setStartedAt(Date.now() - elapsed)
    }
  }

  return (
    <div className="stopwatch">
      <span className={`sw-time ${running ? 'running' : ''}`}>⏱ {fmt(shown)}</span>
      <div className="controls">
        <ChipButton icon="reset" tone="violet" size="sm" onClick={onReset}>
          {stop ? 'Още веднъж' : 'Отначало'}
        </ChipButton>
        {!stop && (
          <ChipButton icon={running ? 'pause' : 'play'} tone={running ? 'amber' : 'green'} size="sm" onClick={toggle}>
            {running ? 'Пауза' : 'Старт'}
          </ChipButton>
        )}
      </div>
    </div>
  )
}
