import * as types from 'cem/constants/settings/positions/actions';
import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

const loadPositionsStarted = params => ({
  type: types.LOAD_POSITIONS,
  params,
});

const loadPositionsSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('roles', pagination));

  dispatch({
    type: types.LOAD_POSITIONS_SUCCESS,
    items,
  });
};

const loadPositionsFailed = ({ errors }) => ({
  type: types.LOAD_POSITIONS_FAIL,
  errors,
});

export default function loadPositions(queryParams = {}) {
  return (dispatch) => {
    dispatch(loadPositionsStarted(queryParams));

    return API.get('/v1/roles', queryParams).then(
      ({ body }) => dispatch(loadPositionsSucceeded(body)),
      ({ body }) => dispatch(loadPositionsFailed(body)),
    );
  };
}
