export default values => {
  const errors = {};

  if (!values.name) errors.name = 'Укажите название приложения';
  if (!values.responsibleUserId)
    errors.responsibleUserId = 'Укажите пользователя';
  if (!values.roleId) errors.roleId = 'Укажите роль';

  return errors;
};
