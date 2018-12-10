import notifications from './list';

const fields = notifications.map(item => item.key);

export default {
  form: 'userNotificationSettings',
  fields,
};
