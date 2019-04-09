import { API } from 'core/config/sources';

import * as types from 'currentDuty/constants/actions';
import { apiPath } from 'currentDuty/constants/defaults';

const loadDuties = propertyCategory => (dispatch, getState) => {
  const currentDutyByPropertyCategory =
    getState().currentDuty[propertyCategory] || {};
  const finishAt = new Date(currentDutyByPropertyCategory.finishAt);
  const now = new Date();

  const isExpired = now.getTime() > finishAt.getTime();

  if (!currentDutyByPropertyCategory.finishAt || isExpired) {
    return API.get(apiPath, { defaultStaffUserId: 1 }).then(
      ({ body: { items } }) => {
        dispatch({
          type: types.LOAD_LIST_SUCCEEDED,
          items,
        });

        return Promise.resolve(items);
      },
      ({ body: { errors } }) => {
        dispatch({
          type: types.LOAD_LIST_FAILED,
          errors,
        });

        return Promise.reject(errors);
      },
    );
  }
  return Promise.resolve();
};

export default loadDuties;
