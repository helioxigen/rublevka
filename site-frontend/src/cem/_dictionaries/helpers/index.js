export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { limit, offset } = pagination;

  return {
    pagination: {
      limit,
      offset,
    },
    filter: {
      id: filter.id,
      kind: filter.kind,
    },
  };
};
