import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

import { updatePagination } from 'core/actions/pagination';
import loadLinkedEntities from './linkedEntities';

const loadEntitiesStarted = (entityTypeId, queryParams, apiPath) => ({
  type: types.LOAD_LIST,
  entityTypeId,
  queryParams,
  apiPath,
});

const loadEntitiesSucceeded = (entityTypeId, linkedResourcesSchemes, { items, pagination }, append) => (dispatch) => {
  dispatch(updatePagination(entityTypeId, pagination));
  dispatch(loadLinkedEntities(linkedResourcesSchemes, entityTypeId, items));
  dispatch({
    type: types.LOAD_LIST_SUCCESS,
    entityTypeId,
    items,
    append,
  });
};

const loadEntitiesFailed = (entityTypeId, { errors }) => ({
  type: types.LOAD_LIST_FAIL,
  entityTypeId,
  errors,
});

export default function loadEntities(entityTypeId, { queryParams = {}, apiPath = '', linkedResourcesSchemes = [], filterTransform = filter => filter }, append) {
  return (dispatch) => {
    dispatch(loadEntitiesStarted(entityTypeId, queryParams, apiPath));
    const filter = filterTransform(queryParams.filter || {});

    return API.get(apiPath || `/v1/${entityTypeId}`, { ...queryParams, filter }).then(
      ({ body }) => dispatch(loadEntitiesSucceeded(entityTypeId, linkedResourcesSchemes, body, append)),
      ({ body }) => dispatch(loadEntitiesFailed(entityTypeId, body)),
    );
  };
}
