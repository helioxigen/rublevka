const fields = [
  'propertyCategory',
  'note',
  'propertyIds[]',
  'toggle',
  'responsibleUserId',
];

export default {
  form: 'propertySearchRequest',
  fields,
  validate: ({ propertyCategory, note }) => ({
    propertyCategory: !propertyCategory && 'Обязательно',
    note: !note && 'Обязательно',
  }),
};
