export const states = {
  new: {
    style: 'primary',
    title: 'Новый',
  },
  in_progress: {
    style: 'warning',
    title: 'В обработке',
  },
  processed: {
    style: 'success',
    title: 'Обработан',
  },
  rejected: {
    style: 'danger',
    title: 'Отклонён',
  },
  spam: {
    style: 'danger',
    title: 'Спам',
  },
};

export const callStatuses = {
  new: {
    style: 'warning',
    title: 'Новый',
  },
  in_progress: {
    style: 'primary',
    title: 'В процессе',
  },
  successful: {
    style: 'success',
    title: 'Успешный',
  },
  unsuccessful: {
    style: 'danger',
    title: 'Неуспешный',
  },
};

export const requestKinds = {
  selection: {
    title: 'На подбор',
  },
  properties: {
    title: 'По объектам',
  },
  selling: {
    title: 'На продажу',
  },
  purchase: {
    title: 'На покупку',
  },
};

export const leadKinds = {
  recommendation: {
    title: 'Рекомендация',
  },
  online: {
    title: 'Онлайн',
  },
  phone_call: {
    title: 'По телефону',
  },
};
