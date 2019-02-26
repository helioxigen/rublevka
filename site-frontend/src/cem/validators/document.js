export default values => {
  const errors = {};

  if (!values.kindId) errors.kindId = 'Укажите тип документа!';
  // if (!values.file) errors.file = `Прикрепите файл`;

  return errors;
};
