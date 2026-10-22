import { useEffect, useReducer, useRef } from 'react'
import { sounds } from '../sound'
import { smallBurst } from '../celebrate'
import Ring from './Ring'
import RepStars from './RepStars'
import ChipButton from './ChipButton'
import Face from './Face'
import DemoStrip from './DemoStrip'
import { useLoop } from '../useLoop'

const REST_SECONDS = 3

function init({ reps, hold, done }) {
  return {
    phase: done ? 'finished' : 'ready', // ready | hold | rest | finished
    rep: done ? reps : 0,
    running: false,
    endAt: 0,
    left: hold * 1000,
    reps,
    hold,
  }
}

function reducer(s, action) {
  switch (action.type) {
    case 'start': {
      if (s.phase === 'finished' || s.running) return s
      const phase = s.phase === 'ready' ? 'hold' : s.phase
      return { ...s, phase, running: true, endAt: action.now + s.left }
    }
    case 'pause':
      return s.running ? { ...s, running: false, left: Math.max(0, s.endAt - action.now) } : s
    case 'reset':
      return init({ reps: s.reps, hold: s.hold, done: false })
    case 'tick': {
      if (!s.running) return s
      const left = s.endAt - action.now
      if (left > 0) return { ...s, left }
      if (s.phase === 'hold') {
        const rep = s.rep + 1
        if (rep >= s.reps) return { ...s, rep, phase: 'finished', running: false, left: 0 }
        return { ...s, rep, phase: 'rest', endAt: action.now + REST_SECONDS * 1000, left: REST_SECONDS * 1000 }
      }
      // край на почивката – следващото задържане
      return { ...s, phase: 'hold', endAt: action.now + s.hold * 1000, left: s.hold * 1000 }
    }
    default:
      return s
  }
}

export default function HoldTimer({ exercise, done, onComplete }) {
  const { reps, hold } = exercise
  const [s, dispatch] = useReducer(reducer, { reps, hold, done }, init)
  const lastSecond = useRef(null)

  useEffect(() => {
    if (!s.running) return
    const id = setInterval(() => dispatch({ type: 'tick', now: Date.now() }), 50)
    return () => clearInterval(id)
  }, [s.running])

  // звуци и ефекти при смяна на фазата
  const prevPhase = useRef(s.phase)
  useEffect(() => {
    const prev = prevPhase.current
    prevPhase.current = s.phase
    if (prev === s.phase) return
    if (s.phase === 'hold') sounds.go()
    if (s.phase === 'rest') {
      sounds.ding()
      smallBurst(0.5, 0.45)
    }
    if (s.phase === 'finished' && prev !== 'ready') onComplete()
  }, [s.phase, onComplete])

  // „тик“ в последните 3 секунди на задържането
  const second = Math.ceil(s.left / 1000)
  useEffect(() => {
    if (s.phase !== 'hold' || !s.running) return
    if (lastSecond.current !== second && second <= 3 && second > 0) sounds.tick()
    lastSecond.current = second
  }, [second, s.phase, s.running])

  const total = s.phase === 'rest' ? REST_SECONDS : hold
  const progress = s.phase === 'finished' ? 1 : 1 - s.left / (total * 1000)

  const label = {
    ready: 'Готов ли си?',
    hold: 'Задръж!',
    rest: 'Почивай си…',
    finished: 'Браво! 🎉',
  }[s.phase]

  // какво показва личицето: демо в покой, позата при задържане, отпуснато при почивка
  const { steps, hold: holdPose = steps.at(-1)[0], rest = 'relax' } = exercise.demo
  const loopIndex = useLoop(steps.length, s.phase === 'ready')
  const currentHold = Array.isArray(holdPose) ? holdPose[s.rep % holdPose.length] : holdPose
  const pose = {
    ready: steps[loopIndex][0],
    hold: currentHold,
    rest,
    finished: 'happy',
  }[s.phase]
  const activeStep =
    s.phase === 'ready' ? loopIndex : s.phase === 'hold' ? steps.findIndex(([p]) => p === currentHold) : -1

  return (
    <div className="trainer">
      <DemoStrip steps={steps} active={activeStep} />
      <Ring progress={progress} phase={s.phase}>
        <div className={`timer-face ${s.phase} ${s.running ? 'running' : ''}`}>
          <Face pose={pose} size={112} />
        </div>
        <div className="timer-time" key={`${s.phase}-${second}`}>
          {s.phase === 'finished' ? '✔' : second}
        </div>
        <div className="timer-label">{label}</div>
      </Ring>

      <RepStars total={reps} done={s.rep} />
      <p className="rep-caption">
        {s.rep} от {reps} {reps === 1 ? 'път' : 'пъти'} · по {hold} сек.
      </p>

      <div className="controls">
        <ChipButton icon="reset" tone="violet" onClick={() => dispatch({ type: 'reset' })}>
          {s.phase === 'finished' ? 'Още веднъж' : 'Отначало'}
        </ChipButton>
        {s.phase === 'finished' ? null : s.running ? (
          <ChipButton icon="pause" tone="amber" onClick={() => dispatch({ type: 'pause', now: Date.now() })}>
            Пауза
          </ChipButton>
        ) : (
          <ChipButton
            icon="play"
            tone="green"
            attention={s.phase === 'ready'}
            onClick={() => dispatch({ type: 'start', now: Date.now() })}
          >
            {s.phase === 'ready' ? 'Старт' : 'Продължи'}
          </ChipButton>
        )}
      </div>
    </div>
  )
}
