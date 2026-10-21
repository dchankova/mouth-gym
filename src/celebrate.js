import confetti from 'canvas-confetti'

export function smallBurst(x = 0.5, y = 0.5) {
  confetti({ particleCount: 25, spread: 60, startVelocity: 25, origin: { x, y }, scalar: 0.8 })
}

export function stepConfetti() {
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } })
  const star = confetti.shapeFromText({ text: '⭐', scalar: 2 })
  confetti({ particleCount: 20, spread: 120, origin: { y: 0.5 }, shapes: [star], scalar: 2 })
}

export function bigCelebration() {
  const end = Date.now() + 2500
  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 } })
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
