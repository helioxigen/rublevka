import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/places/actions';

const initialState = {
  list: {
    pagination: {},
  },
};

export default handleActions({
  [types.LOAD_PLACES]: state => ({
    ...state,
    list: {
      isFetching: true,
    },
  }),

  [types.LOAD_PLACES_SUCCESS]: (state, { items }) => ({
    ...state,
    list: { items },
  }),

  [types.LOAD_PLACES_FAIL]: (state, { errors }) => ({
    ...state,
    list: { errors },
  }),

  [types.LOAD_PLACE]: (state, { id }) => ({
    ...state,
    [id]: {
      isFetching: true,
    },
  }),

  [types.LOAD_PLACE_SUCCESS]: (state, { data, id }) => ({
    ...state,
    [id]: { data },
  }),

  [types.LOAD_PLACE_FAIL]: (state, { errors, id }) => ({
    ...state,
    [id]: { errors },
  }),
}, initialState);
