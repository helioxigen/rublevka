import { API } from 'core/config/sources';

import * as types from 'cem/constants/requests/images/actions';

import { updatePagination } from 'core/actions/pagination';
import UsersActions from 'cem/actions/users';

import { mapFilter } from '../helpers';

import uniq from 'lodash/uniq';

const loadImagesRequestsStarted = key => ({
  type: types.LOAD_IMAGES_REQUESTS,
  key,
});

const loadImagesRequestsSucceeded = (
  key,
  isResultAppended,
  { items, pagination },
) => (dispatch, getState) => {
  const creatorUserIds = items
    .filter(item => !getState().users[item.createdByUserId])
    .map(item => item.createdByUserId);
  const responsibleUserIds = items
    .filter(
      item =>
        !getState().users[item.responsibleUserId] &&
        creatorUserIds.indexOf(item.responsibleUserId) === -1,
    )
    .map(item => item.responsibleUserId);

  const userIds = uniq([...creatorUserIds, ...responsibleUserIds]).filter(
    id => id,
  );

  if (userIds.length)
    dispatch(UsersActions.loadList({ filter: { id: userIds } }));

  dispatch(updatePagination(`imagesRequests.${key}`, pagination));

  return dispatch({
    type: types.LOAD_IMAGES_REQUESTS_SUCCESS,
    isResultAppended,
    key,
    items,
  });
};

const loadImagesRequestsFailed = (key, { errors }) => ({
  type: types.LOAD_IMAGES_REQUESTS_FAIL,
  key,
  errors,
});

export default (
  key,
  queryParams = { filter: {} },
  isResultAppended = false,
) => dispatch => {
  dispatch(loadImagesRequestsStarted(key));

  return API.get('/v1/orders/images', {
    ...queryParams,
    filter: mapFilter(key, queryParams.filter),
  }).then(
    ({ body }) =>
      dispatch(loadImagesRequestsSucceeded(key, isResultAppended, body)),
    ({ body }) => dispatch(loadImagesRequestsFailed(key, body)),
  );
};
