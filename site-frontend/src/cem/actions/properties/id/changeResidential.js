import * as types from 'cem/constants/properties/actions';

export default function changeResidentialComplex(id, location) {
  return dispatch => dispatch({ type: types.CHANGE_RESIDENTIAL, id, location });
}

export function changeResidentialComplexComplete(
  id,
  residentialComplexId,
  location,
) {
  return dispatch =>
    dispatch({
      type: types.CHANGE_RESIDENTIAL_SUCCESS,
      id,
      residentialComplexId,
      location,
    });
}
