import { API } from 'core/config/sources';
import * as types from 'cem/constants/places/actions';
import { extractIdFromLocation } from 'core/utils/response';

const createPlaceStarted = (kind, data) => ({
  type: types.CREATE_PLACE,
  kind,
  data,
});

const createPlaceFailed = (data, { errors }) => ({
  type: types.CREATE_PLACE_FAIL,
  errors,
  data,
});

const createPlaceSucceeded = ({ headers, body: data }) => dispatch =>
  dispatch({
    type: types.CREATE_PLACE_SUCCESS,
    id: extractIdFromLocation(headers.location),
    data,
  });

export default function createPlaces(kind, data) {
  return (dispatch) => {
    dispatch(createPlaceStarted(kind, data));

    return API.post(`/v1/places/${kind}`, data)
      .then(response => dispatch(createPlaceSucceeded(response)))
      .catch(({ body }) => {
        dispatch(createPlaceFailed(data, body));
        return body;
      });
  };
}
