import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

import * as types from './constants';

const initialState = {
  'countryProperties.all': {
    currency: 'rub',
  },
};

export default handleActions(
  {
    [types.RESET_FILTER]: (state, { resource }) => ({
      ...state,
      [resource]: {},
    }),

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
