import { handleActions } from 'redux-actions';

import * as types from 'site/currentDuty/constants/actions';
import { countryDepartmentsIds, cityDepartmentsIds } from 'site/currentDuty/constants/defaults';

const initialState = {};

export default handleActions({
  // list
  // [types.LOAD_LIST]: (state, { group }) =>
  //   listLoadStart(state, group),
  //
  // [types.LOAD_LIST_FAILED]: (state, { group, errors }) =>
  //   listLoadFail(state, group, errors),

  [types.LOAD_LIST_SUCCEEDED]: (state, { items }) => {
    const countryDuties = items.filter(({ departmentId }) => countryDepartmentsIds.indexOf(departmentId) > -1);

    const cityDuties = items.filter(({ departmentId }) => cityDepartmentsIds.indexOf(departmentId) > -1);

    const countryDuty = countryDuties[0] || {};
    const cityDuty = cityDuties[0] || {};

    return {
      country: countryDuty,
      city: cityDuty,
    };
  },
}, initialState);
