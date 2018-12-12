export const mapFilter = filter => ({
  ...filter,
  ...(filter.name ? { name: `*${filter.name}*` } : {}),
});
