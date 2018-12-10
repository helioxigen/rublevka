import * as types from 'core/constants/order';

export const updateOrder = (resource, field, predicate) => ({
  type: types.UPDATE_ORDER,
  resource,
  field,
  predicate,
});

export const resetOrder = resource => ({
  type: types.RESET_ORDER,
  resource,
});

export default { updateOrder, resetOrder };
