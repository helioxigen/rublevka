import * as types from 'cem/constants/properties/actions';

export default function changeLocation(id, location) {
  return dispatch => dispatch({ type: types.CHANGE_LOCATION, id, location });
}
