import * as types from 'cem/constants/properties/actions';

export default (ref, value) => dispatch => dispatch({
  type: types.UPDATE_FILTER,
  ref,
  value,
});
