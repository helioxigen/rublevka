import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

const updateEntitySucceeded = (entityTypeId, id) => ({
  type: types.UPDATE_ID_SUCCESS,
  entityTypeId,
  id,
});

export default (entityTypeId, id, data, { apiPath = '' }) => dispatch => API.put(apiPath ? `${apiPath}/${id}` : `/v1/${entityTypeId}/${id}`, data).then(
    () => dispatch(updateEntitySucceeded(entityTypeId, id)),
    ({ body }) => body,
  );
