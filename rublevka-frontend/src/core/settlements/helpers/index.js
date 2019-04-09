import { makeFilterRange } from 'helpers';

export const mapParams = ({
  pagination,
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const {
    name,
    sw = {},
    ne = {},
    mkadDistance = {},
    routeId,
    routes = [],
    totalProperties = {},
  } = filter;

  return {
    pagination,
    orderBy,
    filter: {
      // ...filter,
      name: name ? `${name.trim()}*` : null,
      state: filter.state,
      'statistics.totalProperties': makeFilterRange(
        totalProperties.min,
        totalProperties.max,
      ),
      'location.mkadDistance': makeFilterRange(
        mkadDistance.min,
        mkadDistance.max,
      ),
      'location.routeId': routeId || routes.map(route => route.id),
      'location.latitude': makeFilterRange(sw.lat, ne.lat),
      'location.longitude': makeFilterRange(sw.lng, ne.lng),
    },
    filterNot,
  };
};
