export const subscribeForm = {
  form: 'emailSubscribe',
  fields: ['email'],
  validate: values => ({ email: !values.email && 'Обязательно' }),
};

export const notifyForm = {
  form: 'emailNotify',
  fields: ['firstName', 'email', 'phoneNumber', 'message'],
  validate: values => ({ phoneNumber: !values.phoneNumber && 'Обязательно' }),
};
