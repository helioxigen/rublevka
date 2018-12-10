const fields = [
  'objectId',
  'objectKlass',
  'kind',
  'description',
  'responsibleUserId',
  'images[].id',
  'images[].url',
  'images[].isPublic',
  'toggle',
];

export const formSettings = {
  form: 'requestImages',
  fields,
  validate: ({ description }) => ({
    description: !description && 'Обязательно',
  }),
};
