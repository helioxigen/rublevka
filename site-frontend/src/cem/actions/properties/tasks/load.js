import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

const loadTasksByPropertyIdStarted = () => ({
  type: types.LOAD_TASKS,
});

const loadTasksByPropertyIdSucceeded = (propertyId, { items, pagination }) => ({
  type: types.LOAD_TASKS_SUCCESS,
  propertyId,
  items,
  pagination,
});

const loadTasksByPropertyIdFailed = (propertyId, { errors }) => ({
  type: types.LOAD_TASKS_FAIL,
  propertyId,
  errors,
});

export default function loadTasksByPropertyId(id, customQueryParams = {}) {
  return dispatch => {
    dispatch(loadTasksByPropertyIdStarted());

    const queryParams = {
      filter: { 'contactDetails.propertyId': id },
      ...customQueryParams,
    };

    return API.get('/v1/tasks', queryParams).then(
      ({ body }) => dispatch(loadTasksByPropertyIdSucceeded(id, body)),
      ({ body }) => dispatch(loadTasksByPropertyIdFailed(id, body)),
    );
  };
}
