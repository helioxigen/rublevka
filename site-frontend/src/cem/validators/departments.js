export default values => {
  const errors = {};

  if (!values.name) errors.name = 'Укажите название департамента!';

  return errors;
};
