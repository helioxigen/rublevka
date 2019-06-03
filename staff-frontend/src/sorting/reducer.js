import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

import { RESET_SORTING, UPDATE_SORTING, REMOVE_SORTING } from './constants';

const initialState = {};

export default handleActions(
  {
    [RESET_SORTING]: (state, { resource }) => ({
      ...state,
      [resource]: {},
    }),

    [UPDATE_SORTING]: (state, { resource, values }) => ({
      ...state,
      [resource]: {
        ...state[resource],
        ...values,
      },
    }),

    [REMOVE_SORTING]: (state, { resource, key, value }) => {
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

        if (el !== null && typeof el === 'object' && !Array.isArray(el)) {
          const newState = cloneDeep(state);
          delete newState[resource][key][value];

          return newState;
        }

        return state;
      }

      const newState = cloneDeep(state);
      delete newState[resource][key];

      return newState;
    },
  },
  initialState,
);
