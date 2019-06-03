import { SET_ACTIVE_COMMENT } from './types';

export default (entityKey, entityId, commentId) => ({
  type: SET_ACTIVE_COMMENT,
  entityKey,
  entityId,
  commentId,
});
