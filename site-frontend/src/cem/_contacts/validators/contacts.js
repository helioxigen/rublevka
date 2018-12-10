export default (values) => {
  const details = {};

  if (!values.details.firstName) details.firstName = 'Обязательно';
  if (!values.details.phoneNumber) details.phoneNumber = 'Укажите основной номер телефона!';

  return { details };
};
