import { API } from 'core/config/sources';
import * as types from 'cem/constants/places/actions';

const loadPlaceStarted = (kind, id) => ({
  type: types.LOAD_PLACE,
  kind,
  id,
});

const loadPlaceFailed = (id, { errors }) => ({
  type: types.LOAD_PLACE_FAIL,
  errors,
  id,
});

const loadPlaceSucceeded = (id, data) => dispatch => dispatch({
  type: types.LOAD_PLACE_SUCCESS,
  id,
  data,
});

export default function loadPlaces(kind, id) {
  return (dispatch) => {
    dispatch(loadPlaceStarted(kind, id));

    return API.get(`/v1/places/${kind}/${id}`)
      .then(({ body }) => dispatch(loadPlaceSucceeded(id, body)))
      .catch(({ body }) => dispatch(loadPlaceFailed(id, body)));
  };
}
