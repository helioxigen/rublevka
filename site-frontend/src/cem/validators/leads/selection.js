import { validateContactDetails } from './common';

export default (values) => {
  const errors = {
    contactDetails: validateContactDetails(values.contactDetails, values.state),
    requestDetails: {
      category:
        values.requestDetails &&
        !values.requestDetails.category &&
        values.state === 'in_progress' &&
        'Обязательно',
      offerKind:
        values.requestDetails &&
        !values.requestDetails.offerKind &&
        values.state === 'in_progress' &&
        'Обязательно',
      kind:
        values.requestDetails &&
        !values.requestDetails.kind &&
        values.state === 'in_progress' &&
        'Обязательно',
      price: {
        from:
          values.requestDetails &&
          values.requestDetails.price &&
          !values.requestDetails.price.from &&
          values.state === 'in_progress' &&
          'Обязательно',
        to:
          values.requestDetails &&
          values.requestDetails.price &&
          !values.requestDetails.price.to &&
          values.state === 'in_progress' &&
          'Обязательно',
      },
      currency:
        values.requestDetails &&
        !values.requestDetails.currency &&
        values.state === 'in_progress' &&
        'Обязательно',
    },
  };
  return errors;
};
