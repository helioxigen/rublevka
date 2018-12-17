import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/auth';
import {
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_NOTIFICATION_SETTINGS_SUCCESS,
} from 'cem/constants/users/actions';

const initialState = {
  signedAsUserDetails: {},
};

const reducer = handleActions(
  {
    [types.LOGIN]: () => ({
      inProcess: true,
    }),

    [types.LOGIN_SUCCESS]: (state, { token, id, permissions, details }) => ({
      token,
      id,
      permissions,
      details,
      signedAsUserDetails: state.signedAsUserDetails,
    }),

    [types.LOGIN_FAIL]: (state, { errors }) => ({
      errors,
    }),

    [types.LOGOUT_SUCCESS]: () => ({}),

    // [types.LOGIN_AS_USER]: (state) => ({
    //   ...state,
    //   signedAsUserDetails: {
    //     inProcess: true,
    //   },
    // }),

    [types.LOGIN_AS_USER_SUCCESS]: (state, { data }) => ({
      ...state,
      signedAsUserDetails: {
        ...data,
      },
    }),

    [types.LOGIN_AS_USER_FAIL]: (state, { errors }) => ({
      ...state,
      signedAsUserDetails: {
        errors,
      },
    }),

    // [types.LOGOUT_AS_USER]: (state) => ({
    //   ...state,
    //   signedAsUserDetails: {
    //     inProcess: true,
    //   },
    // }),

    [types.LOGOUT_AS_USER_SUCCESS]: state => ({
      ...state,
      signedAsUserDetails: {},
    }),

    [types.LOGOUT_AS_USER_FAIL]: (state, { errors }) => ({
      ...state,
      signedAsUserDetails: {
        errors,
      },
    }),

    [LOAD_CURRENT_USER_SUCCESS]: (state, { id, permissions, details }) => ({
      ...state,
      id,
      permissions,
      details,
    }),

    [LOAD_NOTIFICATION_SETTINGS_SUCCESS]: (state, { data }) => ({
      ...state,
      notifications: data,
    }),
  },
  initialState,
);

export default reducer;
