import { useEffect } from 'react'
import { bigCelebration } from '../celebrate'
import { sounds } from '../sound'
import ChipButton from './ChipButton'

export default function FinishScreen({ count, total, onHome, onRestart }) {
  useEffect(() => {
    sounds.fanfare()
    bigCelebration()
  }, [])

  return (
    <div className="screen finish">
      <div className="trophy">🏆</div>
      <h1 className="finish-title">Ти си шампион!</h1>
      <p className="finish-sub">
        {count === total ? `Направи всичките ${total} упражнения днес!` : `Направи ${count} от ${total} упражнения днес!`}
      </p>
      <div className="finish-stars">
        {['⭐', '🌟', '⭐'].map((s, i) => (
          <span key={i} style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
            {s}
          </span>
        ))}
      </div>
      <div className="map-actions">
        <ChipButton icon="🗺️" tone="green" size="lg" attention onClick={onHome}>
          Към картата
        </ChipButton>
        <ChipButton icon="reset" tone="violet" onClick={onRestart}>
          Още веднъж
        </ChipButton>
      </div>
    </div>
  )
}
