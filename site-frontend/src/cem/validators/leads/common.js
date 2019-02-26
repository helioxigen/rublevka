export const validateContactDetails = (contactDetails, state) => {
  if (!contactDetails && state === 'in_progress') {
    return {
      // firstName: `Укажите имя контакта`,
      phoneNumber: !contactDetails.phoneNumber && 'Укажите телефон контакта',
      // email: `Укажите E-Mail контакта`,
      kindId: !contactDetails.kindId && 'Обязательно',
    };
  }
};

export const validateSellingContactDetails = (contactDetails, state) => {
  if (state === 'in_progress') {
    return contactDetails
      ? {
          // firstName: !contactDetails.firstName && `Укажите имя контакта`,
          // phoneNumber: !contactDetails.phoneNumber && `Укажите телефон контакта`,
          kindId: !contactDetails.kindId && 'Обязательно',
          // email: `Укажите e-mail контакта`,
        }
      : {
          // firstName: `Укажите имя контакта`,
          // phoneNumber: `Укажите телефон контакта`,
          // email: `Укажите e-mail контакта`,
          kindId: 'Обязательно',
        };
  }
};
