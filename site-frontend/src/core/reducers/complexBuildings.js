import { handleActions } from 'redux-actions';

import * as types from 'core/constants/complexes';

const initialState = {
  byComplexId: {},
};

import keyBy from 'lodash/keyBy';

export default handleActions({
  [types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID]: (state, { complexId }) => ({
    ...state,
    byComplexId: {
      ...state.byComplexId,
      [complexId]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID_SUCCESS]: (state, { complexId, items }) => ({
    ...state,
    byComplexId: {
      ...state.byComplexId,
      [complexId]: {
        ...(state.byComplexId[complexId] || {}),
        items,
        isFetching: false,
      },
    },
    ...keyBy(items, 'id'),
  }),

  [types.LOAD_COMPLEX_BUILDINGS_BY_COMPLEX_ID_FAIL]: (state, { complexId, errors }) => ({
    ...state,
    byComplexId: {
      ...state.byComplexId,
      [complexId]: {
        ...state.byComplexId[complexId],
        errors,
      },
    },
  }),

  [types.LOAD_COMPLEX_BUILDINGS_SUCCESS]: (state, { items }) => ({
    ...state,
    ...keyBy(items, 'id'),
  }),
}, initialState);
