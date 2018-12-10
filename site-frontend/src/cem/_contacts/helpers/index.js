// import { makeFilterRange, formatFilterDate } from 'core/helpers';

export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { name, ...restFilter } = filter;
  const { limit, offset } = pagination;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy,
    filter: {
      ...restFilter,
      'details.name': name ? `*${name}*` : undefined,
      'details.phoneNumber': restFilter['details.phoneNumber'] ? `*${restFilter['details.phoneNumber']}*` : undefined,
      'details.email': restFilter['details.email'] ? `*${restFilter['details.email']}*` : undefined,
    },
    filterNot,
  };
};
