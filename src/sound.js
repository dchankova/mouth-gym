// Малки звукови ефекти, генерирани с Web Audio – без аудио файлове.
let ctx = null
let muted = false

export const setMuted = (value) => {
  muted = value
}

function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, start, duration, type = 'sine', volume = 0.2) {
  const ac = audio()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t = ac.currentTime + start
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

function play(fn) {
  if (muted) return
  try {
    fn()
  } catch {
    // няма звук – не е проблем
  }
}

export const sounds = {
  tick: () => play(() => tone(880, 0, 0.08, 'square', 0.06)),
  go: () => play(() => {
    tone(523, 0, 0.12, 'triangle')
    tone(784, 0.1, 0.18, 'triangle')
  }),
  pop: () => play(() => {
    tone(660, 0, 0.08, 'sine', 0.25)
    tone(990, 0.05, 0.1, 'sine', 0.2)
  }),
  ding: () => play(() => {
    tone(1047, 0, 0.3, 'sine', 0.25)
    tone(1568, 0.08, 0.35, 'sine', 0.15)
  }),
  fanfare: () => play(() => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle', 0.22))
    tone(1319, 0.5, 0.6, 'triangle', 0.2)
  }),
}
