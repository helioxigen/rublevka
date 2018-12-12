import { API } from 'core/config/sources';

import * as types from 'cem/constants/deals/actions';

import { mapLaneFilterAndFilterNot } from 'cem/helpers/deals';

const loadDealsLaneStarted = (kind, reset) => ({
  type: types.LOAD_DEALS_LANE,
  kind,
  reset,
});

const loadDealsLaneSucceeded = (kind, { items, pagination }, reset) => ({
  type: types.LOAD_DEALS_LANE_SUCCESS,
  kind,
  items,
  pagination,
  reset,
});

const loadDealsLaneFailed = (kind, { errors }) => ({
  type: types.LOAD_DEALS_LANE_FAIL,
  kind,
  errors,
});

export default (kind, queryParams = { filter: {}, filterNot: {} }, reset = false) => (dispatch) => {
  dispatch(loadDealsLaneStarted(kind, reset));

  return API.get('/v1/deals', { ...queryParams, ...mapLaneFilterAndFilterNot(queryParams.filter, queryParams.filterNot, kind) }).then(
    ({ body }) => dispatch(loadDealsLaneSucceeded(kind, body, reset)),
    ({ body }) => dispatch(loadDealsLaneFailed(kind, body)),
  );
};
