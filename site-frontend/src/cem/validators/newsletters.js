const validate = (values) => {
  const errors = {};

  const isNew = !values.id;

  const hasProperties =
    values.propertyIds || (Array.isArray(values.propertyIds) && values.propertyIds.length > 0);

  if (isNew) {
    if (!values.site) errors.site = 'Укажите сайт';
    if (!hasProperties) errors.propertyIds = 'Укажите хотя бы один объект';
    if (!values.name) errors.name = 'Укажите название';
    if (!values.subTitle) errors.subTitle = 'Обязательное поле';
  }

  if (!values.title) errors.title = 'Обязательное поле';
  if (!values.state) errors.state = 'Укажите статус';

  return errors;
};

export default validate;
