export default {
  stages: [
    {
      id: 'new',
      title: 'На подтверждении руководителя',
      changesId: 'new',
    },
    {
      id: 'approved',
      title: 'На подтверждении у директора хаба',
      changesId: 'approved',
    },
    {
      id: 'finished',
      title: 'Завершена',
      changesId: 'finished',
    },
  ],
  rejectionStates: ['rejected'],
};
