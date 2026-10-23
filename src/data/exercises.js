// Програмата от логопеда – „Тренинг на оралната моторика“.
// type:
//   'hold'  – задържане: reps повторения × hold секунди (таймерът брои сам)
//   'count' – повторения: sets серии × reps повторения (детето натиска за всяко)
//   'once'  – еднократно упражнение, просто се отбелязва като направено
// optional – по желание (упражненията с трейнер); включват се от картата преди тренировката
// demo – как изглежда упражнението (пози от data/poses.js):
//   steps – [поза, надпис] – картинките „Как се прави“, личицето ги редува
//   hold  – поза по време на задържането (или масив, редуват се по повторения);
//           по подразбиране последната стъпка
//   rest  – поза по време на почивката (по подразбиране 'relax')

// Позата, с която упражнението се показва на картата – тази, която се задържа,
// иначе последната стъпка.
export function keyPose({ demo }) {
  const hold = Array.isArray(demo.hold) ? demo.hold[0] : demo.hold
  return hold ?? demo.steps.at(-1)[0]
}

export const groups = [
  { id: 'prep', title: 'Загрявка', pose: 'wide', color: '#ffb347' },
  { id: 'cheeks', title: 'Бузките', pose: 'puffBoth', color: '#ff7eb3' },
  { id: 'lips', title: 'Устните', pose: 'kiss', color: '#5ec8ff' },
  {
    id: 'tongue',
    title: 'Езичето',
    pose: 'tongueOut',
    color: '#7ed957',
    tip: 'Устата е отворена максимално. Движи се само езичето – челюстта стои мирно!',
  },
]

