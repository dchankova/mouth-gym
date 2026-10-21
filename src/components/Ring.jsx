const SIZE = 260
const STROKE = 18
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

export default function Ring({ progress, phase, children }) {
  return (
    <div className={`ring ring-${phase}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7eb3" />
            <stop offset="50%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#7ed957" />
          </linearGradient>
        </defs>
        <circle className="ring-track" cx={SIZE / 2} cy={SIZE / 2} r={R} strokeWidth={STROKE} />
        <circle
          className="ring-bar"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          strokeWidth={STROKE}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - Math.min(1, Math.max(0, progress)))}
        />
      </svg>
      <div className="ring-inner">{children}</div>
    </div>
  )
}
