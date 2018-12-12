import { API } from 'core/config/sources';

import * as types from 'cem/constants/requests/search/actions';
import { REQUESTS_SEARCH_BY_CATEGORY_SUBMITTED } from 'cem/constants/analytics';

import sendAnalytics from 'core/actions/analytics';

const createSearchRequestStarted = data => ({
  type: types.CREATE_SEARCH_REQUEST,
  data,
});

const createSearchRequestSucceeded = (id, { propertyCategory }) => (dispatch) => {
  const eventName = REQUESTS_SEARCH_BY_CATEGORY_SUBMITTED(propertyCategory);

  dispatch(sendAnalytics(eventName, {
    id,
    propertyCategory,
  }));

  return dispatch({
    type: types.CREATE_SEARCH_REQUEST_SUCCESS,
    id,
  });
};

const createSearchRequestFailed = ({ errors }) => ({
  type: types.CREATE_SEARCH_REQUEST_FAIL,
  errors,
});

export default data => (dispatch) => {
  dispatch(createSearchRequestStarted(data));

  return API.post('/v1/properties/orders/search', data)
    .then(({ headers }) =>
      API.get(headers.location).then(({ body }) =>
        dispatch(createSearchRequestSucceeded(body.id, body)),
      ),
    )
    .catch(({ body }) => dispatch(createSearchRequestFailed(body)));
};
