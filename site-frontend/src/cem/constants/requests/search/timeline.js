export const settings = {
  stages: [
    {
      id: 'new',
      title: 'Проверка актуальности',
      changesId: 'new',
    },
    {
      id: 'assigned',
      title: 'Исполнитель выбран',
      changesId: 'assigned',
    },
    {
      id: 'in_progress',
      title: 'В работе',
      changesId: 'inProgress',
    },
    {
      id: 'done',
      title: 'Проверка руководителем',
      changesId: 'done',
    },
    {
      id: 'approved',
      title: 'Проверка заказчиком',
      changesId: 'approved',
    },
    {
      id: 'finished',
      title: 'Выполнена',
      changesId: 'finished',
    },
  ],
  rejectionStates: ['rejected'],
};
