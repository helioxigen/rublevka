import { handleActions } from 'redux-actions';
import * as types from '../../constants/places';

import keyBy from 'lodash/keyBy';

const initialState = {
  settlements: {},
  districts: {},
  localities: {},
  routes: {},
};

const places = handleActions({
  [types.LOAD_PLACES]: (state, { kind, params }) => ({
    ...state,
    [kind]: {
      isFetching: true,
      params,
    },
  }),

  [types.LOAD_PLACES_SUCCEEDED]: (state, { kind, items, pagination, timestamp }) => ({
    ...state,
    [kind]: {
      isFetching: false,
      ...keyBy(items.map(item => ({ data: item })), 'data.id'),
      items,
      pagination,
      timestamp,
    },
  }),

  [types.LOAD_PLACES_FAILED]: (state, { kind, error }) => ({
    ...state,
    [kind]: {
      ...state[kind],
      isFetching: false,
      error,
    },
  }),

  [types.LOAD_PLACE]: (state, { kind, id }) => ({
    ...state,
    [kind]: {
      ...state[kind],
      [id]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_PLACE_SUCCEEDED]: (state, { kind, id, data, timestamp }) => ({
    ...state,
    [kind]: {
      ...state[kind],
      [id]: {
        isFetching: false,
        data,
        timestamp,
      },
    },
  }),

  [types.LOAD_PLACE_FAILED]: (state, { kind, id, error }) => ({
    ...state,
    [kind]: {
      ...state[kind],
      [id]: {
        isFetching: false,
        error,
      },
    },
  }),
}, initialState);

export default places;
