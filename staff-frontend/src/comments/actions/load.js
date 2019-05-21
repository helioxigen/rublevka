import { loadList } from '../../users/actions';
import { apiPaths } from '../constants/default';
import { get } from '../../jq-redux-api/api';
import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL,
} from './types';

const loadCommentsStarted = (entityKey, entityId) => ({
  type: LOAD_COMMENTS,
  entityKey,
  entityId,
});

const loadCommentsSucceeded = (entityKey, entityId, { items }) => async (
  dispatch,
  getState,
) => {
  const userIds = items
    .filter(item => !getState().users[item.userId])
    .map(item => item.userId);

  if (userIds.length) {
    await dispatch(loadList({ filter: { id: userIds } }));
  }

  dispatch({
    type: LOAD_COMMENTS_SUCCESS,
    entityKey,
    entityId,
    items,
  });
};

const loadCommentsFailed = (entityKey, entityId, { errors }) => ({
  type: LOAD_COMMENTS_FAIL,
  entityKey,
  entityId,
  errors,
});

export default (entityKey, entityId) => (dispatch) => {
  dispatch(loadCommentsStarted(entityKey, entityId));

  const apiPath = apiPaths(entityId)[entityKey];

  return get(apiPath)
    .then((result) => {
      dispatch(loadCommentsSucceeded(entityKey, entityId, result));
    })
    .catch((result) => {
      dispatch(loadCommentsFailed(entityKey, entityId, result));
    });
};
