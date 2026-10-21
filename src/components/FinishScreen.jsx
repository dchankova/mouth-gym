import { useEffect } from 'react'
import { bigCelebration } from '../celebrate'
import { sounds } from '../sound'

export default function FinishScreen({ total, onHome, onRestart }) {
  useEffect(() => {
    sounds.fanfare()
    bigCelebration()
  }, [])

  return (
    <div className="screen finish">
      <div className="trophy">🏆</div>
      <h1 className="finish-title">Ти си шампион!</h1>
      <p className="finish-sub">Направи всичките {total} упражнения днес!</p>
      <div className="finish-stars">
        {['⭐', '🌟', '⭐'].map((s, i) => (
          <span key={i} style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
            {s}
          </span>
        ))}
      </div>
      <div className="map-actions">
        <button className="play-btn" onClick={onHome}>
          🗺️ Към картата
        </button>
        <button className="link-btn" onClick={onRestart}>
          ↺ Още веднъж
        </button>
      </div>
    </div>
  )
}
