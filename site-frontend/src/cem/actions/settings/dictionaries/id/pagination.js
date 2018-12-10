import * as types from 'cem/constants/dictionaries';

const updatePagination = ({ kind, pagination }) => ({
  type: types.UPDATE_PAGINATION,
  kind,
  pagination,
});

export { updatePagination };
