import { API } from 'core/config/sources';

import * as types from 'core/constants/fetcher';

import union from 'lodash/union';
import get from 'lodash/get';

const loadLinkedEntitiesForEntityStarted = (
  baseEntityTypeId,
  entityTypeId,
) => ({
  type: types.LOAD_LINKED_LIST,
  baseEntityTypeId,
  entityTypeId,
});

const loadLinkedEntitiesForEntitySucceeded = (
  baseEntityTypeId,
  entityTypeId,
  linkedResourcesSchemes,
  { items },
) => dispatch => {
  dispatch({
    type: types.LOAD_LINKED_LIST_SUCCESS,
    baseEntityTypeId,
    entityTypeId,
    items,
  });
};

const loadLinkedEntitiesForEntityFailed = (
  baseEntityTypeId,
  entityTypeId,
  { errors },
) => ({
  type: types.LOAD_LINKED_LIST_FAIL,
  baseEntityTypeId,
  entityTypeId,
  errors,
});

const loadLinkedEntitiesForEntity = (
  baseEntityTypeId,
  entityTypeId,
  { queryParams = {}, apiPath = '', linkedResourcesSchemes = [] },
) => dispatch => {
  dispatch(loadLinkedEntitiesForEntityStarted(baseEntityTypeId, entityTypeId));

  return API.get(apiPath || `/v1/${entityTypeId}`, queryParams).then(
    ({ body }) =>
      dispatch(
        loadLinkedEntitiesForEntitySucceeded(
          baseEntityTypeId,
          entityTypeId,
          linkedResourcesSchemes,
          body,
        ),
      ),
    ({ body }) =>
      dispatch(
        loadLinkedEntitiesForEntityFailed(baseEntityTypeId, entityTypeId, body),
      ),
  );
};

export default (
  linkedResourcesSchemes,
  baseEntityTypeId,
  items,
) => dispatch => {
  linkedResourcesSchemes.forEach(linkedEntity => {
    const linkedEntityIds = union(
      items.map(item => {
        if (Array.isArray(linkedEntity.primaryKeyPath)) {
          return linkedEntity.primaryKeyPath
            .map(keyPathItem => get(item, keyPathItem))
            .filter(keyPathItem => !!keyPathItem)[0];
        }
        return get(item, linkedEntity.primaryKeyPath);
      }),
    ).filter(item => !!item);

    if (linkedEntityIds.length) {
      dispatch(
        loadLinkedEntitiesForEntity(baseEntityTypeId, linkedEntity.typeId, {
          queryParams: {
            filter: { id: linkedEntityIds.join(','), ...linkedEntity.filter },
          },
          apiPath: linkedEntity.apiPath,
        }),
      );
    }
  });
};
