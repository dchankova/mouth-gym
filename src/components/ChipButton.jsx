const icons = {
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  pause: (
    <g fill="currentColor" stroke="none">
      <rect x="6" y="5" width="4" height="14" rx="1.5" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" />
    </g>
  ),
  reset: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4.5v4.5H9" />
    </>
  ),
  back: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
}

// Хапче с цветно кръгче-иконка отляво и надпис отдясно.
// icon: име от icons по-горе или емоджи; tone: neutral | green | amber | pink | violet
export default function ChipButton({ icon, tone = 'neutral', size, attention, className = '', children, ...props }) {
  const svg = icons[icon]
  return (
    <button
      className={`chip chip-${tone} ${size ? `chip-${size}` : ''} ${attention ? 'attention' : ''} ${className}`}
      data-icon={svg ? icon : undefined}
      {...props}
    >
      <span className="chip-icon">
        {svg ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            {svg}
          </svg>
        ) : (
          icon
        )}
      </span>
      <span className="chip-label">{children}</span>
    </button>
  )
}
