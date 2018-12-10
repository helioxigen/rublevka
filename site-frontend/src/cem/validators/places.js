export default (values) => {
  const errors = { location: {} };

  if (!values.name) errors.name = 'Обязательно';
  if (values.kind === 'regions' && !values.location.countryId) errors.location.countryId = 'Обязательно';
  if (values.kind === 'localities' && !values.location.regionId) errors.location.regionId = 'Обязательно';
  if (values.kind === 'routes' && !values.location.regionId) errors.location.regionId = 'Обязательно';
  if (values.kind === 'sub_localities' && !values.location.localityId) errors.location.localityId = 'Обязательно';
  if (values.kind === 'districts' && !values.location.regionId) errors.location.regionId = 'Обязательно';
  if (values.kind === 'subways' && !values.location.subLocalityId) errors.location.subLocalityId = 'Обязательно';

  return errors;
};
