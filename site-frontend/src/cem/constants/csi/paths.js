export default {
  image: requestId => `/v1/orders/images/${requestId}/answers`,
  selection: requestId => `/v1/properties/orders/search/${requestId}/answers`,
};
