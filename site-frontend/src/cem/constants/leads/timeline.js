export default {
  stages: [
    {
      id: 'new',
      title: 'Новый',
    },
    {
      id: 'in_progress',
      title: 'В обработке',
    },
    {
      id: 'processed',
      title: 'Обработан',
    },
  ],
  rejectionStates: ['spam', 'rejected'],
};
