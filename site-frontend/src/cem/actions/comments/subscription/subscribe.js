import { API } from 'core/config/sources';

import * as types from 'cem/constants/comments/actions';
import { subscriptionPaths } from 'cem/constants/comments/dictionaries';

const subscribeStarted = (entityKey, entityId) => ({
  type: types.SUBSCRIBE,
  entityKey,
  entityId,
});

const subscribeSucceeded = (entityKey, entityId) => ({
  type: types.SUBSCRIBE_SUCCESS,
  entityKey,
  entityId,
});

const subscribeFailed = (entityKey, entityId, responseBody) => ({
  type: types.SUBSCRIBE_FAIL,
  entityKey,
  entityId,
  responseBody,
});

export default (entityKey, entityId) => (dispatch) => {
  dispatch(subscribeStarted(entityKey, entityId));

  const subscriptionPath = subscriptionPaths(entityId)[entityKey];

  return API.post(`/v1/notifications/${subscriptionPath}/subscribe`).then(
    () => dispatch(subscribeSucceeded(entityKey, entityId)),
    ({ body }) => {
      dispatch(subscribeFailed(entityKey, entityId, body));
      return body;
    },
  );
};
