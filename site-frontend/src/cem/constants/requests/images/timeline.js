export const settings = {
  stages: [
    {
      id: 'new',
      title: 'Новая',
      changesId: 'new',
    },
    {
      id: 'in_progress',
      title: 'В работе',
      changesId: 'inProgress',
    },
    {
      id: 'done',
      title: 'На проверке у руководителя',
      changesId: 'done',
    },
    {
      id: 'approved',
      title: 'На проверке у заказчика',
      changesId: 'approved',
    },
    {
      id: 'finished',
      title: 'Выполнено',
      changesId: 'finished',
    },
  ],
  rejectionStates: ['rejected'],
};
