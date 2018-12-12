import * as types from 'cem/constants/properties/actions';

export default (propertyId, pagination) => dispatch => dispatch({
  type: types.UPDATE_TASKS_PAGINATION,
  propertyId,
  pagination,
});
