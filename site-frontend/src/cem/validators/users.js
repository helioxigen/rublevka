const stupidPasswords = ['qwerty', '123', 'rubl', 'jqest', 'pass', 'admin'];

export default (values, { formKey }) => {
  const errors = {
    details: {},
  };

  if (!values.firstName) errors.firstName = 'Обязательно';
  if (!values.middleName) errors.middleName = 'Обязательно';
  if (!values.lastName) errors.lastName = 'Обязательно';

  if (!values.details.startedWorkAt) errors.details.startedWorkAt = 'Обязательно';

  if (!values.workPhoneNumber) errors.workPhoneNumber = 'Обязательно';
  if (!values.email) errors.email = 'Обязательно';
  if (!values.password && formKey === 'create') errors.password = 'Обязательно';
  if (values.password) {
    stupidPasswords.forEach((password) => {
      if (values.password.toLowerCase().indexOf(password) > -1) {
        errors.password = 'Артём, сгенерируй нормальный пароль http://www.dinopass.com/';
      }
    });

    if (values.password.length < 6) {
      errors.password = 'Пароль должен состоять из 6 или более символов';
    }
  }

  if (!values.personalPhoneNumber) errors.personalPhoneNumber = 'Обязательно';
  if (!values.personalEmail) errors.personalEmail = 'Обязательно';

  return errors;
};
