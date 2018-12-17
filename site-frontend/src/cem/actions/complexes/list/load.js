import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexes/actions';
import { updatePagination } from 'core/actions/pagination';

import { defaultFilterNot } from 'cem/constants/complexes/filters';
import { mapFilter } from 'cem/helpers/complexes';

const loadComplexesStarted = () => ({
  type: types.LOAD_COMPLEXES,
});

const loadComplexesSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('complexes', pagination));

  return dispatch({
    type: types.LOAD_COMPLEXES_SUCCESS,
    items,
  });
};

const loadComplexesFailed = ({ errors }) => ({
  type: types.LOAD_COMPLEXES_FAIL,
  errors,
});

const loadComplexes = queryParams => (dispatch) => {
  dispatch(loadComplexesStarted());

  return API.get('/v1/complexes', {
    ...queryParams,
    filterNot: defaultFilterNot,
    filter: mapFilter(queryParams.filter),
    orderBy: { updatedAt: 'desc' },
  }).then(
    ({ body }) => dispatch(loadComplexesSucceeded(body)),
    ({ body }) => dispatch(loadComplexesFailed(body)),
  );
};

export default loadComplexes;
