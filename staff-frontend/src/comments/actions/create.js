import { apiPaths } from '../constants/default';
import { post } from '../../jq-redux-api/api';
import {
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from './types';

const createCommentStarted = (entityKey, entityId) => ({
  type: CREATE_COMMENT,
  entityKey,
  entityId,
});

const createCommentSucceeded = (entityKey, entityId) => ({
  type: CREATE_COMMENT_SUCCESS,
  entityKey,
  entityId,
});

const createCommentFailed = (entityKey, entityId, { errors }) => ({
  type: CREATE_COMMENT_FAIL,
  entityKey,
  entityId,
  errors,
});

export default (entityKey, entityId, comment) => (dispatch) => {
  dispatch(createCommentStarted(entityKey, entityId));

  return post(apiPaths(entityId)[entityKey], comment)
    .then(() => dispatch(createCommentSucceeded(entityKey, entityId)))
    .catch(({ body }) => {
      dispatch(createCommentFailed(entityKey, entityId, body));
      return body;
    });
};
