export const filterTransform = filter => ({
  ...filter,
  lastName: filter.lastName ? `${filter.lastName}*` : undefined,
});
