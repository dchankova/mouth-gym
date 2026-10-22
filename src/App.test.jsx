import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { exercises } from './data/exercises'

const total = exercises.length

function setup({ fakeTimers = false } = {}) {
  if (fakeTimers) vi.useFakeTimers()
  const user = userEvent.setup(fakeTimers ? { advanceTimers: vi.advanceTimersByTime } : undefined)
  const utils = render(<App />)
  return { user, ...utils }
}

// Пуска времето напред на малки стъпки, за да минат всички фази на таймера.
function wait(ms) {
  for (let t = 0; t < ms; t += 250) {
    act(() => vi.advanceTimersByTime(Math.min(250, ms - t)))
  }
}

const openFromMap = (user, title) => user.click(screen.getByTitle(title))

describe('картата', () => {
  it('показва всички упражнения и празен прогрес', () => {
    setup()
    expect(screen.getByRole('heading', { name: 'Гимнастика за устата' })).toBeInTheDocument()
    expect(screen.getByText(`⭐ 0 / ${total}`)).toBeInTheDocument()
    exercises.forEach((ex) => expect(screen.getByTitle(ex.title)).toBeEnabled())
  })

  it('„Започни!“ отваря първото упражнение', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: /Започни!/ }))
    expect(screen.getByRole('heading', { name: exercises[0].title })).toBeInTheDocument()
    expect(screen.getByText(`Стъпка 1 от ${total}`)).toBeInTheDocument()
  })

  it('всяко упражнение може да се отвори директно, без да е минато предишното', async () => {
    const { user } = setup()
    await openFromMap(user, 'Маймунско лице')
    expect(screen.getByRole('heading', { name: 'Маймунско лице' })).toBeInTheDocument()
    expect(screen.getByText(`Стъпка 20 от ${total}`)).toBeInTheDocument()
  })
})

