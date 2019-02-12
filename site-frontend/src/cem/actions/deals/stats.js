import { API } from 'core/config/sources';

import * as types from 'cem/constants/deals/actions';

import { mapLaneStatsFilter } from 'cem/helpers/deals';

const loadStatsStarted = (kind, toApproveState) => ({
  type: types.LOAD_DEALS_STATS,
  kind,
  toApproveState,
});

const loadStatsSucceeded = (kind, data, toApproveState) => ({
  type: types.LOAD_DEALS_STATS_SUCCESS,
  kind,
  data,
  toApproveState,
});

const loadStatsFailed = (kind, { errors }, toApproveState) => ({
  type: types.LOAD_DEALS_STATS_FAIL,
  kind,
  errors,
  toApproveState,
});

export default (
  kind,
  queryParams = { filter: {} },
  toApproveState,
) => dispatch => {
  dispatch(loadStatsStarted(kind));
  return API.get(`/v1/deals/statistics/${kind}`, {
    ...queryParams,
    filter: mapLaneStatsFilter(
      queryParams.filter,
      !!toApproveState && 'approval',
    ),
  }).then(
    ({ body }) => dispatch(loadStatsSucceeded(kind, body, toApproveState)),
    ({ body }) => dispatch(loadStatsFailed(kind, body, toApproveState)),
  );
};
