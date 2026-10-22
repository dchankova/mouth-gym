import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'

// Конфетите рисуват върху canvas, който jsdom няма – в тестовете не ни трябват.
vi.mock('../celebrate', () => ({
  smallBurst: vi.fn(),
  stepConfetti: vi.fn(),
  bigCelebration: vi.fn(),
}))

// Testing Library придвижва фалшивите таймери само ако има глобален `jest` –
// без това всяко натискане при vi.useFakeTimers() увисва.
globalThis.jest = { advanceTimersByTime: (ms) => vi.advanceTimersByTime(ms) }

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.useRealTimers()
})
