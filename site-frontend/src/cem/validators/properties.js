import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

const validate = property => {
  const values = recursiveCleanUp(property);
  const errors = {
    rentOffer: {
      agentFixedPrice: {},
    },
    saleOffer: {
      agentFixedPrice: {},
    },
    location: {},
    specification: {},
    information: {},
    residentialComplex: {
      details: {},
    },

    complexBuildingDetails: {},
    landDetails: {},
    communication: {},
  };

  if (!values.state) errors.state = 'Укажите статус';

  if (values.state && values.state !== 'draft') {
    // if (!values.category) errors.category = `Укажите категорию`;
    if (!values.kind) errors.kind = 'Укажите тип';
    if (!values.rentOffer && !values.saleOffer) {
      errors.saleOffer.price = 'Укажите одну из сделок';
      errors.rentOffer.price = 'Укажите одну из сделок';
    }

    if (values.rentOffer) {
      if (!values.rentOffer.price || values.rentOffer.price === '0') {
        errors.rentOffer.price = 'Укажите валюту';
      }
      if (!values.rentOffer.currency)
        errors.rentOffer.currency = 'Укажите валюту';
      if (!values.rentOffer.period) errors.rentOffer.period = 'Укажите период';
      if (!values.rentOffer.deposit && values.rentOffer.deposit !== 0) {
        errors.rentOffer.deposit = 'Укажите размер депозита';
      }
      if (!values.rentOffer.isAgentFixed) {
        errors.rentOffer.isAgentFixed = 'Укажите формат агентской комиссии';
      }
      if (values.rentOffer.isAgentFixed === 'false') {
        if (normalizeNumber(values.rentOffer.agentFee) > 100) {
          errors.rentOffer.agentFee = 'Комиссия не может быть больше 100%';
        }
      } else if (values.rentOffer.agentFixedPrice) {
        if (!values.rentOffer.agentFixedPrice.price) {
          errors.rentOffer.agentFixedPrice.price = 'Укажите цену';
        }
        if (!values.rentOffer.agentFixedPrice.currency) {
          errors.rentOffer.agentFixedPrice.currency = 'Укажите валюту';
        }
      } else {
        errors.rentOffer.agentFixedPrice.price = 'Укажите цену';
        errors.rentOffer.agentFixedPrice.currency = 'Укажите валюту';
      }
    }

    // See :19
    if (values.saleOffer) {
      if (!values.saleOffer.price || values.saleOffer.price === '0') {
        errors.saleOffer.price = 'Укажите валюту';
      }
      if (!values.saleOffer.currency)
        errors.saleOffer.currency = 'Укажите валюту';
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
    }

    if (values.category === 'city') {
      if (values.specification) {
        if (!values.specification.totalArea) {
          errors.specification.totalArea = 'Укажите общую площадь';
        }
        if (!values.specification.livingArea) {
          errors.specification.livingArea = 'Укажите жилую площадь';
        }
        // if (!values.specification.rooms) errors.specification.rooms = `Укажите количество комнат`;
        if (!values.specification.wcs)
          errors.specification.wcs = 'Укажите количество сан. узлов';
        if (!values.specification.floor)
          errors.specification.floor = 'Укажите этаж';
        if (!values.specification.windows)
          errors.specification.windows = 'Укажите вид из окна';
      } else {
        errors.specification.layout = 'Заполните этот блок';
      }

      if (values.information) {
        if (!values.information.condition)
          errors.information.condition = 'Укажите состояние';
        if (!values.information.renovate)
          errors.information.renovate = 'Укажите ремонт';
        if (!values.information.conditioning) {
          errors.information.conditioning = 'Укажите кондиционирование';
        }
        if (!values.information.ventilation)
          errors.information.ventilation = 'Укажите вентиляцию';
        if (!values.information.furniture)
          errors.information.furniture = 'Укажите мебель';
      } else {
        errors.information.condition = 'Заполните этот блок';
      }

      if (!values.location && !values.complexBuildingId) {
        errors.location.countryId = 'Заполните адрес';
      }
    }

    if (values.category === 'country' && values.kind !== 'land') {
      if (values.location) {
        if (!values.location.house)
          errors.location.house = 'Укажите № дома/участка!';
      }
      if (values.kind !== 'land') {
        if (values.specification) {
          if (!values.specification.wallMaterial) {
            errors.specification.wallMaterial = 'Укажите конструкцию дома!';
          }
          if (!values.specification.roofMaterial) {
            errors.specification.roofMaterial = 'Укажите материал крыши!';
          }
          if (!values.specification.bedrooms) {
            errors.specification.bedrooms = 'Укажите общее количество спален!';
          }
          if (!values.specification.area)
            errors.specification.area = 'Укажите площадь!';
          if (!values.specification.builtYear) {
            errors.specification.builtYear = 'Укажите год строительства!';
          }
          if (!values.specification.floors) {
            errors.specification.floors = 'Укажите количество этажей!';
          }
          if (!values.specification.renovate) {
            errors.specification.renovate = 'Укажите состояние ремонта!';
          }
          if (!values.specification.condition) {
            errors.specification.condition = 'Укажите состояние!';
          }
          if (!values.specification.furniture)
            errors.specification.furniture = 'Укажите мебель!';
        } else {
          errors.specification.wallMaterial = 'Заполните этот блок';
        }

        if (values.landDetails) {
          if (!values.landDetails.landscapeKind) {
            errors.landDetails.landscapeKind = 'Укажите тип участка!';
          }
          if (!values.landDetails.area)
            errors.landDetails.area = 'Укажите площадь участка!';
        } else {
          errors.landDetails.landscapeKind = 'Заполните этот блок';
        }

        if (values.communication) {
          if (!values.communication.powerSupply) {
            errors.communication.powerSupply = 'Укажите значение!';
          }
          if (!values.communication.waterSupply) {
            errors.communication.waterSupply = 'Укажите тип водоснабжения!';
          }
          if (!values.communication.gasSupply) {
            errors.communication.gasSupply = 'Укажите тип газификации!';
          }
          if (!values.communication.sewerageSupply) {
            errors.communication.sewerageSupply = 'Укажите тип канализации!';
          }
        } else {
          errors.communication.powerSupply = 'Заполните этот блок';
        }

        if (!values.location) errors.location.settlementId = 'Заполните адрес';
      }
    }
  }

  if (values.state === 'draft') {
    if (values.rentOffer) {
      if (
        !!values.rentOffer.period ||
        !!values.rentOffer.deposit ||
        !!values.rentOffer.isAgentFixed
      ) {
        if (!values.rentOffer.price) errors.rentOffer.price = 'Укажите цену!';
        if (!values.rentOffer.currency)
          errors.rentOffer.currency = 'Укажите валюту!';
      }
    }

    if (values.saleOffer) {
      if (!!values.saleOffer.kind || !!values.saleOffer.isAgentFixed) {
        if (!values.saleOffer.price) errors.saleOffer.price = 'Укажите цену!';
        if (!values.saleOffer.currency)
          errors.saleOffer.currency = 'Укажите валюту!';
      }
    }
  }

  // if (values.residentialComplex && !values.location) errors.location.countryId = `Заполните адрес`;

  if (!values.complexBuildingId && values.complexBuildingDetails) {
    if (!values.complexBuildingDetails.houseKind) {
      errors.complexBuildingDetails.houseKind = 'Обязательно';
    }
    if (!values.complexBuildingDetails.builtYear) {
      errors.complexBuildingDetails.builtYear = 'Обязательно';
    }
    if (!values.complexBuildingDetails.series)
      errors.complexBuildingDetails.series = 'Обязательно';

    if (!values.complexBuildingDetails.floors)
      errors.complexBuildingDetails.floors = 'Обязательно';
    if (!values.complexBuildingDetails.constructionKind) {
      errors.complexBuildingDetails.constructionKind = 'Обязательно';
    }
    if (!values.complexBuildingDetails.elevators) {
      errors.complexBuildingDetails.elevators = 'Обязательно';
    }
    // if (!values.complexBuildingDetails.freightElevators) errors.complexBuildingDetails.freightElevators = `Обязательно`;
    // if (!values.complexBuildingDetails.security) errors.complexBuildingDetails.security = `Обязательно`;
  }
  return errors;
};

const validateDocument = values => {
  const errors = {};

  if (!values.kindId) errors.kindId = 'Обязательно';

  return errors;
};

const validateContact = values => {
  const errors = {};

  if (!values.linkedContactId) errors.linkedContactId = 'Обязательно';
  if (!values.kindId) errors.kindId = 'Обязательно';

  return errors;
};

export default validate;
export { validateDocument, validateContact };
