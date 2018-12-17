import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

const changeStateSucceeded = (entityTypeId, id) => ({
  type: types.CHANGE_STATE_ID_SUCCESS,
  entityTypeId,
  id,
});

export default (entityTypeId, id, state, data = {}, { apiPath = '' }) => dispatch =>
  API.post(apiPath ? `${apiPath}/${id}/${state}` : `/v1/${entityTypeId}/${id}/${state}`, data).then(
    () => dispatch(changeStateSucceeded(entityTypeId, id)),
    ({ body }) => body,
  );
