export default (values, { formKey }) => {
  const errors = {};

  if (!values.name) errors.name = 'Обязательно';
  if (!values.address || !values.address.length) errors.address = 'Укажите хотя бы один адресс';
  if (formKey !== 'create') {
    if (!values.phoneNumbers) errors.phoneNumbers = 'Укажите хотя бы один телефон';
    if (values.phoneNumbers && !Object.keys(values.phoneNumbers).length) {
      errors.phoneNumbers = 'Укажите хотя бы один телефон';
    }
  }

  return errors;
};
