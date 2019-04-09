import * as types from 'core/constants/settlements';
import global from 'window-or-global';

import { API } from 'core/config/sources';

const searchSettlementsStarted = query => ({
  type: types.SEARCH_SETTLEMENTS,
  query,
});

const searchSettlementsSucceeded = ({ items, pagination }, more) => ({
  type: types.SEARCH_SETTLEENTS_SUCCESS,
  items,
  pagination,
  more,
});

const searchSettlementsFailed = (query, { errors }) => ({
  type: types.SEARCH_SETTLEMENTS_FAIL,
  query,
  errors,
});

export function searchSettlements(query, offset, isPaginated = false) {
  return dispatch => {
    dispatch(searchSettlementsStarted(query));

    const orderBy = {
      name: 'asc',
    };

    const config = global.config || {};
    const filter = {
      state: 'public',
      name: query ? `*${query}*` : undefined,
      'location.routeId':
        (config.routes && config.routes.map(route => route.id)) || undefined,
    };

    const pagination = {
      limit: 256,
      offset,
    };

    API.get(`/v1/places/settlements${isPaginated ? '' : '/map'}`, {
      orderBy,
      filter,
      ...(isPaginated ? { pagination } : {}),
      includes: ['name', 'id'],
    }).then(
      ({ body }) => dispatch(searchSettlementsSucceeded(body, !!offset)),
      ({ body }) => dispatch(searchSettlementsFailed(query, body)),
    );
  };
}
