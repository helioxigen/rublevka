export default values => {
  const errors = {};

  if (!values.departmentId) errors.departmentId = 'Укажите департамент!';
  if (!values.staffUserId) errors.staffUserId = 'Укажите сотрудника!';
  if (!values.startDate) errors.startDate = 'Укажите начальную дату!';
  if (!values.finishDate) errors.finishDate = 'Укажите конечную дату!';

  if (!values.startTime) errors.startTime = 'Укажите время!';
  if (!values.finishTime) errors.finishTime = 'Укажите время!';

  return errors;
};
