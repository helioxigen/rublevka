export const lanes = {
  new: {
    style: 'warning',
    title: 'Проверка актуальности',
  },
  assigned: {
    style: 'primary',
    title: 'Исполнитель выбран',
  },
  inProgress: {
    style: 'warning',
    title: 'В работе',
  },
  done: {
    style: 'warning',
    title: 'Проверка руководителем',
  },
  approved: {
    style: 'warning',
    title: 'Проверка заказчиком',
  },
};

export const states = {
  new: {
    style: 'warning',
    title: 'Проверка актуальности',
  },
  assigned: {
    style: 'primary',
    title: 'Исполнитель выбран',
  },
  in_progress: {
    style: 'warning',
    title: 'В работе',
  },
  done: {
    style: 'warning',
    title: 'Проверка руководителем',
  },
  approved: {
    style: 'warning',
    title: 'Проверка заказчиком',
  },
  finished: {
    style: 'success',
    title: 'Выполнена',
  },
  rejected: {
    style: 'danger',
    title: 'Отменена',
  },
};

export const laneFilters = {
  new: {
    state: 'new',
  },
  assigned: {
    state: 'assigned',
  },
  inProgress: {
    state: 'in_progress',
  },
  done: {
    state: 'done',
  },
  approved: {
    state: 'approved',
  },
  archive: {
    state: 'rejected,finished',
  },
};

export const captions = ['неудовлетворен', 'достаточно', 'хорошо', 'очень хорошо', 'отлично'];

export const propertyCategories = {
  city: 'Городская',
  country: 'Загородная',
};
