import { handleActions } from 'redux-actions';

import * as types from 'core/constants/complexes';

const initialState = {
  primary: {},
  secondary: {},
};

export default handleActions(
  {
    [types.LOAD_PROPERTIES]: (state, { saleType, id, append }) => {
      const oldItems = (state[saleType][id] && state[saleType][id].items) || [];

      return {
        ...state,
        [saleType]: {
          ...state[saleType],
          [id]: {
            items: append ? oldItems : [],
            isFetching: true,
          },
        },
      };
    },

    [types.LOAD_PROPERTIES_SUCCESS]: (state, { saleType, id, items, append }) => {
      const oldItems = (state[saleType][id] && state[saleType][id].items) || [];

      return {
        ...state,
        [saleType]: {
          ...state[saleType],
          [id]: {
            items: append ? [...oldItems, ...items] : items,
            isFetching: false,
          },
        },
      };
    },

    [types.LOAD_PROPERTIES_FAIL]: (state, { saleType, id, errors }) => ({
      ...state,
      [saleType]: {
        ...state[saleType],
        [id]: {
          errors,
        },
      },
    }),
  },
  initialState,
);
