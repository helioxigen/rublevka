export default values => ({
  agencyId: !values.agencyId && 'Обязательно',
  packageId: !values.packageId && 'Обязательно',
  title: !values.title && 'Обязательно',
});
