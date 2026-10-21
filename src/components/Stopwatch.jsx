import { useEffect, useRef, useState } from 'react'

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
        <button className="ctrl ctrl-reset" onClick={onReset} aria-label="Отначало">
          ↺
        </button>
        {!stop && (
          <button className={`ctrl ctrl-main small ${running ? 'pause' : ''}`} onClick={toggle}>
            {running ? '⏸ Пауза' : '▶ Старт'}
          </button>
        )}
      </div>
    </div>
  )
}
