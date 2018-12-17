import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

const createEntitySucceeded = (entityTypeId, id) => ({
  type: types.CREATE_ID_SUCCESS,
  entityTypeId,
  id,
});

export default (entityTypeId, data, { apiPath = '' }) => dispatch =>
  API.post(apiPath || `/v1/${entityTypeId}`, data).then(
    ({ headers }) => {
      const id = headers.location.split('/').pop();
      dispatch(createEntitySucceeded(entityTypeId, id));
    },
    ({ body }) => body,
  );
