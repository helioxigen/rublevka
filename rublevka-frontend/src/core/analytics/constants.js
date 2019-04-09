import capitalize from 'lodash/capitalize';

const dealTypeToLegacy = {
  sale: 'buy',
  rent: 'rent',
};

// selection request
export const searchRequestOpened = ({ ...payload }) => ({
  event: 'SearchRequest',
  ...payload,
});
export const searchRequestSubmitted = ({ ...payload }) => ({
  event: 'podbor_po_parametram',
  ...payload,
});

// callback
export const callbackSubmitted = ({ ...payload }) => ({
  event: 'callback',
  ...payload,
});

// sell property form
export const sellPropertySubmitted = ({ ...payload }) => ({
  event: 'prodat_dom',
  ...payload,
});

// properties form request
export const resultPropertiesOpened = (eventName, { ...payload }) => ({
  event: eventName,
  ...payload,
});

// export const complexPropertyCardOpened = ({ ...payload }) => ({
//   event: `complexesId.propertyCard.opened`,
//   ...payload,
// });
export const landingSearchSubmitted = ({ ...payload }) => ({
  event: 'form.submit.landing.search',
  ...payload,
});

// emails
// export const feedbackSubmitted = () => ({
//   event: `email.feedback`,
// });

// TODO
export const subscribeOpened = () => ({
  event: 'email.subscribe',
});
export const subscribeSubmitted = () => ({
  event: 'newsletter_form',
});

// places
// TODO
export const placesListOpened = ({ placeKind, ...payload }) => ({
  event: `${capitalize(placeKind)}List`,
  ...payload,
});

// TODO
export const placeOpened = ({ placeKind, ...payload }) => ({
  event: `${capitalize(placeKind)}`,
  ...payload,
});

// properties
export const propertiesListOpened = ({ dealType, ...payload }) => ({
  event: `ObjectList${capitalize(dealTypeToLegacy[dealType])}`,
  ...payload,
});

export const propertyOpened = ({ dealType, ...payload }) => ({
  event: `Object${capitalize(dealTypeToLegacy[dealType])}`,
  ...payload,
});

export const PropertyCardOpened = ({ ...payload }) => ({
  event: 'PropertyCardOpened',
  ...payload,
});

export const PropertyCardFormSubmitted = ({ ...payload }) => ({
  event: 'PropertyCardFormSubmitted',
  ...payload,
});

export const propertyRequestOpened = ({ dealType, ...payload }) => ({
  event: `Object${capitalize(dealTypeToLegacy[dealType])}Partner`,
  // id,
  // price,
  // mkad,
  // housearea,
  // landarea,
  // settlement,

  // id,
  // price,
  // totalArea,
  // complexId,
  // complexName,
  ...payload,
});

export const propertyRequestSubmitted = ({ dealType, ...payload }) => ({
  // id,
  // price,
  // mkad,
  // housearea,
  // landarea,
  // settlement,

  // id,
  // price,
  // totalArea,
  // complexId,
  // complexName,

  event: 'prosmotr_form',
  ...payload,
});
