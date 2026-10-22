// Пози на личицето. Всяка описва устата, очите, бузите и челюстта.
//   mouth  – форма от Face.jsx (neutral, closed, wide, kiss, tongueUp…)
//   eyes   – open | wide | closed | happy
//   cheeks – left | right | both | suck
//   jaw    – [x, y] отместване на челюстта; scale – „напред/назад“
//   arrow  – left | right | down; extra – heart | buzz | click | stars
export const poses = {
  neutral: { mouth: 'neutral' },
  relax: { mouth: 'neutral', eyes: 'closed' },
  happy: { mouth: 'smile', eyes: 'happy', extra: 'stars' },

  // челюст
  yawn: { mouth: 'wide', eyes: 'closed', jaw: [0, 6] },
  wide: { mouth: 'wide', eyes: 'wide', jaw: [0, 6], arrow: 'down' },
  jawLeft: { mouth: 'open', jaw: [-14, 3], arrow: 'left' },
  jawRight: { mouth: 'open', jaw: [14, 3], arrow: 'right' },
  jawForward: { mouth: 'open', jaw: [0, 5], scale: 1.18 },
  jawBack: { mouth: 'open', jaw: [0, -2], scale: 0.82 },

  // бузи
  puffLeft: { mouth: 'small', cheeks: 'left' },
  puffRight: { mouth: 'small', cheeks: 'right' },
  puffBoth: { mouth: 'small', cheeks: 'both', eyes: 'wide' },
  suck: { mouth: 'fish', cheeks: 'suck' },

  // устни
  airLips: { mouth: 'airLips' },
  lipsClosed: { mouth: 'pressed' },
  lipsOpen: { mouth: 'open' },
  kiss: { mouth: 'kiss', extra: 'heart' },
  smile: { mouth: 'smile', eyes: 'happy' },
  vibrate: { mouth: 'closed', extra: 'buzz' },
  trainerLips: { mouth: 'trainerLips' },

  // език
  trainerTongue: { mouth: 'trainerTongue', jaw: [0, 4] },
  tongueOut: { mouth: 'tongueOut' },
  monkeyTop: { mouth: 'monkeyTop' },
  monkeyBottom: { mouth: 'monkeyBottom' },
  tongueUp: { mouth: 'tongueUp', jaw: [0, 4] },
  tongueUpSmall: { mouth: 'tongueUpSmall' },
  click: { mouth: 'click', extra: 'click' },
}
