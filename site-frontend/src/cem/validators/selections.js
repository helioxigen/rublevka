const validate = values => {
  const errors = {};

  if (!values.name) errors.name = 'Укажите название';
  if (!values.site) errors.site = 'Укажите статус';
  if (!values.propertyCategory) errors.propertyCategory = 'Укажите категорию';
  if (
    !values.propertyIds ||
    (Array.isArray(values.propertyIds) && !values.propertyIds.length)
  ) {
    errors.propertyIds = 'Укажите хотя бы один объект';
  }
  if (!values.pages || (Array.isArray(values.pages) && !values.pages.length)) {
    errors.pages = 'Укажите хотя бы один раздел';
  }

  return errors;
};

export default validate;
