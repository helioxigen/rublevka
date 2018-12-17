import { API } from 'core/config/sources';

// import paginationActions from 'core/actions/pagination';

import * as types from 'core/constants/complexes';

const loadComplexBuildingsByComplexIdStarted = complexId => ({
  type: types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID,
  complexId,
});

const loadComplexBuildingsByComplexIdSucceeded = (
  complexId,
  { items /* , pagination */ },
) => dispatch =>
  // dispatch(paginationActions.updatePagination(`complexBuildingsByComplexId`, pagination));
  dispatch({
    type: types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID_SUCCESS,
    complexId,
    items,
  });

const loadComplexBuildingsByComplexIdFailed = (complexId, { errors }) => ({
  type: types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID_FAIL,
  errors,
});

const loadComplexBuildingsStarted = () => ({
  type: types.LOAD_COMPLEX_BUILDINGS,
});

const loadComplexBuildingsSucceeded = ({ items }) => dispatch =>
  dispatch({
    type: types.LOAD_COMPLEX_BUILDINGS,
    items,
  });

const loadComplexBuildingsFailed = ({ errors }) => ({
  type: types.LOAD_COMPLEX_BUILDINGS,
  errors,
});

const loadComplexBuildingsByComplexId = (complexId, queryParams) => (dispatch) => {
  dispatch(loadComplexBuildingsByComplexIdStarted(complexId));

  return API.get('/v1/complex_buildings', { ...queryParams }).then(
    ({ body }) => dispatch(loadComplexBuildingsByComplexIdSucceeded(complexId, body)),
    ({ body }) => dispatch(loadComplexBuildingsByComplexIdFailed(complexId, body)),
  );
};

const loadComplexBuildings = queryParams => (dispatch) => {
  dispatch(loadComplexBuildingsStarted());

  return API.get('/v1/complex_buildings', { ...queryParams }).then(
    ({ body }) => dispatch(loadComplexBuildingsSucceeded(body)),
    ({ body }) => dispatch(loadComplexBuildingsFailed(body)),
  );
};

export default loadComplexBuildingsByComplexId;

export { loadComplexBuildings };
