import * as types from 'cem/constants/comments/actions';

export default (entityKey, entityId, commentId) => ({
  type: types.SET_ACTIVE_COMMENT,
  entityKey,
  entityId,
  commentId,
});
