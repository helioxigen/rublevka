import { API } from 'core/config/sources';

import * as types from 'cem/constants/comments/actions';
import { subscriptionPaths } from 'cem/constants/comments/dictionaries';

const getStatusStarted = (entityKey, entityId) => ({
  type: types.GET_SUBSCRIPTION_STATUS,
  entityKey,
  entityId,
});

const getStatusSucceeded = (entityKey, entityId, data) => ({
  type: types.GET_SUBSCRIPTION_STATUS_SUCCESS,
  entityKey,
  entityId,
  data,
});

const getStatusFailed = (entityKey, entityId, errors) => ({
  type: types.GET_SUBSCRIPTION_STATUS_FAIL,
  entityKey,
  entityId,
  errors,
});

export default (entityKey, entityId) => (dispatch) => {
  dispatch(getStatusStarted(entityKey, entityId));

  const subscriptionPath = subscriptionPaths(entityId)[entityKey];

  return API.get(`/v1/notifications/${subscriptionPath}/status`).then(
    ({ body }) => dispatch(getStatusSucceeded(entityKey, entityId, body)),
    ({ body }) => dispatch(getStatusFailed(entityKey, entityId, body)),
  );
};
