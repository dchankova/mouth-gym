import { useEffect, useState } from 'react'

// Редува стъпките 0, 1, 2… докато active е true.
export function useLoop(length, active, ms = 1400) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active || length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms)
    return () => clearInterval(id)
  }, [active, length, ms])

  return index % length
}
