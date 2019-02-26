import union from 'lodash/union';

import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';
import userActions from 'cem/actions/users';

import * as types from 'cem/constants/duty/actions';

const loadDutiesStarted = queryParams => ({
  type: types.LOAD_DUTIES,
  queryParams,
});

const loadDutiesSucceeded = ({ items, pagination }) => dispatch => {
  dispatch(
    userActions.loadList({
      filter: {
        id: union(items.map(item => item.staffUserId)),
      },
    }),
  );
  dispatch(updatePagination('duty', pagination));
  dispatch({
    type: types.LOAD_DUTIES_SUCCESS,
    items,
  });
};

const loadDutiesFailed = ({ errors }) => ({
  type: types.LOAD_DUTIES_FAIL,
  errors,
});

export default function loadDuties(queryParams = {}) {
  return dispatch => {
    dispatch(loadDutiesStarted(queryParams));

    return API.get('/v1/daily_duty', queryParams).then(
      ({ body }) => dispatch(loadDutiesSucceeded(body)),
      ({ body }) => dispatch(loadDutiesFailed(body)),
    );
  };
}
