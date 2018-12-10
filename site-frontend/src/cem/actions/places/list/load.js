import { API } from 'core/config/sources';
import * as types from 'cem/constants/places/actions';

import { updatePagination } from 'core/actions/pagination';

const loadPlacesStarted = kind => ({
  type: types.LOAD_PLACES,
  kind,
});

const loadPlacesFailed = ({ errors }) => ({
  type: types.LOAD_PLACES_FAIL,
  errors,
});

const loadPlacesSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('places', pagination));

  return dispatch({
    type: types.LOAD_PLACES_SUCCESS,
    items,
  });
};

export default function loadPlaces(kind, pagination = {}) {
  return (dispatch) => {
    dispatch(loadPlacesStarted(kind));

    return API.get(`/v1/places/${kind}`, { pagination })
      .then(({ body }) => dispatch(loadPlacesSucceeded(body)))
      .catch(({ body }) => dispatch(loadPlacesFailed(body)));
  };
}
