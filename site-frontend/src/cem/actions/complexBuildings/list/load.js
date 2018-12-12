import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/complexBuildings/actions';
import { defaultFilterNot } from 'cem/constants/complexBuildings/filters';

const loadComplexBuildingsByComplexIdStarted = complexId => ({
  type: types.LOAD_COMPLEX_BUILDINGS,
  complexId,
});

const loadComplexBuildingsByComplexIdSucceeded = (complexId, { items, pagination }) => (dispatch) => {
  dispatch(updatePagination('complexBuildingsByComplexId', pagination));
  return dispatch({
    type: types.LOAD_COMPLEX_BUILDINGS_SUCCESS,
    complexId,
    items,
  });
};

const loadComplexBuildingsByComplexIdFailed = (complexId, { errors }) => ({
  type: types.LOAD_COMPLEX_BUILDINGS_FAIL,
  errors,
});

const loadComplexBuildingsByComplexId = (complexId, queryParams) => (dispatch) => {
  dispatch(loadComplexBuildingsByComplexIdStarted(complexId));

  return API.get('/v1/complex_buildings', { ...queryParams, filterNot: defaultFilterNot }).then(
    ({ body }) => dispatch(loadComplexBuildingsByComplexIdSucceeded(complexId, body)),
    ({ body }) => dispatch(loadComplexBuildingsByComplexIdFailed(complexId, body)),
  );
};

export default loadComplexBuildingsByComplexId;
