import { API } from 'core/config/sources';

import * as types from 'cem/constants/requests/remove/actions';

import { updatePagination } from 'core/actions/pagination';
import UsersActions from 'cem/actions/users';

import { mapFilter } from '../helpers';

const loadPropertyRemovalRequestsStarted = key => ({
  type: types.LOAD_REMOVAL_REQUESTS,
  key,
});

const loadPropertyRemovalRequestsSucceeded = (key, isResultAppended, { items, pagination }) => (dispatch, getState) => {
  const creatorUserIds = items.filter(item => !getState().users[item.createdByUserId]).map(item => item.createdByUserId);
  const responsibleUserIds = items.filter(item => !getState().users[item.responsibleUserId] && creatorUserIds.indexOf(item.responsibleUserId) === -1).map(item => item.responsibleUserId);

  if (creatorUserIds.length || responsibleUserIds.length) dispatch(UsersActions.loadList({ filter: { id: [...creatorUserIds, ...responsibleUserIds] } }));

  dispatch(updatePagination(`removalRequests.${key}`, pagination));

  return dispatch({
    type: types.LOAD_REMOVAL_REQUESTS_SUCCESS,
    isResultAppended,
    key,
    items,
  });
};

const loadPropertyRemovalRequestsFailed = (key, { errors }) => ({
  type: types.LOAD_REMOVAL_REQUESTS_FAIL,
  key,
  errors,
});

export default (key, queryParams = { filter: {} }, isResultAppended = false) => (dispatch) => {
  dispatch(loadPropertyRemovalRequestsStarted(key));

  return API.get('/v1/properties/orders/removal', { ...queryParams, filter: mapFilter(key, queryParams.filter) })
    .then(({ body }) => dispatch(loadPropertyRemovalRequestsSucceeded(key, isResultAppended, body)))
    .catch(({ body }) => dispatch(loadPropertyRemovalRequestsFailed(key, body)));
};
