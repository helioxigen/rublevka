import * as types from 'cem/constants/settings/divisions/actions';
import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

const loadDivisionsStarted = params => ({
  type: types.LOAD_DIVISIONS,
  params,
});

const loadDivisionsSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('divisions', pagination));

  dispatch({
    type: types.LOAD_DIVISIONS_SUCCESS,
    items,
  });
};

const loadDivisionsFailed = ({ errors }) => ({
  type: types.LOAD_DIVISIONS_FAIL,
  errors,
});

export default function loadDivisions(queryParams = {}) {
  return (dispatch) => {
    dispatch(loadDivisionsStarted(queryParams));

    return API.get('/v1/divisions', queryParams).then(
      ({ body }) => dispatch(loadDivisionsSucceeded(body)),
      ({ body }) => dispatch(loadDivisionsFailed(body)),
    );
  };
}
