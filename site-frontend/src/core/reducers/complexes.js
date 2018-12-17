import { handleActions } from 'redux-actions';

import * as types from 'core/constants/complexes';

import keyBy from 'lodash/keyBy';

const initialState = {
  list: {},
};

export default handleActions(
  {
    [types.LOAD_COMPLEXES]: state => ({
      ...state,
      list: {
        isFetching: true,
      },
    }),

    [types.LOAD_COMPLEXES_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
      ...keyBy(items.map(item => ({ data: item })), 'data.id'),
    }),

    [types.LOAD_COMPLEXES_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.LOAD_COMPLEX_SUCCESS]: (state, { id }) => ({
      ...state,
      [id]: {
        isFetching: true,
      },
    }),

    [types.LOAD_COMPLEX_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        isFetching: false,
        data,
      },
    }),

    [types.LOAD_COMPLEX_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        isFetching: false,
        errors,
      },
    }),
  },
  initialState,
);
