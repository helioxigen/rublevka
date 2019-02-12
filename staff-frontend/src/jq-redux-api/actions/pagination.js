export const updatePagination = (kind, pagination) => ({
  type: 'pagination.update',
  kind,
  pagination,
});

export default { updatePagination };
