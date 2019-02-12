export default values => {
  const errors = {
    kind: !values.kind && 'Обязательно',
    note: !values.note && 'Обязательно',
    originalPropertyId:
      values.kind === 'duplicate' &&
      !values.originalPropertyId &&
      'Обязательно',
  };
  return errors;
};