describe('еднократно упражнение', () => {
  it('„Направих го!“ го отбелязва и картата показва звезда', async () => {
    const { user } = setup()
    await openFromMap(user, 'Прозявка')
    await user.click(screen.getByRole('button', { name: /Направих го!/ }))

    expect(screen.getByRole('button', { name: /Браво!/ })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Към картата' }))
    expect(screen.getByText(`⭐ 1 / ${total}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Продължи!/ })).toBeInTheDocument()
  })
})

describe('таймер за задържане', () => {
  it('брои задържането, почива и продължава със следващото повторение', async () => {
    const { user } = setup({ fakeTimers: true })
    await openFromMap(user, 'Широко отворена уста') // 5 пъти × 5 сек.

    expect(screen.getByText('Готов ли си?')).toBeInTheDocument()
    expect(screen.getByText('0 от 5 пъти · по 5 сек.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Старт/ }))
    expect(screen.getByText('Задръж!')).toBeInTheDocument()

    wait(5000)
    expect(screen.getByText('Почивай си…')).toBeInTheDocument()
    expect(screen.getByText('1 от 5 пъти · по 5 сек.')).toBeInTheDocument()

    wait(3000)
    expect(screen.getByText('Задръж!')).toBeInTheDocument()
  })

  it('пауза спира времето, а „Продължи“ го пуска отново', async () => {
    const { user } = setup({ fakeTimers: true })
    await openFromMap(user, 'Широко отворена уста')
    await user.click(screen.getByRole('button', { name: /Старт/ }))
    wait(2000)

    await user.click(screen.getByRole('button', { name: /Пауза/ }))
    wait(10000)
    expect(screen.getByText('0 от 5 пъти · по 5 сек.')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Продължи/ }))
    wait(3000)
    expect(screen.getByText('1 от 5 пъти · по 5 сек.')).toBeInTheDocument()
  })

  it('„Отначало“ нулира повторенията', async () => {
    const { user } = setup({ fakeTimers: true })
    await openFromMap(user, 'Широко отворена уста')
    await user.click(screen.getByRole('button', { name: /Старт/ }))
    wait(6000)

    await user.click(screen.getByRole('button', { name: /Отначало/ }))
    expect(screen.getByText('0 от 5 пъти · по 5 сек.')).toBeInTheDocument()
    expect(screen.getByText('Готов ли си?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Старт/ })).toBeInTheDocument()
  })

  it('след всички повторения упражнението е завършено', async () => {
    const { user } = setup({ fakeTimers: true })
    await openFromMap(user, 'Широко отворена уста')
    await user.click(screen.getByRole('button', { name: /Старт/ }))

    wait(5 * 5000 + 4 * 3000) // 5 задържания + 4 почивки между тях
    expect(screen.getByText('Браво! 🎉')).toBeInTheDocument()
    expect(screen.getByText('5 от 5 пъти · по 5 сек.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Още веднъж/ })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Старт|Пауза/ })).not.toBeInTheDocument()
  })
})

describe('брояч на повторения', () => {
  it('брои по серии и завършва след последното натискане', async () => {
    const { user } = setup()
    await openFromMap(user, 'Челюстта наляво и надясно') // 2 серии × 5 пъти
    const tap = () => user.click(screen.getByRole('button', { name: /Натисни след всеки път/ }))

    expect(screen.getByText(/Серия/)).toHaveTextContent('Серия 1 от 2')
    for (let i = 0; i < 5; i++) await tap()
    expect(screen.getByText(/Серия/)).toHaveTextContent('Серия 2 от 2 · Почивка 😌')

    for (let i = 0; i < 5; i++) await tap()
    expect(screen.getByRole('button', { name: /Браво!/ })).toBeDisabled()
  })

  it('„Отначало“ нулира брояча', async () => {
    const { user } = setup()
    await openFromMap(user, 'Издуване на двете бузи')
    const tapButton = screen.getByRole('button', { name: /Натисни след всеки път/ })
    await user.click(tapButton)
    await user.click(tapButton)
    expect(within(tapButton).getByText('2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Отначало/ }))
    expect(within(tapButton).getByText('0')).toBeInTheDocument()
  })

  it('хронометърът тръгва със „Старт“ и спира с „Пауза“', async () => {
    const { user } = setup({ fakeTimers: true })
    await openFromMap(user, 'Издуване на двете бузи')
    expect(screen.getByText('⏱ 0:00')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Старт/ }))
    wait(65000)
    expect(screen.getByText('⏱ 1:05')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Пауза/ }))
    wait(10000)
    expect(screen.getByText('⏱ 1:05')).toBeInTheDocument()
  })
})

describe('навигация', () => {
  it('„Назад“ е изключен на първата стъпка, „Напред“ води към следващата', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: /Започни!/ }))
    expect(screen.getByRole('button', { name: /Назад/ })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: /Напред/ }))
    expect(screen.getByRole('heading', { name: exercises[1].title })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Назад/ }))
    expect(screen.getByRole('heading', { name: exercises[0].title })).toBeInTheDocument()
  })

  it('от последното упражнение „Финал“ води до екрана с купата', async () => {
    const { user } = setup()
    await openFromMap(user, exercises[total - 1].title)
    await user.click(screen.getByRole('button', { name: /Финал/ }))

    expect(screen.getByRole('heading', { name: 'Ти си шампион!' })).toBeInTheDocument()
    expect(screen.getByText(`Направи 0 от ${total} упражнения днес!`)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Към картата/ }))
    expect(screen.getByRole('heading', { name: 'Гимнастика за устата' })).toBeInTheDocument()
  })
})

describe('прогрес', () => {
  it('се запазва след презареждане в същия ден', async () => {
    const { user, unmount } = setup()
    await openFromMap(user, 'Прозявка')
    await user.click(screen.getByRole('button', { name: /Направих го!/ }))
    unmount()

    render(<App />)
    expect(screen.getByText(`⭐ 1 / ${total}`)).toBeInTheDocument()
  })

  it('започва на чисто в нов ден', () => {
    localStorage.setItem('mouth-gym-progress', JSON.stringify({ date: '2000-01-01', done: ['yawn', 'wide-open'] }))
    setup()
    expect(screen.getByText(`⭐ 0 / ${total}`)).toBeInTheDocument()
  })

  it('„Започни отначало“ изчиства прогреса', async () => {
    const { user } = setup()
    await openFromMap(user, 'Прозявка')
    await user.click(screen.getByRole('button', { name: /Направих го!/ }))
    await user.click(screen.getByRole('button', { name: 'Към картата' }))

    await user.click(screen.getByRole('button', { name: /Започни отначало/ }))
    expect(screen.getByText(`⭐ 0 / ${total}`)).toBeInTheDocument()
  })
})

it('бутонът за звук превключва иконата', async () => {
  const { user } = setup()
  const mute = screen.getByRole('button', { name: 'Звук' })
  expect(mute).toHaveTextContent('🔊')
  await user.click(mute)
  expect(mute).toHaveTextContent('🔇')
})
