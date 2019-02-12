export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const { limit, offset } = pagination;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      id: filter.id,
      name: filter.name ? `*${filter.name.trim()}*` : null,
      state: filter.state,
      pages: filter.pages,
    },
    filterNot: {
      ...filterNot,
    },
  };
};
