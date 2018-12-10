import { API } from 'core/config/sources';

import * as types from 'cem/constants/comments/actions';
import { apiPaths } from 'cem/constants/comments/dictionaries';

import UsersActions from 'cem/actions/users';

const loadCommentsStarted = (entityKey, entityId) => ({
  type: types.LOAD_COMMENTS,
  entityKey,
  entityId,
});

const loadCommentsSucceeded = (entityKey, entityId, { items }) => (dispatch, getState) => {
  const userIds = items.filter(item => !getState().users[item.userId]).map(item => item.userId);

  if (userIds.length) dispatch(UsersActions.loadList({ filter: { id: userIds } }));

  dispatch({
    type: types.LOAD_COMMENTS_SUCCESS,
    entityKey,
    entityId,
    items,
  });
};

const loadCommentsFailed = (entityKey, entityId, { errors }) => ({
  type: types.LOAD_COMMENTS_FAIL,
  entityKey,
  entityId,
  errors,
});

export default (entityKey, entityId) => (dispatch) => {
  dispatch(loadCommentsStarted(entityKey, entityId));

  const apiPath = apiPaths(entityId)[entityKey];

  return API.get(apiPath).then(
    ({ body }) => dispatch(loadCommentsSucceeded(entityKey, entityId, body)),
    ({ body }) => dispatch(loadCommentsFailed(entityKey, entityId, body)),
  );
};
