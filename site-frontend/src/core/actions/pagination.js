import * as types from 'core/constants/pagination';

export const updatePagination = (kind, pagination) => ({
  type: types.UPDATE_PAGINATION,
  kind,
  pagination,
});

export default { updatePagination };
