import { handleActions } from 'redux-actions';

import * as types from 'core/constants/complexes';

import keyBy from 'lodash/keyBy';

const initialState = {};

export default handleActions(
  {
    [types.SEARCH_COMPLEXES]: state => ({
      ...state,
      isFetching: true,
    }),

    [types.SEARCH_COMPLEXES_SUCCESS]: (state, { items, pagination, more }) => {
      const newItems = more ? [...state.items, ...items] : items;

      return {
        ...state,
        isFetching: false,
        pagination,
        items: newItems,
        ...keyBy(newItems.map(item => ({ data: item })), 'data.id'),
      };
    },

    [types.SEARCH_COMPLEXES_FAIL]: (state, { errors }) => ({
      ...state,
      isFetching: false,
      errors,
    }),
  },
  initialState,
);
