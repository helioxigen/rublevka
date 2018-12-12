import { API } from 'core/config/sources';

import * as types from 'cem/constants/deals/actions';

const loadDealStarted = id => ({
  type: types.LOAD_DEAL,
  id,
});

const loadDealSucceeded = data => ({
  type: types.LOAD_DEAL_SUCCESS,
  data,
});

const loadDealFailed = (id, { errors }) => ({
  type: types.LOAD_DEAL_FAIL,
  id,
  errors,
});

export default id => (dispatch) => {
  dispatch(loadDealStarted(id));

  return API.get(`/v1/deals/${id}`).then(
    ({ body }) => {
      dispatch(loadDealSucceeded(body));
      return body;
    },
    ({ body }) => {
      dispatch(loadDealFailed(id, body));
      return body;
    },
  );
};
