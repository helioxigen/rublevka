import { API } from 'core/config/sources';

import * as types from 'cem/constants/comments/actions';
import { subscriptionPaths } from 'cem/constants/comments/dictionaries';

const unsubscribeStarted = (entityKey, entityId) => ({
  type: types.UNSUBSCRIBE,
  entityKey,
  entityId,
});

const unsubscribeSucceeded = (entityKey, entityId) => ({
  type: types.UNSUBSCRIBE_SUCCESS,
  entityKey,
  entityId,
});

const unsubscribeFailed = (entityKey, entityId, responseBody) => ({
  type: types.UNSUBSCRIBE_FAIL,
  entityKey,
  entityId,
  responseBody,
});

export default (entityKey, entityId) => dispatch => {
  dispatch(unsubscribeStarted(entityKey, entityId));

  const subscriptionPath = subscriptionPaths(entityId)[entityKey];

  return API.post(`/v1/notifications/${subscriptionPath}/unsubscribe`).then(
    () => dispatch(unsubscribeSucceeded(entityKey, entityId)),
    ({ body }) => {
      dispatch(unsubscribeFailed(entityKey, entityId, body));
      return body;
    },
  );
};
