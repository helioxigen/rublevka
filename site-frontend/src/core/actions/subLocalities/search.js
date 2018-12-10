import { API } from 'core/config/sources';

import * as types from 'core/constants/subLocalities';

const searchSubLocalitiesStarted = query => ({
  type: types.SEARCH_SUB_LOCALITIES,
  query,
});

const searchSubLocalitiesSucceeded = ({ items, pagination }, more) => ({
  type: types.SEARCH_SUB_LOCALITIES_SUCCESS,
  items,
  pagination,
  more,
});

const searchSubLocalitiesFailed = (query, { errors }) => ({
  type: types.SEARCH_SUB_LOCALITIES_FAIL,
  query,
  errors,
});

export const searchSubLocalities = (query, offset) => (dispatch) => {
  dispatch(searchSubLocalitiesStarted(query));

  const orderBy = {
    name: 'asc',
  };

  const filter = {
    name: query ? `${query}*` : undefined,
  };

  const pagination = {
    limit: 256,
    offset,
  };

  API.get('/v1/places/sub_localities', { orderBy, filter, pagination, includes: ['name', 'id'] }).then(
    ({ body }) => dispatch(searchSubLocalitiesSucceeded(body, !!offset)),
    ({ body }) => dispatch(searchSubLocalitiesFailed(query, body)),
  );
};
