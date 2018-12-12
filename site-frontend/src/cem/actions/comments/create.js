import { API } from 'core/config/sources';

import * as types from 'cem/constants/comments/actions';
import { apiPaths } from 'cem/constants/comments/dictionaries';

const createCommentStarted = (entityKey, entityId) => ({
  type: types.CREATE_COMMENT,
  entityKey,
  entityId,
});

const createCommentSucceeded = (entityKey, entityId) => ({
  type: types.CREATE_COMMENT_SUCCESS,
  entityKey,
  entityId,
});

const createCommentFailed = (entityKey, entityId, { errors }) => ({
  type: types.CREATE_COMMENT_FAIL,
  entityKey,
  entityId,
  errors,
});

export default (entityKey, entityId, comment) => (dispatch) => {
  dispatch(createCommentStarted(entityKey, entityId));

  return API.post(apiPaths(entityId)[entityKey], comment).then(
    () => dispatch(createCommentSucceeded(entityKey, entityId)),
    ({ body }) => {
      dispatch(createCommentFailed(entityKey, entityId, body));
      return body;
    },
  );
};
