export default id => [
  {
    url: `/settings/export_packages/${id}/about`,
    title: 'Информация',
    isShown: true,
  },
  {
    url: `/settings/export_packages/${id}/logs`,
    title: 'Лог ошибок',
    isShown: true,
  },
];
