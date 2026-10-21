// Програмата от логопеда – „Тренинг на оралната моторика“.
// type:
//   'hold'  – задържане: reps повторения × hold секунди (таймерът брои сам)
//   'count' – повторения: sets серии × reps повторения (детето натиска за всяко)
//   'once'  – еднократно упражнение, просто се отбелязва като направено

export const groups = [
  { id: 'prep', title: 'Загрявка', emoji: '🦁', color: '#ffb347' },
  { id: 'cheeks', title: 'Бузките', emoji: '🐹', color: '#ff7eb3' },
  { id: 'lips', title: 'Устните', emoji: '🐟', color: '#5ec8ff' },
  {
    id: 'tongue',
    title: 'Езичето',
    emoji: '🐒',
    color: '#7ed957',
    tip: 'Устата е отворена максимално. Движи се само езичето – челюстта стои мирно!',
  },
]

export const exercises = [
  // Подготвителни движения
  { id: 'yawn', group: 'prep', emoji: '🥱', title: 'Сънливо лъвче', text: 'Отваряне на устата и имитиране на прозявка.', type: 'once' },
  { id: 'wide-open', group: 'prep', emoji: '🦛', title: 'Устата на хипопотама', text: 'Широко отваряне на устата, задържане в поза.', type: 'hold', reps: 5, hold: 5 },
  { id: 'jaw-side', group: 'prep', emoji: '🦀', title: 'Раче – наляво и надясно', text: 'Хоризонтално движение на долната челюст наляво и надясно.', type: 'count', sets: 2, reps: 5 },
  { id: 'jaw-front', group: 'prep', emoji: '🐢', title: 'Костенурка – напред и назад', text: 'Движение напред/назад на долната челюст.', type: 'count', sets: 2, reps: 3 },

  // За бузите
  { id: 'one-cheek', group: 'cheeks', emoji: '🎈', title: 'Балонче в едната бузка', text: 'Издуване на едната буза и задържане, следва другата буза.', type: 'count', sets: 1, reps: 3 },
  { id: 'both-cheeks', group: 'cheeks', emoji: '🐡', title: 'Рибка балон', text: 'Издуване на двете бузи, задържане в поза.', type: 'count', sets: 1, reps: 5 },
  { id: 'suck-cheeks', group: 'cheeks', emoji: '🐟', title: 'Рибешка муцунка', text: 'Всмукване на бузите, задържане в поза.', type: 'count', sets: 1, reps: 5 },
  { id: 'puff-suck', group: 'cheeks', emoji: '🎺', title: 'Балон – рибка', text: 'Редуване: издуване на бузите и всмукване.', type: 'count', sets: 1, reps: 5 },

  // За устните
  { id: 'lip-trainer', group: 'lips', emoji: '🏋️', title: 'Трейнер за устни', text: 'Използване на трейнер за устни с планиране на упражненията.', type: 'once' },
  { id: 'air-lips', group: 'lips', emoji: '🐿️', title: 'Катеричка', text: 'Задържане на въздух в горната и долната устна.', type: 'hold', reps: 3, hold: 5 },
  { id: 'lips-closed', group: 'lips', emoji: '🤐', title: 'Стиснати устни', text: 'Задържане на стиснати устни.', type: 'hold', reps: 5, hold: 5 },
  { id: 'lips-open', group: 'lips', emoji: '😮', title: 'Отворени устни', text: 'Задържане на отворени устни.', type: 'hold', reps: 5, hold: 5 },
  { id: 'open-close', group: 'lips', emoji: '🚪', title: 'Отвори – затвори', text: 'Редуване: отворени, стиснати устни.', type: 'count', sets: 1, reps: 5 },
  { id: 'kiss', group: 'lips', emoji: '💋', title: 'Целувка', text: 'Задържане напред на събрани устни (целувка).', type: 'hold', reps: 5, hold: 5 },
  { id: 'smile', group: 'lips', emoji: '😁', title: 'Голяма усмивка', text: 'Разтегляне на устните встрани (усмивка).', type: 'hold', reps: 5, hold: 5 },
  { id: 'kiss-smile', group: 'lips', emoji: '😘', title: 'Целувка – усмивка', text: 'Редуване: целувка – усмивка.', type: 'count', sets: 1, reps: 5 },
  { id: 'vibrate', group: 'lips', emoji: '🏍️', title: 'Моторче', text: 'Вибриране с устни.', type: 'count', sets: 1, reps: 5 },

  // За езика
  { id: 'tongue-trainer', group: 'tongue', emoji: '🏋️', title: 'Трейнер за езичето', text: 'Използване на трейнер за повдигане на езика с планиране на упражненията.', type: 'once' },
  { id: 'tongue-out', group: 'tongue', emoji: '😛', title: 'Езиче навън', text: 'Задържане на езика изплезен напред.', type: 'hold', reps: 1, hold: 5 },
  { id: 'monkey', group: 'tongue', emoji: '🐵', title: 'Маймунско лице', text: 'Задържане на езика върху венеца в долната и горната устна.', type: 'hold', reps: 10, hold: 10 },
  { id: 'horse', group: 'tongue', emoji: '🐴', title: 'Конче', text: 'Упражнение тип „КОНЧЕ“ – цъкане с езика (5 – 10 повторения).', type: 'count', sets: 1, reps: 10 },
  { id: 'suction-jaw', group: 'tongue', emoji: '🧲', title: 'Залепено езиче', text: 'Езикът се прилепя широк към твърдото небце, плътно, докато се образува вакуум. След това се отваря и затваря долната челюст.', type: 'count', sets: 1, reps: 5 },
  { id: 'suction-pop', group: 'tongue', emoji: '🦄', title: 'Вълшебното конче', text: 'Езикът се прилепя широк към небцето (вакуум), отваря се долната челюст, изчаква се до 5 сек. и езикът се отлепя със звук като „конче“.', type: 'hold', reps: 5, hold: 5 },
]
