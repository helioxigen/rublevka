export const states = {
  to_do: {
    style: 'primary',
    title: 'Ожидается',
  },
  done: {
    style: 'success',
    title: 'Успешная',
    actionTitle: 'Отметить задачу успешной',
    kind: 'successful',
  },
  canceled: {
    style: 'danger',
    title: 'Неуспешная',
  },
  cancel: {
    style: 'danger',
    actionTitle: 'Отметить задачу неуспешной',
    kind: 'unsuccessful',
  },
};

export const kinds = {
  call: {
    title: 'Звонок',
  },
  email: {
    title: 'Email',
  },
  sms: {
    title: 'SMS',
  },
  meeting: {
    title: 'Встреча',
  },
  preview: {
    title: 'Показ',
  },
  negotiation: {
    title: 'Переговоры',
  },
  free: {
    title: 'Свободная',
  },
};

export const linkKinds = {
  client_lead: {
    title: 'По лиду',
  },
  property: {
    title: 'По объекту',
  },
  deal: {
    title: 'По сделке',
  },
};

export const previewStates = {
  pending: {
    title: 'Запланирован',
    style: 'primary',
  },
  viewed: {
    title: 'Состоялся',
    style: 'success',
  },
  rejected: {
    title: 'Отменён',
    style: 'danger',
  },
};

export const objectKlasses = {
  city_property: {
    title: 'Городской объект',
  },
  // country_property: {
  //   title: `Загородный объект`,
  // },
  complex: {
    title: 'Жилой комплекс',
  },
  settlement: {
    title: 'Посёлок',
  },
};
