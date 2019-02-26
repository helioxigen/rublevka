import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/search/actions';

const loadSearchRequestStarted = id => ({
  type: types.LOAD_SEARCH_REQUEST,
  id,
});

const loadSearchRequestSucceeded = (id, data) => ({
  type: types.LOAD_SEARCH_REQUEST_SUCCESS,
  id,
  data,
});

const loadSearchRequestFailed = (id, { errors }) => ({
  type: types.LOAD_SEARCH_REQUEST_FAIL,
  id,
  errors,
});

export default id => dispatch => {
  dispatch(loadSearchRequestStarted(id));

  return API.get(`/v1/properties/orders/search/${id}`)
    .then(({ body }) => dispatch(loadSearchRequestSucceeded(id, body)))
    .catch(({ body }) => dispatch(loadSearchRequestFailed(id, body)));
};
