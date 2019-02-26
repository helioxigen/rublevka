import { API } from 'core/config/sources';

import loadComplexBuilding from './load';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/complexBuildings/actions';

import { transformDataOut } from 'cem/helpers/complexBuildings';

const updateComplexBuildingStarted = (id, data) => ({
  type: types.UPDATE_COMPLEX_BUILDING,
  id,
  data,
});

const updateComplexBuildingFailed = (id, errors) => ({
  type: types.UPDATE_COMPLEX_BUILDING_FAIL,
  errors,
});

const updateComplexBuilding = (id, data) => dispatch => {
  dispatch(updateComplexBuildingStarted(id, data));

  return API.put(`/v1/complex_buildings/${id}`, transformDataOut(data)).then(
    () => {
      dispatch(pop('success', `Корпус (ID: ${id})`, 'Успешно обновлён'));
      dispatch(loadComplexBuilding(id));
    },
    ({ body }) => {
      dispatch(updateComplexBuildingFailed(id, body));
      return body;
    },
  );
};

export default updateComplexBuilding;
