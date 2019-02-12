export default values => {
  const errors = {};

  if (!values.name) errors.name = 'Укажите название роли!';

  return errors;
};
