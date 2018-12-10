export const validate = (values) => {
  const errors = {
    filter: {
      saleOffer: {},
    },
  };

  if (!values.title) errors.title = 'Введите название';
  if (!values.format) errors.format = 'Выберите формат';
  if (!values.filter.category) errors.filter.category = 'Выберите категорию';
  if (!values.filter.state) errors.filter.state = 'Выберите статус';
  if (!values.filter.isResale) errors.filter.isResale = 'Выберите тип продажи';
  if (!values.companyName) errors.companyName = 'Введите название';
  if (!values.companyPhoneNumber) errors.companyPhoneNumber = 'Введите телефон';
  if (!values.companyEmail) errors.companyEmail = 'Введите email';
  if (!values.watermark) errors.watermark = 'Выберите водяной знак';

  return errors;
};
