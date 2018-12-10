export default values => ({
  title: !values.title && 'Обязательно',
  slug: !values.slug && 'Обязательно',
});
