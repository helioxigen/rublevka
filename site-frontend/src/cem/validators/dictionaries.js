export default (values) => {
  const errors = {};

  if (!values.title) errors.title = 'Укажите слово!';

  return errors;
};
