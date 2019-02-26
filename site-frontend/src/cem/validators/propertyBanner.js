export default values => ({
  state: !values.state && 'Обязательно',
  kindId: !values.kindId && 'Обязательно',
  image: {
    url: values.state === 'active' && !values.image.url && 'Обязательно',
  },
  reason:
    ['denied', 'removed'].indexOf(values.state) > -1 &&
    !values.reason &&
    'Обязательно',
  expectedDateOfCompleteion:
    values.state === 'ordered' &&
    !values.expectedDateOfCompleteion &&
    'Обязательно',
  dateOfCompletion:
    values.state === 'active' && !values.dateOfCompletion && 'Обязательно',
});
