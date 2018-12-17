import { API } from 'core/config/sources';
import * as types from 'cem/constants/places/actions';

const updatePlaceStarted = (kind, id, data) => ({
  type: types.UPDATE_PLACE,
  kind,
  id,
  data,
});

const updatePlaceFailed = (id, data, { errors }) => ({
  type: types.UPDATE_PLACE_FAIL,
  errors,
  id,
  data,
});

const updatePlaceSucceeded = (id, data) => dispatch =>
  dispatch({
    type: types.UPDATE_PLACE_SUCCESS,
    id,
    data,
  });

export default function updatePlaces(kind, id, data) {
  return (dispatch) => {
    dispatch(updatePlaceStarted(kind, data));

    return API.put(`/v1/places/${kind}/${id}`, data)
      .then(({ body }) => {
        dispatch(updatePlaceSucceeded(body));
        return body;
      })
      .catch(({ body }) => {
        dispatch(updatePlaceFailed(data, body));
        return body;
      });
  };
}
