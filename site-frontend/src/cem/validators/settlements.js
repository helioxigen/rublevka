import {
  formHelpers
} from 'cem/helpers';
const {
  normalizeNumber
} = formHelpers;

const validate = (settlement, {
  formKey
}) => {
  const isPublic = settlement.state === 'public';

  return {
    name: (!settlement.name) ? 'Обязательно' : undefined,
    state: (!settlement.state && formKey !== 'create') ? 'Обязательно' : undefined,
    // slug: (!settlement.slug && isPublic) ? 'Обязательно' : undefined,
    location: {
      linkedLocalityIds: (!settlement.location.linkedLocalityIds && isPublic) ? 'Обязательно' : undefined,
      localityId: (!settlement.location.localityId) ? 'Обязательно' : undefined,
      mkadDistance: (!settlement.location.mkadDistance && isPublic) ? 'Обязательно' : undefined,
      latitude: (!settlement.location.latitude && isPublic) ? 'Обязательно' : undefined,
      longitude: (!settlement.location.longitude && isPublic) ? 'Обязательно' : undefined,
    },
  };
};

const validateCommonFields = (values) => {
  const errors = {
    saleOffer: {
      agentFixedPrice: {},
    },
  };

  if (!values.saleOffer.kind) errors.saleOffer.kind = 'Укажите тип сделки';
  if (!values.saleOffer.isAgentFixed) errors.saleOffer.isAgentFixed = 'Укажите формат агентской комиссии';
  if (values.saleOffer.isAgentFixed === 'false') {
    if (!values.saleOffer.agentFee) errors.saleOffer.agentFee = 'Укажите размер комисии в процентах';
    if (normalizeNumber(values.saleOffer.agentFee) > 100) errors.saleOffer.agentFee = 'Комиссия не может быть больше 100%';
  } else if (values.saleOffer.agentFixedPrice) {
    if (!values.saleOffer.agentFixedPrice.price) errors.saleOffer.agentFixedPrice.price = 'Укажите цену';
    if (!values.saleOffer.agentFixedPrice.currency) errors.saleOffer.agentFixedPrice.currency = 'Укажите валюту';
  } else {
    errors.saleOffer.agentFixedPrice.price = 'Укажите цену';
    errors.saleOffer.agentFixedPrice.currency = 'Укажите валюту';
  }

  return errors;
};

const validatePropertiesTableFields = (values) => {
  const errors = {
    saleOffer: {
      agentFixedPrice: {},
    },
    specification: {},
    location: {},
    landDetails: {},
  };

  if (!values.state) errors.state = 'Обязательно';

  if (!values.saleOffer.price || values.saleOffer.price === '0') errors.saleOffer.price = 'Обязательно';
  if (!values.saleOffer.currency) errors.saleOffer.currency = 'Обязательно';

  if (values.specification) {
    if (values.kind !== 'land' && !values.specification.area) errors.specification.area = 'Обязательно';
  }

  if (values.location) {
    if (!values.location.house) errors.location.house = 'Обязательно';
  }

  if (values.landDetails) {
    if (!values.landDetails.area) errors.landDetails.area = 'Обязательно';
  }

  return errors;
};

export {
  validateCommonFields,
  validatePropertiesTableFields,
};

export default validate;
