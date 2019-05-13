import { handleActions } from 'redux-actions';
import * as types from './constants';
import { LOAD_CURRENT_USER_SUCCESS } from '../users/constants';

const initialState = {
  signedAsUserDetails: {},
};

const reducer = handleActions(
  {
    [types.LOGIN]: () => ({
      inProcess: true,
    }),

    [types.LOGIN_SUCCESS]: (state, {
      token, id, firstName, lastName,
    }) => ({
      token,
      id,
      firstName,
      lastName,
    }),

    [types.LOGIN_FAIL]: (state, { errors }) => ({
      errors,
    }),

    [types.LOGOUT_SUCCESS]: () => ({}),

    [LOAD_CURRENT_USER_SUCCESS]: (state, { id, permissions, details }) => ({
      ...state,
      id,
      permissions,
      details,
    }),
  },
  initialState,
);

export default reducer;
