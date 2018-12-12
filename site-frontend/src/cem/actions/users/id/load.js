import { API } from 'core/config/sources';
import * as types from 'cem/constants/users/actions';
import { EventTypes } from 'redux-segment';

import { logout } from 'cem/actions/auth';

const loadIdStarted = id => ({
  type: types.LOAD_ID,
  id,
});

export const loadIdSucceeded = (id, data) => (dispatch) => {
  dispatch({
    type: types.LOAD_ID_SUCCESS,
    id,
    data,
  });
};

const loadIdFailed = (id, errors) => ({
  type: types.LOAD_ID_FAIL,
  id,
  errors,
});

export const loadUser = id => (dispatch) => {
  dispatch(loadIdStarted(id));

  return API.get(`/v1/users/staff/${id}`).then(
    ({ body }) => dispatch(loadIdSucceeded(id, body)),
    ({ body }) => dispatch(loadIdFailed(id, body)),
  );
};

const loadCurrentUserSucceeded = ({ id, email, state, photo = {}, ...data }) => ({
  type: types.LOAD_CURRENT_USER_SUCCESS,
  meta: {
    analytics: {
      eventType: EventTypes.identify,
      eventPayload: {
        userId: id,
        traits: {
          email,
          state,
          avatar: `${photo.url}-128`,
          phone: data.workPhoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,

          createdAt: data.createdAt,
          appVersion: window.appVersion,

          roleName: data.details.roleName,
          roleId: data.details.roleId,

          departmentName: data.details.departmentName,
          departmentId: data.details.departmentId,

          divisionName: data.details.divisionName,
          divisionId: data.details.divisionId,
        },
      },
    },
  },
  permissions: data.permissions,
  details: data.details,
  id,
});

export const loadCurrentUser = () => dispatch => API.get('/v1/users/me')
    .then(({ body }) => {
      dispatch(loadIdSucceeded(body.id, body));
      return dispatch(loadCurrentUserSucceeded(body));
    })
    .catch(({ status }) => {
      if (status >= 400 && status < 500) dispatch(logout());
    });
