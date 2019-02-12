export default values => {
  const errors = {};

  if (!values.signedById) errors.signedById = 'Обязательно';
  if (!values.validFrom) errors.validFrom = 'Обязательно';
  if (!values.validTo) errors.validTo = 'Обязательно';

  return errors;
};
