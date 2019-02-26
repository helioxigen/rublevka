import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber } = formHelpers;
import { validateSellingContactDetails } from './common';

// TODO: cem/validators/properties.js - merge and incapsulate for reusability;
const validateLead = lead => {
  const values = recursiveCleanUp(lead);
  const { requestDetails = {}, contactDetails, state } = values;
  const propertyErrors = {
    category: !requestDetails.category ? 'Обязательно' : undefined,
    kind: !requestDetails.kind ? 'Обязательно' : undefined,
    rentOffer: { agentFixedPrice: {} },
    saleOffer: { agentFixedPrice: {} },
  };

  if (requestDetails.rentOffer) {
    const { rentOffer } = requestDetails;
    if (!rentOffer.price) propertyErrors.rentOffer.price = 'Укажите стоимость';
    if (isNaN(rentOffer.price))
      propertyErrors.rentOffer.price = 'Стоимость дожна быть числом';
    if (!rentOffer.currency)
      propertyErrors.rentOffer.currency = 'Укажите валюту';
    if (!rentOffer.period) propertyErrors.rentOffer.period = 'Укажите период';
    if (!rentOffer.deposit)
      propertyErrors.rentOffer.deposit = 'Укажите объём депозита';

    if (rentOffer.isAgentFixed === 'true') {
      if (rentOffer.agentFixedPrice) {
        if (isNaN(rentOffer.agentFixedPrice.price)) {
          propertyErrors.rentOffer.agentFixedPrice.price =
            'Размер комиссии должен быть числом';
        }
        if (!rentOffer.agentFixedPrice.price) {
          propertyErrors.rentOffer.agentFixedPrice.price =
            'Укажите размер комиссии';
        }
        if (!rentOffer.agentFixedPrice.currency) {
          propertyErrors.rentOffer.agentFixedPrice.currency = 'Укажите валюту';
        }
      }
    } else {
      if (
        rentOffer.agentFee !== '' &&
        typeof rentOffer.agentFee !== 'undefined' &&
        isNaN(rentOffer.agentFee)
      ) {
        propertyErrors.rentOffer.agentFee =
          'Размер комиссии должен быть числом';
      }
      if (normalizeNumber(rentOffer.agentFee) > 100) {
        propertyErrors.rentOffer.agentFee =
          'Комиссия не может быть больше 100%';
      }
    }
  }

  if (requestDetails.saleOffer) {
    const { saleOffer } = requestDetails;
    if (!saleOffer.price) propertyErrors.saleOffer.price = 'Укажите стоимость';
    if (isNaN(saleOffer.price))
      propertyErrors.saleOffer.price = 'Стоимость дожна быть числом';
    if (!saleOffer.currency)
      propertyErrors.saleOffer.currency = 'Укажите валюту';
    if (!saleOffer.kind) propertyErrors.saleOffer.kind = 'Укажите тип сделки';

    if (saleOffer.isAgentFixed === 'true') {
      if (saleOffer.agentFixedPrice) {
        if (!saleOffer.agentFixedPrice.price) {
          propertyErrors.saleOffer.agentFixedPrice.price =
            'Укажите размер комиссии';
        }
        if (isNaN(saleOffer.agentFixedPrice.price)) {
          propertyErrors.saleOffer.agentFixedPrice.price =
            'Размер комиссии должен быть числом';
        }
        if (!saleOffer.agentFixedPrice.currency) {
          propertyErrors.saleOffer.agentFixedPrice.currency = 'Укажите валюту';
        }
      }
    } else {
      if (!saleOffer.agentFee)
        propertyErrors.saleOffer.agentFee = 'Укажите размер комиссии';
      if (isNaN(saleOffer.agentFee)) {
        propertyErrors.saleOffer.agentFee =
          'Размер комиссии должен быть числом';
      }
      if (normalizeNumber(saleOffer.agentFee) > 100) {
        propertyErrors.saleOffer.agentFee =
          'Комиссия не может быть больше 100%';
      }
    }
  }

  if (!requestDetails.rentOffer && !requestDetails.saleOffer) {
    propertyErrors.rentOffer.price = 'Укажите хотя бы одну сделку';
    propertyErrors.saleOffer.price = 'Укажите хотя бы одну сделку';
  }

  const errors = {
    contactDetails: validateSellingContactDetails(contactDetails, state),
    requestDetails: { ...propertyErrors },
  };

  return errors;
};

export default validateLead;
