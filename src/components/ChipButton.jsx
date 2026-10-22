const icons = {
  play: { motion: 'group-hover:scale-110', svg: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" /> },
  pause: {
    motion: 'group-hover:scale-110',
    svg: (
      <g fill="currentColor" stroke="none">
        <rect x="6" y="5" width="4" height="14" rx="1.5" />
        <rect x="14" y="5" width="4" height="14" rx="1.5" />
      </g>
    ),
  },
  reset: {
    motion: 'group-hover:-rotate-180 group-active:-rotate-360',
    svg: (
      <>
        <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
        <path d="M4.5 4.5v4.5H9" />
      </>
    ),
  },
  back: { motion: 'group-hover:-translate-x-1', svg: <path d="M15 5l-7 7 7 7" /> },
  next: { motion: 'group-hover:translate-x-1', svg: <path d="M9 5l7 7-7 7" /> },
}

// DaisyUI цветове за всеки „тон“
const tones = {
  neutral: 'btn-neutral btn-soft',
  green: 'btn-success',
  amber: 'btn-warning',
  pink: 'btn-primary',
  violet: 'btn-secondary btn-soft',
}

const sizes = {
  sm: 'btn-md text-base',
  md: 'btn-lg text-lg',
  lg: 'btn-xl text-2xl',
}

const iconSizes = {
  sm: 'size-7 [&_svg]:size-4',
  md: 'size-9 [&_svg]:size-5',
  lg: 'size-11 [&_svg]:size-6 text-2xl',
}

// Бутон от DaisyUI с кръгче-иконка отляво и надпис отдясно.
// icon: име от icons по-горе или емоджи; tone: neutral | green | amber | pink | violet
export default function ChipButton({ icon, tone = 'neutral', size = 'md', attention, className = '', children, ...props }) {
  const known = icons[icon]
  return (
    <button
      className={`group btn ${tones[tone]} ${sizes[size]} gap-2.5 ps-1.5 font-black ${attention ? 'animate-float' : ''} ${className}`}
      {...props}
    >
      <span
        className={`grid place-items-center rounded-full bg-current/15 transition-transform duration-500 ease-[var(--spring)] ${iconSizes[size]} ${known?.motion ?? 'group-hover:-rotate-12'} ${attention ? 'animate-ping-soft' : ''}`}
      >
        {known ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            {known.svg}
          </svg>
        ) : (
          icon
        )}
      </span>
      {children}
    </button>
  )
}
