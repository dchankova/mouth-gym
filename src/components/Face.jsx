import { poses } from '../data/poses'
import './face.css'

const LIP = '#e8577e'
const INSIDE = '#7a1f3d'
const TONGUE = '#ff8fab'
const SKIN = '#ffd9b8'
const SKIN_DARK = '#f5bf98'
const LINE = '#e0a27a'

const closedLips = (
  <>
    <path d="M-24 0 Q-12 -8 0 -4 Q12 -8 24 0 Q12 9 0 9 Q-12 9 -24 0Z" fill={LIP} />
    <path d="M-22 0 Q0 3 22 0" stroke={INSIDE} strokeWidth="2" fill="none" strokeLinecap="round" />
  </>
)

const tongueUp = (
  <>
    <ellipse rx="22" ry="24" fill={INSIDE} stroke={LIP} strokeWidth="6" />
    <path d="M-17 -10 Q0 -27 17 -10 Q0 0 -17 -10Z" fill={TONGUE} />
    <path d="M0 -18 V-8" stroke="#e8668c" strokeWidth="2" strokeLinecap="round" />
  </>
)

// Всички форми на устата; показва се само тази от текущата поза.
const mouths = {
  neutral: <path d="M-20 0 Q0 10 20 0" stroke={LIP} strokeWidth="5" fill="none" strokeLinecap="round" />,
  closed: closedLips,
  small: <g transform="scale(.7)">{closedLips}</g>,
  pressed: (
    <>
      <path d="M-25 0 Q0 -5 25 0 Q0 5 -25 0Z" fill={LIP} />
      <path d="M-28 -4 L-25 0 L-28 4 M28 -4 L25 0 L28 4" stroke={LINE} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  open: (
    <>
      <ellipse rx="18" ry="12" fill={INSIDE} stroke={LIP} strokeWidth="6" />
      <path d="M-11 -7 H11" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <ellipse cy="6" rx="10" ry="4" fill={TONGUE} />
    </>
  ),
  wide: (
    <>
      <ellipse rx="24" ry="28" fill={INSIDE} stroke={LIP} strokeWidth="6" />
      <path d="M-15 -21 Q0 -25 15 -21" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
      <ellipse cy="15" rx="15" ry="8" fill={TONGUE} />
    </>
  ),
  smile: (
    <>
      <path d="M-34 -6 Q0 34 34 -6 Q0 2 -34 -6Z" fill={INSIDE} stroke={LIP} strokeWidth="5" strokeLinejoin="round" />
      <path d="M-27 -2 Q0 5 27 -2 L24 4 Q0 11 -24 4Z" fill="#fff" />
      <ellipse cy="14" rx="12" ry="5" fill={TONGUE} />
    </>
  ),
  kiss: (
    <>
      <circle r="11" fill={LIP} />
      <circle r="3.5" fill={INSIDE} />
      <path d="M-6 -6 Q0 -9 6 -6" stroke="#fff" strokeOpacity=".6" strokeWidth="2" fill="none" />
    </>
  ),
  fish: (
    <>
      <ellipse rx="8" ry="13" fill={LIP} />
      <ellipse rx="3" ry="7" fill={INSIDE} />
    </>
  ),
  airLips: (
    <>
      <ellipse cy="-6" rx="22" ry="9" fill={LIP} />
      <ellipse cy="7" rx="22" ry="9" fill={LIP} />
      <path d="M-20 0 Q0 2 20 0" stroke={INSIDE} strokeWidth="2" fill="none" />
    </>
  ),
  monkeyTop: (
    <>
      <ellipse cy="-15" rx="20" ry="9" fill={SKIN_DARK} stroke={LINE} strokeWidth="1.5" />
      {closedLips}
    </>
  ),
  monkeyBottom: (
    <>
      <ellipse cy="15" rx="20" ry="9" fill={SKIN_DARK} stroke={LINE} strokeWidth="1.5" />
      {closedLips}
    </>
  ),
  tongueOut: (
    <>
      <ellipse rx="18" ry="11" fill={INSIDE} stroke={LIP} strokeWidth="6" />
      <path d="M-11 0 H11 V20 A11 11 0 0 1 -11 20Z" fill={TONGUE} />
      <path d="M0 4 V18" stroke="#e8668c" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  tongueUp,
  tongueUpSmall: <g transform="scale(1 .62)">{tongueUp}</g>,
  click: (
    <>
      <ellipse rx="18" ry="14" fill={INSIDE} stroke={LIP} strokeWidth="6" />
      <ellipse cy="6" rx="12" ry="6" fill={TONGUE} />
    </>
  ),
  trainerLips: (
    <>
      {closedLips}
      <rect x="-5" y="2" width="10" height="20" rx="5" fill="#5ec8ff" />
      <circle cy="27" r="8" fill="none" stroke="#5ec8ff" strokeWidth="4" />
    </>
  ),
  trainerTongue: (
    <>
      <ellipse rx="20" ry="17" fill={INSIDE} stroke={LIP} strokeWidth="6" />
      <path d="M-14 -3 Q0 -19 14 -3 Q0 5 -14 -3Z" fill={TONGUE} />
      <rect x="-4" y="0" width="8" height="26" rx="4" fill="#7ed957" />
    </>
  ),
}

const eyes = {
  open: (
    <>
      <ellipse rx="9" ry="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <circle cy="1" r="5" fill="#3b2a5c" />
      <circle cx="2" cy="-1" r="1.6" fill="#fff" />
    </>
  ),
  wide: (
    <>
      <ellipse rx="10" ry="12.5" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <circle r="4.5" fill="#3b2a5c" />
      <circle cx="1.5" cy="-1.5" r="1.5" fill="#fff" />
    </>
  ),
  closed: <path d="M-8 0 Q0 5 8 0" stroke="#3b2a5c" strokeWidth="3" fill="none" strokeLinecap="round" />,
  happy: <path d="M-8 3 Q0 -7 8 3" stroke="#3b2a5c" strokeWidth="3" fill="none" strokeLinecap="round" />,
}

const show = (on) => ({ opacity: on ? 1 : 0 })

// Анимирано личице, което показва как се прави упражнението.
// zoom – отблизо (очи и уста), за малките картинки на картата
export default function Face({ pose = 'neutral', size = 120, zoom = false }) {
  const p = poses[pose] ?? poses.neutral
  const [jx, jy] = p.jaw ?? [0, 0]
  const puffL = p.cheeks === 'left' || p.cheeks === 'both'
  const puffR = p.cheeks === 'right' || p.cheeks === 'both'

  return (
    <svg className="face" viewBox={zoom ? '16 56 168 168' : '0 0 200 200'} width={size} height={size} aria-hidden="true">
      {/* издутите бузки излизат извън лицето */}
      <circle className="face-part face-scale" cx="38" cy="132" r="24" fill={SKIN} stroke={LINE} strokeWidth="2" style={{ scale: puffR ? 1 : 0 }} />
      <circle className="face-part face-scale" cx="162" cy="132" r="24" fill={SKIN} stroke={LINE} strokeWidth="2" style={{ scale: puffL ? 1 : 0 }} />

      {/* уши */}
      <circle cx="24" cy="104" r="14" fill={SKIN} stroke={LINE} strokeWidth="2" />
      <circle cx="176" cy="104" r="14" fill={SKIN} stroke={LINE} strokeWidth="2" />
      <path d="M22 98 Q16 104 22 110 M178 98 Q184 104 178 110" stroke={LINE} strokeWidth="2" fill="none" strokeLinecap="round" />

      <circle cx="100" cy="102" r="78" fill={SKIN} stroke={LINE} strokeWidth="2" />

      {/* модерна прическа: къси (избелели) страни и вдигнат перчем, сресан настрани */}
      <g fill="#3b2416" opacity=".55">
        <path d="M24 102 Q20 72 34 52 L44 58 Q32 78 33 102Z" />
        <path d="M176 102 Q180 72 166 52 L156 58 Q168 78 167 102Z" />
      </g>
      <path
        d="M38 62 Q30 30 66 16 Q94 2 130 4 Q170 4 182 30 Q172 22 156 22 Q170 38 164 62 Q152 46 130 44 Q118 52 100 48 Q80 50 66 58 Q52 58 38 62Z"
        fill="#5a3520"
      />
      <g stroke="#8a5a3c" strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M64 30 Q98 12 146 14" />
        <path d="M74 44 Q106 28 156 32" />
        <path d="M54 50 Q66 38 86 34" />
      </g>

      {/* вежди */}
      <path d="M62 68 Q72 62 82 67 M118 67 Q128 62 138 68" stroke="#6b4226" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* лунички */}
      <g fill="#d99a6c">
        <circle cx="80" cy="104" r="1.8" />
        <circle cx="86" cy="108" r="1.8" />
        <circle cx="77" cy="110" r="1.8" />
        <circle cx="120" cy="104" r="1.8" />
        <circle cx="114" cy="108" r="1.8" />
        <circle cx="123" cy="110" r="1.8" />
      </g>

      {/* руменина */}
      <ellipse className="face-part" cx="54" cy="122" rx="13" ry="8" fill="#ff8fab" style={{ opacity: puffR ? 0.8 : 0.45 }} />
      <ellipse className="face-part" cx="146" cy="122" rx="13" ry="8" fill="#ff8fab" style={{ opacity: puffL ? 0.8 : 0.45 }} />

      {/* хлътнали бузки */}
      <g className="face-part" style={show(p.cheeks === 'suck')} stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M58 108 Q66 124 58 140" />
        <path d="M142 108 Q134 124 142 140" />
      </g>

      {[72, 128].map((x) => (
        <g key={x} transform={`translate(${x} 86)`}>
          {Object.entries(eyes).map(([name, shape]) => (
            <g key={name} className="face-part" style={show((p.eyes ?? 'open') === name)}>
              {shape}
            </g>
          ))}
        </g>
      ))}

      <path d="M96 112 Q100 116 104 112" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* устата се движи заедно с челюстта */}
      <g className="face-move" style={{ transform: `translate(${100 + jx}px, ${142 + jy}px) scale(${p.scale ?? 1})` }}>
        <g className={p.extra === 'buzz' ? 'face-buzz' : undefined}>
          {Object.entries(mouths).map(([name, shape]) => (
            <g key={name} className="face-part" style={show(p.mouth === name)}>
              {shape}
            </g>
          ))}
        </g>
        <path d="M-14 30 Q0 36 14 30" stroke={LINE} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7" />
      </g>

      {/* стрелки за посоката на челюстта */}
      <g className="face-part face-arrow" style={show(p.arrow === 'left')}>
        <path d="M58 172 H30 M40 162 L30 172 L40 182" stroke="#7c5cff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="face-part face-arrow" style={show(p.arrow === 'right')}>
        <path d="M142 172 H170 M160 162 L170 172 L160 182" stroke="#7c5cff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="face-part face-arrow" style={show(p.arrow === 'down')}>
        <path d="M168 120 V156 M158 146 L168 156 L178 146" stroke="#7c5cff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* малки ефекти */}
      <g className="face-part" style={show(p.extra === 'heart')}>
        <text className="face-float" x="140" y="150" fontSize="26">❤️</text>
      </g>
      <g className="face-part" style={show(p.extra === 'buzz')} stroke="#7c5cff" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="face-buzz" d="M52 134 l-6 4 6 4 -6 4 M148 134 l6 4 -6 4 6 4" />
      </g>
      <g className="face-part" style={show(p.extra === 'click')}>
        <text className="face-pop" x="146" y="128" fontSize="20" fontWeight="900" fill="#7c5cff">цък!</text>
      </g>
      <g className="face-part" style={show(p.extra === 'stars')}>
        <text className="face-float" x="12" y="60" fontSize="26">✨</text>
        <text className="face-float" x="160" y="50" fontSize="22" style={{ animationDelay: '.4s' }}>⭐</text>
      </g>
    </svg>
  )
}
