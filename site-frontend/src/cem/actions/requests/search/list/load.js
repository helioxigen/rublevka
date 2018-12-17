import { API } from 'core/config/sources';

import * as types from 'cem/constants/requests/search/actions';

import { updatePagination } from 'core/actions/pagination';
import UsersActions from 'cem/actions/users';

import { mapFilter } from '../helpers';

import uniq from 'lodash/uniq';

const loadSearchRequestsStarted = key => ({
  type: types.LOAD_SEARCH_REQUESTS,
  key,
});

const loadSearchRequestsSucceeded = (key, { items, pagination }) => (dispatch, getState) => {
  const creatorUserIds = items
    .filter(item => !getState().users[item.createdByUser.id])
    .map(item => item.createdByUser.id);
  const responsibleUserIds = items
    .filter(item => item.responsibleUser && !getState().users[item.responsibleUser.id])
    .map(item => item.responsibleUser.id);

  if (creatorUserIds.length || responsibleUserIds.length) {
    dispatch(
      UsersActions.loadList({
        filter: { id: uniq([...creatorUserIds, ...responsibleUserIds]).filter(item => item) },
      }),
    );
  }

  dispatch(updatePagination(`searchRequests.${key}`, pagination));

  return dispatch({
    type: types.LOAD_SEARCH_REQUESTS_SUCCESS,
    key,
    items,
  });
};

const loadSearchRequestsFailed = (key, { errors }) => ({
  type: types.LOAD_SEARCH_REQUESTS_FAIL,
  key,
  errors,
});

export default (key, queryParams = { filter: {} }) => (dispatch) => {
  dispatch(loadSearchRequestsStarted(key));

  return API.get('/v1/properties/orders/search', {
    ...queryParams,
    filter: mapFilter(key, queryParams.filter),
  }).then(
    ({ body }) => dispatch(loadSearchRequestsSucceeded(key, body)),
    ({ body }) => dispatch(loadSearchRequestsFailed(key, body)),
  );
};
