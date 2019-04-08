export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const { limit, offset } = pagination;
  const { subLocalityId, subLocalities = [] } = filter;

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
      'location.subLocalityId':
        subLocalityId || subLocalities.map(subLocality => subLocality.id),
    },
    filterNot: {
      ...filterNot,
    },
  };
};
