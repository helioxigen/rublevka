import validate from 'cem/validators/companies';

const fields = [
  'name',
  'inn',
  'ogrn',
  'registeredAt',
  'state',
  'kpp',
  'opf',
  'address',
  'phoneNumbers',
  'ceoName',
  'ceoPosition',
  'responsibleUserId',
];

export default {
  form: 'company',
  fields,
  validate,
};
