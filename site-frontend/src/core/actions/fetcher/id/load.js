import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

import loadLinkedEntities from '../linkedEntities';

const loadEntityStarted = (entityTypeId, id) => ({
  type: types.LOAD_ID,
  entityTypeId,
  id,
});

const loadEntitySucceeded = (entityTypeId, id, data, linkedResourcesSchemes) => (dispatch) => {
  dispatch(loadLinkedEntities(linkedResourcesSchemes, entityTypeId, [data]));
  dispatch({
    type: types.LOAD_ID_SUCCESS,
    entityTypeId,
    id,
    data,
  });
};

const loadEntityFailed = (entityTypeId, id, data) => ({
  type: types.LOAD_ID_FAIL,
  entityTypeId,
  id,
  data,
});

export default (entityTypeId, id, { apiPath = '', linkedResourcesSchemes = [], transform = data => data, customResourcePath }) => (dispatch) => {
  dispatch(loadEntityStarted(id));

  const pathToResource = customResourcePath || apiPath;

  return API.get(pathToResource ? `${pathToResource}/${id}` : `/v1/${entityTypeId}/${id}`).then(
    ({ body }) => dispatch(loadEntitySucceeded(entityTypeId, id, transform(body), linkedResourcesSchemes)),
    ({ body }) => dispatch(loadEntityFailed(entityTypeId, id, body)),
  );
};
