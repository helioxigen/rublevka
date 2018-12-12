export const states = [
  { id: 'draft', title: 'В черновиках' },
  { id: 'public', title: 'Опубликован' },
];

export const houseKinds = [
  { label: 'Новостройка', value: 'new' },
  { label: 'Хрущёвка', value: 'khrushchevka' },
  { label: 'Сталинка', value: 'stalinka' },
];

export const deliveryQuarters = [
  { label: 'Первый', value: 'first' },
  { label: 'Второй', value: 'second' },
  { label: 'Третий', value: 'third' },
  { label: 'Четвёртый', value: 'fourth' },
];

export const constructionStages = [
  { label: 'Строится', value: 'in_progress' },
  { label: 'Построен, но не сдан', value: 'not_delivered_yet' },
  { label: 'Cдан в эксплуатацию', value: 'done' },
];

export const constructionKinds = [
  { label: 'Кирпичный', value: 'brick' },
  { label: 'Панельный', value: 'panel' },
  { label: 'Монолитный', value: 'monolith' },
  { label: 'Кирпично-монолитный', value: 'brick_monolithic' },
];

export const securityKinds = [
  { label: 'Охраняемая территория', value: 'guarded' },
  { label: 'Огороженная территория', value: 'protected_area' },
];

export const contractTypes = [
  { value: 'ddu', label: 'ДДУ' },
  { value: 'assignation', label: 'Переуступка' },
  { value: 'dkp', label: 'ДКП' },
  { value: 'pdkp', label: 'ПДКП' },
  { value: 'investment', label: 'Договор инвестирования' },
];
