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
    orderBy,
    filter: {
      id: filter.id,
      lastName: filter.lastName && `*${filter.lastName}*`,
      'details.departmentId': filter.departmentId,
      'details.roleId': filter.roleId,
      state: filter.state,
    },
  };
};
