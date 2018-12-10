import { API } from 'core/config/sources';

import * as types from 'core/constants/complexes';

const loadComplexBuildingStarted = id => ({
  type: types.LOAD_COMPLEX_BUILDING,
  id,
});

const loadComplexBuildingSucceeded = (id, data) => ({
  type: types.LOAD_COMPLEX_BUILDING_SUCCESS,
  id,
  data,
});

const loadComplexBuildingFailed = (id, errors) => ({
  type: types.LOAD_COMPLEX_BUILDING_FAIL,
  id,
  errors,
});

const loadComplexBuilding = id => (dispatch) => {
  dispatch(loadComplexBuildingStarted(id));

  return API.get(`/v1/complex_buildings/${id}`).then(
    ({ body }) => dispatch(loadComplexBuildingSucceeded(id, body)),
    ({ body }) => dispatch(loadComplexBuildingFailed(id, body)),
  );
};

export default loadComplexBuilding;
