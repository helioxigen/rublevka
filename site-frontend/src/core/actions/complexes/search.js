import { API } from 'core/config/sources';

import * as types from 'core/constants/complexes';

const searchComplexesStarted = query => ({
  type: types.SEARCH_COMPLEXES,
  query,
});

const searchComplexesSucceeded = ({ items, pagination }, more) => ({
  type: types.SEARCH_COMPLEXES_SUCCESS,
  items,
  pagination,
  more,
});

const searchComplexesFailed = (query, { errors }) => ({
  type: types.SEARCH_COMPLEXES_FAIL,
  query,
  errors,
});

export const searchComplexes = (query, offset) => dispatch => {
  dispatch(searchComplexesStarted(query));

  const orderBy = {
    name: 'asc',
  };

  const pagination = {
    limit: 256,
    offset,
  };

  const filter = {
    name: query ? `${query}*` : undefined,
    state: 'public',
  };

  API.get('/v1/complexes', {
    filter,
    pagination,
    includes: ['name', 'id'],
    orderBy,
  }).then(
    ({ body }) => dispatch(searchComplexesSucceeded(body, !!offset)),
    ({ body }) => dispatch(searchComplexesFailed(query, body)),
  );
};
