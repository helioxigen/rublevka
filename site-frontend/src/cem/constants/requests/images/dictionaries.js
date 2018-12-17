export const lanes = {
  new: {
    style: 'primary',
    title: 'Новые',
  },
  inProgress: {
    style: 'warning',
    title: 'В работе',
  },
  managerApproval: {
    style: 'warning',
    title: 'На подтверждении у руководителя',
  },
  originatorApproval: {
    style: 'warning',
    title: 'На подтверждении у заказчика',
  },
};

export const states = {
  new: {
    style: 'primary',
    title: 'Новая',
  },
  in_progress: {
    style: 'warning',
    title: 'В работе',
  },
  done: {
    style: 'warning',
    title: 'Съемка завершена',
  },
  approved: {
    style: 'warning',
    title: 'Съемка одобрена',
  },
  finished: {
    style: 'success',
    title: 'Заявка выполнена',
  },
  rejected: {
    style: 'danger',
    title: 'Заявка отменена',
  },
};

export const laneFilters = {
  new: {
    state: 'new',
  },
  inProgress: {
    state: 'in_progress',
  },
  managerApproval: {
    state: 'done',
  },
  originatorApproval: {
    state: 'approved',
  },
  archive: {
    state: 'rejected,finished',
  },
};

export const captions = ['неудовлетворен', 'достаточно', 'хорошо', 'очень хорошо', 'отлично'];

export const kinds = {
  image: 'Фотографии',
  layout: 'Планировка',
};

export const categories = {
  city_property: {
    value: 'city',
    label: 'Городская',
  },
  country_property: {
    value: 'country',
    label: 'Загородная',
  },
};
