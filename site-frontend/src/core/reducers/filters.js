import * as types from 'core/constants/filters';

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {};

export default handleActions(
  {
    [types.UPDATE_FILTER]: (state, { resource, values }) => ({
      ...state,
      [resource]: {
        ...state[resource],
        ...values,
      },
    }),

    [types.REMOVE_FILTER]: (state, { resource, key, value }) => {
      if (value) {
        const el = state[resource][key];

        if (Array.isArray(el)) {
          return {
            ...state,
            [resource]: {
              ...state[resource],
              [key]: el.filter(item => item !== value),
            },
          };
        }

        if (
          typeof el !== 'null' &&
          typeof el === 'object' &&
          !Array.isArray(el)
        ) {
          const newState = cloneDeep(state);

          delete newState[resource][key][value];

          return newState;
        }
      } else {
        const newState = cloneDeep(state);

        delete newState[resource][key];

        return newState;
      }
    },

    [types.SET_FILTER]: (state, { resource, values }) => ({
      ...state,
      [resource]: values,
    }),

    [types.CLEAR_FILTER]: (state, { resource }) => ({
      ...state,
      [resource]: {},
    }),
  },
  initialState,
);
