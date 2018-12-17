import { formHelpers } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

export const cancelValidate = (values) => {
  const errors = {
    stateDetails: {},
  };

  if (!values.stateDetails.reason) errors.stateDetails.reason = 'Укажите причину';

  return errors;
};

export const validate = (values) => {
  const errors = {
    details: {},
  };

  if (!values.details.budget) errors.details.budget = 'Укажите бюджет';
  if (!values.details.currency) errors.details.currency = 'Укажите валюту';

  if (values.isAgentFixed === 'true') {
    if (!values.details.expectedAgentFixedPrice) {
      errors.details.expectedAgentFixedPrice.price = 'Укажите сумму';
      errors.details.expectedAgentFixedPrice.currency = 'Укажите валюту';
    }
  } else {
    if (!values.details.expectedAgentFee) {
      if (values.details.offerKind === 'purchase') {
        errors.details.expectedAgentFee = 'Укажите комиссию';
      }
    }
    if (normalizeNumber(values.details.expectedAgentFee) > 100) {
      errors.details.expectedAgentFee = 'Комиссия не может быть больше 100%';
    }
  }

  if (!values.details.expectedFinishDateAt) errors.details.expectedFinishDateAt = 'Укажите дату';

  if (
    values.state === 'negotiation' ||
    values.state === 'agreement' ||
    values.state === 'deposit_paid'
  ) {
    if (!values.details.propertyId) errors.details.propertyId = 'Укажите объект недвижимости';
  }

  return errors;
};
