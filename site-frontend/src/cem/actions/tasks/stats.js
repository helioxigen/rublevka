import { API } from 'core/config/sources';

import * as types from 'cem/constants/tasks/actions';

import { filterTransform } from 'cem/helpers/tasks';

const loadStatsStarted = kind => ({
  type: types.LOAD_STATS,
  kind,
});

const loadStatsSucceeded = (kind, data) => ({
  type: types.LOAD_STATS_SUCCESS,
  kind,
  data,
});

const loadStatsFailed = (kind, { errors }) => ({
  type: types.LOAD_STATS_FAIL,
  kind,
  errors,
});

export default (kind, queryParams = { filter: {} }) => (dispatch) => {
  dispatch(loadStatsStarted(kind));

  return API.get(`/v1/tasks/statistics/${kind}`, { ...queryParams, filter: filterTransform(queryParams.filter) }).then(
    ({ body }) => dispatch(loadStatsSucceeded(kind, body)),
    ({ body }) => dispatch(loadStatsFailed(kind, body)),
  );
};
