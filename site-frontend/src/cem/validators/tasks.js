export const validateTaskForm = (values) => {
  const errors = {
    deadline: {},
    contactDetails: {},
    previewDetails: {},
    negotiationDetails: {},
    freeDetails: {},
  };

  if (!values.deadline.date) errors.deadline.date = 'Укажите дату!';
  if (!values.deadline.time) errors.deadline.time = 'Укажите время!';

  if (values.kind === 'free') {
    if (values.freeDetails.linkKind === 'property') {
      if (!values.freeDetails.contactId) errors.freeDetails.contactId = 'Укажите контактное лицо!';
    }
    if (!values.freeDetails.goal) errors.freeDetails.goal = 'Укажите цель!';
  } else {
    if (!values.kind) errors.kind = 'Укажите тип!';

    if (values.kind !== 'preview' && values.kind !== 'negotiation') {
      if (!values.contactDetails.goal) errors.contactDetails.goal = 'Укажите цель!';
    }

    if (values.kind === 'preview') {
      if (!values.previewDetails.propertyId) {
        errors.previewDetails.propertyId = 'Укажите объект!';
      }
    }

    if (values.kind === 'negotiation') {
      if (!values.negotiationDetails.propertyId) {
        errors.negotiationDetails.propertyId = 'Укажите объект!';
      }
    }

    if (values.contactDetails.linkKind === 'property') {
      if (!values.contactDetails.contactId) errors.contactDetails.contactId = 'Укажите контактное лицо!';
    }
  }

  return errors;
};

export const validateDocumentForm = values => ({ file: !values.file && 'Обязательно' });
