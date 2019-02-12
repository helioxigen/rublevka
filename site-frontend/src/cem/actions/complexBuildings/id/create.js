import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexBuildings/actions';

import {
  transformDataOut,
  transformDataIn,
} from 'cem/helpers/complexBuildings';

const createComplexBuildingStarted = () => ({
  type: types.CREATE_COMPLEX_BUILDING,
});

const createComplexBuildingSucceeded = (id, data) => ({
  type: types.CREATE_COMPLEX_BUILDING_SUCCESS,
  id,
  data,
});

const createComplexBuildingFailed = errors => ({
  type: types.CREATE_COMPLEX_BUILDING_FAIL,
  errors,
});

const createComplexBuilding = complex => dispatch => {
  dispatch(createComplexBuildingStarted());

  return API.post('/v1/complex_buildings', transformDataOut(complex)).then(
    ({ headers }) =>
      API.get(headers.location).then(({ body }) =>
        dispatch(
          createComplexBuildingSucceeded(body.id, transformDataIn(body)),
        ),
      ),
    ({ body }) => {
      dispatch(createComplexBuildingFailed(body));
      return body;
    },
  );
};

export default createComplexBuilding;
