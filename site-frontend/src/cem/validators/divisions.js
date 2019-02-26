export default values => {
  const errors = {};

  if (!values.name) errors.name = 'Укажите название отдела!';
  if (!values.departmentId) errors.departmentId = 'Укажите департамент!';

  return errors;
};
