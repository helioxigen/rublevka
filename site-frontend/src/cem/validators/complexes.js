const validate = values => {
  const isPublic = values.state === 'public';

  const errors = {
    details: {},
    location: {},
  };

  if (!values.name) errors.name = 'Укажите название';
  // if (!values.location) errors.location = `Укажите адрес`;
  if (!values.state) errors.state = 'Укажите статус';
  if (isPublic) {
    if (!values.location.latitude) errors.location.latitude = 'Обязательно';
    if (!values.location.longitude) errors.location.longitude = 'Обязательно';
    if (!values.commissioningQuarter)
      errors.commissioningQuarter = 'Обязательно';
    if (!values.commissioningYear) errors.commissioningYear = 'Обязательно';
    if (values.commissioningYear < 1800) {
      errors.commissioningYear = 'Год не должен быть раньше 1800';
    }
  }

  return errors;
};

export default validate;
