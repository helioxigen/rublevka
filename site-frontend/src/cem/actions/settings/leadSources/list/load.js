import * as types from 'cem/constants/leadSources';
import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

const loadListStarted = () => ({
  type: types.LOAD_LEAD_SOURCES,
});

const loadListSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('leadSources', pagination));
  dispatch({
    type: types.LOAD_LEAD_SOURCES_SUCCESS,
    items,
  });
};

const loadListFailed = ({ errors }) => ({
  type: types.LOAD_LEAD_SOURCES_FAIL,
  errors,
});

export default (queryParams = {}) => (dispatch) => {
  dispatch(loadListStarted());

  return API.get('/v1/client_lead_sources', queryParams)
    .then(({ body }) => dispatch(loadListSucceeded(body)))
    .catch(({ body }) => dispatch(loadListFailed(body)));
};
