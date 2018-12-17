export const contactBrokerSettings = {
  form: 'leadsContactAgent',
  fields: ['firstName', 'phoneNumber', 'email'],
  validate: values => ({
    phoneNumber: !values.phoneNumber && 'Обязательно',
  }),
};

export const requestSettings = {
  form: 'leadsRequest',
  fields: [
    'contactDetails.firstName',
    'contactDetails.phoneNumber',
    'contactDetails.email',
    'requestDetails.category',
    'requestDetails.offerKind',
    'requestDetails.kind',
    'price.from',
    'price.to',
    'note',
  ],
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = {
      contactDetails: {},
    };

    // if (!values.contactDetails.phoneNumber) errors.contactDetails.phoneNumber = `Похоже, допущена ошибка при написании телефона, попробуйте еще раз`;
    if (
      values.contactDetails.phoneNumber &&
      !values.contactDetails.phoneNumber.match(/^\+7\s*\(\d{3}\)\s*\d{3}\-\d{2}\-\d{2}$/g)
    ) {
      errors.contactDetails.phoneNumber =
        'Похоже, допущена ошибка при написании телефона, попробуйте еще раз';
    }

    return errors;
  },
};

export const complexBuildingLeadRequestSettings = {
  form: 'complexBuildingLeadRequest',
  fields: [
    'contactDetails.firstName',
    'contactDetails.phoneNumber',
    'requestDetails.category',
    'requestDetails.offerKind',
    'requestDetails.kind',
    'price.from',
    'price.to',
  ],
  validate: (values) => {
    const errors = {
      contactDetails: {},
    };

    // if (!values.contactDetails.firstName) errors.contactDetails.firstName = `Обязательно`;
    if (!values.contactDetails.phoneNumber) errors.contactDetails.phoneNumber = 'Обязательно';

    return errors;
  },
};
