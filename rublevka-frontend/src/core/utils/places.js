import { makeFilterRange } from './common';

export function makeFilter(params) {
  const { id, ...otherFilterFields } = params.filter;
  const { mkadDistance = {}, ...otherDetailsFields } =
    params.filter.details || {};
  return {
    ...otherFilterFields,
    details: { ...otherDetailsFields },
    'location.mkadDistance': makeFilterRange(
      mkadDistance.min,
      mkadDistance.max,
    ),
    id: id ? id.map(item => item.id) : id,
  };
}
