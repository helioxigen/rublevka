import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/search/actions';

const updateSearchRequestStarted = (id, data) => ({
  type: types.UPDATE_SEARCH_REQUEST,
  id,
  data,
});

const updateSearchRequestSucceeded = (id, data) => ({
  type: types.UPDATE_SEARCH_REQUEST_SUCCESS,
  id,
  data,
});

const updateSearchRequestFailed = (id, { errors }) => ({
  type: types.UPDATE_SEARCH_REQUEST_FAIL,
  id,
  errors,
});

export default (id, data) => dispatch => {
  dispatch(updateSearchRequestStarted(id, data));

  return API.put(`/v1/properties/orders/search/${id}`, data)
    .then(() => dispatch(updateSearchRequestSucceeded(id, data)))
    .catch(({ body }) => dispatch(updateSearchRequestFailed(id, body)));
};
