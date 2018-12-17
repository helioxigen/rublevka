import { formHelpers } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

const validate = (values) => {
  const errors = {
    location: {},
    details: {},
  };

  if (!values.location || (values.location && !values.location.building)) {
    errors.location.building = 'Укажите номер корпуса!';
  }

  if (!values.details.houseKind) {
    errors.details.houseKind = 'Обязательно';
  }

  // if (!values.details.houseKind) errors.details.houseKind = `Обязательно`;
  // if (!values.details.builtYear) errors.details.builtYear = `Обязательно`;
  // // if (!values.details.deliveryQuarter) errors.details.deliveryQuarter = `Обязательно`;
  //
  // if (!values.state && formKey !== `create`) errors.state = `Обязательно`;
  // if (!values.location) errors.location = `Укажите адрес!`;

  // if (!values.stage) errors.stage = `Обязательно`;
  // if (!values.constructionStage) errors.constructionStage = `Обязательно`;
  // if (!values.series) errors.series = `Обязательно`;
  // if (!values.constructionKind) errors.constructionKind = `Обязательно`;
  // if (!values.floors) errors.floors = `Обязательно`;
  // if (!values.elevators) errors.elevators = `Обязательно`;
  // if (!values.freightElevators) errors.freightElevatorCount = `Обязательно`;
  // if (values.withParkings === `true`) {
  //   if (!values.parkingCount) errors.parkingCount = `Обязательно`;
  // }
  // if (values.withUndergroundGarages === `true`) {
  //   if (!values.undergroundGarageCount) errors.undergroundGarageCount = `Обязательно`;
  // }
  // if (!values.security) errors.security = `Обязательно`;

  return errors;
};

const validateCommonFields = (values) => {
  const errors = {
    saleOffer: {
      agentFixedPrice: {},
    },
    information: {},
  };

  if (!values.saleOffer.kind) errors.saleOffer.kind = 'Укажите тип сделки';
  if (!values.saleOffer.isAgentFixed) {
    errors.saleOffer.isAgentFixed = 'Укажите формат агентской комиссии';
  }
  if (values.saleOffer.isAgentFixed === 'false') {
    if (!values.saleOffer.agentFee) {
      errors.saleOffer.agentFee = 'Укажите размер комисии в процентах';
    }
    if (normalizeNumber(values.saleOffer.agentFee) > 100) {
      errors.saleOffer.agentFee = 'Комиссия не может быть больше 100%';
    }
  } else if (values.saleOffer.agentFixedPrice) {
    if (!values.saleOffer.agentFixedPrice.price) {
      errors.saleOffer.agentFixedPrice.price = 'Укажите цену';
    }
    if (!values.saleOffer.agentFixedPrice.currency) {
      errors.saleOffer.agentFixedPrice.currency = 'Укажите валюту';
    }
  } else {
    errors.saleOffer.agentFixedPrice.price = 'Укажите цену';
    errors.saleOffer.agentFixedPrice.currency = 'Укажите валюту';
  }

  if (values.information) {
    if (!values.information.condition) errors.information.condition = 'Укажите состояние';
    if (!values.information.renovate) errors.information.renovate = 'Укажите ремонт';
    if (!values.information.conditioning) {
      errors.information.conditioning = 'Укажите кондиционирование';
    }
    if (!values.information.ventilation) errors.information.ventilation = 'Укажите вентиляцию';
    if (!values.information.furniture) errors.information.furniture = 'Укажите мебель';
  } else {
    errors.information.condition = 'Заполните этот блок';
  }

  return errors;
};

const validatePropertiesTableFields = (values) => {
  const errors = {
    saleOffer: {
      agentFixedPrice: {},
    },
    specification: {},
  };

  if (!values.state) errors.state = 'Обязательно';

  if (!values.saleOffer.price || values.saleOffer.price === '0') {
    errors.saleOffer.price = 'Обязательно';
  }
  if (!values.saleOffer.currency) errors.saleOffer.currency = 'Обязательно';

  if (values.specification) {
    if (!values.specification.floor) errors.specification.floor = 'Обязательно';
    // if (!values.specification.rooms) errors.specification.rooms = `Обязательно`;
    if (!values.specification.totalArea) errors.specification.totalArea = 'Обязательно';
    if (!values.specification.livingArea) errors.specification.livingArea = 'Обязательно';
  } else {
    errors.specification.layout = 'Заполните этот блок';
  }

  return errors;
};

export { validateCommonFields, validatePropertiesTableFields };

export default validate;