export const exercises = [
  // Подготвителни движения
  {
    id: 'yawn', group: 'prep', title: 'Прозявка', text: 'Отваряне на устата и имитиране на прозявка.', type: 'once',
    demo: { steps: [['neutral', 'Отпусни'], ['yawn', 'Прозявка']] },
  },
  {
    id: 'wide-open', group: 'prep', title: 'Широко отворена уста', text: 'Широко отваряне на устата, задържане в поза.', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['neutral', 'Затворена'], ['wide', 'Широко отворена']] },
  },
  {
    id: 'jaw-side', group: 'prep', title: 'Челюстта наляво и надясно', text: 'Хоризонтално движение на долната челюст наляво и надясно.', type: 'count', sets: 2, reps: 5,
    demo: { steps: [['jawLeft', 'Челюстта наляво'], ['jawRight', 'Челюстта надясно']] },
  },
  {
    id: 'jaw-front', group: 'prep', title: 'Челюстта напред и назад', text: 'Движение напред/назад на долната челюст.', type: 'count', sets: 2, reps: 3,
    demo: { steps: [['jawForward', 'Челюстта напред'], ['jawBack', 'Челюстта назад']] },
  },

  // За бузите
  {
    id: 'one-cheek', group: 'cheeks', title: 'Издуване на едната буза', text: 'Издуване на едната буза и задържане, следва другата буза.', type: 'count', sets: 1, reps: 3,
    demo: { steps: [['puffLeft', 'Едната бузка'], ['puffRight', 'Другата бузка']] },
  },
  {
    id: 'both-cheeks', group: 'cheeks', title: 'Издуване на двете бузи', text: 'Издуване на двете бузи, задържане в поза.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['neutral', 'Вдишай'], ['puffBoth', 'Издуй двете']] },
  },
  {
    id: 'suck-cheeks', group: 'cheeks', title: 'Всмукване на бузите', text: 'Всмукване на бузите, задържане в поза.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['neutral', 'Отпусни'], ['suck', 'Всмукни бузките']] },
  },
  {
    id: 'puff-suck', group: 'cheeks', title: 'Издуване и всмукване на бузите', text: 'Редуване: издуване на бузите и всмукване.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['puffBoth', 'Издуй'], ['suck', 'Всмукни']] },
  },

  // За устните
  {
    id: 'lip-trainer', group: 'lips', optional: true, title: 'Трейнер за устни', text: 'Използване на трейнер за устни с планиране на упражненията.', type: 'once',
    demo: { steps: [['trainerLips', 'Трейнерът между устните']] },
  },
  {
    id: 'air-lips', group: 'lips', title: 'Въздух в горната и долната устна', text: 'Задържане на въздух в горната и долната устна.', type: 'hold', reps: 3, hold: 5,
    demo: { steps: [['neutral', 'Вдишай'], ['airLips', 'Въздух под устните']] },
  },
  {
    id: 'lips-closed', group: 'lips', title: 'Стиснати устни', text: 'Задържане на стиснати устни.', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['neutral', 'Отпусни'], ['lipsClosed', 'Стисни устни']] },
  },
  {
    id: 'lips-open', group: 'lips', title: 'Отворени устни', text: 'Задържане на отворени устни.', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['neutral', 'Отпусни'], ['lipsOpen', 'Отвори устни']] },
  },
  {
    id: 'open-close', group: 'lips', title: 'Отворени и стиснати устни', text: 'Редуване: отворени, стиснати устни.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['lipsOpen', 'Отворени'], ['lipsClosed', 'Стиснати']] },
  },
  {
    id: 'kiss', group: 'lips', title: 'Целувка', text: 'Задържане напред на събрани устни (целувка).', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['neutral', 'Отпусни'], ['kiss', 'Целувка']] },
  },
  {
    id: 'smile', group: 'lips', title: 'Усмивка', text: 'Разтегляне на устните встрани (усмивка).', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['neutral', 'Отпусни'], ['smile', 'Широка усмивка']] },
  },
  {
    id: 'kiss-smile', group: 'lips', title: 'Целувка – усмивка', text: 'Редуване: целувка – усмивка.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['kiss', 'Целувка'], ['smile', 'Усмивка']] },
  },
  {
    id: 'vibrate', group: 'lips', title: 'Вибриране с устни', text: 'Вибриране с устни.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['lipsClosed', 'Затвори устни'], ['vibrate', 'Духни: бррр']] },
  },

  // За езика
  {
    id: 'tongue-trainer', group: 'tongue', optional: true, title: 'Трейнер за езика', text: 'Използване на трейнер за повдигане на езика с планиране на упражненията.', type: 'once',
    demo: { steps: [['trainerTongue', 'Езичето вдига трейнера']] },
  },
  {
    id: 'tongue-out', group: 'tongue', title: 'Изплезен език', text: 'Задържане на езика изплезен напред.', type: 'hold', reps: 1, hold: 5,
    demo: { steps: [['lipsOpen', 'Отвори'], ['tongueOut', 'Езичето навън']] },
  },
  {
    id: 'monkey', group: 'tongue', title: 'Маймунско лице', text: 'Задържане на езика върху венеца в долната и горната устна.', type: 'hold', reps: 10, hold: 10,
    demo: { steps: [['monkeyBottom', 'Под долната устна'], ['monkeyTop', 'Над горната устна']], hold: ['monkeyBottom', 'monkeyTop'] },
  },
  {
    id: 'horse', group: 'tongue', title: 'Конче', text: 'Упражнение тип „КОНЧЕ“ – цъкане с езика (5 – 10 повторения).', type: 'count', sets: 1, reps: 10,
    demo: { steps: [['tongueUp', 'Езичето горе'], ['click', 'Цъкни!']] },
  },
  {
    id: 'suction-jaw', group: 'tongue', title: 'Залепен език – отваряне на челюстта', text: 'Езикът се прилепя широк към твърдото небце, плътно, докато се образува вакуум. След това се отваря и затваря долната челюст.', type: 'count', sets: 1, reps: 5,
    demo: { steps: [['tongueUp', 'Езиче горе – отвори'], ['tongueUpSmall', 'Езиче горе – затвори']] },
  },
  {
    id: 'suction-pop', group: 'tongue', title: 'Залепен език и отлепяне („конче“)', text: 'Езикът се прилепя широк към небцето (вакуум), отваря се долната челюст, изчаква се до 5 сек. и езикът се отлепя със звук като „конче“.', type: 'hold', reps: 5, hold: 5,
    demo: { steps: [['tongueUp', 'Залепи и чакай'], ['click', 'Отлепи – цък!']], hold: 'tongueUp', rest: 'click' },
  },
]
