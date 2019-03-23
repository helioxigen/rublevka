import * as types from './constants';

export const updatePagination = (resource, pagination) => ({
  type: types.UPDATE_PAGINATION,
  resource,
  pagination,
});

export const resetPagination = resource =>
  updatePagination(resource, { offset: 0 });

export default { updatePagination, resetPagination };
