import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/settings/departments/actions';

const initialState = {
  list: {},
};

export default handleActions(
  {
    [types.LOAD_DEPARTMENTS_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
    }),

    [types.LOAD_DEPARTMENTS_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.LOAD_DEPARTMENT_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_DEPARTMENT_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),
  },
  initialState,
);
